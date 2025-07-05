"use client";

import React, { useState } from "react";
import { useUserTesting } from "@/context/UserTestingProvider";
import ModernText from "./ModernText";
import { FaPlay, FaStop, FaUserCheck, FaClipboardList, FaClock, FaComments } from "react-icons/fa";

interface UserTestingControlsProps {
  className?: string;
}

const UserTestingControls: React.FC<UserTestingControlsProps> = ({ className }) => {
  const { isTestingActive, startTesting, stopTesting, sessionId } = useUserTesting();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [options, setOptions] = useState({
    showFeedbackForm: true,
    collectClicks: true,
    collectPageViews: true,
    collectTimeOnPage: true,
    feedbackDelay: 60, // in seconds
    sessionDuration: 30, // in minutes
  });

  const handleOptionChange = (option: string, value: boolean | number) => {
    setOptions(prev => ({
      ...prev,
      [option]: value,
    }));
  };

  const handleStartTesting = () => {
    startTesting({
      ...options,
      feedbackDelay: options.feedbackDelay * 1000, // convert to milliseconds
    });
    setShowOptions(false);
  };

  return (
    <div className={`border border-border rounded-lg p-4 bg-card ${className}`}>
      <ModernText as="h3" size="lg" weight="semibold" className="mb-4">
        User Testing Controls
      </ModernText>

      {isTestingActive ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <ModernText as="span" weight="medium">
              Testing Session Active
            </ModernText>
          </div>
          
          <ModernText as="p" size="sm" color="muted" className="mb-4">
            Session ID: {sessionId}
          </ModernText>
          
          <button
            onClick={stopTesting}
            className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-md hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors"
          >
            <FaStop />
            <span>End Testing Session</span>
          </button>
        </div>
      ) : (
        <div>
          {showOptions ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <FaUserCheck />
                    <span>Show Feedback Form</span>
                  </label>
                  <input
                    type="checkbox"
                    checked={options.showFeedbackForm}
                    onChange={(e) => handleOptionChange('showFeedbackForm', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <FaClipboardList />
                    <span>Collect Clicks</span>
                  </label>
                  <input
                    type="checkbox"
                    checked={options.collectClicks}
                    onChange={(e) => handleOptionChange('collectClicks', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <FaClipboardList />
                    <span>Collect Page Views</span>
                  </label>
                  <input
                    type="checkbox"
                    checked={options.collectPageViews}
                    onChange={(e) => handleOptionChange('collectPageViews', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <FaClock />
                    <span>Track Time on Page</span>
                  </label>
                  <input
                    type="checkbox"
                    checked={options.collectTimeOnPage}
                    onChange={(e) => handleOptionChange('collectTimeOnPage', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="flex items-center gap-2 text-sm mb-1">
                    <FaComments />
                    <span>Feedback Form Delay (seconds)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={options.feedbackDelay}
                    onChange={(e) => handleOptionChange('feedbackDelay', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1 border border-border rounded-md bg-background"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm mb-1">
                    <FaClock />
                    <span>Session Duration (minutes)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={options.sessionDuration}
                    onChange={(e) => handleOptionChange('sessionDuration', parseInt(e.target.value) || 30)}
                    className="w-full px-3 py-1 border border-border rounded-md bg-background"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleStartTesting}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800/30 transition-colors"
                >
                  <FaPlay />
                  <span>Start Testing</span>
                </button>
                
                <button
                  onClick={() => setShowOptions(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-muted px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowOptions(true)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <FaPlay />
              <span>Configure User Testing</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserTestingControls;
