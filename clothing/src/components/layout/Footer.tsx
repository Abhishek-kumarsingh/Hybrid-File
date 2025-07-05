import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-medium mb-4">ELYSIAN</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining luxury fashion through mindful design and timeless aesthetics. 
              Each ELYSIAN piece embodies our commitment to quality and conscious craftsmanship.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Youtube" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Contact</h4>
            <p className="text-gray-400 text-sm mb-2">
              123 Fashion Avenue, <br />
              New York, NY 10001
            </p>
            <p className="text-gray-400 text-sm mb-4">
              info@elysian.com <br />
              +1 (212) 555-6789
            </p>
            <div className="flex items-center mt-4">
              <input
                type="email"
                placeholder="Your email"
                className="bg-dark-800 border-0 text-white text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-l"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="bg-primary-700 text-white p-2 rounded-r hover:bg-primary-600 transition-colors"
              >
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-dark-800 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} ELYSIAN. All rights reserved.
            Designed with elegance and sophistication in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;