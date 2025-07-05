import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Baristas', href: '#baristas' },
    { name: 'Visit Us', href: '#reservation' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <Coffee className={`mr-2 ${isScrolled ? 'text-primary' : 'text-white'}`} size={28} />
          <span className={`font-handwritten text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-primary' : 'text-white'
          }`}>
            Brewed Bliss
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-primary-light ${
                    isScrolled ? 'text-text' : 'text-white'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Order Now Button - Desktop */}
        <div className="hidden md:block">
          <a href="#reservation" className="btn btn-primary">
            Order Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-primary' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-primary' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md animate-fade-in">
          <nav className="container-custom py-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="block text-text hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#reservation" 
                  className="btn btn-primary block text-center mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order Now
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;