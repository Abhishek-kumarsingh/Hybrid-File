"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ModernText from "./ModernText";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "accent" | "white";
  text?: string;
  textSize?: "xs" | "sm" | "base" | "lg";
  variant?: "spinner" | "dots" | "pulse" | "progress" | "skeleton";
  className?: string;
  fullScreen?: boolean;
  transparent?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "primary",
  text,
  textSize = "base",
  variant = "spinner",
  className,
  fullScreen = false,
  transparent = false,
}) => {
  // Size classes
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };
  
  // Color classes
  const colorClasses = {
    primary: "text-green-600 dark:text-green-400",
    secondary: "text-blue-600 dark:text-blue-400",
    accent: "text-amber-600 dark:text-amber-400",
    white: "text-white",
  };
  
  // Text size classes
  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };
  
  // Container classes
  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    fullScreen && "fixed inset-0 z-50",
    !transparent && fullScreen && "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
    className
  );
  
  // Render spinner variant
  const renderSpinner = () => {
    if (variant === "spinner") {
      return (
        <div className={cn("relative", sizeClasses[size])}>
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full border-2 border-t-transparent",
              colorClasses[color]
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    }
    
    if (variant === "dots") {
      return (
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={cn(
                "rounded-full",
                colorClasses[color],
                size === "sm" && "w-2 h-2",
                size === "md" && "w-3 h-3",
                size === "lg" && "w-4 h-4",
                size === "xl" && "w-5 h-5"
              )}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      );
    }
    
    if (variant === "pulse") {
      return (
        <motion.div
          className={cn(
            "rounded-full",
            colorClasses[color],
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      );
    }
    
    if (variant === "progress") {
      return (
        <div className={cn(
          "relative w-full max-w-xs h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        )}>
          <motion.div
            className={cn(
              "absolute top-0 left-0 h-full rounded-full",
              color === "primary" && "bg-green-600 dark:bg-green-500",
              color === "secondary" && "bg-blue-600 dark:bg-blue-500",
              color === "accent" && "bg-amber-600 dark:bg-amber-500",
              color === "white" && "bg-white"
            )}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      );
    }
    
    if (variant === "skeleton") {
      return (
        <div className="space-y-3 w-full max-w-sm">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-4/6 animate-pulse" />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={containerClasses}>
      {renderSpinner()}
      
      {text && (
        <ModernText
          as="p"
          size={textSize}
          color="muted"
          className="mt-4"
        >
          {text}
        </ModernText>
      )}
    </div>
  );
};

export default LoadingSpinner;
