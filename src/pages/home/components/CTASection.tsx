import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-16 bg-[#0066CC] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Build Your <strong>Quote</strong>?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Contact Supreme Steam today to build your custom quote. Our certified technicians are ready to make your carpets, upholstery, and floors look like new again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              to="/quote" 
              className="bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors inline-block whitespace-nowrap cursor-pointer"
            >
              <i className="ri-file-list-3-fill mr-2"></i>
              Build Your Quote
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-fill text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Now</h3>
              <a href="tel:(626) 608-6470" className="text-blue-100 hover:text-white transition-colors text-lg">
                (626) 608-6470
              </a>
              <p className="text-blue-200 text-sm mt-1">Available 24/7</p>
            </div>
            
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-chat-3-fill text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat Online</h3>
              <button 
                onClick={() => {
                  const button = document.querySelector('#vapi-widget-floating-button') as HTMLElement;
                  if (button) button.click();
                }}
                className="text-blue-100 hover:text-white transition-colors text-lg cursor-pointer"
              >
                Start Live Chat
              </button>
              <p className="text-blue-200 text-sm mt-1">Instant Response</p>
            </div>
            
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-fill text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <a href="mailto:supremesteam84@gmail.com" className="text-blue-100 hover:text-white transition-colors text-lg">
                supremesteam84@gmail.com
              </a>
              <p className="text-blue-200 text-sm mt-1">Quick Response</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">🎉 Special Offer</h3>
            <p className="text-lg mb-4 text-gray-800">
              <strong>New customers save 15%</strong> on their first cleaning service! Valid for carpet cleaning, upholstery cleaning, and tile &amp; grout services.
            </p>
            <p className="text-gray-600 text-sm">
              *Offer valid through end of month. Cannot be combined with other offers. Minimum service charge applies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
