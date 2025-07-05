import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div data-aos="fade-up" data-aos-delay="100">
            <Link to="/" className="text-2xl font-display font-bold mb-4 inline-block">
              Luxe
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Premium lifestyle products for the discerning individual. Quality, design, and sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Care */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/account" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Fashion Street, Design District, 10001 New York, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">support@luxe.example</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 pb-6" data-aos="fade-up">
          <div className="max-w-xl mx-auto text-center mb-6">
            <h3 className="text-xl font-display font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="input flex-grow"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Luxe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;