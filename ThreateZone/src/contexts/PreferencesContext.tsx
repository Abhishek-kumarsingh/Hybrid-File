import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of our preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  dashboardLayout: string[];
  dateRangePreset: string;
  chartPreferences: {
    [key: string]: string;
  };
}

// Default preferences
const defaultPreferences: UserPreferences = {
  theme: 'system',
  sidebarCollapsed: false,
  dashboardLayout: ['threats', 'sensors', 'analytics', 'status'],
  dateRangePreset: 'last7Days',
  chartPreferences: {
    threatChart: 'bar',
    timeSeriesChart: 'line',
  }
};

// Context type
interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  updateChartPreference: (chartId: string, type: string) => void;
  resetPreferences: () => void;
}

// Create the context
const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

// Storage key
const STORAGE_KEY = 'threatzone-preferences';

// Provider component
export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or default
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const savedPreferences = localStorage.getItem(STORAGE_KEY);
    if (savedPreferences) {
      try {
        return JSON.parse(savedPreferences);
      } catch (error) {
        console.error('Failed to parse saved preferences:', error);
        return defaultPreferences;
      }
    }
    return defaultPreferences;
  });

  // Save to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  // Update a specific preference
  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Update a chart preference
  const updateChartPreference = (chartId: string, type: string) => {
    setPreferences(prev => ({
      ...prev,
      chartPreferences: {
        ...prev.chartPreferences,
        [chartId]: type
      }
    }));
  };

  // Reset all preferences to defaults
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreference,
        updateChartPreference,
        resetPreferences
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

// Custom hook to use the preferences context
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
