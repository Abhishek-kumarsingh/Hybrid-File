"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import ModernText from "./ModernText";

interface TimelineItem {
  id: string | number;
  date: string;
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  category?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  alternating?: boolean;
  connected?: boolean;
  animated?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className,
  alternating = true,
  connected = true,
  animated = true,
}) => {
  const [activeItem, setActiveItem] = useState<string | number | null>(null);
  
  // Handle item click
  const handleItemClick = (id: string | number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className={cn("relative w-full py-8", className)} data-aos="fade-up">
      {/* Timeline connector line */}
      {connected && (
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-300 via-blue-300 to-green-300 dark:from-green-800 dark:via-blue-800 dark:to-green-800 transform md:translate-x-[-0.5px]"></div>
      )}
      
      {/* Timeline items */}
      <div className="relative">
        {items.map((item, index) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            index={index}
            isActive={activeItem === item.id}
            onClick={() => handleItemClick(item.id)}
            position={alternating ? (index % 2 === 0 ? "left" : "right") : "left"}
            animated={animated}
          />
        ))}
      </div>
    </div>
  );
};

interface TimelineItemComponentProps {
  item: TimelineItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
  position: "left" | "right";
  animated: boolean;
}

const TimelineItemComponent: React.FC<TimelineItemComponentProps> = ({
  item,
  index,
  isActive,
  onClick,
  position,
  animated,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView && animated) {
      controls.start("visible");
    }
  }, [isInView, controls, animated]);
  
  // Animation variants
  const variants = {
    hidden: { 
      opacity: 0, 
      x: position === "left" ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.2,
        ease: "easeOut" 
      } 
    }
  };
  
  // Determine layout classes based on position
  const containerClasses = cn(
    "relative flex items-center mb-12 md:mb-16",
    position === "left" ? "md:flex-row" : "md:flex-row-reverse"
  );
  
  const contentClasses = cn(
    "relative z-10 w-full md:w-[calc(50%-2rem)] p-6 rounded-xl transition-all duration-300",
    "bg-white dark:bg-gray-800 shadow-md hover:shadow-lg",
    "border border-gray-100 dark:border-gray-700",
    isActive && "ring-2 ring-green-500 dark:ring-green-400 transform scale-[1.02]"
  );
  
  // Determine connector classes
  const connectorClasses = cn(
    "absolute z-20 w-8 h-8 rounded-full flex items-center justify-center",
    "border-4 border-white dark:border-gray-800",
    "bg-green-500 dark:bg-green-600",
    "left-0 md:left-1/2 transform translate-x-0 md:-translate-x-1/2"
  );

  return (
    <motion.div
      ref={ref}
      className={containerClasses}
      initial={animated ? "hidden" : "visible"}
      animate={controls}
      variants={variants}
      data-aos={animated ? "fade-up" : undefined}
      data-aos-delay={index * 100}
    >
      {/* Timeline connector dot */}
      <div className={connectorClasses}>
        {item.icon || (
          <span className="text-white text-xs font-bold">{index + 1}</span>
        )}
      </div>
      
      {/* Content card */}
      <div 
        className={contentClasses}
        onClick={onClick}
      >
        {/* Date badge */}
        <div className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
          {item.date}
        </div>
        
        {/* Category badge (if provided) */}
        {item.category && (
          <div className="inline-block px-3 py-1 mb-3 ml-2 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            {item.category}
          </div>
        )}
        
        {/* Title and description */}
        <ModernText as="h3" size="xl" weight="bold" className="mb-2">
          {item.title}
        </ModernText>
        
        <ModernText as="p" color="muted" className="mb-4">
          {item.description}
        </ModernText>
        
        {/* Image (if provided) */}
        {item.image && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        
        {/* Expand/collapse indicator */}
        <div className="mt-4 flex justify-end">
          <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
            {isActive ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
