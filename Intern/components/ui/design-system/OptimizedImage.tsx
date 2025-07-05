"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide";
  loading?: "eager" | "lazy";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  quality?: number;
  animation?: 
    | "fade" 
    | "zoom" 
    | "slide-up" 
    | "slide-down" 
    | "slide-left" 
    | "slide-right" 
    | "none";
  placeholder?: "blur" | "empty" | "shimmer";
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  containerClassName,
  aspectRatio = "auto",
  loading = "lazy",
  objectFit = "cover",
  quality = 85,
  animation = "fade",
  placeholder = "shimmer",
  onClick,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [placeholderColor, setPlaceholderColor] = useState("#f3f4f6");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "100px" });
  const controls = useAnimation();
  
  // Generate a random placeholder color on mount
  useEffect(() => {
    const colors = [
      "#f3f4f6", // gray-100
      "#e5e7eb", // gray-200
      "#f1f5f9", // slate-100
      "#e6f7ff", // light blue
      "#f0fdf4", // light green
    ];
    setPlaceholderColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);
  
  // Start animation when in view
  useEffect(() => {
    if (isInView && animation !== "none") {
      controls.start("visible");
    }
  }, [isInView, controls, animation]);
  
  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Handle image error
  const handleImageError = () => {
    setIsError(true);
    if (onError) onError();
  };
  
  // Define aspect ratio classes
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/9]",
  };
  
  // Define animation variants
  const animationVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.5 }
      }
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5 }
      }
    },
    "slide-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
      }
    },
    "slide-down": {
      hidden: { opacity: 0, y: -20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
      }
    },
    "slide-left": {
      hidden: { opacity: 0, x: 20 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.5 }
      }
    },
    "slide-right": {
      hidden: { opacity: 0, x: -20 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.5 }
      }
    },
    none: {
      hidden: { opacity: 1 },
      visible: { opacity: 1 }
    }
  };
  
  // Determine container classes
  const containerClasses = cn(
    "relative overflow-hidden",
    aspectRatioClasses[aspectRatio],
    containerClassName
  );
  
  // Determine image classes
  const imageClasses = cn(
    "transition-opacity duration-300",
    objectFit === "cover" && "object-cover",
    objectFit === "contain" && "object-contain",
    objectFit === "fill" && "object-fill",
    objectFit === "none" && "object-none",
    objectFit === "scale-down" && "object-scale-down",
    !isLoaded && "opacity-0",
    isLoaded && "opacity-100",
    className
  );
  
  // Render placeholder
  const renderPlaceholder = () => {
    if (isLoaded) return null;
    
    if (placeholder === "shimmer") {
      return (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
          style={{ 
            backgroundSize: "200% 100%",
            backgroundColor: placeholderColor 
          }}
        />
      );
    }
    
    if (placeholder === "blur") {
      return (
        <div 
          className="absolute inset-0 backdrop-blur-sm" 
          style={{ backgroundColor: `${placeholderColor}80` }}
        />
      );
    }
    
    return (
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: placeholderColor }}
      />
    );
  };
  
  // Render error state
  if (isError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
          containerClasses
        )}
        style={{ width: width || "100%", height: height }}
        ref={containerRef}
      >
        <div className="text-center p-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 mx-auto mb-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={containerClasses}
      style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
      initial="hidden"
      animate={controls}
      variants={animationVariants[animation]}
      onClick={onClick}
    >
      {renderPlaceholder()}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        loading={loading}
        quality={quality}
        className={imageClasses}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </motion.div>
  );
};

export default OptimizedImage;
