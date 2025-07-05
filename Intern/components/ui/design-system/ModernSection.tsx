"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

interface ModernSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  withPattern?: boolean;
  withGradient?: boolean;
  withOverlay?: boolean;
  paddingY?: "none" | "sm" | "md" | "lg" | "xl";
  animationEffect?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom-in"
    | "zoom-out"
    | "flip-up"
    | "flip-down";
  animationDelay?: number;
  title?: string;
  subtitle?: string;
  titleGradient?: boolean;
  headingClassName?: string;
}

export const ModernSection: React.FC<ModernSectionProps> = ({
  children,
  className,
  id,
  fullWidth = false,
  withPattern = false,
  withGradient = false,
  withOverlay = false,
  paddingY = "lg",
  animationEffect = "fade-up",
  animationDelay = 0,
  title,
  subtitle,
  titleGradient = false,
  headingClassName,
}) => {
  // Define padding classes with improved spacing
  const paddingClasses = {
    none: "",
    sm: "py-6",
    md: "py-10",
    lg: "py-16",
    xl: "py-24",
  };

  // Container class with improved spacing
  const containerClass = fullWidth ? "w-full" : "container-responsive";

  // Pattern class
  const patternClass = withPattern ? "bg-grid-pattern" : "";

  // Gradient class with improved colors
  const gradientClass = withGradient
    ? "bg-gradient-to-br from-blue-50/80 to-green-50/80 dark:from-blue-900/20 dark:to-green-900/20"
    : "";

  // Overlay class with improved contrast
  const overlayClass = withOverlay
    ? "relative after:absolute after:inset-0 after:bg-black/5 dark:after:bg-black/30 after:z-0"
    : "";

  return (
    <section
      id={id}
      data-aos={animationEffect}
      data-aos-delay={animationDelay * 100}
      className={cn(
        "relative overflow-hidden",
        paddingClasses[paddingY],
        patternClass,
        gradientClass,
        overlayClass,
        className
      )}
    >
      <div className={containerClass}>
        <div className="relative z-10">
          {title && (
            <SectionHeading
              title={title}
              subtitle={subtitle}
              gradient={titleGradient}
              className={headingClassName}
              animationEffect="fade"
              animationDelay={animationDelay + 0.2}
            />
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default ModernSection;
