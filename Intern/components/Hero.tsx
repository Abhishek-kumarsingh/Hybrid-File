// Hero.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Spotlight } from "./ui/Spotlight";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Hero: React.FC = () => {
  // Define your media for the slider
  const media: { type: "image" | "video"; src: string }[] = [
    { type: "image", src: "/images/image1.jpg" },
    { type: "image", src: "/images/image2.jpg" },
    { type: "video", src: "/images/v1.mp4" },
    { type: "image", src: "/images/image3.jpg" },
    // Add more media objects as needed
  ];

  const navItems = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about" },
    {
      name: "TYPE OF PARK",
      link: "/parks",  // Adding a default link
      dropdown: true,
      subItems: [
        { name: "National Parks", link: "/parks/national" },
        { name: "State Parks", link: "/parks/state" },
        { name: "Local Parks", link: "/parks/local" },
      ],
    },
    { name: "NURSERY", link: "/nursery" },
    { name: "LOGIN", link: "/signin" },
  ];

  // State for location data, notification, error, and scroll indicator
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(true);

  useEffect(() => {
    // Retrieve location data from session storage if available
    const storedLocation = sessionStorage.getItem("location");
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
      // Don't show notification for stored locations on initial load
    }
  }, []);

  // Hide scroll indicator after scrolling or after 5 seconds
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Set a timeout to hide the indicator after 5 seconds
    const timeout = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // Function to get the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(locationData);
          setError(null);
          sessionStorage.setItem("location", JSON.stringify(locationData)); // Store location data in session storage

          // Show notification when user explicitly shares location
          setShowNotification(true);

          // Hide notification after 3 seconds
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background with improved gradient overlay for better contrast */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/image1.jpg"
          alt="Delhi Parks"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dda-dark/80 via-dda-dark/60 to-dda-dark/30 dark:from-dda-dark/90 dark:via-dda-dark/70 dark:to-dda-dark/40"></div>
      </div>

      {/* Spotlights for modern effect with improved colors */}
      <div className="absolute inset-0 z-10">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="rgba(140, 198, 63, 0.25)" // Light green with better visibility
        />
        <Spotlight
          className="h-[50vh] w-[50vw] top-10 left-full"
          fill="rgba(0, 104, 56, 0.2)" // DDA green with better visibility
        />
        <Spotlight
          className="left-80 top-28 h-[50vh] w-[50vw]"
          fill="rgba(0, 114, 188, 0.2)" // DDA blue with better visibility
        />
      </div>

      {/* Content container */}
      <div className="container-section relative z-20 flex flex-col items-center justify-center h-full pt-24 md:pt-32">
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-24 h-24 md:w-32 md:h-32 mb-4"
          >
            <Image
              src="/logo.png"
              alt="DDA Logo"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4 tracking-tight leading-tight drop-shadow-sm"
          >
            Delhi Development Authority
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-white text-center max-w-2xl mb-8 leading-relaxed font-medium drop-shadow-sm"
          >
            Discover and explore the beautiful parks and green spaces of Delhi
          </motion.p>
        </div>

        {/* CTA Buttons with improved visual feedback */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 mb-10 w-full max-w-md justify-center"
        >
          <Link href="#nearby-parks" className="w-full sm:w-auto">
            <button className="btn-primary px-8 py-3.5 text-lg w-full font-medium shadow-lg hover:shadow-xl focus:ring-offset-2 focus:ring-offset-dda-dark/50">
              Find Nearby Parks
            </button>
          </Link>

          <button
            onClick={getLocation}
            className="btn-secondary px-8 py-3.5 text-lg w-full sm:w-auto font-medium shadow-lg hover:shadow-xl focus:ring-offset-2 focus:ring-offset-dda-dark/50"
            aria-label="Share my location to find nearby parks"
          >
            Share My Location
          </button>
        </motion.div>

        {/* Location status with improved visibility */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-white bg-green-600/90 backdrop-blur-md px-6 py-3.5 rounded-lg fixed top-24 right-4 z-50 shadow-xl border border-green-500/30 font-medium"
            >
              Location shared successfully!
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-white bg-red-600/90 backdrop-blur-md px-6 py-3.5 rounded-lg shadow-lg border border-red-500/30 font-medium max-w-md text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Scroll indicator with conditional rendering based on showScrollIndicator state */}
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="flex flex-col items-center">
              <p className="text-white font-medium mb-2 drop-shadow-sm">Scroll to explore</p>
              <div className="w-7 h-12 border-2 border-white/70 rounded-full flex justify-center p-1 shadow-lg backdrop-blur-sm bg-black/10">
                <motion.div
                  animate={{
                    y: [0, 14, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="w-3 h-3 bg-white rounded-full shadow-sm"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;
