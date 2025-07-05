'use client';

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
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
    desktop: boolean;
  };
  mapSettings: {
    defaultZoom: number;
    defaultCenter: [number, number];
    showHeatMap: boolean;
    showSensors: boolean;
    showThreatZones: boolean;
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
  },
  notificationSettings: {
    email: true,
    push: true,
    sms: false,
    desktop: true,
  },
  mapSettings: {
    defaultZoom: 10,
    defaultCenter: [29.7604, -95.3698], // Houston, TX
    showHeatMap: true,
    showSensors: true,
    showThreatZones: true,
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
  updateNotificationSetting: (setting: keyof UserPreferences['notificationSettings'], value: boolean) => void;
  updateMapSetting: <K extends keyof UserPreferences['mapSettings']>(
    setting: K,
    value: UserPreferences['mapSettings'][K]
  ) => void;
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
    if (typeof window === 'undefined') {
      return defaultPreferences;
    }
    
    const savedPreferences = localStorage.getItem(STORAGE_KEY);
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        // Merge with defaults to ensure all properties exist
        return { ...defaultPreferences, ...parsed };
      } catch (error) {
        console.error('Failed to parse saved preferences:', error);
        return defaultPreferences;
      }
    }
    return defaultPreferences;
  });

  // Save to localStorage whenever preferences change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
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

  // Update notification setting
  const updateNotificationSetting = (
    setting: keyof UserPreferences['notificationSettings'],
    value: boolean
  ) => {
    setPreferences(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: value
      }
    }));
  };

  // Update map setting
  const updateMapSetting = <K extends keyof UserPreferences['mapSettings']>(
    setting: K,
    value: UserPreferences['mapSettings'][K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      mapSettings: {
        ...prev.mapSettings,
        [setting]: value
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
        updateNotificationSetting,
        updateMapSetting,
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
