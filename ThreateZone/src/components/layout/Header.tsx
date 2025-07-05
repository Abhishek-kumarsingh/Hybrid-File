import React, { useState } from 'react';
import { Bell, Menu, ChevronDown, User, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { CommandMenu } from '../command/CommandMenu';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useTheme } from '../theme/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import PreferencesPanel from '../preferences/PreferencesPanel';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
          <CommandMenu />
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

          {/* Preferences Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPreferences(true)}
            aria-label="Preferences"
          >
            <Settings size={18} />
          </Button>

          {/* Preferences Panel */}
          <PreferencesPanel
            isOpen={showPreferences}
            onClose={() => setShowPreferences(false)}
          />

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
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
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
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User avatar"
              />
              <span className="hidden md:block text-sm font-medium">Admin User</span>
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
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User size={16} className="mr-2" />
                      Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-danger">
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