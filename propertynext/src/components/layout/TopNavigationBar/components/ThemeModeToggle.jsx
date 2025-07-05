'use client';

import { useLayoutContext } from '@/context/useLayoutContext';
import React, { useState, useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ThemeModeToggle = () => {
  const { theme, changeTheme } = useLayoutContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const isDark = theme === 'dark';

  // Animation effect when toggling theme
  const handleThemeToggle = () => {
    setIsAnimating(true);
    changeTheme(isDark ? 'light' : 'dark');
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="theme-toggle-wrapper">
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="theme-toggle-tooltip">{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Tooltip>}
      >
        <button 
          type="button" 
          onClick={handleThemeToggle} 
          className={`theme-toggle-btn ${isAnimating ? 'animating' : ''} ${isDark ? 'dark-active' : 'light-active'}`}
          aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <div className="toggle-icons">
            <span className="sun-icon">
              <IconifyIcon icon="solar:sun-bold" className="fs-20" />
            </span>
            <span className="moon-icon">
              <IconifyIcon icon="solar:moon-bold" className="fs-20" />
            </span>
          </div>
          <span className="toggle-track"></span>
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default ThemeModeToggle;