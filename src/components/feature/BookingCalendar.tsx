import React, { useState, useEffect, useCallback, useMemo } from 'react';

export interface Timeslot {
  start_time: string;
  end_time: string;
}

interface BookingTexts {
  [key: string]: string;
}

interface ExtraFieldDef {
  name: string;
  labelKey: string;
  type: 'text' | 'select' | 'textarea';
  options?: { value: string; labelKey: string }[];
}

interface BookingCalendarProps {
  timeslotsApi: string;
  appointmentsApi: string;
  texts: BookingTexts;
  containerStyle?: React.CSSProperties;
  pageContext?: string;
  mode?: 'full' | 'picker';
  onPickerComplete?: (date: string, slot: Timeslot) => void;
  onPickerBack?: () => void;
  initialSelectedDate?: string;
  initialSelectedSlot?: Timeslot | null;
}

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getMonthDates(viewMonth: string): (number | null)[] {
  const [year, month] = viewMonth.split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const startPadding = firstDay.getDay();
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startPadding; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function getPrevMonth(viewMonth: string): string {
  const [year, month] = viewMonth.split('-').map(Number);
  if (month === 1) return `${year - 1}-12`;
  return `${year}-${String(month - 1).padStart(2, '0')}`;
}

function getNextMonth(viewMonth: string): string {
  const [year, month] = viewMonth.split('-').map(Number);
  if (month === 12) return `${year + 1}-01`;
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

function getMonthName(viewMonth: string, texts: BookingTexts): string {
  const [year, month] = viewMonth.split('-').map(Number);
  const monthNames = [
    texts.monthJanuary || 'January',
    texts.monthFebruary || 'February',
    texts.monthMarch || 'March',
    texts.monthApril || 'April',
    texts.monthMay || 'May',
    texts.monthJune || 'June',
    texts.monthJuly || 'July',
    texts.monthAugust || 'August',
    texts.monthSeptember || 'September',
    texts.monthOctober || 'October',
    texts.monthNovember || 'November',
    texts.monthDecember || 'December',
  ];
  return `${monthNames[month - 1]} ${year}`;
}

function getTimeFromString(datetime: string): string {
  const timePart = datetime.split(' ')[1];
  if (!timePart) return '';
  const [hourStr, minuteStr] = timePart.slice(0, 5).split(':');
  let hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${hour}:${minuteStr} ${period}`;
}

function getExtraFields(context?: string): ExtraFieldDef[] {
  if (!context) return [];
  const ctx = context.toLowerCase();
  if (ctx.includes('schedule') || ctx.includes('booking') || ctx.includes('cleaning')) {
    return [
      { name: 'service_address', labelKey: 'serviceAddressLabel', type: 'text' },
      { name: 'service_type', labelKey: 'serviceTypeLabel', type: 'select', options: [
        { value: '', labelKey: 'selectServiceType' },
        { value: 'Carpet Cleaning', labelKey: 'carpetCleaning' },
        { value: 'Upholstery Cleaning', labelKey: 'upholsteryCleaning' },
        { value: 'Tile & Grout Cleaning', labelKey: 'tileCleaning' },
        { value: 'Area Rug Cleaning', labelKey: 'rugCleaning' },
        { value: 'Commercial Cleaning', labelKey: 'commercialCleaning' },
      ]},
    ];
  }
  return [];
}

export function BookingCalendar({
  timeslotsApi,
  appointmentsApi,
  texts,
  containerStyle,
  pageContext,
  mode = 'full',
  onPickerComplete,
  onPickerBack,
  initialSelectedDate,
  initialSelectedSlot,
}: BookingCalendarProps) {
  const [currentStep, setCurrentStep] = useState(() => {
    if (mode === 'picker' && initialSelectedDate && initialSelectedSlot) return 1;
    return 0;
  });
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate || '');
  const [selectedSlot, setSelectedSlot] = useState<Timeslot | null>(initialSelectedSlot || null);
  const [viewMonth, setViewMonth] = useState(initialSelectedDate ? initialSelectedDate.slice(0, 7) : '');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<Record<string, string>>({
    customer_name: '',
    customer_phone: '',
    service_address: '',
    service_type: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>();

  const todayStr = useMemo(() => getTodayString(), []);

  const availableDates = useMemo(() => {
    const dates = timeslots.map(t => t.start_time.split(' ')[0]);
    return Array.from(new Set(dates)).sort();
  }, [timeslots]);

  const slotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return timeslots.filter(t => t.start_time.split(' ')[0] === selectedDate);
  }, [timeslots, selectedDate]);

  const extraFields = useMemo(() => getExtraFields(pageContext), [pageContext]);

  const fetchTimeslots = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(timeslotsApi);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      const slots: Timeslot[] = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : data.timeslots || [];
      setTimeslots(slots);
      return slots;
    } catch {
      setError(texts.fetchError || '');
      return [];
    } finally {
      setLoading(false);
    }
  }, [timeslotsApi, texts.fetchError]);

  // Initialize and auto-select closest available date
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const slots = await fetchTimeslots();
      if (!mounted) return;
      if (slots.length === 0) return;

      // If initial values provided in picker mode, use them
      if (initialSelectedDate && initialSelectedSlot) {
        setSelectedDate(initialSelectedDate);
        setSelectedSlot(initialSelectedSlot);
        setViewMonth(initialSelectedDate.slice(0, 7));
        setCurrentStep(1);
        return;
      }

      const dates = slots.map((t: Timeslot) => t.start_time.split(' ')[0]);
      const uniqueDates = Array.from(new Set(dates)).sort();

      let targetDate = uniqueDates.find(d => d >= todayStr);
      if (!targetDate) {
        targetDate = uniqueDates[uniqueDates.length - 1];
      }

      if (targetDate) {
        setSelectedDate(targetDate);
        setViewMonth(targetDate.slice(0, 7));
      }
    };
    init();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On timeslots refresh, re-evaluate and update calendar month if current month has no available dates
  useEffect(() => {
    if (timeslots.length === 0 || !viewMonth) return;
    const hasDatesInMonth = availableDates.some(d => d.startsWith(viewMonth));
    if (!hasDatesInMonth) {
      let targetDate = availableDates.find(d => d >= todayStr);
      if (!targetDate) {
        targetDate = availableDates[availableDates.length - 1];
      }
      if (targetDate) {
        setViewMonth(targetDate.slice(0, 7));
        setSelectedDate(targetDate);
        setCurrentStep(0);
        setSelectedSlot(null);
      }
    }
  }, [timeslots, viewMonth, availableDates, todayStr]);

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setCurrentStep(1);
    setSelectedSlot(null);
    setError('');
    setSuccess(false);
  };

  const handleSlotSelect = (slot: Timeslot) => {
    setSelectedSlot(slot);
    if (mode !== 'picker') {
      setCurrentStep(2);
    }
    setError('');
  };

  const handleBackToDates = () => {
    setCurrentStep(0);
    setSelectedSlot(null);
  };

  const handleBackToSlots = () => {
    setCurrentStep(1);
  };

  const handleModifyTime = () => {
    setCurrentStep(1);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.customer_name || !form.customer_name.trim()) {
      newErrors.customer_name = texts.requiredField || '';
    }
    if (!form.customer_phone || !form.customer_phone.trim()) {
      newErrors.customer_phone = texts.requiredField || '';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    if (!validateForm()) return;

    setSubmitting(true);
    setError('');

    const extensions: Record<string, string> = {};
    extraFields.forEach(field => {
      const value = (form[field.name] || '').trim();
      if (value) extensions[field.name] = value;
    });

    const userNotes = (form.notes || '').trim();

    let notesValue = '';
    if (Object.keys(extensions).length > 0) {
      notesValue = JSON.stringify({
        user_notes: userNotes,
        extensions,
      });
    } else if (userNotes) {
      notesValue = userNotes;
    }

    const payload = {
      customer_name: (form.customer_name || '').trim(),
      customer_phone: (form.customer_phone || '').trim(),
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
      notes: notesValue,
    };

    try {
      const res = await fetch(appointmentsApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('submit failed');

      setSuccess(true);
      setForm({
        customer_name: '',
        customer_phone: '',
        service_address: '',
        service_type: '',
        notes: '',
      });
      setSelectedDate('');
      setSelectedSlot(null);
      setCurrentStep(0);
      await fetchTimeslots();
    } catch {
      setError(texts.submitError || '');
    } finally {
      setSubmitting(false);
    }
  };

  const dayAbbreviations = [
    texts.daySun || 'Sun',
    texts.dayMon || 'Mon',
    texts.dayTue || 'Tue',
    texts.dayWed || 'Wed',
    texts.dayThu || 'Thu',
    texts.dayFri || 'Fri',
    texts.daySat || 'Sat',
  ];

  const monthCells = viewMonth ? getMonthDates(viewMonth) : [];

  const isDateAvailable = (dateStr: string) => availableDates.includes(dateStr);

  const updateFormField = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={containerStyle} className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {texts.submitSuccess || ''}
        </div>
      )}

      {/* Step 0: Date Selection */}
      {currentStep === 0 && (
        <div>
          {mode === 'picker' && onPickerBack && (
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={onPickerBack}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line" />
                {texts.backButton || ''}
              </button>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {texts.step0Title || ''}
          </h3>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-[#0066CC] rounded-full animate-spin" />
            </div>
          ) : availableDates.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {texts.noAvailableDates || ''}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setViewMonth(getPrevMonth(viewMonth))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  aria-label={texts.prevMonthLabel || ''}
                >
                  <i className="ri-arrow-left-s-line text-lg text-gray-700" />
                </button>
                <span className="text-base font-semibold text-gray-900">
                  {viewMonth ? getMonthName(viewMonth, texts) : ''}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMonth(getNextMonth(viewMonth))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  aria-label={texts.nextMonthLabel || ''}
                >
                  <i className="ri-arrow-right-s-line text-lg text-gray-700" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayAbbreviations.map(d => (
                  <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {monthCells.map((day, idx) => {
                  if (day === null) {
                    return <div key={`pad-${idx}`} className="h-10" />;
                  }
                  const dateStr = `${viewMonth}-${String(day).padStart(2, '0')}`;
                  const available = isDateAvailable(dateStr);
                  const selected = selectedDate === dateStr;

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      disabled={!available}
                      onClick={() => handleDateSelect(dateStr)}
                      className={[
                        'h-10 rounded-lg text-sm font-medium transition-colors',
                        selected
                          ? 'bg-[#0066CC] text-white'
                          : available
                          ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                          : 'text-gray-300 cursor-not-allowed',
                      ].join(' ')}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Step 1: Time Slot Selection */}
      {currentStep === 1 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handleBackToDates}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line" />
              {texts.backButton || ''}
            </button>
            <span className="text-sm text-gray-500">
              {selectedDate}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {texts.step1Title || ''}
          </h3>

          {slotsForSelectedDate.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {texts.noTimeslots || ''}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slotsForSelectedDate.map((slot, idx) => {
                const startTime = getTimeFromString(slot.start_time);
                const endTime = getTimeFromString(slot.end_time);
                const selected = selectedSlot?.start_time === slot.start_time;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSlotSelect(slot)}
                    className={[
                      'p-3 rounded-lg border text-sm font-medium transition-colors',
                      selected
                        ? 'border-[#0066CC] bg-blue-50 text-[#0066CC]'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50',
                    ].join(' ')}
                  >
                    {startTime} - {endTime}
                  </button>
                );
              })}
            </div>
          )}

          {mode === 'picker' && (
            <button
              type="button"
              onClick={() => selectedSlot && onPickerComplete?.(selectedDate, selectedSlot)}
              disabled={!selectedSlot}
              className="w-full mt-6 bg-[#0066CC] text-white py-3.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed uppercase tracking-wide cursor-pointer whitespace-nowrap"
            >
              {texts.pickerContinueButton || 'Continue'}
            </button>
          )}
        </div>
      )}

      {/* Step 2: Review + Form + Submit */}
      {currentStep === 2 && selectedSlot && mode === 'full' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handleBackToSlots}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line" />
              {texts.backButton || ''}
            </button>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {texts.step2Title || ''}
          </h3>

          {/* Review Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-500 mb-1">{texts.reviewLabel || ''}</div>
            <div className="text-base font-semibold text-gray-900 mb-2">
              {selectedSlot.start_time.split(' ')[0]}
            </div>
            <div className="text-sm text-gray-700">
              {getTimeFromString(selectedSlot.start_time)} - {getTimeFromString(selectedSlot.end_time)}
            </div>
            <button
              type="button"
              onClick={handleModifyTime}
              className="mt-3 text-sm text-[#0066CC] hover:underline cursor-pointer"
            >
              {texts.modifyTimeButton || ''}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts.customerNameLabel || ''}
              </label>
              <input
                type="text"
                value={form.customer_name || ''}
                onChange={e => updateFormField('customer_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
              />
              {errors?.customer_name && (
                <p className="mt-1 text-xs text-red-600">{errors.customer_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts.customerPhoneLabel || ''}
              </label>
              <input
                type="tel"
                value={form.customer_phone || ''}
                onChange={e => updateFormField('customer_phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
              />
              {errors?.customer_phone && (
                <p className="mt-1 text-xs text-red-600">{errors.customer_phone}</p>
              )}
            </div>

            {extraFields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {texts[field.labelKey] || ''}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={form[field.name] || ''}
                    onChange={e => updateFormField(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent bg-white"
                  >
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {texts[opt.labelKey] || ''}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={form[field.name] || ''}
                    onChange={e => updateFormField(field.name, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={form[field.name] || ''}
                    onChange={e => updateFormField(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {texts.notesLabel || ''}
              </label>
              <textarea
                value={form.notes || ''}
                onChange={e => updateFormField('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0066CC] text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              {submitting ? (texts.submittingButton || '') : (texts.submitButton || '')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
