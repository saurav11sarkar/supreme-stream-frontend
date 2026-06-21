import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat py-24 lg:py-40"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/62a3e32f0b9e81e6fab1f245affb41c0.jpeg')`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="w-full max-w-5xl mx-auto text-center">
          <div className="text-white">
            <div className="mb-8">
              <img 
                src="https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/9aa34198c9a58b74ae02beb52e6d1dfd.png" 
                alt="Supreme Steam Logo" 
                className="h-24 md:h-32 lg:h-40 w-auto mx-auto mb-6 brightness-0 invert"
              />
            </div>
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-100 max-w-3xl mx-auto font-light">
              Professional carpet and upholstery cleaning, tile and grout care, hardwood floor cleaning, air duct & dryer vent services, and restoration solutions. Certified technicians, eco-friendly methods, and satisfaction guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/quote" 
                className="bg-blue-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors inline-block text-center whitespace-nowrap cursor-pointer shadow-lg"
              >
                Build Quote
              </Link>
              <a
                href="tel:(626) 608-6470"
                className="bg-amber-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors inline-block text-center whitespace-nowrap cursor-pointer shadow-lg"
              >
                Call Now
              </a>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center space-x-2">
                <i className="ri-phone-fill text-blue-400 text-2xl"></i>
                <a href="tel:(626) 608-6470" className="text-white font-semibold text-xl hover:text-blue-400 transition-colors">
                  (626) 608-6470
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-time-fill text-blue-400 text-2xl"></i>
                <span className="text-white text-lg">Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
