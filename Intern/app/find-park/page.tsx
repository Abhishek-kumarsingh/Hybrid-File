"use client";

import { navItems } from "@/data";
import { useState } from "react";
import { FaMapMarkerAlt, FaLeaf, FaTree, FaWater, FaChild, FaAccessibleIcon, FaParking } from "react-icons/fa";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import AnimatedText from "@/components/ui/design-system/AnimatedText";
import ParkFinder from "@/components/ui/design-system/ParkFinder";

// Sample park features
const parkFeatures = [
  {
    icon: <FaTree className="text-green-600 text-3xl" />,
    title: "Natural Beauty",
    description: "Immerse yourself in lush greenery and natural landscapes",
  },
  {
    icon: <FaLeaf className="text-green-500 text-3xl" />,
    title: "Biodiversity",
    description: "Discover diverse plant and animal species in our parks",
  },
  {
    icon: <FaWater className="text-blue-500 text-3xl" />,
    title: "Water Features",
    description: "Enjoy lakes, fountains, and water bodies in select parks",
  },
  {
    icon: <FaChild className="text-orange-500 text-3xl" />,
    title: "Recreation",
    description: "Find playgrounds and sports facilities for all ages",
  },
  {
    icon: <FaAccessibleIcon className="text-purple-500 text-3xl" />,
    title: "Accessibility",
    description: "Many parks feature accessible paths and facilities",
  },
  {
    icon: <FaParking className="text-gray-600 text-3xl" />,
    title: "Amenities",
    description: "Convenient parking, restrooms, and seating areas",
  },
];

const FindParkPage = () => {
  const handleLocationClick = () => {
    console.log("Location clicked!");
  };

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Hero section */}
      <Hero />

      {/* Main content with container styling */}
      <div className="w-full">
        {/* Find Park Introduction */}
        <ModernSection 
          id="find-park-intro" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
        >
          <div className="text-center mb-10">
            <AnimatedText 
              text="Find Your Perfect Park" 
              as="h2" 
              className="text-4xl font-bold mb-4" 
              animation="gradient"
              color="primary"
            />
            <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
              Discover parks and gardens near you with our interactive park finder. Filter by location, amenities, and more.
            </ModernText>
          </div>
        </ModernSection>

        {/* Park Features */}
        <ModernSection 
          id="park-features" 
          withGradient={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          paddingY="xl"
          className="bg-dot-pattern"
        >
          <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
            What Our Parks Offer
          </ModernText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parkFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    {feature.icon}
                  </div>
                  <ModernText as="h3" size="xl" weight="semibold">
                    {feature.title}
                  </ModernText>
                </div>
                <ModernText as="p" color="muted">
                  {feature.description}
                </ModernText>
              </div>
            ))}
          </div>
        </ModernSection>

        {/* Park Finder */}
        <ModernSection 
          id="park-finder" 
          withPattern={false} 
          animationEffect="fade-up" 
          animationDelay={0}
          paddingY="xl"
        >
          <ModernText as="h2" size="3xl" weight="bold" align="center" className="mb-4" animationDelay={1}>
            Interactive Park Finder
          </ModernText>
          <ModernText as="p" size="lg" color="muted" align="center" className="mb-10 max-w-3xl mx-auto" animationDelay={2}>
            Use the filters below to find parks that match your preferences. Enable location services to see parks near you.
          </ModernText>
          
          <ParkFinder useLocation={true} />
        </ModernSection>

        {/* Park Visiting Tips */}
        <ModernSection 
          id="park-tips" 
          withGradient={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="glassmorphism my-8"
        >
          <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-8" animationDelay={1}>
            Tips for Park Visitors
          </ModernText>
          
          <div className="bg-white/30 dark:bg-black/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-aos="fade-right">
                <ModernText as="h3" size="xl" weight="semibold" color="primary" className="mb-4">
                  Before Your Visit
                </ModernText>
                
                <ul className="space-y-3 list-disc pl-5">
                  <li>
                    <ModernText as="p" size="base">
                      Check park opening hours, which typically run from 5:00 AM to 8:00 PM
                    </ModernText>
                  </li>
                  <li>
                    <ModernText as="p" size="base">
                      Bring water, especially during summer months
                    </ModernText>
                  </li>
                  <li>
                    <ModernText as="p" size="base">
                      Wear comfortable shoes suitable for walking
                    </ModernText>
                  </li>
                  <li>
                    <ModernText as="p" size="base">
                      Check if pets are allowed in your chosen park
                    </ModernText>
                  </li>
                </ul>
              </div>
              
              <div data-aos="fade-left">
                <ModernText as="h3" size="xl" weight="semibold" color="secondary" className="mb-4">
                  During Your Visit
                </ModernText>
                
                <ul className="space-y-3 list-disc pl-5">
                  <li>
                    <ModernText as="p" size="base">
                      Respect park rules and regulations
                    </ModernText>
                  </li>
                  <li>
                    <ModernText as="p" size="base">
                      Dispose of waste properly in designated bins
                    </ModernText>
                  </li>
                  <li>
                    <ModernText as="p" size="base">
                      Stay on designated paths to protect plant life
                    </ModernText>
                  </li>
                  <li>
                    <ModernText as="p" size="base">
                      Be mindful of other visitors and share facilities
                    </ModernText>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg" data-aos="fade-up">
              <ModernText as="p" size="base" className="flex items-center">
                <span className="text-yellow-500 mr-2">⚠️</span>
                <span>
                  Some parks may have specific rules or seasonal closures. Always check the latest information before planning your visit.
                </span>
              </ModernText>
            </div>
          </div>
        </ModernSection>

        {/* Community Engagement */}
        <ModernSection 
          id="community" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
        >
          <div className="text-center max-w-3xl mx-auto">
            <ModernText as="h2" size="2xl" weight="bold" className="mb-4" animationDelay={1}>
              Join Our Park Community
            </ModernText>
            <ModernText as="p" size="lg" className="mb-8" animationDelay={2}>
              Get involved with park conservation efforts, volunteer opportunities, and community events.
            </ModernText>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up">
              <button className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                <FaLeaf />
                <span>Volunteer Opportunities</span>
              </button>
              <button className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                <FaMapMarkerAlt />
                <span>Upcoming Events</span>
              </button>
            </div>
          </div>
        </ModernSection>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default FindParkPage;
