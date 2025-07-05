"use client";

import { navItems } from "@/data";
import { useState } from "react";
import { FaLeaf, FaTree, FaHistory, FaLandmark, FaMapMarkedAlt, FaSeedling } from "react-icons/fa";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import AnimatedText from "@/components/ui/design-system/AnimatedText";
import Timeline from "@/components/ui/design-system/Timeline";
import StatsDisplay from "@/components/ui/design-system/StatsDisplay";
import Testimonials from "@/components/ui/design-system/Testimonials";

// Sample timeline data
const timelineItems = [
  {
    id: 1,
    date: "1957",
    title: "Establishment of DDA",
    description: "The Delhi Development Authority was established under the Delhi Development Act to promote and secure the development of Delhi.",
    category: "Organization",
    icon: <FaLandmark className="text-white text-sm" />,
  },
  {
    id: 2,
    date: "1960s",
    title: "First Parks Development",
    description: "DDA began developing the first planned parks in Delhi, focusing on creating green spaces within residential areas.",
    category: "Development",
    icon: <FaSeedling className="text-white text-sm" />,
    image: "/images/image1.jpg",
  },
  {
    id: 3,
    date: "1980s",
    title: "Expansion of Green Spaces",
    description: "Major expansion of parks and gardens across Delhi, with the introduction of district parks in various zones.",
    category: "Expansion",
    icon: <FaTree className="text-white text-sm" />,
  },
  {
    id: 4,
    date: "1990s",
    title: "Biodiversity Conservation",
    description: "Focus shifted to biodiversity conservation with the development of ecological parks and nature reserves.",
    category: "Conservation",
    icon: <FaLeaf className="text-white text-sm" />,
    image: "/images/image2.jpg",
  },
  {
    id: 5,
    date: "2000s",
    title: "Modern Park Facilities",
    description: "Introduction of modern facilities in parks including sports complexes, water features, and specialized gardens.",
    category: "Modernization",
    icon: <FaMapMarkedAlt className="text-white text-sm" />,
  },
  {
    id: 6,
    date: "2010s",
    title: "Smart Parks Initiative",
    description: "Launch of the Smart Parks Initiative, integrating technology for better maintenance and visitor experience.",
    category: "Innovation",
    icon: <FaHistory className="text-white text-sm" />,
    image: "/images/image3.jpg",
  },
  {
    id: 7,
    date: "Present",
    title: "Sustainable Development",
    description: "Current focus on sustainable development practices, water conservation, and creating climate-resilient green spaces.",
    category: "Sustainability",
    icon: <FaLeaf className="text-white text-sm" />,
  },
];

// Sample statistics data
const statsItems = [
  {
    id: 1,
    value: 800,
    label: "Parks & Gardens",
    icon: <FaTree className="text-green-600 text-2xl" />,
    color: "primary" as const,
  },
  {
    id: 2,
    value: 18000,
    label: "Acres of Green Space",
    icon: <FaLeaf className="text-green-600 text-2xl" />,
    color: "secondary" as const,
  },
  {
    id: 3,
    value: 65,
    label: "Years of Service",
    icon: <FaHistory className="text-amber-600 text-2xl" />,
    color: "accent" as const,
  },
  {
    id: 4,
    value: 5,
    label: "Biodiversity Parks",
    icon: <FaSeedling className="text-emerald-600 text-2xl" />,
    color: "success" as const,
  },
];

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: "Rajiv Sharma",
    role: "Delhi Resident since 1970",
    content: "I've witnessed the transformation of Delhi's parks over five decades. The DDA has done remarkable work in creating and maintaining these green spaces that are vital to our city's health.",
    rating: 5,
    date: "June 2023",
  },
  {
    id: 2,
    name: "Priya Malhotra",
    role: "Environmental Activist",
    content: "The biodiversity parks developed by DDA are crucial ecological zones. They serve as urban lungs and provide habitat for numerous species that would otherwise disappear from our urban landscape.",
    rating: 4,
    date: "August 2023",
  },
  {
    id: 3,
    name: "Arjun Kapoor",
    role: "Urban Planner",
    content: "DDA's approach to integrating green spaces within urban development has set a standard for other cities to follow. Their work balances ecological needs with recreational requirements.",
    rating: 5,
    date: "October 2023",
  },
];

