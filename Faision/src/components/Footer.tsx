import React from 'react';
import { Instagram, BookText as TikTok, Youtube, Facebook, Twitter, Mail, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-900 pt-20 border-t border-dark-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#" className="text-3xl font-montserrat font-bold tracking-wider mb-6 inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple">FAISION</span>
            </a>
            <p className="text-gray-300 mb-6">
              Redefining fashion at the intersection of luxury and street culture. 
              Our mission is to create bold, confident styles for those who dare to stand out.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Instagram size={20} />, label: 'Instagram' },
                { icon: <TikTok size={20} />, label: 'TikTok' },
                { icon: <Youtube size={20} />, label: 'YouTube' },
                { icon: <Facebook size={20} />, label: 'Facebook' },
                { icon: <Twitter size={20} />, label: 'Twitter' },
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className="w-10 h-10 rounded-full border border-neon-pink/30 flex items-center justify-center hover:bg-neon-pink hover:text-dark-900 transition-colors duration-300 group"
                  aria-label={social.label}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6">Shop</h3>
            <ul className="space-y-3">
              {[
                'New Arrivals', 'Men', 'Women', 'Accessories', 'Limited Edition', 'Sale'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-neon-pink transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6">Info</h3>
            <ul className="space-y-3">
              {[
                'About Us', 'Sustainability', 'Store Locator', 'Careers', 'Terms & Conditions', 'Privacy Policy'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-neon-teal transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6">Stay Connected</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive drops, styling tips, and special offers.
            </p>
            <form className="flex mb-6">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-dark-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-neon-purple"
                required
              />
              <button 
                type="submit"
                className="neon-button rounded-r-md rounded-l-none"
              >
                <Send size={18} />
              </button>
            </form>
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-neon-pink" />
              <a href="mailto:hello@faision.com" className="text-gray-300 hover:text-neon-pink transition-colors">
                hello@faision.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dark-600 mt-12 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} FAISION. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;