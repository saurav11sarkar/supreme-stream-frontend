import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function PayServiceDayPage() {
  const [searchParams] = useSearchParams();
  const [total, setTotal] = useState<string>('0.00');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');

  useEffect(() => {
    document.title = 'Pay on Service Day - Supreme Steam';
    const totalParam = searchParams.get('total');
    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    const nameParam = searchParams.get('name');

    if (totalParam) {
      const parsed = parseFloat(totalParam);
      setTotal(isNaN(parsed) ? '0.00' : parsed.toFixed(2));
    }
    if (dateParam) setAppointmentDate(decodeURIComponent(dateParam));
    if (timeParam) setAppointmentTime(decodeURIComponent(timeParam));
    if (nameParam) setCustomerName(decodeURIComponent(nameParam));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-calendar-check-line text-green-600 text-4xl"></i>
              </div>

              <h1 className="text-3xl font-bold text-green-800 mb-4">
                Thank You — See You on Your Scheduled Service Day!
              </h1>

              <p className="text-lg text-green-700 mb-6">
                Your appointment has been booked and your payment is set for the day of service.
              </p>

              {/* Appointment Details */}
              {(appointmentDate || appointmentTime) && (
                <div className="bg-white rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Appointment Details:</p>
                  <div className="space-y-1">
                    {appointmentDate && (
                      <p className="text-sm text-gray-800">
                        <i className="ri-calendar-line text-green-600 mr-2"></i>
                        <strong>Date:</strong> {appointmentDate}
                      </p>
                    )}
                    {appointmentTime && (
                      <p className="text-sm text-gray-800">
                        <i className="ri-time-line text-green-600 mr-2"></i>
                        <strong>Time:</strong> {appointmentTime}
                      </p>
                    )}
                    {customerName && (
                      <p className="text-sm text-gray-800">
                        <i className="ri-user-line text-green-600 mr-2"></i>
                        <strong>Customer:</strong> {customerName}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Total Amount Due */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
                <div className="relative px-6 py-8 text-center">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                    Total Amount Due on Service Day
                  </p>
                  <p className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
                    ${total}
                  </p>
                  <div className="mt-5 flex justify-center">
                    <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2">
                      <i className="ri-information-line text-amber-400 text-sm"></i>
                      <p className="text-amber-400 text-xs font-medium">
                        Please have this amount ready for the technician on arrival
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">What to Expect</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <i className="ri-phone-line text-green-600 mr-3 mt-1"></i>
                    <span>Our team will call you 24 hours before to confirm the appointment</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-mail-line text-green-600 mr-3 mt-1"></i>
                    <span>A confirmation email with all details is on its way to you</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-user-line text-green-600 mr-3 mt-1"></i>
                    <span>Your technician will arrive within the scheduled time window</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-bank-card-line text-green-600 mr-3 mt-1"></i>
                    <span>Payment is collected on-site — cash, check, or card accepted</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-customer-service-line text-green-600 mr-3 mt-1"></i>
                    <span>Questions? Call us anytime at (626) 608-6470</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-[#0066CC] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center whitespace-nowrap"
              >
                <i className="ri-home-line mr-2"></i>
                Return to Home
              </Link>
              <Link
                to="/services"
                className="bg-white text-[#0066CC] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-[#0066CC] text-center whitespace-nowrap"
              >
                <i className="ri-service-line mr-2"></i>
                View Our Services
              </Link>
              <a
                href="tel:(626) 608-6470"
                className="bg-white text-[#0066CC] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-[#0066CC] text-center whitespace-nowrap"
              >
                <i className="ri-phone-fill mr-2"></i>
                Call (626) 608-6470
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}