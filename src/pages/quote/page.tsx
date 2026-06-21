import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';
import { BookingCalendar } from '@/components/feature/BookingCalendar';
import { bookingTimeslotsApiUrl, createBooking } from '@/lib/booking';
import Stepper from './components/Stepper';
import ServiceCards from './components/ServiceCards';
import QuoteSidebar from './components/QuoteSidebar';
import {
  allServices, upholsteryPieceTypes, rugTypes, hardwoodServices,
  tileServices, dryerVentOptions, carpetRoomOptions, serviceAreaPrefixes, excludedServiceAreaZips, carpetRoomTypes,
} from './data';

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/3cI5kC9vC1m39H7aKE2wU00';
const bookingTexts = {
  step0Title: 'Select a date',
  step1Title: 'Select a time',
  backButton: 'Back',
  noAvailableDates: 'No available dates found.',
  noTimeslots: 'No time slots are available for this date.',
  fetchError: 'Unable to load available dates. Please try again.',
  prevMonthLabel: 'Previous month',
  nextMonthLabel: 'Next month',
  pickerContinueButton: 'Continue to Contact Info',
  daySun: 'Sun',
  dayMon: 'Mon',
  dayTue: 'Tue',
  dayWed: 'Wed',
  dayThu: 'Thu',
  dayFri: 'Fri',
  daySat: 'Sat',
};

