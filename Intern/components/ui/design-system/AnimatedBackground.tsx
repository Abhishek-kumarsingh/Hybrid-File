"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  variant?: "green" | "blue" | "orange";
  density?: "low" | "medium" | "high";
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = "green",
  density = "medium",
  speed = "medium",
  className,
}) => {
  // Define color variants
  const colorVariants = {
    green: {
      primary: "rgba(34, 197, 94, 0.15)",
      secondary: "rgba(16, 185, 129, 0.1)",
      accent: "rgba(5, 150, 105, 0.05)",
    },
    blue: {
      primary: "rgba(59, 130, 246, 0.15)",
      secondary: "rgba(37, 99, 235, 0.1)",
      accent: "rgba(29, 78, 216, 0.05)",
    },
    orange: {
      primary: "rgba(249, 115, 22, 0.15)",
      secondary: "rgba(234, 88, 12, 0.1)",
      accent: "rgba(194, 65, 12, 0.05)",
    },
  };

  // Define density levels
  const densityLevels = {
    low: 15,
    medium: 25,
    high: 40,
  };

  // Define speed levels
  const speedLevels = {
    slow: { min: 15, max: 25 },
    medium: { min: 10, max: 20 },
    fast: { min: 5, max: 15 },
  };

  // Generate random shapes
  const shapes = Array.from({ length: densityLevels[density] }).map((_, i) => {
    const isCircle = Math.random() > 0.5;
    const size = Math.floor(Math.random() * 80) + 20; // 20-100px
    const xPos = Math.random() * 100; // 0-100%
    const yPos = Math.random() * 100; // 0-100%
    const duration = Math.random() * (speedLevels[speed].max - speedLevels[speed].min) + speedLevels[speed].min;
    const delay = Math.random() * 5;
    const color = Math.random() > 0.7
      ? colorVariants[variant].primary
      : Math.random() > 0.5
        ? colorVariants[variant].secondary
        : colorVariants[variant].accent;

    return {
      id: i,
      isCircle,
      size,
      xPos,
      yPos,
      duration,
      delay,
      color,
    };
  });

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.isCircle ? 'rounded-full' : 'rounded-xl'}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.xPos}%`,
            top: `${shape.yPos}%`,
            backgroundColor: shape.color,
            filter: "blur(8px)",
            opacity: 0.7,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 180 - 90, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-gray-900/80 dark:to-gray-900"></div>
    </div>
  );
};

export default AnimatedBackground;
