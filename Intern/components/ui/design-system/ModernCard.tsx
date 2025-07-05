"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ModernCardProps {
  title: string;
  description?: string | ReactNode;
  image?: string;
  icon?: ReactNode;
  link?: string;
  variant?: "primary" | "secondary" | "accent" | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
  animationDelay?: number;
  children?: ReactNode;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  title,
  description,
  image,
  icon,
  link,
  variant = "primary",
  size = "md",
  className,
  animationDelay = 0,
  children,
}) => {
  // Define variant classes with improved contrast
  const variantClasses = {
    primary: "bg-gradient-to-br from-green-50/90 to-green-100/80 dark:from-green-900/30 dark:to-green-800/20 border-green-200 dark:border-green-800/40",
    secondary: "bg-gradient-to-br from-blue-50/90 to-blue-100/80 dark:from-blue-900/30 dark:to-blue-800/20 border-blue-200 dark:border-blue-800/40",
    accent: "bg-gradient-to-br from-amber-50/90 to-amber-100/80 dark:from-amber-900/30 dark:to-amber-800/20 border-amber-200 dark:border-amber-800/40",
    neutral: "bg-gradient-to-br from-gray-50/90 to-gray-100/80 dark:from-gray-800/30 dark:to-gray-900/20 border-gray-200 dark:border-gray-700/40",
  };

  // Define size classes
  const sizeClasses = {
    sm: "p-4 rounded-lg",
    md: "p-5 rounded-xl",
    lg: "p-6 rounded-2xl",
  };

  // Card content with improved accessibility
  const cardContent = (
    <div
      data-aos="fade-up"
      data-aos-delay={animationDelay * 100}
      className={cn(
        "relative overflow-hidden border backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2", // Improved focus styles
        "transform hover:-translate-y-1 h-full", // Subtle hover effect and fixed height
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      tabIndex={link ? -1 : 0} // Make non-linked cards focusable
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>

      {/* Image */}
      {image && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-white/20 dark:bg-black/20">
          {icon}
        </div>
      )}

      {/* Content with improved text contrast */}
      <div className="relative z-10 flex-grow">
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground text-center">{title}</h3>
        {description && (
          typeof description === 'string' ? (
            <p className="mb-4 text-sm text-muted-foreground text-center">
              {description}
            </p>
          ) : (
            <div className="mb-4 text-sm text-muted-foreground text-center">
              {description}
            </div>
          )
        )}
        {children}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/10 to-transparent group-hover:opacity-100 pointer-events-none"></div>
    </div>
  );

  // Wrap with link if provided, with improved accessibility
  if (link) {
    return (
      <Link
        href={link}
        className="group block focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-xl h-full"
        aria-label={`View details about ${title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default ModernCard;