function to12Hour(time24: string): string {
  const [hourStr, minuteStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${hour}:${minuteStr} ${period}`;
}

function formatTimeslotLabel(startTime: string, endTime: string): string {
  const start = startTime.split(' ')[1]?.slice(0, 5) || startTime.slice(0, 5);
  const end = endTime.split(' ')[1]?.slice(0, 5) || endTime.slice(0, 5);
  return `${to12Hour(start)} \u2013 ${to12Hour(end)}`;
}

type View = 'builder' | 'scheduling' | 'contact' | 'submitted';

const QuotePage: React.FC = () => {
  const [view, setView] = useState<View>('builder');

  const navigate = useNavigate();

  // ZIP
  const [zipInput, setZipInput] = useState('');
  const [zipError, setZipError] = useState('');
  const [zipValidated, setZipValidated] = useState(false);

  // Services
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Carpet
  const [carpetGrid, setCarpetGrid] = useState<Record<string, { clean: number; protect: number; deodorize: number }>>({
    'rooms': { clean: 0, protect: 0, deodorize: 0 },
    'bath-or-laundry': { clean: 0, protect: 0, deodorize: 0 },
    'entry-or-hall': { clean: 0, protect: 0, deodorize: 0 },
    'staircase': { clean: 0, protect: 0, deodorize: 0 },
  });
  const [carpetExtras, setCarpetExtras] = useState<Record<string, number>>({});

  // Upholstery
  const [upholsteryGrid, setUpholsteryGrid] = useState<Record<string, { clean: number; protect: number; deodorize: number }>>({
    'sofa': { clean: 0, protect: 0, deodorize: 0 },
    'loveseat': { clean: 0, protect: 0, deodorize: 0 },
    'recliner': { clean: 0, protect: 0, deodorize: 0 },
    'sectional': { clean: 0, protect: 0, deodorize: 0 },
    'dining-chair-full': { clean: 0, protect: 0, deodorize: 0 },
    'dining-chair-seat': { clean: 0, protect: 0, deodorize: 0 },
    'ottoman': { clean: 0, protect: 0, deodorize: 0 },
  });
  const [upholsteryExtras, setUpholsteryExtras] = useState<Record<string, number>>({});

  // Rug
  const [rugGrid, setRugGrid] = useState<Record<string, { clean: number; protect: number; deodorize: number }>>({
    'synthetic': { clean: 0, protect: 0, deodorize: 0 },
    'wool': { clean: 0, protect: 0, deodorize: 0 },
    'shag-silk': { clean: 0, protect: 0, deodorize: 0 },
  });
  const [rugExtras, setRugExtras] = useState<Record<string, number>>({});

  // Hardwood
  const [hardwoodService, setHardwoodService] = useState('');
  const [hardwoodSqFt, setHardwoodSqFt] = useState(0);

  // Tile
  const [tileService, setTileService] = useState('');
  const [tileSqFt, setTileSqFt] = useState(0);

  // Air Duct
  const [airDuctUnits, setAirDuctUnits] = useState(1);
  const [additionalVents, setAdditionalVents] = useState(0);

  // Dryer Vent
  const [dryerVentType, setDryerVentType] = useState('');

  // Customer
  const [customerInfo, setCustomerInfo] = useState({ name:'', email:'', phone:'', address:'', city:'' });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scheduling (retained for review display when previously set)
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ start_time: string; end_time: string } | null>(null);

  /* ─── Calculators ─── */
  const calcCarpet = () => {
    let t = 0;
    for (const [id, counts] of Object.entries(carpetGrid)) {
      const rt = carpetRoomTypes.find(r => r.id === id);
      if (!rt) continue;
      t += (counts.clean || 0) * rt.cleanPrice;
      t += (counts.protect || 0) * rt.protectPrice;
      t += (counts.deodorize || 0) * rt.deodorizePrice;
    }
    if (carpetExtras['additional-steps']) t += carpetExtras['additional-steps'] * 5;
    return t;
  };

  const calcUpholstery = () => {
    let t = 0;
    for (const [id, counts] of Object.entries(upholsteryGrid)) {
      const pt = upholsteryPieceTypes.find(p => p.id === id);
      if (!pt) continue;
      t += (counts.clean || 0) * pt.cleanPrice;
      t += (counts.protect || 0) * pt.protectPrice;
      t += (counts.deodorize || 0) * pt.deodorizePrice;
    }
    if (upholsteryExtras['sectional-additional-ft']) t += upholsteryExtras['sectional-additional-ft'] * 15;
    return t;
  };

  const calcRug = () => {
    let t = 0;
    for (const [id, counts] of Object.entries(rugGrid)) {
      const rt = rugTypes.find(r => r.id === id);
      if (!rt) continue;
      t += (counts.clean || 0) * rt.cleanPrice;
      t += (counts.protect || 0) * rt.protectPrice;
      t += (counts.deodorize || 0) * rt.deodorizePrice;
    }
    return t;
  };

  const calcHardwood = () => {
    const s = hardwoodServices.find(h => h.id === hardwoodService);
    return s && hardwoodSqFt > 0 ? s.pricePerSqFt * hardwoodSqFt : 0;
  };

  const calcTile = () => {
    const s = tileServices.find(t => t.id === tileService);
    return s && tileSqFt > 0 ? s.pricePerSqFt * tileSqFt : 0;
  };

  const calcAirDuct = () => (airDuctUnits === 1 ? 500 : 950) + additionalVents * 40;
  const calcDryerVent = () => dryerVentOptions.find(o => o.id === dryerVentType)?.price ?? 0;

  const calcTotal = () => {
    let t = 0;
    if (selectedServices.includes('carpet-cleaning')) {
      t += calcCarpet();
    }
    if (selectedServices.includes('upholstery-cleaning')) {
      t += calcUpholstery();
    }
    if (selectedServices.includes('area-rug-cleaning')) {
      t += calcRug();
    }
    if (selectedServices.includes('tile-grout-cleaning')) t += calcTile();
    if (selectedServices.includes('hardwood-cleaning')) t += calcHardwood();
    if (selectedServices.includes('air-duct-cleaning')) t += calcAirDuct();
    if (selectedServices.includes('dryer-vent-cleaning')) t += calcDryerVent();
    if (t > 0 && t < 150) t = 150;
    return Math.round(t * 100) / 100;
  };

  const total = calcTotal();
  const meetsMinimum = total >= 150;

  /* ─── Handlers ─── */
  const handleZipValidate = () => {
    const clean = zipInput.replace(/\D/g, '').slice(0, 5);
    if (clean.length !== 5) { setZipError('Please enter a valid 5-digit ZIP code.'); return; }
    const prefix = clean.slice(0, 3);
    if (!serviceAreaPrefixes.includes(prefix) || excludedServiceAreaZips.includes(clean)) {
      setZipError('Sorry, we only serve locations within a 60-mile radius of Azusa, CA.');
      return;
    }
    setZipError('');
    setZipValidated(true);
  };

  const servicesList = () =>
    selectedServices.map(id => allServices.find(s => s.id === id)?.name || id).join(', ');

  const submitBooking = (paymentStatus: 'payment-pending' | 'pay-on-service-day' | 'quote-requested') => {
    if (!selectedDate || !selectedTimeSlot) {
      throw new Error('Please select an appointment date and time.');
    }

    return createBooking({
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      address: customerInfo.address,
      city: customerInfo.city,
      zipCode: zipInput,
      services: servicesList(),
      price: total,
      startTime: selectedTimeSlot.start_time,
      endTime: selectedTimeSlot.end_time,
      paymentStatus,
    });
  };

  const handlePayNow = async () => {
    if (STRIPE_PAYMENT_LINK.includes('REPLACE_WITH_YOUR_LINK')) {
      alert('Stripe Payment Link is not configured yet. Please paste your buy.stripe.com link from the Stripe dashboard, or call us at (626) 608-6470 to pay over the phone.');
      return;
    }

    setIsProcessingPayment(true);
    try {
      await submitBooking('payment-pending');
      window.location.href = STRIPE_PAYMENT_LINK;
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to complete the booking.');
      setIsProcessingPayment(false);
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitBooking('quote-requested');

      const fd = new FormData();
      fd.append('name', customerInfo.name);
      fd.append('email', customerInfo.email);
      fd.append('phone', customerInfo.phone);
      fd.append('address', customerInfo.address);
      fd.append('city', customerInfo.city);
      fd.append('zipCode', zipInput);
      fd.append('selectedServices', servicesList());
      fd.append('totalQuote', `$${total}`);
      if (selectedDate && selectedTimeSlot) {
        fd.append('appointmentDate', selectedDate);
        fd.append('appointmentTime', formatTimeslotLabel(selectedTimeSlot.start_time, selectedTimeSlot.end_time));
      }
      await fetch('https://readdy.ai/api/form/d43cgommj2r470qadbs0', { method: 'POST', body: fd });
      setView('submitted');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to complete the booking.');
    }
    finally { setIsSubmitting(false); }
  };

  const handlePayServiceDay = async () => {
    const params = new URLSearchParams();
    params.set('total', total.toFixed(2));
    if (selectedDate) params.set('date', selectedDate);
    if (selectedTimeSlot) params.set('time', formatTimeslotLabel(selectedTimeSlot.start_time, selectedTimeSlot.end_time));
    if (customerInfo.name) params.set('name', customerInfo.name);

    setIsSubmitting(true);
    try {
      await submitBooking('pay-on-service-day');
      navigate(`/pay-service-day?${params.toString()}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to complete the booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canContinue = selectedServices.length > 0;

  /* ─── Render ─── */
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      {/* Background image */}
      <div className="flex-1 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20suburban%20home%20exterior%20front%20yard%20landscaping%20professional%20real%20estate%20photography%20warm%20golden%20hour%20lighting%20two%20story%20house%20with%20garage%20clean%20driveway%20green%20lawn%20blue%20sky%20no%20people%20wide%20angle&width=1600&height=900&seq=qhero2&orientation=landscape')`,
          }}
        />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 py-6 md:py-10 px-4">
          <div className="max-w-7xl mx-auto">

            {/* Top label */}
            {view === 'builder' && (
              <div className="text-center mb-6">
                <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em]">BUILD YOUR QUOTE</p>
                <h1 className="text-white text-2xl md:text-3xl font-bold mt-2">
                  {zipValidated ? 'Customize Your Services' : 'Please Enter Your ZIP Code'}
                </h1>
              </div>
            )}

            {view === 'builder' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* LEFT - ZIP & Info */}
                <div className="lg:col-span-3 space-y-4">
                  {/* ZIP Card */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <div className="bg-[#0066CC] px-4 py-3 flex items-center gap-2">
                      <i className="ri-map-pin-2-fill text-white" />
                      <span className="text-white font-bold text-sm uppercase tracking-wide">Service Location</span>
                    </div>
                    <div className="px-4 py-4">
                      {!zipValidated ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={zipInput}
                            onChange={e => { setZipInput(e.target.value.replace(/\D/g,'').slice(0,5)); setZipError(''); }}
                            onKeyDown={e => e.key === 'Enter' && handleZipValidate()}
                            maxLength={5}
                            placeholder="ZIP Code"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066CC] text-center tracking-widest font-bold text-gray-900 text-lg placeholder:text-gray-400 placeholder:tracking-normal placeholder:font-normal"
                          />
                          <button
                            onClick={handleZipValidate}
                            disabled={zipInput.length < 5}
                            className="w-full bg-gray-500 text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-600 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed uppercase tracking-wide"
                          >
                            Continue
                          </button>
                          {zipError && (
                            <div className="p-3 bg-red-50 rounded-lg border border-red-200 flex items-start gap-2">
                              <i className="ri-error-warning-fill text-red-500 mt-0.5 flex-shrink-0 text-sm" />
                              <p className="text-red-700 text-xs">{zipError}</p>
                            </div>
                          )}
                          <p className="text-gray-900 text-xs leading-relaxed">
                            Serving Los Angeles, Orange, Riverside, San Bernardino & Ventura County areas within a 60-mile radius from Azusa, Ca.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">ZIP Code</p>
                              <p className="text-lg font-bold text-gray-900">{zipInput}</p>
                            </div>
                            <button
                              onClick={() => { setZipValidated(false); setZipInput(''); }}
                              className="text-[#0066CC] text-xs font-bold hover:underline"
                            >
                              Change
                            </button>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-blue-800 text-xs">
                              <i className="ri-check-line text-[#0066CC] mr-1" />
                              Service area confirmed
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Info Card */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <div className="bg-gray-800 px-4 py-3">
                      <span className="text-white font-bold text-sm uppercase tracking-wide">Contact Us</span>
                    </div>
                    <div className="px-4 py-4 space-y-2">
                      <a href="tel:(626) 608-6470" className="flex items-center gap-2 text-gray-700 hover:text-[#0066CC] transition-colors">
                        <i className="ri-phone-fill text-[#0066CC]" />
                        <span className="text-sm font-semibold">(626) 608-6470</span>
                      </a>
                      <p className="text-gray-400 text-xs">
                        Available 24/7 for emergencies. Business hours: Mon–Sat 8am–6pm.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CENTER - Service Cards */}
                <div className="lg:col-span-6">
                  {zipValidated ? (
                    <ServiceCards
                      selectedServices={selectedServices}
                      setSelectedServices={setSelectedServices}
                      carpetGrid={carpetGrid}
                      setCarpetGrid={setCarpetGrid}
                      carpetExtras={carpetExtras}
                      setCarpetExtras={setCarpetExtras}
                      upholsteryGrid={upholsteryGrid}
                      setUpholsteryGrid={setUpholsteryGrid}
                      upholsteryExtras={upholsteryExtras}
                      setUpholsteryExtras={setUpholsteryExtras}
                      rugGrid={rugGrid}
                      setRugGrid={setRugGrid}
                      rugExtras={rugExtras}
                      setRugExtras={setRugExtras}
                      hardwoodService={hardwoodService}
                      setHardwoodService={setHardwoodService}
                      hardwoodSqFt={hardwoodSqFt}
                      setHardwoodSqFt={setHardwoodSqFt}
                      tileService={tileService}
                      setTileService={setTileService}
                      tileSqFt={tileSqFt}
                      setTileSqFt={setTileSqFt}
                      airDuctUnits={airDuctUnits}
                      setAirDuctUnits={setAirDuctUnits}
                      additionalVents={additionalVents}
                      setAdditionalVents={setAdditionalVents}
                      dryerVentType={dryerVentType}
                      setDryerVentType={setDryerVentType}
                    />
                  ) : (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/10">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-map-pin-2-line text-white/60 text-3xl" />
                      </div>
                      <p className="text-white/80 text-lg font-semibold mb-2">Enter your ZIP code to get started</p>
                      <p className="text-white/50 text-sm max-w-sm mx-auto">
                        We need to verify your location is within our 60-mile service area of Azusa, CA before showing available services and pricing.
                      </p>
                    </div>
                  )}
                </div>

                {/* RIGHT - Quote Sidebar */}
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-6 space-y-4">
                    {zipValidated && (
                      <QuoteSidebar
                        selectedServices={selectedServices}
                        carpetExtras={carpetExtras}
                        upholsteryGrid={upholsteryGrid}
                        upholsteryExtras={upholsteryExtras}
                        rugGrid={rugGrid}
                        rugExtras={rugExtras}
                        hardwoodService={hardwoodService}
                        hardwoodSqFt={hardwoodSqFt}
                        tileService={tileService}
                        tileSqFt={tileSqFt}
                        airDuctUnits={airDuctUnits}
                        additionalVents={additionalVents}
                        dryerVentType={dryerVentType}
                        calcCarpet={calcCarpet}
                        calcUpholstery={calcUpholstery}
                        calcRug={calcRug}
                        calcHardwood={calcHardwood}
                        calcTile={calcTile}
                        calcAirDuct={calcAirDuct}
                        calcDryerVent={calcDryerVent}
                        calcTotal={calcTotal}
                        onContinue={() => setView('scheduling')}
                        canContinue={canContinue}
                      />
                    )}


                  </div>
                </div>
              </div>
            )}

            {/* SCHEDULING VIEW */}
            {view === 'scheduling' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-3" />
                <div className="lg:col-span-6">
                  <div className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                    <div className="px-6 pt-8 pb-4">
                      <button
                        onClick={() => setView('builder')}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4 cursor-pointer"
                      >
                        <i className="ri-arrow-left-s-line" /> Back to Services
                      </button>
                      <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">BUILD YOUR QUOTE</p>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Select Date & Time</h2>
                      <p className="text-gray-500 text-sm mt-2">Pick your preferred appointment date and time window.</p>
                    </div>

                    <div className="px-6 md:px-10 pb-8">
                      <div className="px-6 md:px-10 pb-8 space-y-6">
                        <div className="rounded-xl border border-gray-200 shadow-sm p-5 md:p-7 min-h-[500px]">
                          <BookingCalendar
                            timeslotsApi={bookingTimeslotsApiUrl}
                            appointmentsApi=""
                            texts={bookingTexts}
                            mode="picker"
                            initialSelectedDate={selectedDate}
                            initialSelectedSlot={selectedTimeSlot}
                            onPickerComplete={(date, slot) => {
                              setSelectedDate(date);
                              setSelectedTimeSlot(slot);
                              setView('contact');
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-6">
                    <QuoteSidebar
                      selectedServices={selectedServices}
                      carpetExtras={carpetExtras}
                      upholsteryGrid={upholsteryGrid}
                      upholsteryExtras={upholsteryExtras}
                      rugGrid={rugGrid}
                      rugExtras={rugExtras}
                      hardwoodService={hardwoodService}
                      hardwoodSqFt={hardwoodSqFt}
                      tileService={tileService}
                      tileSqFt={tileSqFt}
                      airDuctUnits={airDuctUnits}
                      additionalVents={additionalVents}
                      dryerVentType={dryerVentType}
                      calcCarpet={calcCarpet}
                      calcUpholstery={calcUpholstery}
                      calcRug={calcRug}
                      calcHardwood={calcHardwood}
                      calcTile={calcTile}
                      calcAirDuct={calcAirDuct}
                      calcDryerVent={calcDryerVent}
                      calcTotal={calcTotal}
                      onContinue={() => {}}
                      canContinue={false}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT / PAYMENT VIEW */}
            {view === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-3" />
                <div className="lg:col-span-6">
                  <div className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                    <div className="text-center px-6 pt-8 pb-4">
                      <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">BUILD YOUR QUOTE</p>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Review & Confirm</h2>
                      <p className="text-gray-500 text-sm mt-2">Review your selections, then pay or request an official quote.</p>
                    </div>

                    <div className="px-6 md:px-10 py-6 pb-8">
                      {/* Appointment Info */}
                      {selectedDate && selectedTimeSlot && (
                        <div className="bg-blue-50 rounded-xl p-4 mb-5 border border-blue-100">
                          <div className="flex items-center gap-2 mb-2">
                            <i className="ri-calendar-check-line text-[#0066CC]" />
                            <span className="text-sm font-bold text-[#0066CC] uppercase tracking-wider">Scheduled Appointment</span>
                          </div>
                          <p className="text-gray-800 text-sm font-medium">{selectedDate} · {formatTimeslotLabel(selectedTimeSlot.start_time, selectedTimeSlot.end_time)}</p>
                          <button
                            onClick={() => setView('scheduling')}
                            className="mt-2 text-xs text-[#0066CC] hover:underline cursor-pointer"
                          >
                            Change date or time
                          </button>
                        </div>
                      )}

                      {/* Prominent Total Box */}
                      <div className="relative rounded-2xl overflow-hidden mb-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
                        <div className="relative px-6 py-8 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/10 mb-4">
                            <i className="ri-secure-payment-line text-white/80 text-xl" />
                          </div>
                          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">Amount to Enter on Stripe</p>
                          <p className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">${total.toFixed(2)}</p>
                          <div className="mt-5 flex flex-col items-center gap-2">
                            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2">
                              <i className="ri-information-line text-amber-400 text-sm" />
                              <p className="text-amber-400 text-xs font-medium">Enter this exact amount on the Stripe checkout page</p>
                            </div>
                            {meetsMinimum && (
                              <button
                                onClick={() => { navigator.clipboard.writeText(total.toFixed(2)); alert('Amount copied! Paste it on the Stripe checkout page.'); }}
                                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-medium transition-colors cursor-pointer mt-1"
                              >
                                <i className="ri-file-copy-line" />Click to copy amount
                              </button>
                            )}
                          </div>
                          {!meetsMinimum && total > 0 && (
                            <div className="mt-4 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2">
                              <i className="ri-error-warning-fill text-red-400 text-sm" />
                              <p className="text-red-400 text-xs font-medium">Minimum payment is $150. Add more services to continue.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Breakdown */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100 space-y-2">
                        {selectedServices.includes('carpet-cleaning') && (() => {
                          const c = calcCarpet();
                          return c > 0 ? (
                            <div className="flex justify-between text-gray-800 text-sm font-medium"><span>Carpet Cleaning</span><span className="font-bold">${c}</span></div>
                          ) : null;
                        })()}
                        {selectedServices.includes('upholstery-cleaning') && calcUpholstery() > 0 && (
                          <div className="pb-2">
                            <div className="flex justify-between text-gray-800 text-sm font-medium"><span>Upholstery Cleaning</span><span className="font-bold">${calcUpholstery()}</span></div>
                            {(upholsteryExtras['sectional-additional-ft'] || 0) > 0 && <div className="flex justify-between text-gray-500 text-sm pl-4"><span>+ Sectional additional ft</span><span>${(upholsteryExtras['sectional-additional-ft'] || 0) * 15}</span></div>}
                          </div>
                        )}
                        {selectedServices.includes('area-rug-cleaning') && calcRug() > 0 && (
                          <div className="pb-2">
                            <div className="flex justify-between text-gray-800 text-sm font-medium"><span>Area Rug Cleaning</span><span className="font-bold">${calcRug().toFixed(2)}</span></div>
                          </div>
                        )}
                        {selectedServices.includes('tile-grout-cleaning') && calcTile() > 0 && <div className="flex justify-between text-gray-800 text-sm font-medium"><span>Tile & Grout Cleaning</span><span className="font-bold">${calcTile().toFixed(2)}</span></div>}
                        {selectedServices.includes('hardwood-cleaning') && calcHardwood() > 0 && <div className="flex justify-between text-gray-800 text-sm font-medium"><span>Hardwood Floor Cleaning</span><span className="font-bold">${calcHardwood().toFixed(2)}</span></div>}
                        {selectedServices.includes('air-duct-cleaning') && <div className="flex justify-between text-gray-800 text-sm font-medium"><span>Air Duct Cleaning</span><span className="font-bold">${calcAirDuct()}</span></div>}
                        {selectedServices.includes('dryer-vent-cleaning') && calcDryerVent() > 0 && <div className="flex justify-between text-gray-800 text-sm font-medium"><span>Dryer Vent Cleaning</span><span className="font-bold">${calcDryerVent()}</span></div>}
                        {selectedServices.includes('emergency-water-damage') && <div className="flex justify-between text-gray-800 text-sm font-medium"><span>24-Hr Emergency Water Damage</span><span className="font-bold text-amber-600">On-site eval required</span></div>}

                        <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                          <span className="text-base font-bold text-gray-900">Estimated Total</span>
                          <span className="text-2xl font-bold text-[#0066CC]">${total}</span>
                        </div>
                        <p className="text-gray-400 text-xs">* Final price may vary based on actual conditions.</p>
                      </div>

                      {/* Contact Form */}
                      <div className="space-y-4 mb-6">
                        {[
                          { label:'Full Name', key:'name', type:'text', placeholder:'John Smith' },
                          { label:'Email Address', key:'email', type:'email', placeholder:'john@example.com' },
                          { label:'Phone Number', key:'phone', type:'tel', placeholder:'(626) 555-0123' },
                          { label:'Service Address', key:'address', type:'text', placeholder:'123 Main Street' },
                          { label:'City', key:'city', type:'text', placeholder:'Los Angeles' },
                        ].map(field => (
                          <div key={field.key}>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{field.label} *</label>
                            <input
                              type={field.type}
                              placeholder={field.placeholder}
                              value={customerInfo[field.key as keyof typeof customerInfo]}
                              onChange={e => setCustomerInfo(p => ({...p, [field.key]: e.target.value}))}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0066CC] text-gray-900 font-medium"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="space-y-3">
                        <button
                          onClick={handlePayNow}
                          disabled={isProcessingPayment || total === 0 || !meetsMinimum || !selectedDate || !selectedTimeSlot || !customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city}
                          className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          {isProcessingPayment ? (
                            <><i className="ri-loader-4-line animate-spin" />Processing...</>
                          ) : !meetsMinimum && total > 0 ? (
                            <><i className="ri-error-warning-line" />Minimum $150 Required</>
                          ) : (
                            <><i className="ri-bank-card-line" />Pay Now — ${total.toFixed(2)}</>
                          )}
                        </button>

                        <button
                          onClick={handlePayServiceDay}
                          disabled={isSubmitting || total === 0 || !meetsMinimum || !selectedDate || !selectedTimeSlot || !customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city}
                          className="w-full bg-white border-2 border-green-600 text-green-700 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          <i className="ri-calendar-check-line" />Pay Service Day — ${total.toFixed(2)}
                        </button>

                        <a
                          href="https://wisetack.us/#/2qxl7k9/prequalify"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-white border-2 border-gray-300 text-gray-800 py-4 rounded-lg font-bold text-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          <i className="ri-bank-line" />Apply for Financing
                        </a>

                        <form onSubmit={handleSubmitQuote} data-readdy-form id="quote-calculator">
                          <input type="hidden" name="name" value={customerInfo.name} />
                          <input type="hidden" name="email" value={customerInfo.email} />
                          <input type="hidden" name="phone" value={customerInfo.phone} />
                          <input type="hidden" name="address" value={customerInfo.address} />
                          <input type="hidden" name="city" value={customerInfo.city} />
                          <input type="hidden" name="zipCode" value={zipInput} />
                          <input type="hidden" name="selectedServices" value={selectedServices.map(id => allServices.find(s => s.id === id)?.name || id).join(', ')} />
                          <input type="hidden" name="totalQuote" value={`$${total}`} />
                          <button
                            type="submit"
                            disabled={isSubmitting || !selectedDate || !selectedTimeSlot || !customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city}
                            className="w-full bg-[#0066CC] text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            {isSubmitting ? (
                              <><i className="ri-loader-4-line animate-spin" />Submitting...</>
                            ) : (
                              <><i className="ri-file-list-3-line" />Request Official Quote</>
                            )}
                          </button>
                        </form>

                        <button
                          onClick={() => setView('scheduling')}
                          className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-arrow-left-s-line" />Back to Scheduling
                        </button>

                        <div className="pt-2 text-center">
                          <a href="tel:(626) 608-6470" className="text-[#0066CC] text-sm font-semibold hover:underline inline-flex items-center gap-1">
                            <i className="ri-phone-fill" />Prefer to call? (626) 608-6470
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-6">
                    <QuoteSidebar
                      selectedServices={selectedServices}
                      carpetExtras={carpetExtras}
                      upholsteryGrid={upholsteryGrid}
                      upholsteryExtras={upholsteryExtras}
                      rugGrid={rugGrid}
                      rugExtras={rugExtras}
                      hardwoodService={hardwoodService}
                      hardwoodSqFt={hardwoodSqFt}
                      tileService={tileService}
                      tileSqFt={tileSqFt}
                      airDuctUnits={airDuctUnits}
                      additionalVents={additionalVents}
                      dryerVentType={dryerVentType}
                      calcCarpet={calcCarpet}
                      calcUpholstery={calcUpholstery}
                      calcRug={calcRug}
                      calcHardwood={calcHardwood}
                      calcTile={calcTile}
                      calcAirDuct={calcAirDuct}
                      calcDryerVent={calcDryerVent}
                      calcTotal={calcTotal}
                      onContinue={() => {}}
                      canContinue={false}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SUBMITTED VIEW */}
            {view === 'submitted' && (
              <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                  <div className="text-center px-6 pt-8 pb-4">
                    <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">BUILD YOUR QUOTE</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Quote Request Received!</h2>
                  </div>
                  <div className="px-6 md:px-10 py-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <i className="ri-check-line text-green-600 text-3xl" />
                    </div>
                    {selectedDate && selectedTimeSlot && (
                      <div className="bg-blue-50 rounded-xl p-4 mb-5 border border-blue-100 max-w-sm mx-auto">
                        <p className="text-sm font-bold text-[#0066CC] mb-1">Your Appointment</p>
                        <p className="text-gray-800 text-sm font-medium">{selectedDate} · {formatTimeslotLabel(selectedTimeSlot.start_time, selectedTimeSlot.end_time)}</p>
                      </div>
                    )}
                    <p className="text-gray-600 mb-6 max-w-sm mx-auto text-sm">
                      We will contact you within 2 hours during business hours at the number you provided.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-5 text-left max-w-sm mx-auto mb-6">
                      <p className="font-semibold text-gray-900 mb-3 text-sm">What happens next?</p>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        {['We review your request','A technician contacts you','We confirm your appointment','You receive a confirmation'].map(t => (
                          <li key={t} className="flex items-center gap-2"><i className="ri-check-line text-[#0066CC]" />{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a href="tel:(626) 608-6470" className="bg-[#0066CC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap text-sm">
                        <i className="ri-phone-fill mr-2" />Call (626) 608-6470
                      </a>
                      <a href="/" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap text-sm">
                        Back to Home
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuotePage;
