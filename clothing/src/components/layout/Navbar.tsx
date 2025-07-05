import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const iconButtonClass = "relative group";
  const iconClass = "transition-all duration-300 group-hover:scale-110 group-hover:text-primary-800";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`transition-all duration-500 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-lg shadow-glass py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-playfair font-bold tracking-wider z-10">
            <span className={`transition-colors duration-300 ${isScrolled ? 'text-dark-900' : 'text-white'}`}>
              ELYSIAN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className={`text-sm font-inter uppercase tracking-wider transition-colors duration-300 ${
                isScrolled
                  ? 'text-dark-900 hover:text-primary-800'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Home
            </Link>

            <div className="relative group">
              <button
                onClick={() => toggleDropdown('women')}
                className={`flex items-center text-sm font-inter uppercase tracking-wider transition-colors duration-300 ${
                  isScrolled
                    ? 'text-dark-900 hover:text-primary-800'
                    : 'text-white hover:text-white/80'
                }`}
              >
                Women
                <ChevronDown size={16} className="ml-1" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'women' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="absolute left-0 mt-6 w-72 bg-white shadow-elegant rounded-sm z-20 overflow-hidden"
                  >
                    <div className="p-4 bg-gradient-diagonal from-dark-900 to-dark-800">
                      <h3 className="text-white font-playfair text-lg">Women's Collection</h3>
                    </div>
                    <div className="py-2">
                      {['New Arrivals', 'Dresses', 'Tops', 'Bottoms', 'Accessories'].map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                        >
                          <Link
                            to="/"
                            className="block px-4 py-2 hover:bg-neutral-50 text-dark-900 transition-colors duration-200 hover:text-primary-800"
                          >
                            {item}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative group">
              <button
                onClick={() => toggleDropdown('men')}
                className={`flex items-center text-sm font-inter uppercase tracking-wider transition-colors duration-300 ${
                  isScrolled
                    ? 'text-dark-900 hover:text-primary-800'
                    : 'text-white hover:text-white/80'
                }`}
              >
                Men
                <ChevronDown size={16} className="ml-1" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'men' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="absolute left-0 mt-6 w-72 bg-white shadow-elegant rounded-sm z-20 overflow-hidden"
                  >
                    <div className="p-4 bg-gradient-diagonal from-dark-900 to-dark-800">
                      <h3 className="text-white font-playfair text-lg">Men's Collection</h3>
                    </div>
                    <div className="py-2">
                      {['New Arrivals', 'Shirts', 'Pants', 'Outerwear', 'Accessories'].map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                        >
                          <Link
                            to="/"
                            className="block px-4 py-2 hover:bg-neutral-50 text-dark-900 transition-colors duration-200 hover:text-primary-800"
                          >
                            {item}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/lookbook"
              className={`text-sm font-inter uppercase tracking-wider transition-colors duration-300 ${
                isScrolled
                  ? 'text-dark-900 hover:text-primary-800'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Lookbook
            </Link>

            <Link
              to="/blog"
              className={`text-sm font-inter uppercase tracking-wider transition-colors duration-300 ${
                isScrolled
                  ? 'text-dark-900 hover:text-primary-800'
                  : 'text-white hover:text-white/80'
              }`}
            >
              Journal
            </Link>

            <Link
              to="/about"
              className={`text-sm font-inter uppercase tracking-wider transition-colors duration-300 ${
                isScrolled
                  ? 'text-dark-900 hover:text-primary-800'
                  : 'text-white hover:text-white/80'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6 z-10">
            <motion.button
              aria-label="Search"
              className={iconButtonClass}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} className={`${iconClass} ${isScrolled ? 'text-dark-900' : 'text-white'}`} />
            </motion.button>
            <motion.button
              aria-label="Wishlist"
              className={iconButtonClass}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} className={`${iconClass} ${isScrolled ? 'text-dark-900' : 'text-white'}`} />
            </motion.button>
            <motion.button
              aria-label="Account"
              className={iconButtonClass}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={20} className={`${iconClass} ${isScrolled ? 'text-dark-900' : 'text-white'}`} />
            </motion.button>
            <motion.button
              aria-label="Shopping Bag"
              className={iconButtonClass}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={20} className={`${iconClass} ${isScrolled ? 'text-dark-900' : 'text-white'}`} />
              <motion.span
                className="absolute -top-1 -right-1 bg-gold-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15
                }}
              >
                0
              </motion.span>
            </motion.button>
            <motion.button
              aria-label="Toggle Menu"
              className={`md:hidden ${iconButtonClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X size={24} className={`${iconClass} ${isScrolled ? 'text-dark-900' : 'text-white'}`} />
              ) : (
                <Menu size={24} className={`${iconClass} ${isScrolled ? 'text-dark-900' : 'text-white'}`} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-dark-950/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 md:hidden shadow-2xl"
            >
              <div className="container mx-auto px-6 pt-24 pb-8 h-full overflow-y-auto">
                <nav className="flex flex-col space-y-6">
                  <motion.div variants={menuItemVariants}>
                    <Link
                      to="/"
                      className="text-lg font-inter uppercase tracking-wider text-dark-900 hover:text-primary-800 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </motion.div>

                <motion.div variants={menuItemVariants}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Link
                        to="/"
                        className="text-lg font-inter uppercase tracking-wider text-dark-900 hover:text-primary-800 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Women
                      </Link>
                      <button
                        onClick={() => toggleDropdown('mobile-women')}
                        className="p-1"
                      >
                        <ChevronDown size={20} className={`transition-transform duration-300 ${activeDropdown === 'mobile-women' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {activeDropdown === 'mobile-women' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pl-4 border-l border-gray-200"
                        >
                          <div className="py-2 space-y-3">
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              New Arrivals
                            </Link>
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              Dresses
                            </Link>
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              Tops
                            </Link>
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              Bottoms
                            </Link>
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              Accessories
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Link
                        to="/"
                        className="text-lg font-inter uppercase tracking-wider text-dark-900 hover:text-primary-800 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Men
                      </Link>
                      <button
                        onClick={() => toggleDropdown('mobile-men')}
                        className="p-1"
                      >
                        <ChevronDown size={20} className={`transition-transform duration-300 ${activeDropdown === 'mobile-men' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {activeDropdown === 'mobile-men' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pl-4 border-l border-gray-200"
                        >
                          <div className="py-2 space-y-3">
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              New Arrivals
                            </Link>
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              Shirts
                            </Link>
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              Pants
                            </Link>
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              Outerwear
                            </Link>
                            <Link to="/" className="block text-dark-800 hover:text-primary-800" onClick={() => setMobileMenuOpen(false)}>
                              Accessories
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/lookbook"
                    className="text-lg font-inter uppercase tracking-wider text-dark-900 hover:text-primary-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Lookbook
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/blog"
                    className="text-lg font-inter uppercase tracking-wider text-dark-900 hover:text-primary-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Journal
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/about"
                    className="text-lg font-inter uppercase tracking-wider text-dark-900 hover:text-primary-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants} className="pt-6 mt-6 border-t border-gray-200">
                  <div className="flex space-x-6">
                    <button className="text-dark-900 hover:text-primary-800 transition-colors">
                      <User size={24} />
                    </button>
                    <button className="text-dark-900 hover:text-primary-800 transition-colors">
                      <Heart size={24} />
                    </button>
                    <button className="text-dark-900 hover:text-primary-800 transition-colors relative">
                      <ShoppingBag size={24} />
                      <span className="absolute -top-1 -right-1 bg-accent-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                        0
                      </span>
                    </button>
                  </div>
                </motion.div>
              </nav>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;