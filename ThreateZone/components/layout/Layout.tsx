'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePreferences } from '@/contexts/PreferencesContext';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { preferences, updatePreference } = usePreferences();
  const { sidebarCollapsed } = preferences;

  // Check if the screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);

      // Auto-collapse sidebar on mobile
      if (isMobileView && !sidebarCollapsed) {
        updatePreference('sidebarCollapsed', true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [sidebarCollapsed, updatePreference]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    updatePreference('sidebarCollapsed', !sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for mobile */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex flex-col max-w-xs w-full"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar for desktop */}
      <div className={`hidden lg:block`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
