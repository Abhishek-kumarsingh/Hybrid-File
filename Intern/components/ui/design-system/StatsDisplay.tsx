"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import ModernText from "./ModernText";

interface StatItem {
  id: string | number;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "accent" | "success" | "info" | "warning";
}

interface StatsDisplayProps {
  items: StatItem[];
  className?: string;
  layout?: "grid" | "flex";
  columns?: 1 | 2 | 3 | 4;
  animated?: boolean;
  countUp?: boolean;
  countDuration?: number;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  items,
  className,
  layout = "grid",
  columns = 4,
  animated = true,
  countUp = true,
  countDuration = 2000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px 0px" });
  
  // Determine layout classes
  const containerClasses = cn(
    layout === "grid" 
      ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6` 
      : "flex flex-wrap justify-center gap-6",
    className
  );

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      data-aos={animated ? "fade-up" : undefined}
    >
      {items.map((item, index) => (
        <StatItemComponent
          key={item.id}
          item={item}
          index={index}
          isInView={isInView}
          countUp={countUp}
          countDuration={countDuration}
          animated={animated}
        />
      ))}
    </div>
  );
};

interface StatItemComponentProps {
  item: StatItem;
  index: number;
  isInView: boolean;
  countUp: boolean;
  countDuration: number;
  animated: boolean;
}

const StatItemComponent: React.FC<StatItemComponentProps> = ({
  item,
  index,
  isInView,
  countUp,
  countDuration,
  animated,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();
  
  // Color variants
  const colorVariants = {
    primary: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    secondary: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    accent: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    success: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    info: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
    warning: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  };
  
  // Get color class based on item color
  const colorClass = item.color ? colorVariants[item.color] : colorVariants.primary;
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" 
      } 
    }
  };
  
  // Count up animation
  useEffect(() => {
    if (isInView && countUp) {
      const startTime = Date.now();
      const startValue = 0;
      const endValue = item.value;
      
      const updateValue = () => {
        const now = Date.now();
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / countDuration, 1);
        
        // Easing function for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };
      
      requestAnimationFrame(updateValue);
    }
  }, [isInView, countUp, item.value, countDuration]);
  
  // Start animation when in view
  useEffect(() => {
    if (isInView && animated) {
      controls.start("visible");
    }
  }, [isInView, controls, animated]);

  return (
    <motion.div
      className="relative p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
      initial={animated ? "hidden" : "visible"}
      animate={controls}
      variants={variants}
    >
      {/* Icon */}
      {item.icon && (
        <div className={cn("p-3 rounded-full mb-4", colorClass)}>
          {item.icon}
        </div>
      )}
      
      {/* Value */}
      <div className="flex items-baseline mb-2">
        {item.prefix && (
          <ModernText as="span" size="3xl" weight="bold" className="mr-1">
            {item.prefix}
          </ModernText>
        )}
        <ModernText as="span" size="4xl" weight="bold" className="tabular-nums">
          {countUp && isInView ? displayValue : item.value}
        </ModernText>
        {item.suffix && (
          <ModernText as="span" size="3xl" weight="bold" className="ml-1">
            {item.suffix}
          </ModernText>
        )}
      </div>
      
      {/* Label */}
      <ModernText as="p" size="lg" color="muted">
        {item.label}
      </ModernText>
    </motion.div>
  );
};

export default StatsDisplay;
