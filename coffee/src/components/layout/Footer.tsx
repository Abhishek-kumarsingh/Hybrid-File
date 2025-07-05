import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Coffee } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Coffee className="mr-2" size={24} />
              <span className="font-handwritten text-2xl">Brewed Bliss</span>
            </div>
            <p className="text-sm mb-6 text-secondary opacity-90">
              Crafting memorable coffee experiences since 2015. Every cup tells a story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl text-secondary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-sm text-secondary hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm text-secondary hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#menu" className="text-sm text-secondary hover:text-white transition-colors">Menu</a></li>
              <li><a href="#gallery" className="text-sm text-secondary hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#reservation" className="text-sm text-secondary hover:text-white transition-colors">Reservations</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl text-secondary mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0 text-secondary opacity-90" />
                <span className="text-sm text-secondary opacity-90">123 Coffee Lane, Brewsville, CA 94321</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-secondary opacity-90" />
                <span className="text-sm text-secondary opacity-90">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-secondary opacity-90" />
                <span className="text-sm text-secondary opacity-90">hello@brewedbliss.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl text-secondary mb-4">Stay Updated</h4>
            <p className="text-sm text-secondary opacity-90 mb-4">
              Subscribe to our newsletter for updates, promotions, and coffee tips.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded bg-primary border border-secondary/30 text-white placeholder-secondary/70 focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-secondary text-primary font-medium rounded hover:bg-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="border-secondary/20 my-8" />

        <div className="text-center text-sm text-secondary opacity-80">
          <p>&copy; {new Date().getFullYear()} Brewed Bliss Coffee. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            {' • '}
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;