import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/9aa34198c9a58b74ae02beb52e6d1dfd.png" 
                alt="Supreme Steam Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#0066CC] transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-[#0066CC] transition-colors cursor-pointer">
              Services
            </Link>
            <Link to="/quote" className="text-gray-700 hover:text-[#0066CC] transition-colors">
              Build Quote
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#0066CC] transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#0066CC] transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:(626) 608-6470" className="text-[#0066CC] font-semibold hover:text-blue-700 transition-colors">
              (626) 608-6470
            </a>
            <Link 
              to="/quote" 
              className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              Build Quote
            </Link>
          </div>

          <button
            className="md:hidden p-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl text-gray-700`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-[#0066CC] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-[#0066CC] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/quote" 
                className="text-gray-700 hover:text-[#0066CC] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Build Quote
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-[#0066CC] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-[#0066CC] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-100">
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}