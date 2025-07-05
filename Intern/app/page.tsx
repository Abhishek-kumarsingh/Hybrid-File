"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import DropdownSection from "@/components/DropdownSection";
import Footer from "@/components/Footer";
import NewsAndEvents from "@/components/NewsAndEvents";
import NearbyParks from "@/components/NearbyParks";
import RecommendedParks from "@/components/RecommendedParks";
import Icon from "@/components/Icon";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { useEffect, useState } from "react";

// Import our new modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import ModernCard from "@/components/ui/design-system/ModernCard";
import LoadingSpinner from "@/components/ui/design-system/LoadingSpinner";
import OptimizedImage from "@/components/ui/design-system/OptimizedImage";
import FeedbackButton from "@/components/ui/design-system/FeedbackButton";

// Import real data
import { getParks, Park } from "@/lib/content/parks-data";

// Define a custom type for the converted parks that matches what NearbyParks expects
interface ConvertedPark {
  id: number;
  name: string;
  description: string;
  location: string;
  image: string;
  rating: number;
  distance: number;
  latitude: string;
  longitude: string;
  _id: string;
  area: string;
  region: string;
  division: string;
  url: string;
}

const Home = () => {
  const [parkData, setParkData] = useState<ConvertedPark[] | null>(null);
  const [realParks, setRealParks] = useState<Park[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLocationClick = () => {
    // Implement your logic here
    console.log("Location clicked!");
    setIsLoading(true);

    // Simulate fetching park data based on location
    setTimeout(() => {
      // Sort by "distance" to simulate finding nearby parks
      const sortedParks = [...parkData || []].sort((a, b) => {
        // Handle undefined distances with a fallback value
        const distanceA = a.distance ?? Number.MAX_VALUE;
        const distanceB = b.distance ?? Number.MAX_VALUE;
        return distanceA - distanceB;
      });
      setParkData(sortedParks);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchParkData = async () => {
      setIsLoading(true);

      try {
        // Get parks data from our real data source
        const parks = getParks();
        setRealParks(parks);

        // Convert to the format expected by existing components
        const convertedParks = parks.map(park => ({
          id: parseInt(park.id.replace(/\D/g, '')) || Math.floor(Math.random() * 1000),
          name: park.name,
          description: park.shortDescription,
          location: park.location.address,
          image: park.images.main || "/images/image1.jpg",
          rating: park.reviews.rating,
          distance: Math.random() * 5, // Simulate random distance
          latitude: park.location.coordinates.latitude.toString(),
          longitude: park.location.coordinates.longitude.toString(),
          _id: park.id,
          area: park.location.district,
          region: park.location.district,
          division: park.location.district,
          url: park.slug,
        }));

        setParkData(convertedParks);
      } catch (error) {
        console.error('Error fetching park data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkData();
  }, []);

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Feedback button */}
      <FeedbackButton position="bottom-right" label="Share Feedback" />

      {/* Hero section */}
      <Hero />

      {/* Main content with container styling */}
      <div className="w-full">
        {/* Features/Categories section */}
        <ModernSection
          id="features"
          withPattern={false}
          animationEffect="fade-up"
          animationDelay={0}
          className="bg-gradient-to-br from-green-50/80 to-blue-50/80 dark:from-green-900/20 dark:to-blue-900/20"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
              Explore Delhi's Green Spaces
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Discover the beauty and tranquility of Delhi's parks and gardens, maintained by the Delhi Development Authority.
            </p>
          </div>

          <ModernGrid columns={{ sm: 1, md: 2, lg: 4 }} gap="lg" staggered={true} animationEffect="fade-up" animationDelay={3} className="h-full">
            <ModernCard
              title="National Parks"
              description="Explore Delhi's largest protected natural areas"
              variant="primary"
              link="/parks/national"
              animationDelay={0}
              className="h-full flex flex-col justify-between"
              size="md"
            />
            <ModernCard
              title="State Parks"
              description="Visit beautiful state-maintained recreational areas"
              variant="secondary"
              link="/parks/state"
              animationDelay={1}
              className="h-full flex flex-col justify-between"
              size="md"
            />
            <ModernCard
              title="Local Parks"
              description="Discover neighborhood green spaces near you"
              variant="accent"
              link="/parks/local"
              animationDelay={2}
              className="h-full flex flex-col justify-between"
              size="md"
            />
            <ModernCard
              title="Nurseries"
              description="Find plants and gardening supplies"
              variant="neutral"
              link="/nursery"
              animationDelay={3}
              className="h-full flex flex-col justify-between"
              size="md"
            />
          </ModernGrid>
        </ModernSection>

        {/* News and Events section */}
        <ModernSection
          id="news"
          withGradient={true}
          animationEffect="fade-up"
          animationDelay={0}
          paddingY="xl"
        >
          <NewsAndEvents />
        </ModernSection>

        {/* Park Selection section */}
        <ModernSection
          id="park-selection"
          withPattern={false}
          animationEffect="fade-up"
          animationDelay={0}
          className="bg-white dark:bg-gray-900"
        >
          <DropdownSection />
        </ModernSection>

        {/* Nearby Parks section */}
        <ModernSection
          id="nearby-parks"
          withGradient={true}
          animationEffect="fade-up"
          animationDelay={0}
          className="glassmorphism my-8"
        >

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner
                size="lg"
                color="primary"
                text="Finding parks near you..."
                variant="spinner"
              />
            </div>
          ) : parkData ? (
            <NearbyParks parks={parkData} />
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-pulse bg-muted rounded-lg h-10 w-72 mb-4"></div>
              <ModernText as="p" size="lg" color="muted" align="center">
                Searching for nearby parks... Please enable location services to see parks in your area.
              </ModernText>
            </div>
          )}
        </ModernSection>

        {/* Recommended Parks section */}
        <ModernSection
          id="recommended-parks"
          withPattern={false}
          animationEffect="fade-up"
          animationDelay={0}
          className="bg-gray-50 dark:bg-gray-800/50"
        >

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner
                size="lg"
                color="secondary"
                text="Loading recommended parks..."
                variant="dots"
              />
            </div>
          ) : parkData ? (
            <RecommendedParks parks={parkData} />
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-pulse bg-muted rounded-lg h-10 w-72 mb-4"></div>
              <ModernText as="p" size="lg" color="muted" align="center">
                Loading recommended parks...
              </ModernText>
            </div>
          )}
        </ModernSection>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Home;
