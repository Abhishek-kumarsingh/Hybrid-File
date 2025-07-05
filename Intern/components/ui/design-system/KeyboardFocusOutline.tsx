"use client";

import React, { useEffect } from "react";

/**
 * Component that adds a class to the body when the user is navigating with the keyboard.
 * This allows us to show focus outlines only when the user is navigating with the keyboard.
 */
export const KeyboardFocusOutline: React.FC = () => {
  useEffect(() => {
    // Function to handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
      }
    };

    // Function to handle mouse navigation
    const handleMouseDown = () => {
      document.body.classList.remove("keyboard-navigation");
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    // Add the CSS to the document
    const style = document.createElement("style");
    style.innerHTML = `
      /* Hide focus outlines by default */
      :focus {
        outline: none;
      }
      
      /* Show focus outlines when using keyboard navigation */
      .keyboard-navigation :focus {
        outline: 2px solid #006838;
        outline-offset: 2px;
      }
      
      /* Ensure focus is visible on interactive elements */
      .keyboard-navigation button:focus,
      .keyboard-navigation a:focus,
      .keyboard-navigation input:focus,
      .keyboard-navigation select:focus,
      .keyboard-navigation textarea:focus {
        outline: 2px solid #006838;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(0, 104, 56, 0.2);
      }
    `;
    document.head.appendChild(style);

    // Clean up event listeners
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default KeyboardFocusOutline;
