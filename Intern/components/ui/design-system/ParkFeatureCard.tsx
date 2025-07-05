"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaDirections,
  FaRegHeart,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { Park } from "@/types/types";

interface ParkFeatureCardProps {
  park: Park & { distance?: number };
  index: number;
  variant?: "horizontal" | "vertical" | "featured";
}

export const ParkFeatureCard: React.FC<ParkFeatureCardProps> = ({
  park,
  index,
  variant = "horizontal",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mouse position for lighting effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Dynamic styles based on variant
  const containerStyles = {
    horizontal: "flex flex-col md:flex-row gap-3 h-full",
    vertical: "flex flex-col h-full",
    featured: "flex flex-col h-full",
  };

  const imageStyles = {
    horizontal:
      "w-full md:w-2/5 h-40 md:h-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden",
    vertical: "w-full aspect-[4/3] rounded-t-xl overflow-hidden",
    featured: "w-full aspect-[16/9] rounded-t-xl overflow-hidden",
  };

  const contentStyles = {
    horizontal: "flex-1 p-3 flex flex-col justify-between",
    vertical: "flex-1 p-3 flex flex-col justify-between",
    featured: "flex-1 p-4 flex flex-col justify-between",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative group overflow-hidden rounded-xl bg-card border border-border
        shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300
        ${variant === "featured" ? "md:col-span-2" : ""}
      `}
      style={
        {
          backgroundImage:
            "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.08), transparent 250px)",
          "--mouse-x": useMotionTemplate`${mouseX}px`,
          "--mouse-y": useMotionTemplate`${mouseY}px`,
        } as React.CSSProperties
      }
    >
      {/* Enhanced hover effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      <div className={containerStyles[variant]}>
        {/* Park Image with enhanced hover effect */}
        <div className={`relative ${imageStyles[variant]}`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
          <Image
            src="/images/parkimage.jpg"
            alt={park.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Distance badge with improved styling */}
          {park.distance && (
            <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center z-20 shadow-sm">
              <FaMapMarkerAlt className="mr-1.5" size={10} />
              <span>{park.distance.toFixed(2)} km</span>
            </div>
          )}

          {/* Favorite button with improved interaction */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 bg-white/40 dark:bg-black/40 backdrop-blur-sm p-2 rounded-full hover:bg-white/60 dark:hover:bg-black/60 transition-colors z-20 shadow-sm"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={16} />
            ) : (
              <FaRegHeart className="text-white" size={16} />
            )}
          </motion.button>
        </div>

        {/* Content with improved typography and spacing */}
        <div className={contentStyles[variant]}>
          <div>
            {/* Rating with improved styling */}
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${i < 4 ? "text-yellow-400" : "text-gray-300"} mr-1`}
                  size={14}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">4.0</span>
            </div>

            {/* Title with improved hover effect */}
            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {park.name}
            </h3>

            {/* Description with better contrast */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {park.description ||
                "Experience the natural beauty of this park with scenic views and recreational facilities."}
            </p>
          </div>

          {/* Actions with improved styling and interactions */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground flex items-center">
              <FaMapMarkerAlt className="mr-1.5 text-primary" size={12} />
              <span className="line-clamp-1">{"Delhi, India"}</span>
            </div>

            <div className="flex gap-2">
              <Link href={`/parks/${park.url}`}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-primary/90 text-white text-xs px-3 py-2 rounded-md transition-all flex items-center shadow-sm hover:shadow"
                >
                  View Details
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary hover:bg-secondary/90 text-white text-xs px-3 py-2 rounded-md transition-all flex items-center shadow-sm hover:shadow"
              >
                <FaDirections className="mr-1.5" size={12} />
                Directions
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParkFeatureCard;
