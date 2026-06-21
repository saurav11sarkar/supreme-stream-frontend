import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Payment Successful - Supreme Steam';
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-green-600 text-4xl"></i>
              </div>
              
              <h1 className="text-3xl font-bold text-green-800 mb-4">
                Payment Successful!
              </h1>
              
              <p className="text-lg text-green-700 mb-6">
                Thank you for your payment. Your transaction has been completed successfully.
              </p>
              
              {sessionId && (
                <div className="bg-white rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Transaction ID:</p>
                  <p className="text-xs font-mono text-gray-800 break-all">{sessionId}</p>
                </div>
              )}
              
              <div className="bg-white rounded-lg p-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <i className="ri-mail-line text-green-600 mr-3 mt-1"></i>
                    <span>You'll receive a confirmation email with your receipt</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-phone-line text-green-600 mr-3 mt-1"></i>
                    <span>Our team will contact you to confirm your service appointment</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-calendar-check-line text-green-600 mr-3 mt-1"></i>
                    <span>We'll send you a reminder 24 hours before your scheduled service</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-customer-service-line text-green-600 mr-3 mt-1"></i>
                    <span>If you have questions, call us at (626) 608-6470</span>
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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}