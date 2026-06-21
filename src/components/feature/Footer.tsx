import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/9aa34198c9a58b74ae02beb52e6d1dfd.png" 
                alt="Supreme Steam Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Professional cleaning services you can trust. We make your home and office spotless with our expert cleaning solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/supremesteaming?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="https://www.instagram.com/supremesteamcleaning/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="https://youtube.com/@supremesteam?si=FoucAgH1ro_wbX5A" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Carpet Cleaning</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Upholstery Cleaning</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Tile &amp; Grout</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Hardwood Floors</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-blue-400 transition-colors">Air Duct Cleaning</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link to="/estimate" className="text-gray-300 hover:text-blue-400 transition-colors">Build Quote</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <i className="ri-phone-fill text-blue-400 mt-1"></i>
                <div>
                  <p className="text-gray-300">Call Us</p>
                  <a href="tel:(626) 608-6470" className="text-white font-semibold hover:text-blue-400 transition-colors">
                    (626) 608-6470
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-mail-fill text-blue-400 mt-1"></i>
                <div>
                  <p className="text-gray-300">Email</p>
                  <a href="mailto:supremesteam84@gmail.com" className="text-white hover:text-blue-400 transition-colors">
                    supremesteam84@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Supreme Steam. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/terms" className="hover:text-amber-500 transition-colors cursor-pointer">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-amber-500 transition-colors cursor-pointer">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Powered by Readdy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
