"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { Park } from "@/types/types";

interface ParkCardProps {
  park: Park & { distance?: number };
  index: number;
}

const ParkCard: React.FC<ParkCardProps> = ({ park, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative w-full border-b border-gray-200 dark:border-gray-800 py-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-900/30"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Park Image */}
        <div className="relative w-full md:w-48 h-48 md:h-32 overflow-hidden rounded-lg flex-shrink-0">
          <Image
            src="/images/parkimage.jpg"
            alt={park.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {park.distance && (
            <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              {park.distance.toFixed(2)} km away
            </div>
          )}
        </div>

        {/* Park Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-green-500 transition-colors duration-300">
              {park.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {park.description || "No description available"}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaMapMarkerAlt className="mr-1 text-green-500" />
              <span>{"Delhi, India"}</span>
            </div>

            <Link
              href={`/parks/${park.url}`}
              className="inline-flex items-center"
            >
              <motion.span
                className="text-sm font-medium text-blue-500 hover:text-blue-700 flex items-center"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                View Details
                <FaExternalLinkAlt className="ml-1 h-3 w-3" />
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ShowMoreCard: React.FC<{ href: string }> = ({ href }) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -5 }}
        className="w-full py-8 flex flex-col items-center justify-center text-center border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all duration-300 cursor-pointer"
      >
        <h3 className="text-lg font-semibold text-green-500">Show More</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Click here to view more parks
        </p>
        <motion.div
          className="mt-4 bg-green-100 dark:bg-green-900/20 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ParkCard;
