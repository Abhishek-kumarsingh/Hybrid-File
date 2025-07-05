"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  submenu?: NavItem[];
}

interface MobileNavProps {
  items: NavItem[];
  logo?: React.ReactNode;
  className?: string;
  onLocationClick?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  items,
  logo,
  className,
  onLocationClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest(".mobile-nav-container")) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  
  // Toggle submenu expansion
  const toggleSubmenu = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };
  
  // Check if a menu item is active
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  
  // Menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  
  // Submenu animation variants
  const submenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={cn("relative z-50 lg:hidden", className)}>
      {/* Mobile menu button */}
      <button
        className="p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto mobile-nav-container"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Menu header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              {logo ? (
                <div>{logo}</div>
              ) : (
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  DDA Parks
                </div>
              )}
              <button
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {/* Menu items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.title} className="relative">
                    {item.submenu ? (
                      <div>
                        <button
                          className={cn(
                            "flex items-center justify-between w-full p-3 rounded-lg transition-colors",
                            isActive(item.href)
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                          onClick={() => toggleSubmenu(item.title)}
                        >
                          <div className="flex items-center">
                            {item.icon && <span className="mr-3">{item.icon}</span>}
                            <span>{item.title}</span>
                          </div>
                          {expandedItems.includes(item.title) ? (
                            <FaChevronDown size={14} />
                          ) : (
                            <FaChevronRight size={14} />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {expandedItems.includes(item.title) && (
                            <motion.ul
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={submenuVariants}
                              className="pl-4 mt-1 space-y-1 overflow-hidden"
                            >
                              {item.submenu.map((subitem) => (
                                <li key={subitem.title}>
                                  <Link
                                    href={subitem.href}
                                    className={cn(
                                      "flex items-center p-3 rounded-lg transition-colors",
                                      isActive(subitem.href)
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    )}
                                  >
                                    {subitem.icon && <span className="mr-3">{subitem.icon}</span>}
                                    <span>{subitem.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center p-3 rounded-lg transition-colors",
                          isActive(item.href)
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Location button */}
            {onLocationClick && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  className="flex items-center justify-center w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  onClick={() => {
                    onLocationClick();
                    setIsOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Use My Location</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
