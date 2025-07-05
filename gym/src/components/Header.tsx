import React, { useState, useEffect } from 'react';
import { Dumbbell, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Memberships', href: '#memberships' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Schedule', href: '#schedule' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-neon-blue" />
          <span className="text-2xl font-poppins font-bold tracking-wider">
            PUL<span className="text-neon-blue">SE</span>
          </span>
        </a>

        <nav className="hidden lg:block">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="font-medium hover:text-neon-blue transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-neon-blue after:transition-all hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#schedule" className="hidden md:block btn btn-primary">
          Join Now
        </a>

        <button 
          className="lg:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        <div 
          className={`fixed inset-0 bg-background z-50 flex flex-col p-5 transition-transform duration-300 lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-10">
            <a href="#" className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-neon-blue" />
              <span className="text-2xl font-poppins font-bold tracking-wider">
                PUL<span className="text-neon-blue">SE</span>
              </span>
            </a>
            <button 
              className="text-white"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1">
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-xl font-medium hover:text-neon-blue transition-colors"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a 
            href="#schedule" 
            className="btn btn-primary w-full mt-6 text-center"
            onClick={toggleMenu}
          >
            Join Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;