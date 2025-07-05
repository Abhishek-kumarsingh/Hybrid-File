import React, { useEffect } from 'react';

const ThemeToggleButton = () => {
    // Function to update the theme on the HTML element
    const updateThemeOnHtmlEl = () => {
        // Always set to light mode
        document.documentElement.setAttribute('data-theme', 'light');
    };

    // On initial render, force light mode
    useEffect(() => {
        // Set localStorage to light mode
        localStorage.setItem('theme', 'light');
        // Apply light mode
        updateThemeOnHtmlEl();
    }, []);

    // Handle button click - does nothing but keeps the button functional
    const handleThemeToggle = () => {
        // If somehow in dark mode, switch to light mode
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        // Otherwise do nothing - always stay in light mode
    };

    return (
        <button
            type="button"
            data-theme-toggle
            className="w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
            onClick={handleThemeToggle}
            title="Light Mode Only"
        >
            Toggle Theme
        </button>
    );
};

export default ThemeToggleButton;
