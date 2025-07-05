"use client";

import { navItems } from "@/data";
import { useState, useEffect } from "react";
import { FaLeaf, FaTree, FaImage, FaFilter, FaSearch, FaThLarge, FaList } from "react-icons/fa";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import AnimatedText from "@/components/ui/design-system/AnimatedText";
import OptimizedImage from "@/components/ui/design-system/OptimizedImage";

// Sample gallery data
const galleryCategories = [
  { id: "all", name: "All Photos" },
  { id: "parks", name: "Parks & Gardens" },
  { id: "events", name: "Events & Activities" },
  { id: "wildlife", name: "Wildlife & Nature" },
  { id: "seasonal", name: "Seasonal Views" },
];

// Sample gallery items
const galleryItems = [
  {
    id: 1,
    title: "Lodhi Gardens in Spring",
    description: "Beautiful spring flowers blooming in Lodhi Gardens",
    image: "/images/image1.jpg",
    category: "parks",
    tags: ["spring", "flowers", "lodhi"],
    date: "March 2023",
  },
  {
    id: 2,
    title: "Deer Park Wildlife",
    description: "Spotted deer in their natural habitat at Deer Park",
    image: "/images/image2.jpg",
    category: "wildlife",
    tags: ["deer", "animals", "wildlife"],
    date: "April 2023",
  },
  {
    id: 3,
    title: "Yoga in the Park",
    description: "Morning yoga session at Nehru Park",
    image: "/images/image3.jpg",
    category: "events",
    tags: ["yoga", "fitness", "morning"],
    date: "May 2023",
  },
  {
    id: 4,
    title: "Autumn Colors",
    description: "Fall foliage at Buddha Jayanti Park",
    image: "/images/image1.jpg",
    category: "seasonal",
    tags: ["autumn", "fall", "foliage"],
    date: "October 2022",
  },
  {
    id: 5,
    title: "Japanese Garden",
    description: "Serene views of the Japanese Garden in Rohini",
    image: "/images/image2.jpg",
    category: "parks",
    tags: ["japanese", "garden", "peaceful"],
    date: "June 2023",
  },
  {
    id: 6,
    title: "Bird Watching Event",
    description: "Annual bird watching event at Yamuna Biodiversity Park",
    image: "/images/image3.jpg",
    category: "events",
    tags: ["birds", "birdwatching", "event"],
    date: "February 2023",
  },
  {
    id: 7,
    title: "Monsoon Greenery",
    description: "Lush green views after monsoon rains",
    image: "/images/image1.jpg",
    category: "seasonal",
    tags: ["monsoon", "rain", "green"],
    date: "July 2023",
  },
  {
    id: 8,
    title: "Butterfly Garden",
    description: "Colorful butterflies at the dedicated butterfly garden",
    image: "/images/image2.jpg",
    category: "wildlife",
    tags: ["butterfly", "insects", "garden"],
    date: "August 2023",
  },
  {
    id: 9,
    title: "Tree Plantation Drive",
    description: "Community tree plantation event at District Park",
    image: "/images/image3.jpg",
    category: "events",
    tags: ["trees", "plantation", "community"],
    date: "September 2023",
  },
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
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

  // Filter gallery items based on category and search query
  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Handle image click to show details (in a real app, this would open a modal or navigate to a detail page)
  const handleImageClick = (item: typeof galleryItems[0]) => {
    console.log("Image clicked:", item);
    // In a real implementation, you would show a modal or navigate to a detail page
  };

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Hero section */}
      <Hero />

      {/* Main content with container styling */}
      <div className="w-full">
        {/* Gallery Introduction */}
        <ModernSection 
          id="gallery-intro" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
        >
          <div className="text-center mb-10">
            <AnimatedText 
              text="Park Photo Gallery" 
              as="h2" 
              className="text-4xl font-bold mb-4" 
              animation="gradient"
              color="primary"
            />
            <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
              Explore beautiful images of Delhi's parks, gardens, wildlife, and community events.
            </ModernText>
          </div>
        </ModernSection>

        {/* Gallery Filters */}
        <ModernSection 
          id="gallery-filters" 
          withGradient={false} 
          animationEffect="fade-up" 
          animationDelay={0}
          paddingY="md"
          className="bg-white dark:bg-gray-900 shadow-sm sticky top-16 z-10"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2" data-aos="fade-right">
              {galleryCategories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 font-medium"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4" data-aos="fade-left">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* View toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button 
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <FaThLarge className={viewMode === 'grid' ? 'text-green-600' : 'text-gray-500'} />
                </button>
                <button 
                  className={`p-2 rounded-lg ${viewMode === 'masonry' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                  onClick={() => setViewMode('masonry')}
                  aria-label="Masonry view"
                >
                  <FaList className={viewMode === 'masonry' ? 'text-green-600' : 'text-gray-500'} />
                </button>
              </div>
            </div>
          </div>
        </ModernSection>

        {/* Gallery Content */}
        <ModernSection 
          id="gallery-content" 
          withPattern={false} 
          animationEffect="fade-up" 
          animationDelay={0}
          paddingY="xl"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
              <ModernText as="p" size="lg" color="muted">
                Loading gallery...
              </ModernText>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🖼️</div>
              <ModernText as="h3" size="xl" weight="medium" color="muted">
                No images found
              </ModernText>
              <ModernText as="p" className="mt-2">
                Try adjusting your filters or search query
              </ModernText>
              <button
                className="mt-6 py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleImageClick(item)}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-64">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      fill
                      objectFit="cover"
                      animation="zoom"
                      placeholder="shimmer"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      {item.date}
                    </div>
                  </div>
                  <div className="p-4">
                    <ModernText as="h3" size="lg" weight="bold" className="mb-1">
                      {item.title}
                    </ModernText>
                    <ModernText as="p" size="sm" color="muted" className="mb-3">
                      {item.description}
                    </ModernText>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Masonry layout - split items into columns */}
              {[0, 1, 2].map(columnIndex => (
                <div key={columnIndex} className="flex flex-col gap-6">
                  {filteredItems
                    .filter((_, index) => index % 3 === columnIndex)
                    .map((item, index) => (
                      <div 
                        key={item.id}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => handleImageClick(item)}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <div className={`relative ${index % 2 === 0 ? 'h-72' : 'h-64'}`}>
                          <OptimizedImage
                            src={item.image}
                            alt={item.title}
                            fill
                            objectFit="cover"
                            animation="fade"
                            placeholder="shimmer"
                          />
                          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            {item.date}
                          </div>
                        </div>
                        <div className="p-4">
                          <ModernText as="h3" size="lg" weight="bold" className="mb-1">
                            {item.title}
                          </ModernText>
                          <ModernText as="p" size="sm" color="muted" className="mb-3">
                            {item.description}
                          </ModernText>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          )}
        </ModernSection>

        {/* Submit Photos CTA */}
        <ModernSection 
          id="submit-photos" 
          withGradient={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="glassmorphism my-8"
        >
          <div className="text-center max-w-3xl mx-auto">
            <ModernText as="h2" size="2xl" weight="bold" className="mb-4" animationDelay={1}>
              Share Your Park Photos
            </ModernText>
            <ModernText as="p" size="lg" className="mb-8" animationDelay={2}>
              Have beautiful photos of Delhi's parks? Share them with our community and see them featured in our gallery.
            </ModernText>
            
            <button className="py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto">
              <FaImage />
              <span>Submit Your Photos</span>
            </button>
          </div>
        </ModernSection>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default GalleryPage;
