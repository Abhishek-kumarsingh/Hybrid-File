// components/DropdownSection.tsx

import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { motion } from "framer-motion";
import GlassmorphicCard from "./ui/design-system/GlassmorphicCard";
import AnimatedBackground from "./ui/design-system/AnimatedBackground";
import ScrollReveal from "./ui/ScrollReveal";


const DropdownButton = ({
  title,
  items,
  selectedKey,
  onSelectionChange,
}: {
  title: string;
  items: { key: string; name: string }[];
  selectedKey: string;
  onSelectionChange: (key: string) => void;
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([selectedKey]));

  const handleSelectionChange = (keys: Set<string>) => {
    const selected = Array.from(keys)[0];
    setSelectedKeys(new Set([selected]));
    onSelectionChange(selected);
  };

  const selectedValue = items.find((item) => item.key === selectedKey)?.name || "Select";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 h-12"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">{title}:</span>
              <span className="text-sm font-semibold truncate">{selectedValue}</span>
            </div>
            <Image
              src="/arrow-down-right.svg"
              alt="down-arrow"
              width={16}
              height={16}
              className="opacity-70"
            />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Selection Menu"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => handleSelectionChange(keys as Set<string>)}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
      >
        {items.length === 0 ? (
          <DropdownItem key="empty" className="text-gray-500 dark:text-gray-400 opacity-70" isDisabled>
            No items available
          </DropdownItem>
        ) : (
          items.map((item) => (
            <DropdownItem
              key={item.key}
              className="text-sm py-2 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-gray-700"
            >
              {item.name}
            </DropdownItem>
          ))
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

const DropdownSection = () => {
  const [regions, setRegions] = useState<{ key: string; name: string }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const [divisions, setDivisions] = useState<{ key: string; name: string }[]>([]);
  const [selectedDivision, setSelectedDivision] = useState("");

  const [parks, setParks] = useState<{ key: string; name: string; url: string }[]>([]);
  const [selectedPark, setSelectedPark] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/parks/regions');
        const data = await response.json();

        if (Array.isArray(data)) {
          setRegions(data.map((region: string) => ({ key: region, name: region })));
        } else if (data.error) {
          console.error('Error fetching regions:', data.error);
          // Handle the error appropriately, e.g., show an error message to the user
        } else {
          console.error('Unexpected data format received:', data);
          // Handle unexpected data format
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
        // Handle network or other errors
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const fetchDivisions = async () => {
        const response = await fetch(`/api/parks/divisions?region=${encodeURIComponent(selectedRegion)}`);
        const data = await response.json();
        setDivisions(data.map((division: string) => ({ key: division, name: division })));
      };

      fetchDivisions();
      setSelectedDivision("");
      setParks([]);
      setSelectedPark("");
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedRegion && selectedDivision) {
      const fetchParks = async () => {
        const response = await fetch(`/api/parks/park?region=${encodeURIComponent(selectedRegion)}&division=${encodeURIComponent(selectedDivision)}`);
        const data = await response.json();
        setParks(data.map((park: any) => ({ key: park.name, name: park.name, url: park.url })));
      };

      fetchParks();
      setSelectedPark("");
    }
  }, [selectedRegion, selectedDivision]);

  const handleParkSelection = (parkKey: string) => {
    console.log("Park selected:", parkKey);
    console.log("Available parks:", parks);
    setSelectedPark(parkKey);
    const selectedPark = parks.find(park => park.key === parkKey);
    console.log("Selected park:", selectedPark);
    if (selectedPark && selectedPark.url) {
      console.log("Attempting to redirect to:", selectedPark.url);
      router.push(`/parks/${selectedPark.url}`);
    } else {
      console.log("No URL found for selected park");
    }
  };

  return (
    <div className="relative">
      {/* 3D Background Effect */}
      <div className="absolute inset-0 bg-mesh opacity-40"></div>

      <ScrollReveal>
        <div className="py-8 px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              Find Your Perfect Park
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Use our interactive park finder to discover parks by region and division.
            </p>
          </motion.div>

          <GlassmorphicCard
            variant="secondary"
            intensity="medium"
            className="p-5 max-w-4xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Selection steps */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedRegion ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                      1
                    </div>
                    <div className={`w-12 h-1 ${selectedRegion ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedDivision ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                      2
                    </div>
                    <div className={`w-12 h-1 ${selectedDivision ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedPark ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                      3
                    </div>
                  </div>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Step 1: Select Region
                    </label>
                    <DropdownButton
                      title="Region"
                      items={regions}
                      selectedKey={selectedRegion}
                      onSelectionChange={setSelectedRegion}
                    />
                    {selectedRegion && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                        {regions.length} regions available
                      </p>
                    )}
                  </div>

                  <div className={selectedRegion ? '' : 'opacity-50 pointer-events-none'}>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Step 2: Select Division
                    </label>
                    <DropdownButton
                      title="Division"
                      items={divisions}
                      selectedKey={selectedDivision}
                      onSelectionChange={setSelectedDivision}
                    />
                    {selectedRegion && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                        {divisions.length} divisions in this region
                      </p>
                    )}
                  </div>

                  <div className={selectedDivision ? '' : 'opacity-50 pointer-events-none'}>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Step 3: Select Park
                    </label>
                    <DropdownButton
                      title="Park"
                      items={parks}
                      selectedKey={selectedPark}
                      onSelectionChange={handleParkSelection}
                    />
                    {selectedDivision && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                        {parks.length} parks in this division
                      </p>
                    )}
                  </div>
                </div>

                {/* Action button */}
                {selectedRegion && selectedDivision && parks.length > 0 && (
                  <motion.div
                    className="flex justify-center mt-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleParkSelection(parks[0].key)}
                      className="btn-secondary px-8 py-3 flex items-center text-base"
                    >
                      <span>Explore Selected Park</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </motion.div>
                )}

                {/* Help text */}
                {!selectedRegion && (
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                    Start by selecting a region to see available divisions and parks
                  </div>
                )}
              </div>
            </div>
          </GlassmorphicCard>

          {/* Quick links */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Popular Regions</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {regions.slice(0, 5).map((region) => (
                <motion.button
                  key={region.key}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-900 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-medium text-blue-700 dark:text-blue-300"
                  onClick={() => setSelectedRegion(region.key)}
                >
                  {region.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* 3D decorative elements */}
          <div className="absolute top-20 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default DropdownSection;
