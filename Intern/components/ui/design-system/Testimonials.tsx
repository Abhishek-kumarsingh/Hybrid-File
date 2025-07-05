"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ModernText from "./ModernText";
import { FaQuoteLeft, FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Testimonial {
  id: string | number;
  name: string;
  role?: string;
  avatar?: string;
  content: string;
  rating?: number;
  date?: string;
}

interface TestimonialsProps {
  items: Testimonial[];
  className?: string;
  variant?: "carousel" | "grid" | "masonry";
  autoplay?: boolean;
  autoplayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  items,
  className,
  variant = "carousel",
  autoplay = true,
  autoplayInterval = 5000,
  showControls = true,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle next/prev navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };
  
  // Handle indicator click
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Setup autoplay
  useEffect(() => {
    if (autoplay && !isHovered && variant === "carousel") {
      autoplayRef.current = setInterval(handleNext, autoplayInterval);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplayInterval, isHovered, variant, items.length]);
  
  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={cn(
          "inline-block",
          index < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        )}
      />
    ));
  };
  
  // Render based on variant
  if (variant === "grid") {
    return (
      <div 
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          className
        )}
        data-aos="fade-up"
      >
        {items.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    );
  }
  
  if (variant === "masonry") {
    // Split items into columns for masonry layout
    const columns = [
      items.filter((_, i) => i % 3 === 0),
      items.filter((_, i) => i % 3 === 1),
      items.filter((_, i) => i % 3 === 2),
    ];
    
    return (
      <div 
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          className
        )}
        data-aos="fade-up"
      >
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {column.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index + colIndex}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  // Default: Carousel variant
  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos="fade-up"
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <TestimonialCard
              testimonial={items[currentIndex]}
              index={currentIndex}
              featured
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation controls */}
        {showControls && items.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md"
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
      
      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-green-500 w-6"
                  : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  featured?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
  featured = false,
}) => {
  // Determine card classes based on featured status
  const cardClasses = cn(
    "relative p-6 md:p-8 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700",
    featured ? "md:p-10" : ""
  );
  
  return (
    <div 
      className={cardClasses}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Quote icon */}
      <div className="absolute top-6 left-6 text-green-200 dark:text-green-900 opacity-50">
        <FaQuoteLeft size={24} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mb-6">
        {testimonial.rating && (
          <div className="mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={cn(
                  "inline-block mr-1",
                  i < testimonial.rating! 
                    ? "text-yellow-400" 
                    : "text-gray-300 dark:text-gray-600"
                )}
                size={featured ? 20 : 16}
              />
            ))}
          </div>
        )}
        
        <ModernText 
          as="p" 
          size={featured ? "lg" : "base"} 
          className="italic"
        >
          "{testimonial.content}"
        </ModernText>
      </div>
      
      {/* Author info */}
      <div className="flex items-center mt-6">
        {testimonial.avatar ? (
          <div className="mr-4 w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="mr-4 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
        )}
        
        <div>
          <ModernText as="h4" size="lg" weight="bold">
            {testimonial.name}
          </ModernText>
          {testimonial.role && (
            <ModernText as="p" size="sm" color="muted">
              {testimonial.role}
            </ModernText>
          )}
        </div>
        
        {testimonial.date && (
          <div className="ml-auto">
            <ModernText as="span" size="xs" color="muted">
              {testimonial.date}
            </ModernText>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
