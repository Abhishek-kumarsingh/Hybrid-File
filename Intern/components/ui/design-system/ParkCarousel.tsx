"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Park } from "@/types/types";

interface ParkCarouselProps {
  parks: Park[];
  autoplay?: boolean;
  interval?: number;
}

export const ParkCarousel: React.FC<ParkCarouselProps> = ({
  parks,
  autoplay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === parks.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex === 0 ? parks.length - 1 : prevIndex - 1;
    });
  };

  useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setTimeout(() => {
        paginate(1);
      }, interval);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, autoplay, interval]);

  if (!parks.length) {
    return null;
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10" />

      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        onClick={() => paginate(-1)}
      >
        <FaChevronLeft />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        onClick={() => paginate(1)}
      >
        <FaChevronRight />
      </button>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {parks.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      {/* Carousel slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/parkimage.jpg"
              alt={parks[currentIndex].name}
              fill
              className="object-cover"
              priority
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
              <div className="max-w-3xl">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-green-400 mr-2" />
                  <span className="text-white/90 text-sm">
                    {"Delhi, India"}
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-white mb-4">
                  {parks[currentIndex].name}
                </h2>

                <p className="text-white/80 mb-6 line-clamp-2">
                  {parks[currentIndex].description ||
                    "Experience the natural beauty of this park with scenic views and recreational facilities."}
                </p>

                <div className="flex space-x-4">
                  <Link href={`/parks/${parks[currentIndex].url}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                    >
                      Explore Park
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    View Gallery
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ParkCarousel;
