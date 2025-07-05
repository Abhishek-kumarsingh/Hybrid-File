import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Sun, Moon, Home, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`navbar-floating ${
          isScrolled
            ? 'navbar-glass py-3'
            : 'bg-transparent py-5'
        }`}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold">
            <span className="gradient-text">Luxe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link nav-link-glow ${
                  isScrolled
                    ? (isActive ? 'text-purple-600 dark:text-purple-400 font-medium active' : 'text-gray-800 dark:text-white')
                    : 'text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `nav-link nav-link-glow ${
                  isScrolled
                    ? (isActive ? 'text-purple-600 dark:text-purple-400 font-medium active' : 'text-gray-800 dark:text-white')
                    : 'text-white'
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `nav-link nav-link-glow ${
                  isScrolled
                    ? (isActive ? 'text-purple-600 dark:text-purple-400 font-medium active' : 'text-gray-800 dark:text-white')
                    : 'text-white'
                }`
              }
            >
              Cart
            </NavLink>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `nav-link nav-link-glow ${
                  isScrolled
                    ? (isActive ? 'text-purple-600 dark:text-purple-400 font-medium active' : 'text-gray-800 dark:text-white')
                    : 'text-white'
                }`
              }
            >
              Account
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-navy-800/50 transition-colors"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ?
                <Moon
                  size={20}
                  className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-purple-600 transition-colors`}
                /> :
                <Sun
                  size={20}
                  className={`${isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'} hover:text-teal-300 transition-colors`}
                />
              }
            </button>

            <button
              className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-navy-800/50 transition-colors"
              aria-label="Search"
            >
              <Search
                size={20}
                className={`${isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'} hover:text-purple-500 dark:hover:text-purple-300 transition-colors`}
              />
            </button>

            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-navy-800/50 transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag
                size={20}
                className={`${isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'} hover:text-purple-500 dark:hover:text-purple-300 transition-colors`}
              />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-navy-800/50 transition-colors"
              aria-label={isAuthenticated ? 'Account' : 'Login'}
            >
              <User
                size={20}
                className={`${isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'} hover:text-purple-500 dark:hover:text-purple-300 transition-colors`}
              />
            </Link>

            {/* Mobile menu button */}
            <button
              className="p-2 md:hidden rounded-full hover:bg-white/10 dark:hover:bg-navy-800/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ?
                <X size={20} className="text-purple-600 dark:text-purple-400" /> :
                <Menu
                  size={20}
                  className={`${isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'} hover:text-purple-600 dark:hover:text-purple-400 transition-colors`}
                />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden glass shadow-lg absolute w-full animate-slide-down">
            <nav className="container py-4 flex flex-col space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2 font-medium transition-colors flex items-center space-x-2 ${
                    isActive ? 'text-purple-600 dark:text-purple-400' : ''
                  }`
                }
              >
                <Home size={18} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `py-2 font-medium transition-colors flex items-center space-x-2 ${
                    isActive ? 'text-purple-600 dark:text-purple-400' : ''
                  }`
                }
              >
                <ShoppingBag size={18} />
                <span>Shop</span>
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `py-2 font-medium transition-colors flex items-center space-x-2 ${
                    isActive ? 'text-purple-600 dark:text-purple-400' : ''
                  }`
                }
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
              </NavLink>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `py-2 font-medium transition-colors flex items-center space-x-2 ${
                    isActive ? 'text-purple-600 dark:text-purple-400' : ''
                  }`
                }
              >
                <User size={18} />
                <span>Account</span>
              </NavLink>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden mobile-nav">
        <div className="grid grid-cols-4">
          <NavLink to="/" className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }>
            <Home size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }>
            <ShoppingBag size={20} />
            <span>Shop</span>
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }>
            <ShoppingCart size={20} />
            <span>Cart</span>
          </NavLink>
          <NavLink to="/account" className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''}`
          }>
            <User size={20} />
            <span>Account</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;