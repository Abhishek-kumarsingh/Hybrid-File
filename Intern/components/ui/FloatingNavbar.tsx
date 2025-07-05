import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from "./MovingBorders";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileNav from "./design-system/MobileNav";

const Dropdown = ({
  items,
  closeDropdown,
  onMouseEnterDropdown,
  onMouseLeaveDropdown,
}: {
  items: { name: string; link: string }[];
  closeDropdown: () => void;
  onMouseEnterDropdown: () => void;
  onMouseLeaveDropdown: () => void;
}) => {
  const handleDropdownMouseEnter = () => {
    onMouseEnterDropdown();
  };

  const handleDropdownMouseLeave = () => {
    onMouseLeaveDropdown();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-56 rounded-md shadow-lg overflow-hidden z-50"
      onMouseEnter={handleDropdownMouseEnter}
      onMouseLeave={handleDropdownMouseLeave}
    >
      <div className="bg-white dark:bg-gray-800/90 backdrop-blur-md border border-border rounded-md overflow-hidden">
        {items.map((item, idx) => (
          <Link key={idx} href={item.link}>
            <div className="block px-4 py-3 text-sm text-foreground hover:bg-green-500/10 dark:hover:bg-green-500/20 hover:text-green-500 transition-colors duration-200 cursor-pointer">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export const FloatingNav = ({
  navItems,
  className,
  onLocationClick,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
    subItems?: { name: string; link: string }[];
    dropdown?: boolean;
    items?: { name: string; link: string }[];
  }[];
  className?: string;
  onLocationClick: () => void;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [dropdownHovered, setDropdownHovered] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State to manage menu open/close
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust breakpoint as needed
    };

    handleResize(); // Set initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const closeDropdown = () => {
    setDropdownVisible(null);
  };

  const handleNavItemClick = (idx: number) => {
    if (isSmallScreen && navItems[idx].dropdown) {
      // If on small screen and item has a dropdown, toggle the dropdown visibility
      setDropdownVisible(dropdownVisible === idx ? null : idx);
      setIsMenuOpen(true); // Ensure menu remains open after dropdown toggle
    } else {
      // Otherwise, navigate to the link if it exists
      if (navItems[idx].link) {
        window.location.href = navItems[idx].link;
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownMouseEnter = () => {
    setDropdownHovered(true);
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    setDropdownHovered(false);
    leaveTimerRef.current = setTimeout(() => {
      closeDropdown();
    }, 300); // Adjust the delay time (in milliseconds) as needed
  };

  const handleDropdownClick = (idx: number) => {
    if (isSmallScreen && navItems[idx].dropdown) {
      // If on small screen and item has a dropdown, toggle the dropdown visibility
      setDropdownVisible(dropdownVisible === idx ? null : idx);
    }
  };

  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputBlur = () => {
    // Hide the search input when the user removes focus
    if (searchQuery.trim() === "") {
      setShowSearchInput(false);
    }
  };

  const handleSearchInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Execute search on Enter key press
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  const executeSearch = () => {
    // Perform search functionality here
    console.log("Executing search for:", searchQuery);
    // Example: Redirect or filter items based on the search query
    setSearchQuery(""); // Clear search query after search
  };

  const filteredNavItems = navItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { data: session } = useSession()

  const user: User = session?.user as User

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          y: visible ? 0 : -20,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={cn(
          "flex fixed z-[100] top-4 inset-x-0 mx-auto px-6 py-3 items-center justify-between max-w-7xl w-full",
          className
        )}
      >
        <div
          className="absolute inset-0 bg-white/70 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl border border-border bg-mesh"
          style={{
            ...(isSmallScreen && {
              borderRadius: "0",
              top: "0",
              left: "0",
              right: "0",
            }),
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="DDA Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-semibold text-dda-DEFAULT dark:text-white hidden md:block">
                Delhi Development Authority
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isSmallScreen && (
          <div className="relative z-10 flex justify-between items-center w-full px-4">
            {/* Logo for mobile */}
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="DDA Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Mobile Navigation */}
            <MobileNav
              items={navItems.map(item => ({
                title: item.name,
                href: item.link,
                icon: item.icon,
                submenu: item.subItems?.map(subItem => ({
                  title: subItem.name,
                  href: subItem.link,
                }))
              }))}
              onLocationClick={onLocationClick}
            />
          </div>
        )}

        {/* Navigation items */}
        {!isSmallScreen && (
          <div className="relative z-10 flex items-center space-x-1 md:space-x-2">
            {filteredNavItems
              .filter((item) => item.name !== "LOCATION") // Remove the LOCATION item
              .map((navItem, idx) => (
                <div
                  key={`navItem-${idx}`}
                  className="relative"
                  onMouseEnter={() => setDropdownVisible(idx)}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <Link href={navItem.link}>
                    <button
                      className={cn(
                        "relative px-3 py-2 rounded-md text-foreground hover:bg-green-500/10 dark:hover:bg-green-500/20 hover:text-green-500 transition-colors duration-200 items-center flex space-x-1 bg-transparent border-none outline-none cursor-pointer"
                      )}
                      onClick={() => handleNavItemClick(idx)}
                    >
                      {navItem.icon && <span className="block">{navItem.icon}</span>}
                      <span className="text-sm font-medium">{navItem.name}</span>
                    </button>
                  </Link>
                  <AnimatePresence>
                    {navItem.subItems && dropdownVisible === idx && (
                      <Dropdown
                        items={navItem.subItems}
                        closeDropdown={closeDropdown}
                        onMouseEnterDropdown={handleDropdownMouseEnter}
                        onMouseLeaveDropdown={handleDropdownMouseLeave}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}

            {/* Right side items */}
            <div className="flex items-center ml-4 space-x-2">
              {/* Search Icon with animation */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-full hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-colors duration-200"
                onClick={handleSearchIconClick}
              >
                <Image
                  src="/search.svg"
                  alt="Search"
                  width={22}
                  height={22}
                  className="cursor-pointer"
                />
              </motion.div>

              {showSearchInput && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative"
                >
                  <div className="search-box">
                    <div className="search-icon">
                      <Image
                        src="/search.svg"
                        alt="Search"
                        width={16}
                        height={16}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Search parks..."
                      className="search-input"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onBlur={handleSearchInputBlur}
                      onKeyPress={handleSearchInputKeyPress}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="search-button"
                      onClick={executeSearch}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Location Icon with animation */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-full hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-colors duration-200"
                onClick={onLocationClick}
              >
                <Image
                  src="/map-pin.svg"
                  alt="Location"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </motion.div>

              {/* Theme Switcher */}
              <div className="ml-1">
                <ThemeSwitcher />
              </div>

              {/* User authentication */}
              <div className="ml-2">
                {session ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium hidden md:block">Welcome, {user?.username || user?.email}</span>
                    <button
                      onClick={() => signOut()}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/signin">
                    <button className="btn-primary text-sm px-4 py-2">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* We've replaced the old dropdown menu with our new MobileNav component */}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
