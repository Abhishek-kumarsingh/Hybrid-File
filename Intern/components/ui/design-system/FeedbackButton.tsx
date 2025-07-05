"use client";

import React, { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import UserFeedback from "./UserFeedback";

interface FeedbackButtonProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  label?: string;
  className?: string;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  position = "bottom-right",
  label = "Feedback",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={`fixed ${positionClasses[position]} z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-all ${className}`}
        aria-label="Open feedback form"
      >
        <FaCommentAlt />
        <span>{label}</span>
      </button>

      {isOpen && (
        <UserFeedback
          position={position}
          triggerLabel={label}
          showOnLoad={true}
          delay={0}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default FeedbackButton;
