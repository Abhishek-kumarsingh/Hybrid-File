import React, { useState, useEffect } from "react";
import { Park } from "@/types/types";
import ScrollReveal from "./ui/ScrollReveal";
import ParkGrid from "./ui/design-system/ParkGrid";
import ParkFilter from "./ui/design-system/ParkFilter";
import GlassmorphicCard from "./ui/design-system/GlassmorphicCard";
import AnimatedBackground from "./ui/design-system/AnimatedBackground";
import { motion } from "framer-motion";

interface NearbyProps {
  parks: Park[];
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const NearbyParks = ({ parks }: NearbyProps) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLocation = () => {
      const storedLocation = sessionStorage.getItem('location');
      if (storedLocation) {
        setUserLocation(JSON.parse(storedLocation));
        setIsLoading(false);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            sessionStorage.setItem('location', JSON.stringify(newLocation));
            setUserLocation(newLocation);
            setIsLoading(false);
          },
          (error) => {
            console.error("Error getting location:", error);
            setIsLoading(false);
          }
        );
      }
    };

    checkLocation();

    const intervalId = setInterval(checkLocation, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <p>Loading......</p>;
  }

  if (!userLocation) {
    return <p>Please enable location services to see nearby parks.</p>;
  }

  const { lat, lng } = userLocation;

  const parksWithDistance = parks.map(park => {
    const distance = haversineDistance(lat, lng, parseFloat(park.latitude), parseFloat(park.longitude));
    return { ...park, distance };
  });

  const sortedParks = parksWithDistance.sort((a, b) => a.distance - b.distance);
  const displayedParks = sortedParks.slice(0, 3);

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Improved background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/50 dark:from-background/10 dark:to-background/70"></div>

      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
              Discover Nearby Parks
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Explore beautiful parks and green spaces near your current location.
            </p>
          </motion.div>

          <div className="mb-8">
            <ParkFilter />
          </div>

          {!userLocation ? (
            <GlassmorphicCard
              variant="primary"
              className="p-5 text-center max-w-2xl mx-auto"
              animate={{
                boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 20px rgba(34,197,94,0.3)", "0px 0px 0px rgba(0,0,0,0)"],
              }}
              transition={{
                repeat: Infinity,
                duration: 2
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Share Your Location</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                To show you the closest parks to your current location, we need permission to access your location data.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigator.geolocation.getCurrentPosition(() => {})}
                className="btn-primary px-6 py-3 text-base font-semibold"
              >
                Enable Location Services
              </motion.button>
            </GlassmorphicCard>
          ) : (
            <div className="space-y-6">
              <ParkGrid
                parks={displayedParks}
                isLoading={isLoading}
                emptyMessage="We couldn't find any parks near your current location. Try adjusting your filters or search criteria."
              />

              {displayedParks.length > 0 && (
                <div className="flex justify-center mt-6">
                  <motion.a
                    href="/parks"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary inline-flex items-center px-6 py-3 text-base font-semibold"
                  >
                    <span>View All Parks</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </div>
              )}
            </div>
          )}

        </ScrollReveal>
      </div>
    </section>
  );
};

export default NearbyParks;