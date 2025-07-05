"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaThLarge, FaList, FaMapMarked } from "react-icons/fa";
import ParkFeatureCard from "./ParkFeatureCard";
import { Park } from "@/types/types";

interface ParkGridProps {
  parks: (Park & { distance?: number })[];
  isLoading?: boolean;
  emptyMessage?: string;
}

type ViewMode = "grid" | "list" | "map";

export const ParkGrid: React.FC<ParkGridProps> = ({
  parks,
  isLoading = false,
  emptyMessage = "No parks found matching your criteria.",
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Skeleton loader for loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <div className="bg-gray-200 dark:bg-gray-800 h-10 w-32 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-xl h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (parks.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
          <FaMapMarked className="text-gray-400 dark:text-gray-500 text-4xl" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Parks Found</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* View mode toggle */}
      <div className="flex justify-end mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 flex">
          <button
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-green-500 text-white"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <FaThLarge size={16} />
          </button>
          <button
            className={`p-2 rounded ${
              viewMode === "list"
                ? "bg-green-500 text-white"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <FaList size={16} />
          </button>
          <button
            className={`p-2 rounded ${
              viewMode === "map"
                ? "bg-green-500 text-white"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setViewMode("map")}
            aria-label="Map view"
          >
            <FaMapMarked size={16} />
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === "grid" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {parks.map((park, index) => (
            <ParkFeatureCard
              key={park._id || index}
              park={park}
              index={index}
              variant="vertical"
            />
          ))}
        </motion.div>
      )}

      {/* List view */}
      {viewMode === "list" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {parks.map((park, index) => (
            <ParkFeatureCard
              key={park._id || index}
              park={park}
              index={index}
              variant="horizontal"
            />
          ))}
        </motion.div>
      )}

      {/* Map view - Placeholder for now */}
      {viewMode === "map" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl h-[500px] flex items-center justify-center"
        >
          <div className="text-center">
            <FaMapMarked className="text-gray-400 dark:text-gray-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Map View</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Interactive map view is coming soon. You'll be able to see all parks on a map and get directions.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ParkGrid;
