"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown, FaTimes, FaCommentAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ModernText from "./ModernText";

interface UserFeedbackProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  triggerLabel?: string;
  showOnLoad?: boolean;
  delay?: number;
  onSubmit?: (data: FeedbackData) => void;
  onClose?: () => void;
}

export interface FeedbackData {
  type: 'usability' | 'feature' | 'bug' | 'suggestion' | 'general';
  rating?: number;
  message: string;
  page: string;
  userAgent?: string;
  email?: string;
  name?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

const UserFeedback: React.FC<UserFeedbackProps> = ({
  position = "bottom-right",
  triggerLabel = "Feedback",
  showOnLoad = false,
  delay = 5000, // 5 seconds
  onSubmit,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackData["type"]>("general");
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const pathname = usePathname();

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  // Show feedback form after delay if showOnLoad is true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showOnLoad) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [showOnLoad, delay]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setError(null);
    if (onClose) onClose();
  };

  const handleReset = () => {
    setFeedbackType("general");
    setRating(0);
    setMessage("");
    setEmail("");
    setName("");
    setIsSubmitted(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message) {
      setError("Please provide feedback message");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const feedbackData: FeedbackData = {
        type: feedbackType,
        rating: rating > 0 ? rating : undefined,
        message,
        page: pathname,
        userAgent: navigator.userAgent,
        email: email || undefined,
        name: name || undefined,
      };
      
      // Call API to submit feedback
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      setIsSubmitted(true);
      
      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit(feedbackData);
      }
      
      // Reset form after 3 seconds
      setTimeout(() => {
        handleReset();
      }, 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Feedback button */}
      <button
        onClick={handleOpen}
        className={`fixed ${positionClasses[position]} z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-all`}
        aria-label="Open feedback form"
      >
        <FaCommentAlt />
        <span>{triggerLabel}</span>
      </button>

      {/* Feedback modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-background rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-primary/10 p-4 flex justify-between items-center">
                <ModernText as="h2" size="xl" weight="semibold">
                  {isSubmitted ? "Thank You!" : "Share Your Feedback"}
                </ModernText>
                <button
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close feedback form"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSubmitted ? (
                  <div className="text-center py-6">
                    <div className="text-green-500 text-5xl mb-4">
                      <FaThumbsUp className="mx-auto" />
                    </div>
                    <ModernText as="h3" size="lg" weight="medium" className="mb-2">
                      Feedback Submitted Successfully
                    </ModernText>
                    <ModernText as="p" color="muted" className="mb-6">
                      Thank you for helping us improve our application!
                    </ModernText>
                    <button
                      onClick={handleClose}
                      className="btn-primary w-full"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Feedback Type */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Feedback Type
                      </label>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <button
                          type="button"
                          onClick={() => setFeedbackType("usability")}
                          className={`p-2 rounded-md text-center text-sm ${
                            feedbackType === "usability"
                              ? "bg-primary/20 border-primary/50 border"
                              : "bg-muted border border-border"
                          }`}
                        >
                          Usability
                        </button>
                        <button
                          type="button"
                          onClick={() => setFeedbackType("feature")}
                          className={`p-2 rounded-md text-center text-sm ${
                            feedbackType === "feature"
                              ? "bg-primary/20 border-primary/50 border"
                              : "bg-muted border border-border"
                          }`}
                        >
                          Feature Request
                        </button>
                        <button
                          type="button"
                          onClick={() => setFeedbackType("bug")}
                          className={`p-2 rounded-md text-center text-sm ${
                            feedbackType === "bug"
                              ? "bg-primary/20 border-primary/50 border"
                              : "bg-muted border border-border"
                          }`}
                        >
                          Bug Report
                        </button>
                        <button
                          type="button"
                          onClick={() => setFeedbackType("suggestion")}
                          className={`p-2 rounded-md text-center text-sm ${
                            feedbackType === "suggestion"
                              ? "bg-primary/20 border-primary/50 border"
                              : "bg-muted border border-border"
                          }`}
                        >
                          Suggestion
                        </button>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Rating (Optional)
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setRating(value)}
                            className="text-2xl focus:outline-none"
                          >
                            {value <= rating ? (
                              <FaStar className="text-yellow-500" />
                            ) : (
                              <FaRegStar className="text-gray-300" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Feedback Message */}
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Feedback
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please share your thoughts, suggestions, or report issues..."
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                        rows={4}
                        required
                      />
                    </div>

                    {/* Contact Information (Optional) */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name (Optional)
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-800 rounded-md">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserFeedback;
