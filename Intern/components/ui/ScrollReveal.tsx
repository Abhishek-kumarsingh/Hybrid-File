"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
  distance = 50,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px 0px" });
  const controls = useAnimation();

  // Set initial animation states based on direction
  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      case "none":
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  // Set animation target states based on direction
  const getTargetState = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      case "none":
        return { opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getTargetState());
    } else if (!once) {
      controls.start(getInitialState());
    }
  }, [isInView, controls, once, direction, distance]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
