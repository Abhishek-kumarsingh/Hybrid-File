import React from 'react';
import { Car, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-800 pt-16 pb-8">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 text-primary-500 mr-2" />
              <span className="text-2xl font-heading font-bold">XDRV</span>
            </div>
            <p className="text-gray-400 mb-4">
              Redefining the future of premium vehicle experiences through innovation and design excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#models" className="text-gray-400 hover:text-primary-500 transition-colors">Models</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-primary-500 transition-colors">Features</a></li>
              <li><a href="#customize" className="text-gray-400 hover:text-primary-500 transition-colors">Customize</a></li>
              <li><a href="#specs" className="text-gray-400 hover:text-primary-500 transition-colors">Specifications</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-primary-500 transition-colors">Gallery</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">Dealerships</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">Service Centers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">Warranty Information</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email"
                placeholder="Your email"
                className="bg-secondary-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
              />
              <Button className="rounded-l-none">
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} XDRV. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;