"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ModernTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "muted" | "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  align?: "left" | "center" | "right";
  className?: string;
  animationDelay?: number;
  gradient?: boolean;
  highlight?: boolean;
}

export const ModernText: React.FC<ModernTextProps> = ({
  children,
  as = "p",
  size = "base",
  weight = "normal",
  color = "default",
  align = "left",
  className,
  animationDelay = 0,
  gradient = false,
  highlight = false,
}) => {
  // Define size classes
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  };

  // Define weight classes
  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  // Define color classes with improved contrast
  const colorClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary dark:text-primary/90",
    secondary: "text-secondary dark:text-secondary/90",
    accent: "text-accent dark:text-accent/90",
    success: "text-green-600 dark:text-green-400",
    warning: "text-amber-600 dark:text-amber-400",
    error: "text-red-600 dark:text-red-400",
  };

  // Define alignment classes
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Define gradient class with improved colors
  const gradientClass = gradient
    ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400"
    : "";

  // Define highlight class
  const highlightClass = highlight
    ? "relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-3 after:bg-accent/20 after:-z-10 after:rounded-sm"
    : "";

  // Combine all classes
  const combinedClasses = cn(
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    gradientClass,
    highlightClass,
    className
  );

  // Create the component based on the 'as' prop
  const Component = as;

  return (
    <Component
      data-aos="fade-up"
      data-aos-delay={animationDelay * 100}
      className={combinedClasses}
    >
      {children}
    </Component>
  );
};

export default ModernText;