const HistoryPage = () => {
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
        {/* History Introduction */}
        <ModernSection
          id="history-intro"
          withPattern={true}
          animationEffect="fade-up"
          animationDelay={0}
          className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
        >
          <div className="text-center mb-10">
            <AnimatedText
              text="Our Green Legacy"
              as="h2"
              className="text-4xl font-bold mb-4"
              animation="gradient"
              color="primary"
            />
            <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
              Explore the rich history of Delhi Development Authority's parks and gardens, from our founding to the present day.
            </ModernText>
          </div>
        </ModernSection>

        {/* Key Statistics */}
        <ModernSection
          id="key-stats"
          withGradient={true}
          animationEffect="fade-up"
          animationDelay={0}
          paddingY="xl"
          className="bg-dot-pattern"
        >
          <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
            DDA Parks by the Numbers
          </ModernText>

          <StatsDisplay items={statsItems} countUp={true} />
        </ModernSection>

        {/* Timeline Section */}
        <ModernSection
          id="timeline"
          withPattern={false}
          animationEffect="fade-up"
          animationDelay={0}
          paddingY="xl"
        >
          <ModernText as="h2" size="3xl" weight="bold" align="center" className="mb-4" animationDelay={1}>
            Historical Timeline
          </ModernText>
          <ModernText as="p" size="lg" color="muted" align="center" className="mb-10 max-w-3xl mx-auto" animationDelay={2}>
            Discover the evolution of Delhi's parks and green spaces through the decades.
          </ModernText>

          <Timeline items={timelineItems} alternating={true} connected={true} />
        </ModernSection>

        {/* Historical Photos */}
        <ModernSection
          id="historical-photos"
          withGradient={true}
          animationEffect="fade-up"
          animationDelay={0}
          className="glassmorphism my-8"
        >
          <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-8" animationDelay={1}>
            Historical Photos
          </ModernText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg h-64" data-aos="fade-up" data-aos-delay="100">
              <img src="/images/image1.jpg" alt="Historical Park 1" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <ModernText as="h3" size="lg" weight="bold">
                    Lodhi Gardens (1960s)
                  </ModernText>
                  <ModernText as="p" size="sm">
                    Early development phase
                  </ModernText>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg h-64" data-aos="fade-up" data-aos-delay="200">
              <img src="/images/image2.jpg" alt="Historical Park 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <ModernText as="h3" size="lg" weight="bold">
                    Nehru Park (1980s)
                  </ModernText>
                  <ModernText as="p" size="sm">
                    Expansion period
                  </ModernText>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg h-64" data-aos="fade-up" data-aos-delay="300">
              <img src="/images/image3.jpg" alt="Historical Park 3" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <ModernText as="h3" size="lg" weight="bold">
                    Buddha Jayanti Park (2000s)
                  </ModernText>
                  <ModernText as="p" size="sm">
                    Modern facilities integration
                  </ModernText>
                </div>
              </div>
            </div>
          </div>
        </ModernSection>

        {/* Testimonials */}
        <ModernSection
          id="testimonials"
          withPattern={true}
          animationEffect="fade-up"
          animationDelay={0}
        >
          <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
            Voices from the Community
          </ModernText>

          <Testimonials items={testimonials} variant="carousel" />
        </ModernSection>

        {/* Conservation Efforts */}
        <ModernSection
          id="conservation"
          withGradient={true}
          animationEffect="fade-up"
          animationDelay={0}
          paddingY="xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-right">
              <ModernText as="h2" size="2xl" weight="bold" color="primary" animationDelay={1}>
                Our Conservation Journey
              </ModernText>
              <ModernText as="p" size="lg" className="mt-4" animationDelay={2}>
                Throughout our history, conservation has been at the heart of our mission. From preserving historical monuments within parks to creating dedicated biodiversity zones, we've worked to protect Delhi's natural heritage.
              </ModernText>
              <ModernText as="p" size="lg" className="mt-4" animationDelay={3}>
                Today, our conservation efforts focus on sustainable practices, water conservation, and creating climate-resilient green spaces that will serve future generations.
              </ModernText>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl h-80" data-aos="fade-left">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-gradient-x"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              <img src="/images/image1.jpg" alt="Conservation Efforts" className="w-full h-full object-cover mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg max-w-md">
                  <ModernText as="h3" size="xl" weight="bold">
                    Looking to the Future
                  </ModernText>
                  <ModernText as="p" className="mt-2">
                    Our commitment to preserving and enhancing Delhi's green spaces continues with innovative approaches to urban ecology.
                  </ModernText>
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

export default HistoryPage;
