import React, { useEffect, useState } from 'react';
import { Menu, X, Car } from 'lucide-react';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Models', href: '#models' },
  { name: 'Features', href: '#features' },
  { name: 'Customize', href: '#customize' },
  { name: 'Specs', href: '#specs' },
  { name: 'Gallery', href: '#gallery' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Car className="h-8 w-8 text-primary-500 mr-2" />
            <span className="text-2xl font-heading font-bold">XDRV</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white hover:text-primary-500 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="accent">Test Drive</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 glass-card rounded-lg p-4 animate-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 py-2 hover:text-primary-500 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="accent" fullWidth>
                Test Drive
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;