"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import UserFeedback, { FeedbackData } from "@/components/ui/design-system/UserFeedback";

interface UserTestingContextType {
  isTestingActive: boolean;
  startTesting: (options?: UserTestingOptions) => void;
  stopTesting: () => void;
  collectMetric: (name: string, value: any) => void;
  metrics: Record<string, any[]>;
  sessionId: string | null;
}

interface UserTestingOptions {
  showFeedbackForm?: boolean;
  collectClicks?: boolean;
  collectPageViews?: boolean;
  collectTimeOnPage?: boolean;
  feedbackDelay?: number;
  sessionDuration?: number; // in minutes
}

interface UserTestingProviderProps {
  children: ReactNode;
}

// Create context with default values
const UserTestingContext = createContext<UserTestingContextType>({
  isTestingActive: false,
  startTesting: () => {},
  stopTesting: () => {},
  collectMetric: () => {},
  metrics: {},
  sessionId: null,
});

// Hook to use the context
export const useUserTesting = () => useContext(UserTestingContext);

// Generate a unique session ID
const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const UserTestingProvider: React.FC<UserTestingProviderProps> = ({ children }) => {
  const [isTestingActive, setIsTestingActive] = useState<boolean>(false);
  const [options, setOptions] = useState<UserTestingOptions>({
    showFeedbackForm: true,
    collectClicks: true,
    collectPageViews: true,
    collectTimeOnPage: true,
    feedbackDelay: 60000, // 1 minute
    sessionDuration: 30, // 30 minutes
  });
  const [metrics, setMetrics] = useState<Record<string, any[]>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [lastPageViewTime, setLastPageViewTime] = useState<number | null>(null);
  
  const pathname = usePathname();

  // Start a testing session
  const startTesting = (newOptions?: UserTestingOptions) => {
    const mergedOptions = { ...options, ...newOptions };
    setOptions(mergedOptions);
    setIsTestingActive(true);
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setSessionStartTime(Date.now());
    setMetrics({});
    
    // Set session timeout
    if (mergedOptions.sessionDuration) {
      setTimeout(() => {
        stopTesting();
      }, mergedOptions.sessionDuration * 60 * 1000);
    }
    
    // Store session start in localStorage
    localStorage.setItem('userTestingSession', JSON.stringify({
      sessionId: newSessionId,
      startTime: Date.now(),
      options: mergedOptions,
    }));
  };

  // Stop the testing session
  const stopTesting = () => {
    if (isTestingActive) {
      // Calculate final time on page if tracking
      if (options.collectTimeOnPage && lastPageViewTime) {
        collectMetric('timeOnPage', {
          page: pathname,
          duration: Date.now() - lastPageViewTime,
          endTime: new Date().toISOString(),
        });
      }
      
      // Submit all collected metrics
      submitMetrics();
      
      // Reset state
      setIsTestingActive(false);
      setSessionId(null);
      setSessionStartTime(null);
      setLastPageViewTime(null);
      
      // Clear from localStorage
      localStorage.removeItem('userTestingSession');
    }
  };

  // Collect a metric
  const collectMetric = (name: string, value: any) => {
    if (isTestingActive) {
      setMetrics(prev => ({
        ...prev,
        [name]: [...(prev[name] || []), {
          ...value,
          timestamp: new Date().toISOString(),
          sessionId,
        }],
      }));
    }
  };

  // Submit all collected metrics to the server
  const submitMetrics = async () => {
    if (!sessionId || Object.keys(metrics).length === 0) return;
    
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'usability',
          message: 'User testing session metrics',
          page: 'Session metrics',
          metadata: {
            metrics,
            sessionId,
            sessionDuration: sessionStartTime ? (Date.now() - sessionStartTime) / 1000 : null,
          },
        }),
      });
    } catch (error) {
      console.error('Failed to submit metrics:', error);
    }
  };

  // Track page views
  useEffect(() => {
    if (isTestingActive && options.collectPageViews) {
      // If we were tracking time on a previous page, record the duration
      if (options.collectTimeOnPage && lastPageViewTime) {
        collectMetric('timeOnPage', {
          page: pathname,
          duration: Date.now() - lastPageViewTime,
        });
      }
      
      // Record this page view
      collectMetric('pageView', { page: pathname });
      
      // Start tracking time on this page
      if (options.collectTimeOnPage) {
        setLastPageViewTime(Date.now());
      }
    }
  }, [pathname, isTestingActive]);

  // Track clicks if enabled
  useEffect(() => {
    if (!isTestingActive || !options.collectClicks) return;
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      const className = target.className;
      const id = target.id;
      const text = target.textContent?.trim().substring(0, 50);
      
      collectMetric('click', {
        page: pathname,
        element: {
          tagName,
          className,
          id,
          text,
        },
        position: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isTestingActive, options.collectClicks, pathname]);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('userTestingSession');
    if (savedSession) {
      try {
        const { sessionId: savedId, startTime, options: savedOptions } = JSON.parse(savedSession);
        
        // Check if session is still valid (within duration)
        const elapsedMinutes = (Date.now() - startTime) / (60 * 1000);
        if (savedOptions.sessionDuration && elapsedMinutes < savedOptions.sessionDuration) {
          setSessionId(savedId);
          setSessionStartTime(startTime);
          setOptions(savedOptions);
          setIsTestingActive(true);
        } else {
          // Session expired
          localStorage.removeItem('userTestingSession');
        }
      } catch (error) {
        console.error('Error restoring testing session:', error);
        localStorage.removeItem('userTestingSession');
      }
    }
  }, []);

  return (
    <UserTestingContext.Provider
      value={{
        isTestingActive,
        startTesting,
        stopTesting,
        collectMetric,
        metrics,
        sessionId,
      }}
    >
      {children}
      {isTestingActive && options.showFeedbackForm && (
        <UserFeedback
          showOnLoad={true}
          delay={options.feedbackDelay}
          position="bottom-right"
          triggerLabel="Share Feedback"
        />
      )}
    </UserTestingContext.Provider>
  );
};

export default UserTestingProvider;
