"use client";

import React from "react";
import { cn } from "@/lib/utils";
import ModernText from "./ModernText";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  titleSize?: "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  subtitleSize?: "sm" | "base" | "lg" | "xl";
  titleColor?: "default" | "muted" | "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  subtitleColor?: "default" | "muted" | "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  gradient?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animationEffect?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "none";
  animationDelay?: number;
  id?: string;
}

/**
 * A consistent section heading component that ensures all headings are bold and centered
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = "center",
  titleSize = "3xl",
  subtitleSize = "lg",
  titleColor = "default",
  subtitleColor = "muted",
  gradient = false,
  className,
  titleClassName,
  subtitleClassName,
  animationEffect = "fade-up",
  animationDelay = 0,
  id,
}) => {
  // Determine alignment classes
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={cn(
        alignmentClasses[align],
        "mb-10 md:mb-12 mx-auto", // Increased spacing and centered
        className
      )}
      id={id}
      data-aos={animationEffect}
      data-aos-delay={animationDelay * 100}
    >
      <ModernText
        as="h2"
        size={titleSize}
        weight="bold"
        color={titleColor}
        gradient={gradient}
        className={cn(
          "mb-3", // Increased spacing between title and subtitle
          "tracking-tight", // Tighter letter spacing for headings
          titleClassName
        )}
        animationDelay={animationDelay + 0.5}
      >
        {title}
      </ModernText>

      {subtitle && (
        <ModernText
          as="p"
          size={subtitleSize}
          color={subtitleColor}
          className={cn(
            "max-w-2xl mx-auto", // Slightly narrower for better readability
            "leading-relaxed", // Improved line height for readability
            subtitleClassName
          )}
          animationDelay={animationDelay + 1}
        >
          {subtitle}
        </ModernText>
      )}
    </div>
  );
};

export default SectionHeading;
