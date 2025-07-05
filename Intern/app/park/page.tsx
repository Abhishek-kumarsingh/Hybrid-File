"use client";

import { navItems } from "@/data";
import { useState, useEffect } from "react";
import { FaLeaf, FaTree, FaMapMarkerAlt, FaInfoCircle, FaFilter, FaSearch } from "react-icons/fa";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import ModernCard from "@/components/ui/design-system/ModernCard";
import Card3D from "@/components/ui/design-system/Card3D";
import CardHoverEffect from "@/components/ui/design-system/CardHoverEffect";
import AnimatedText from "@/components/ui/design-system/AnimatedText";

// Sample park data
const parkTypes = [
  {
    id: 1,
    title: "National Parks",
    description: "Explore Delhi's largest protected natural areas with diverse ecosystems and wildlife.",
    link: "/parks/national",
    icon: <FaTree className="text-green-600 text-4xl" />,
  },
  {
    id: 2,
    title: "State Parks",
    description: "Visit beautiful state-maintained recreational areas with various amenities and activities.",
    link: "/parks/state",
    icon: <FaLeaf className="text-green-500 text-4xl" />,
  },
  {
    id: 3,
    title: "Local Parks",
    description: "Discover neighborhood green spaces near you with playgrounds and walking paths.",
    link: "/parks/local",
    icon: <FaMapMarkerAlt className="text-blue-500 text-4xl" />,
  },
];

// Featured parks
const featuredParks = [
  {
    id: 1,
    name: "Lodhi Gardens",
    description: "Historic park with monuments from the 15th century",
    location: "Lodhi Road, New Delhi",
    type: "Heritage Park",
    size: "90 acres",
    facilities: ["Walking Trails", "Historical Monuments", "Picnic Areas", "Botanical Garden"],
    image: "/images/image1.jpg",
  },
  {
    id: 2,
    name: "Nehru Park",
    description: "Sprawling park named after India's first Prime Minister",
    location: "Vinay Marg, Chanakyapuri, New Delhi",
    type: "City Park",
    size: "85 acres",
    facilities: ["Jogging Track", "Open Gym", "Children's Play Area", "Musical Fountain"],
    image: "/images/image2.jpg",
  },
  {
    id: 3,
    name: "Deer Park",
    description: "Wildlife park with a deer enclosure and beautiful lake",
    location: "Hauz Khas, New Delhi",
    type: "Wildlife Park",
    size: "70 acres",
    facilities: ["Lake", "Deer Enclosure", "Walking Paths", "Bird Watching"],
    image: "/images/image3.jpg",
  },
];

// Park activities
const parkActivities = [
  { name: "Walking & Jogging", icon: "🏃‍♂️", description: "Dedicated tracks for fitness enthusiasts" },
  { name: "Picnics", icon: "🧺", description: "Designated areas for family gatherings" },
  { name: "Bird Watching", icon: "🦜", description: "Spot various bird species in our parks" },
  { name: "Yoga & Meditation", icon: "🧘‍♀️", description: "Peaceful spaces for mindfulness practices" },
  { name: "Children's Play", icon: "🧒", description: "Safe and fun playgrounds for kids" },
  { name: "Outdoor Fitness", icon: "💪", description: "Open-air gyms with exercise equipment" },
];

