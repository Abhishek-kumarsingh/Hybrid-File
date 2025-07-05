"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-white dark:bg-gray-800/80 shadow-md border border-border"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-12 h-6 rounded-full bg-green-500/10 dark:bg-green-500/20 overflow-hidden">
        <motion.div
          animate={{
            x: theme === "light" ? 0 : 24,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-green-500 dark:bg-blue-500 flex items-center justify-center text-white"
        >
          {theme === "light" ? (
            <FaSun className="text-xs" />
          ) : (
            <FaMoon className="text-xs" />
          )}
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeSwitcher;
