import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Monitor, Moon, Sun, PanelLeft, LayoutDashboard, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { usePreferences } from '../../contexts/PreferencesContext';
import { useTheme } from '../theme/ThemeProvider';

interface PreferencesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreferencesPanel: React.FC<PreferencesPanelProps> = ({ isOpen, onClose }) => {
  const { preferences, updatePreference, resetPreferences } = usePreferences();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('appearance');

  const handleResetPreferences = () => {
    if (window.confirm('Are you sure you want to reset all preferences to default?')) {
      resetPreferences();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-50 w-80 bg-card border-l border-border shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  <h2 className="text-lg font-semibold">Preferences</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-border">
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'appearance' ? 'border-b-2 border-primary' : ''}`}
                  onClick={() => setActiveTab('appearance')}
                >
                  Appearance
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'layout' ? 'border-b-2 border-primary' : ''}`}
                  onClick={() => setActiveTab('layout')}
                >
                  Layout
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'dashboard' ? 'border-b-2 border-primary' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Theme</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          className={`flex flex-col items-center justify-center p-3 rounded-md border ${theme === 'light' ? 'border-primary bg-primary/10' : 'border-border'}`}
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="h-5 w-5 mb-1" />
                          <span className="text-xs">Light</span>
                        </button>
                        <button
                          className={`flex flex-col items-center justify-center p-3 rounded-md border ${theme === 'dark' ? 'border-primary bg-primary/10' : 'border-border'}`}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="h-5 w-5 mb-1" />
                          <span className="text-xs">Dark</span>
                        </button>
                        <button
                          className={`flex flex-col items-center justify-center p-3 rounded-md border ${theme === 'system' ? 'border-primary bg-primary/10' : 'border-border'}`}
                          onClick={() => setTheme('system')}
                        >
                          <Monitor className="h-5 w-5 mb-1" />
                          <span className="text-xs">System</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'layout' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Sidebar</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          className={`flex flex-col items-center justify-center p-3 rounded-md border ${!preferences.sidebarCollapsed ? 'border-primary bg-primary/10' : 'border-border'}`}
                          onClick={() => updatePreference('sidebarCollapsed', false)}
                        >
                          <PanelLeft className="h-5 w-5 mb-1" />
                          <span className="text-xs">Expanded</span>
                        </button>
                        <button
                          className={`flex flex-col items-center justify-center p-3 rounded-md border ${preferences.sidebarCollapsed ? 'border-primary bg-primary/10' : 'border-border'}`}
                          onClick={() => updatePreference('sidebarCollapsed', true)}
                        >
                          <PanelLeft className="h-5 w-5 mb-1 transform rotate-180" />
                          <span className="text-xs">Collapsed</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Default Date Range</h3>
                      <div className="space-y-2">
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md ${preferences.dateRangePreset === 'last7Days' ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                          onClick={() => updatePreference('dateRangePreset', 'last7Days')}
                        >
                          Last 7 Days
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md ${preferences.dateRangePreset === 'last30Days' ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                          onClick={() => updatePreference('dateRangePreset', 'last30Days')}
                        >
                          Last 30 Days
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md ${preferences.dateRangePreset === 'last90Days' ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                          onClick={() => updatePreference('dateRangePreset', 'last90Days')}
                        >
                          Last 90 Days
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Default Chart Types</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Time Series Chart</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              className={`text-xs px-3 py-2 rounded-md ${preferences.chartPreferences.timeSeriesChart === 'line' ? 'bg-primary/10 text-primary' : 'border border-border hover:bg-accent'}`}
                              onClick={() => updatePreference('chartPreferences', { ...preferences.chartPreferences, timeSeriesChart: 'line' })}
                            >
                              Line Chart
                            </button>
                            <button
                              className={`text-xs px-3 py-2 rounded-md ${preferences.chartPreferences.timeSeriesChart === 'area' ? 'bg-primary/10 text-primary' : 'border border-border hover:bg-accent'}`}
                              onClick={() => updatePreference('chartPreferences', { ...preferences.chartPreferences, timeSeriesChart: 'area' })}
                            >
                              Area Chart
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Threat Type Chart</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              className={`text-xs px-3 py-2 rounded-md ${preferences.chartPreferences.threatTypeChart === 'bar' ? 'bg-primary/10 text-primary' : 'border border-border hover:bg-accent'}`}
                              onClick={() => updatePreference('chartPreferences', { ...preferences.chartPreferences, threatTypeChart: 'bar' })}
                            >
                              Bar Chart
                            </button>
                            <button
                              className={`text-xs px-3 py-2 rounded-md ${preferences.chartPreferences.threatTypeChart === 'pie' ? 'bg-primary/10 text-primary' : 'border border-border hover:bg-accent'}`}
                              onClick={() => updatePreference('chartPreferences', { ...preferences.chartPreferences, threatTypeChart: 'pie' })}
                            >
                              Pie Chart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-border">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleResetPreferences}
                  leftIcon={<RotateCcw size={14} />}
                >
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PreferencesPanel;
