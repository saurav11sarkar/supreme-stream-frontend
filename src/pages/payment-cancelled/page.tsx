import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function PaymentCancelledPage() {
  useEffect(() => {
    document.title = 'Payment Cancelled - Supreme Steam';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-8 mb-8">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-information-line text-amber-600 text-4xl"></i>
              </div>
              
              <h1 className="text-3xl font-bold text-amber-800 mb-4">
                Payment Cancelled
              </h1>
              
              <p className="text-lg text-amber-700 mb-6">
                Your payment was cancelled. No charges have been made to your account.
              </p>
              
              <div className="bg-white rounded-lg p-6 text-left mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-700 mb-4">
                  If you experienced any issues during checkout or have questions about our services, we're here to help!
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <i className="ri-phone-line text-[#0066CC] mr-3 mt-1"></i>
                    <span>Call us at <strong>(626) 608-6470</strong></span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-chat-3-line text-[#0066CC] mr-3 mt-1"></i>
                    <span>Use our live chat assistant for instant help</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-mail-line text-[#0066CC] mr-3 mt-1"></i>
                    <span>Email us through our contact form</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/quote"
                className="bg-[#0066CC] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center whitespace-nowrap"
              >
                <i className="ri-calculator-line mr-2"></i>
                Try Again
              </Link>
              <Link 
                to="/"
                className="bg-white text-[#0066CC] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-[#0066CC] text-center whitespace-nowrap"
              >
                <i className="ri-home-line mr-2"></i>
                Return to Home
              </Link>
              <a 
                href="tel:(626) 608-6470"
                className="bg-white text-[#0066CC] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-[#0066CC] text-center whitespace-nowrap"
              >
                <i className="ri-phone-fill mr-2"></i>
                Call for Help
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}