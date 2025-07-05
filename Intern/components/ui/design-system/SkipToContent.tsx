"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkipToContentProps {
  contentId?: string;
  className?: string;
  text?: string;
}

export const SkipToContent: React.FC<SkipToContentProps> = ({
  contentId = "main-content",
  className,
  text = "Skip to main content",
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Find the main content element
    const mainContent = document.getElementById(contentId);
    
    if (mainContent) {
      // Set focus to the main content
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      
      // Scroll to the main content
      mainContent.scrollIntoView();
      
      // Remove tabindex after focus to prevent keyboard navigation issues
      setTimeout(() => {
        mainContent.removeAttribute("tabindex");
      }, 1000);
    }
  };

  return (
    <a
      href={`#${contentId}`}
      onClick={handleClick}
      className={cn(
        "fixed top-0 left-0 z-[200] p-3 bg-green-600 text-white transform -translate-y-full focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
        className
      )}
    >
      {text}
    </a>
  );
};

export default SkipToContent;
