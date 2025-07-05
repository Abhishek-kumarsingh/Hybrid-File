"use client";

import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: "typewriter" | "fade" | "bounce" | "wave" | "gradient";
  color?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  repeatDelay = 0,
  animation = "fade",
  color,
  as: Component = "p",
}) => {
  const controls = useAnimation();
  const words = text.split(" ");

  // Define animation variants
  const typewriterVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1 },
    }),
  };

  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5 },
    }),
  };

  const bounceVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    }),
  };

  const waveVariants: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: [0, -10, 0],
      transition: {
        delay: i * 0.05,
        times: [0, 0.5, 1],
        duration: 0.6,
      },
    }),
  };

  // Select the appropriate variant based on animation type
  const getVariant = () => {
    switch (animation) {
      case "typewriter":
        return typewriterVariants;
      case "bounce":
        return bounceVariants;
      case "wave":
        return waveVariants;
      case "fade":
      default:
        return fadeVariants;
    }
  };

  // Start animation
  useEffect(() => {
    const startAnimation = async () => {
      await controls.start("visible");
      if (!once && repeatDelay > 0) {
        setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    startAnimation();
  }, [controls, once, repeatDelay, text]);

  // Gradient text effect
  const gradientTextClass = animation === "gradient"
    ? "bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 animate-gradient"
    : "";

  return (
    <Component
      className={cn(
        "inline-block",
        gradientTextClass,
        color && `text-${color}`,
        className
      )}
      data-aos="fade-up"
    >
      {animation === "gradient" ? (
        text
      ) : (
        words.map((word, i) => (
          <span key={i} className="inline-block whitespace-nowrap mr-1">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${i}-${charIndex}`}
                custom={i + (charIndex / 100)}
                variants={getVariant()}
                initial="hidden"
                animate={controls}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))
      )}
    </Component>
  );
};

export default AnimatedText;
