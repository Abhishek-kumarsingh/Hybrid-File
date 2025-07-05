'use client';

import React, { useState } from 'react';
import { Bell, Menu, ChevronDown, User, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const notifications = [
    { id: 1, message: 'Critical alert detected in Refinery A', time: '2 min ago', type: 'critical' },
    { id: 2, message: 'Sensor 23B reporting abnormal readings', time: '15 min ago', type: 'warning' },
    { id: 3, message: 'Threat ID #4872 has been resolved', time: '1 hour ago', type: 'success' },
  ];

  return (
    <header className="bg-card border-b border-border h-16 flex items-center px-4 sticky top-0 z-40">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1 flex justify-between items-center">
        <div className="flex-1 flex items-center ml-4 lg:ml-0">
          <div className="max-w-lg w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search threats, sensors, locations..."
                className="w-full px-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="ml-4 flex items-center gap-2 md:ml-6">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell size={18} />
              <Badge
                variant="danger"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                pulse
              >
                3
              </Badge>
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-card rounded-md shadow-lg border border-border overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-border">
                    <h3 className="text-sm font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 border-b border-border hover:bg-accent/50 transition-colors">
                        <div className="flex items-start">
                          <Badge
                            variant={notification.type === 'critical' ? 'danger' : notification.type === 'warning' ? 'warning' : 'success'}
                            className="mt-0.5 mr-2"
                          >
                            {notification.type}
                          </Badge>
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">View all notifications</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <img
                className="h-8 w-8 rounded-full border-2 border-primary/20"
                src={user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                alt="User avatar"
              />
              <span className="hidden md:block text-sm font-medium">{user?.name || 'User'}</span>
              <ChevronDown size={16} className="text-muted-foreground" />
            </Button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-card rounded-md shadow-lg border border-border overflow-hidden z-50"
                >
                  <div className="p-2">
                    <div className="px-2 py-1 border-b border-border mb-2">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <Badge variant="info" size="sm" className="mt-1">
                        {user?.role}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User size={16} className="mr-2" />
                      Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
