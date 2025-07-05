"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Card3DProps {
  title: string;
  description?: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  intensity?: number;
  border?: boolean;
  shadow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  title,
  description,
  image,
  className,
  children,
  intensity = 10,
  border = true,
  shadow = true,
  gradient = true,
  onClick,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate rotation values (adjust divisor for more/less rotation)
    const rotateY = (mouseX / (width / 2)) * intensity;
    const rotateX = -((mouseY / (height / 2)) * intensity);
    
    setRotateX(rotateX);
    setRotateY(rotateY);
    setMouseX(mouseX);
    setMouseY(mouseY);
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };

  // Highlight effect follows mouse
  const highlightTransform = {
    translateX: mouseX * 0.15,
    translateY: mouseY * 0.15,
    opacity: Math.min(Math.abs(mouseX) + Math.abs(mouseY), 200) / 200,
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl p-6 transition-all duration-200 ease-out",
        border && "border border-white/10 dark:border-white/5",
        shadow && "shadow-xl",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-aos="fade-up"
    >
      {/* Card content */}
      <div className="relative z-10 transform-style-3d" style={{ transform: "translateZ(50px)" }}>
        {image && (
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500"
            />
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>}
        {children}
      </div>

      {/* Gradient highlight effect */}
      {gradient && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 dark:from-green-500/10 dark:to-blue-500/10 rounded-xl opacity-0"
          animate={{
            translateX: highlightTransform.translateX,
            translateY: highlightTransform.translateY,
            opacity: highlightTransform.opacity,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
    </motion.div>
  );
};

export default Card3D;
