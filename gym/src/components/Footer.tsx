import React from 'react';
import { Dumbbell, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Dumbbell className="h-8 w-8 text-neon-blue" />
              <span className="text-2xl font-poppins font-bold tracking-wider">
                PUL<span className="text-neon-blue">SE</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Transforming lives through innovative fitness solutions and a supportive community.
              Join us to unlock your full potential.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="p-2 bg-medium-gray rounded-full hover:bg-neon-blue hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="p-2 bg-medium-gray rounded-full hover:bg-neon-blue hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="p-2 bg-medium-gray rounded-full hover:bg-neon-blue hover:text-black transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Memberships', 'Trainers', 'Gallery', 'Testimonials', 'Schedule'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-neon-blue transition-colors inline-flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 bg-neon-blue rounded-full"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-neon-blue shrink-0 mt-1" />
                <span>123 Fitness Ave, Cityville, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-neon-blue shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-neon-blue shrink-0" />
                <span>info@pulsefitness.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-300">Monday - Friday</span>
                <span>5:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Saturday</span>
                <span>6:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Sunday</span>
                <span>7:00 AM - 9:00 PM</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-medium-gray border border-light-gray rounded-l-lg focus:outline-none focus:ring-1 focus:ring-neon-blue"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neon-blue text-black rounded-r-lg hover:bg-opacity-90 transition-colors"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-light-gray text-center text-gray-400 text-sm">
          <p>© 2025 PULSE Fitness. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;