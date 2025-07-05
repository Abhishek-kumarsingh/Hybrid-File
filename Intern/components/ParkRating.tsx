"use client";

import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Park } from "@/types/types";
import ScrollReveal from "./ui/ScrollReveal";

interface ParkRatingProps {
  park: Park;
  onSubmitRating?: (rating: number, review: string) => void;
  onSubmitFeedback?: (feedback: string, isPositive: boolean) => void;
}

const ParkRating: React.FC<ParkRatingProps> = ({
  park,
  onSubmitRating = () => {},
  onSubmitFeedback = () => {},
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<
    "positive" | "negative" | null
  >(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackTypeChange = (type: "positive" | "negative") => {
    setFeedbackType(type);
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmitRating(rating, review);
      setIsSubmitted(true);
      setShowThankYou(true);

      // Reset form after submission
      setTimeout(() => {
        setRating(0);
        setReview("");
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback && feedbackType) {
      onSubmitFeedback(feedback, feedbackType === "positive");
      setIsSubmitted(true);
      setShowThankYou(true);

      // Reset form after submission
      setTimeout(() => {
        setFeedback("");
        setFeedbackType(null);
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const renderStar = (index: number) => {
    const value = index + 1;
    const displayRating = hoverRating || rating;

    if (displayRating >= value) {
      return <FaStar className="text-yellow-500" />;
    } else if (displayRating >= value - 0.5) {
      return <FaStarHalfAlt className="text-yellow-500" />;
    } else {
      return <FaRegStar className="text-gray-300 dark:text-gray-600" />;
    }
  };

  return (
    <ScrollReveal>
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rating Section */}
          <div className="card-modern p-6">
            <h2 className="text-xl font-semibold mb-4">Rate Your Experience</h2>
            <div className="flex items-center mb-6">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden mr-4">
                <Image
                  src="/images/parkimage.jpg"
                  alt={park.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-lg">{park.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {"Delhi, India"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitRating}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Rating
                </label>
                <div className="flex gap-1 text-2xl">
                  {[...Array(5)].map((_, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRatingChange(index + 1)}
                      onMouseEnter={() => handleMouseEnter(index + 1)}
                      onMouseLeave={handleMouseLeave}
                      className="focus:outline-none"
                    >
                      {renderStar(index)}
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm mt-1 text-muted-foreground">
                    You rated this park {rating} out of 5 stars
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="review"
                  className="block text-sm font-medium mb-2"
                >
                  Your Review (Optional)
                </label>
                <textarea
                  id="review"
                  rows={4}
                  value={review}
                  onChange={handleReviewChange}
                  placeholder="Share your experience at this park..."
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/50 bg-background"
                />
              </div>

              <button
                type="submit"
                disabled={rating === 0 || isSubmitted}
                className={`btn-primary w-full ${
                  rating === 0 || isSubmitted
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitted ? "Submitting..." : "Submit Rating"}
              </button>
            </form>
          </div>

          {/* Feedback Section */}
          <div className="card-modern p-6">
            <h2 className="text-xl font-semibold mb-4">Share Your Feedback</h2>
            <p className="text-muted-foreground mb-6">
              Help us improve {park.name} by sharing your suggestions or
              reporting issues.
            </p>

            <form onSubmit={handleSubmitFeedback}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Feedback Type
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleFeedbackTypeChange("positive")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                      feedbackType === "positive"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                        : "bg-muted hover:bg-muted/80 border border-border"
                    }`}
                  >
                    <FaThumbsUp />
                    <span>Suggestion</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedbackTypeChange("negative")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                      feedbackType === "negative"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                        : "bg-muted hover:bg-muted/80 border border-border"
                    }`}
                  >
                    <FaThumbsDown />
                    <span>Issue</span>
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium mb-2"
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  value={feedback}
                  onChange={handleFeedbackChange}
                  placeholder={
                    feedbackType === "positive"
                      ? "Share your suggestions for improving this park..."
                      : feedbackType === "negative"
                        ? "Report any issues or problems you encountered..."
                        : "Select a feedback type above..."
                  }
                  disabled={!feedbackType}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/50 bg-background disabled:bg-muted disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={!feedback || !feedbackType || isSubmitted}
                className={`btn-primary w-full ${
                  !feedback || !feedbackType || isSubmitted
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitted ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>

        {/* Thank You Message */}
        <AnimatePresence>
          {showThankYou && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-md"
            >
              <h3 className="font-semibold text-lg mb-1">Thank You!</h3>
              <p>Your feedback helps us improve our parks and services.</p>
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-2 right-2 text-white/80 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
};

export default ParkRating;
