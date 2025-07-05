import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${isScrolled ? 'bg-dark-900/90 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-montserrat font-bold tracking-wider">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple">FAISION</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'Collections', 'Designers', 'Shop', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm uppercase tracking-wider hover:text-neon-pink transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <button className="text-white hover:text-neon-pink transition-colors">
            <Search size={20} />
          </button>
          <button className="text-white hover:text-neon-pink transition-colors">
            <User size={20} />
          </button>
          <button className="relative text-white hover:text-neon-pink transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-pink text-xs flex items-center justify-center">
              0
            </span>
          </button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-dark-900/95 backdrop-blur-md z-50 transition-transform duration-300 
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="container mx-auto px-4 pt-20 h-full">
          <button 
            className="absolute top-5 right-4 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col space-y-6 items-center">
            {['Home', 'Collections', 'Designers', 'Shop', 'About'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-xl uppercase tracking-wider hover:text-neon-pink transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            
            <div className="flex space-x-8 mt-8">
              <button className="text-white hover:text-neon-pink transition-colors">
                <Search size={24} />
              </button>
              <button className="text-white hover:text-neon-pink transition-colors">
                <User size={24} />
              </button>
              <button className="relative text-white hover:text-neon-pink transition-colors">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-pink text-xs flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;