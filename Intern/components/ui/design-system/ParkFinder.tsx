"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaSearch, FaFilter, FaTree, FaLeaf, FaWater, FaChild, FaAccessibleIcon, FaParking } from "react-icons/fa";
import ModernText from "./ModernText";

interface Park {
  id: number;
  name: string;
  address: string;
  district: string;
  type: string;
  facilities: string[];
  image: string;
  distance?: number; // in km
}

interface ParkFinderProps {
  initialParks?: Park[];
  useLocation?: boolean;
  className?: string;
}

export const ParkFinder: React.FC<ParkFinderProps> = ({
  initialParks = [],
  useLocation = true,
  className = "",
}) => {
  const [parks, setParks] = useState<Park[]>(initialParks);
  const [filteredParks, setFilteredParks] = useState<Park[]>(initialParks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Sample data for filters
  const districts = ["All", "Central Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi"];
  const parkTypes = ["All", "National Park", "State Park", "City Park", "Neighborhood Park", "Pocket Park"];
  const facilities = [
    { name: "Walking Trails", icon: <FaTree /> },
    { name: "Playground", icon: <FaChild /> },
    { name: "Water Features", icon: <FaWater /> },
    { name: "Accessible Paths", icon: <FaAccessibleIcon /> },
    { name: "Parking", icon: <FaParking /> },
    { name: "Gardens", icon: <FaLeaf /> },
  ];

  // Sample parks data if none provided
  const sampleParks: Park[] = [
    {
      id: 1,
      name: "Central Park",
      address: "Connaught Place, New Delhi",
      district: "Central Delhi",
      type: "City Park",
      facilities: ["Walking Trails", "Gardens", "Playground"],
      image: "/images/image1.jpg",
    },
    {
      id: 2,
      name: "Deer Park",
      address: "Hauz Khas, New Delhi",
      district: "South Delhi",
      type: "National Park",
      facilities: ["Walking Trails", "Water Features", "Parking"],
      image: "/images/image2.jpg",
    },
    {
      id: 3,
      name: "Nehru Park",
      address: "Chanakyapuri, New Delhi",
      district: "South Delhi",
      type: "City Park",
      facilities: ["Walking Trails", "Gardens", "Accessible Paths"],
      image: "/images/image3.jpg",
    },
    {
      id: 4,
      name: "District Park",
      address: "Pitampura, New Delhi",
      district: "North Delhi",
      type: "District Park",
      facilities: ["Playground", "Walking Trails", "Parking"],
      image: "/images/image1.jpg",
    },
  ];

  // Initialize with sample data if no parks provided
  useEffect(() => {
    if (initialParks.length === 0) {
      setParks(sampleParks);
      setFilteredParks(sampleParks);
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Get user location if enabled
    if (useLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [initialParks, useLocation]);

  // Calculate distances if user location is available
  useEffect(() => {
    if (userLocation) {
      // In a real app, you would calculate actual distances
      // Here we're just assigning random distances for demonstration
      const parksWithDistance = parks.map(park => ({
        ...park,
        distance: Math.random() * 10, // Random distance between 0-10 km
      }));
      
      setParks(parksWithDistance);
      applyFilters(parksWithDistance);
    }
  }, [userLocation]);

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters(parks);
  }, [searchQuery, selectedDistrict, selectedType, selectedFacilities]);

  // Filter function
  const applyFilters = (parksToFilter: Park[]) => {
    let result = [...parksToFilter];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(park => 
        park.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        park.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply district filter
    if (selectedDistrict !== "All") {
      result = result.filter(park => park.district === selectedDistrict);
    }
    
    // Apply type filter
    if (selectedType !== "All") {
      result = result.filter(park => park.type === selectedType);
    }
    
    // Apply facilities filter
    if (selectedFacilities.length > 0) {
      result = result.filter(park => 
        selectedFacilities.every(facility => park.facilities.includes(facility))
      );
    }
    
    // Sort by distance if available
    if (userLocation) {
      result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    
    setFilteredParks(result);
  };

  // Toggle facility selection
  const toggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  // Render facility icon
  const renderFacilityIcon = (facilityName: string) => {
    const facility = facilities.find(f => f.name === facilityName);
    return facility ? facility.icon : <FaLeaf />;
  };

  return (
    <div className={`w-full ${className}`} data-aos="fade-up">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search parks by name or address..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* District Filter */}
          <div className="flex items-center">
            <select
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          
          {/* Park Type Filter */}
          <div className="flex items-center">
            <select
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {parkTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Facilities Filter */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex items-center mr-2">
            <FaFilter className="mr-1 text-gray-500" />
            <ModernText as="span" size="sm" color="muted">
              Facilities:
            </ModernText>
          </div>
          {facilities.map(facility => (
            <button
              key={facility.name}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                selectedFacilities.includes(facility.name)
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => toggleFacility(facility.name)}
            >
              {facility.icon}
              <span>{facility.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Results */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
          <ModernText as="p" size="lg" color="muted">
            Finding parks near you...
          </ModernText>
        </div>
      ) : filteredParks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="text-5xl mb-4">🌳</div>
          <ModernText as="h3" size="xl" weight="medium" color="muted">
            No parks found matching your criteria
          </ModernText>
          <ModernText as="p" className="mt-2">
            Try adjusting your filters or search query
          </ModernText>
          <button
            className="mt-6 py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            onClick={() => {
              setSearchQuery("");
              setSelectedDistrict("All");
              setSelectedType("All");
              setSelectedFacilities([]);
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <AnimatePresence>
          {viewMode === 'grid' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredParks.map((park) => (
                <motion.div
                  key={park.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img src={park.image} alt={park.name} className="w-full h-full object-cover" />
                    {park.distance && (
                      <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                        {park.distance.toFixed(1)} km
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <ModernText as="h3" size="xl" weight="bold" className="mb-1">
                      {park.name}
                    </ModernText>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                      <FaMapMarkerAlt className="mr-1" />
                      <ModernText as="span" size="sm">
                        {park.address}
                      </ModernText>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 rounded-full text-xs">
                        {park.district}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 rounded-full text-xs">
                        {park.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {park.facilities.map(facility => (
                        <span
                          key={facility}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                        >
                          {renderFacilityIcon(facility)}
                          <span>{facility}</span>
                        </span>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                      <FaMapMarkerAlt />
                      <span>View Details</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredParks.map((park) => (
                <motion.div
                  key={park.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full md:w-1/4 h-48 md:h-auto">
                    <img src={park.image} alt={park.name} className="w-full h-full object-cover" />
                    {park.distance && (
                      <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                        {park.distance.toFixed(1)} km
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <ModernText as="h3" size="xl" weight="bold" className="mb-1">
                          {park.name}
                        </ModernText>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                          <FaMapMarkerAlt className="mr-1" />
                          <ModernText as="span" size="sm">
                            {park.address}
                          </ModernText>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3 md:mb-0">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 rounded-full text-xs">
                          {park.district}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 rounded-full text-xs">
                          {park.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {park.facilities.map(facility => (
                        <span
                          key={facility}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                        >
                          {renderFacilityIcon(facility)}
                          <span>{facility}</span>
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2">
                        <FaMapMarkerAlt />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ParkFinder;
