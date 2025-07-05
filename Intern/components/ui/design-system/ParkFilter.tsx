"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaMapMarkerAlt, FaTree, FaWater, FaChild, FaDog, FaAccessibleIcon } from "react-icons/fa";
import GlassmorphicCard from "./GlassmorphicCard";

interface FilterOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ParkFilterProps {
  onFilterChange?: (filters: string[]) => void;
  onSearchChange?: (search: string) => void;
  className?: string;
}

export const ParkFilter: React.FC<ParkFilterProps> = ({
  onFilterChange,
  onSearchChange,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions: FilterOption[] = [
    { id: "nearby", label: "Nearby", icon: <FaMapMarkerAlt /> },
    { id: "hiking", label: "Hiking Trails", icon: <FaTree /> },
    { id: "water", label: "Water Features", icon: <FaWater /> },
    { id: "playground", label: "Playground", icon: <FaChild /> },
    { id: "dog-friendly", label: "Dog Friendly", icon: <FaDog /> },
    { id: "accessible", label: "Accessible", icon: <FaAccessibleIcon /> },
  ];

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId];
      
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      
      return newFilters;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <GlassmorphicCard 
      variant="neutral" 
      intensity="low"
      className={`w-full ${className}`}
    >
      <div className="flex flex-col">
        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full p-3 pl-10 text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Search for parks, features, or locations..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-700 p-1.5 rounded-md flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FaFilter size={12} />
            <span className="hidden sm:inline">Filters</span>
            {selectedFilters.length > 0 && (
              <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {selectedFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Expandable filter options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                      selectedFilters.includes(option.id)
                        ? "bg-green-500 text-white"
                        : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => handleFilterToggle(option.id)}
                  >
                    <div className="text-lg mb-1">{option.icon}</div>
                    <span className="text-xs font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              
              {selectedFilters.length > 0 && (
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedFilters.length} filter{selectedFilters.length !== 1 ? "s" : ""} applied
                  </span>
                  <button
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                    onClick={() => {
                      setSelectedFilters([]);
                      if (onFilterChange) {
                        onFilterChange([]);
                      }
                    }}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassmorphicCard>
  );
};

export default ParkFilter;
