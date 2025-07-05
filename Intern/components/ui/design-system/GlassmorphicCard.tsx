"use client";

import React, { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps extends MotionProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "neutral";
  intensity?: "low" | "medium" | "high";
  hoverEffect?: boolean;
  clickEffect?: boolean;
  borderGlow?: boolean;
  className?: string;
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  variant = "primary",
  intensity = "medium",
  hoverEffect = true,
  clickEffect = false,
  borderGlow = false,
  className,
  ...props
}) => {
  // Define color variants
  const variantClasses = {
    primary:
      "from-green-500/20 to-emerald-500/10 border-green-500/20 dark:from-green-500/10 dark:to-emerald-500/5",
    secondary:
      "from-blue-500/20 to-indigo-500/10 border-blue-500/20 dark:from-blue-500/10 dark:to-indigo-500/5",
    accent:
      "from-orange-500/20 to-amber-500/10 border-orange-500/20 dark:from-orange-500/10 dark:to-amber-500/5",
    neutral:
      "from-gray-200/40 to-gray-100/30 border-gray-200/40 dark:from-gray-700/20 dark:to-gray-800/10",
  };

  // Define intensity levels
  const intensityClasses = {
    low: "backdrop-blur-sm bg-opacity-30 dark:bg-opacity-10",
    medium: "backdrop-blur-md bg-opacity-50 dark:bg-opacity-20",
    high: "backdrop-blur-lg bg-opacity-70 dark:bg-opacity-30",
  };

  // Define hover effects
  const hoverClasses = hoverEffect
    ? "hover:shadow-lg hover:scale-[1.02] hover:bg-opacity-60 dark:hover:bg-opacity-40 transition-all duration-300"
    : "";

  // Define click effects
  const clickClasses = clickEffect
    ? "active:scale-[0.98] active:shadow-inner transition-all duration-150"
    : "";

  // Define border glow
  const glowClasses = borderGlow
    ? `after:absolute after:inset-0 after:rounded-xl after:border after:border-${
        variant === "primary"
          ? "green"
          : variant === "secondary"
            ? "blue"
            : variant === "accent"
              ? "orange"
              : "gray"
      }-500/40 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300`
    : "";

  return (
    <motion.div
      className={cn(
        "relative rounded-xl border bg-gradient-to-br p-4 shadow-sm backdrop-blur-md",
        variantClasses[variant],
        intensityClasses[intensity],
        hoverClasses,
        clickClasses,
        glowClasses,
        className
      )}
      {...props}
    >
      {/* Add subtle 3D effect with pseudo-elements */}
      <div className="absolute inset-0 rounded-xl bg-white/5 dark:bg-black/5 opacity-30 transform -skew-x-12 -skew-y-1"></div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent"></div>

      {/* Content with relative positioning to appear above the effects */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassmorphicCard;
