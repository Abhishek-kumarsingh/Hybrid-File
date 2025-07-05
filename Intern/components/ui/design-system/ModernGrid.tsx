"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModernGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4 | 6;
    lg?: 1 | 2 | 3 | 4 | 6 | 12;
  };
  gap?: "none" | "sm" | "md" | "lg";
  animationEffect?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom-in"
    | "zoom-out";
  animationDelay?: number;
  staggered?: boolean;
}

export const ModernGrid: React.FC<ModernGridProps> = ({
  children,
  className,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = "md",
  animationEffect = "fade-up",
  animationDelay = 0,
  staggered = true,
}) => {
  // Define column classes
  const getColumnClass = () => {
    const smCols = columns.sm ? `grid-cols-${columns.sm}` : "grid-cols-1";
    const mdCols = columns.md ? `md:grid-cols-${columns.md}` : "";
    const lgCols = columns.lg ? `lg:grid-cols-${columns.lg}` : "";

    return `${smCols} ${mdCols} ${lgCols}`;
  };

  // Define gap classes
  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-8",
  };

  // Apply AOS attributes to children if staggered
  const childrenWithAOS = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && staggered) {
      return React.cloneElement(child, {
        // Use a type assertion to avoid TypeScript errors
        ...(animationEffect ? { "data-aos": animationEffect } : {}),
        ...(animationDelay !== undefined ? { "data-aos-delay": (animationDelay + index * 100) } : {}),
      } as React.HTMLAttributes<HTMLElement>);
    }
    return child;
  });

  return (
    <div
      className={cn(
        "grid",
        getColumnClass(),
        gapClasses[gap],
        "grid-auto-rows-fr", // Make all rows the same height
        className
      )}
      data-aos={!staggered ? animationEffect : undefined}
      data-aos-delay={!staggered ? animationDelay * 100 : undefined}
    >
      {staggered ? childrenWithAOS : children}
    </div>
  );
};

export default ModernGrid;