const ParksPage = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLocationClick = () => {
    console.log("Location clicked!");
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Hero section */}
      <Hero />

      {/* Main content with container styling */}
      <div className="w-full">
        {/* Parks Introduction */}
        <ModernSection 
          id="parks-intro" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
        >
          <div className="text-center mb-10">
            <AnimatedText 
              text="Explore Delhi's Green Spaces" 
              as="h2" 
              className="text-4xl font-bold mb-4" 
              animation="gradient"
              color="primary"
            />
            <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
              Discover the beauty and tranquility of parks and gardens maintained by the Delhi Development Authority.
            </ModernText>
          </div>
          
          <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
            <ModernText as="p" size="lg" className="mb-6">
              Delhi Development Authority manages a diverse range of parks and green spaces throughout the city, 
              from large national parks to small neighborhood gardens. These spaces provide essential recreational 
              areas for residents and visitors while contributing to the city's environmental health.
            </ModernText>
          </div>
        </ModernSection>

        {/* Park Types */}
        <ModernSection 
          id="park-types" 
          withGradient={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          paddingY="xl"
          className="bg-dot-pattern"
        >
          <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
            Types of Parks
          </ModernText>
          
          <CardHoverEffect items={parkTypes} />
        </ModernSection>

        {/* Featured Parks */}
        <ModernSection 
          id="featured-parks" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
        >
          <ModernText as="h2" size="3xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
            Featured Parks
          </ModernText>
          
          <ModernGrid columns={{ sm: 1, md: 3 }} gap="lg" staggered={true} animationEffect="fade-up" animationDelay={2}>
            {featuredParks.map((park, index) => (
              <Card3D
                key={park.id}
                title={park.name}
                description={park.description}
                image={park.image}
                intensity={8}
                className="h-full"
              >
                <div className="mt-4">
                  <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
                    <FaMapMarkerAlt className="mr-2" />
                    {park.location}
                  </div>
                  <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
                    <FaInfoCircle className="mr-2" />
                    {park.type} • {park.size}
                  </div>
                  <div className="mt-3">
                    <ModernText as="h4" size="sm" weight="medium" color="muted">
                      Facilities:
                    </ModernText>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {park.facilities.slice(0, 2).map(facility => (
                        <span 
                          key={facility} 
                          className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        >
                          {facility}
                        </span>
                      ))}
                      {park.facilities.length > 2 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          +{park.facilities.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                    View Details
                  </button>
                </div>
              </Card3D>
            ))}
          </ModernGrid>
        </ModernSection>

        {/* Park Activities */}
        <ModernSection 
          id="park-activities" 
          withGradient={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="glassmorphism my-8"
        >
          <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-8" animationDelay={1}>
            Activities in Our Parks
          </ModernText>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {parkActivities.map((activity, index) => (
              <div 
                key={activity.name}
                className={`text-center p-4 rounded-xl transition-all duration-300 cursor-pointer
                  ${selectedActivity === activity.name 
                    ? 'bg-green-100 dark:bg-green-900/30 shadow-md transform -translate-y-1' 
                    : 'hover:bg-green-50 dark:hover:bg-green-900/20 hover:transform hover:-translate-y-1'}`}
                onClick={() => setSelectedActivity(activity.name === selectedActivity ? null : activity.name)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl mb-3">{activity.icon}</div>
                <ModernText as="h3" size="lg" weight="semibold" animationDelay={index}>
                  {activity.name}
                </ModernText>
                <ModernText as="p" size="sm" color="muted" animationDelay={index + 0.5}>
                  {activity.description}
                </ModernText>
              </div>
            ))}
          </div>
        </ModernSection>

        {/* Conservation Efforts */}
        <ModernSection 
          id="conservation" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-right">
              <ModernText as="h2" size="2xl" weight="bold" color="primary" animationDelay={1}>
                Conservation Efforts
              </ModernText>
              <ModernText as="p" size="lg" className="mt-4" animationDelay={2}>
                DDA is committed to preserving Delhi's biodiversity and natural resources through various conservation initiatives in our parks and green spaces.
              </ModernText>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start" data-aos="fade-up" data-aos-delay="300">
                  <span className="text-green-500 mr-2">✓</span>
                  <ModernText as="span">Native plant restoration and protection</ModernText>
                </li>
                <li className="flex items-start" data-aos="fade-up" data-aos-delay="350">
                  <span className="text-green-500 mr-2">✓</span>
                  <ModernText as="span">Water conservation through rainwater harvesting</ModernText>
                </li>
                <li className="flex items-start" data-aos="fade-up" data-aos-delay="400">
                  <span className="text-green-500 mr-2">✓</span>
                  <ModernText as="span">Wildlife habitat creation and protection</ModernText>
                </li>
                <li className="flex items-start" data-aos="fade-up" data-aos-delay="450">
                  <span className="text-green-500 mr-2">✓</span>
                  <ModernText as="span">Environmental education programs</ModernText>
                </li>
              </ul>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl" data-aos="fade-left">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-gradient-x"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg">
                  <div className="text-5xl mb-4 animate-bounce-slow">🌱</div>
                  <ModernText as="h3" size="xl" weight="bold">
                    Join Our Conservation Efforts
                  </ModernText>
                  <ModernText as="p" className="mt-2">
                    Volunteer for tree planting and park cleanup events
                  </ModernText>
                  <button className="mt-4 py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModernSection>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default ParksPage;
