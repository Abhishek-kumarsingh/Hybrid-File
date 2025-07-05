"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaAccessibleIcon, FaParking, FaToilet, FaChild, FaWater, FaDumbbell, FaTree, FaUtensils } from "react-icons/fa";

import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Footer from "@/components/Footer";
import { navItems } from "@/data";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import AnimatedText from "@/components/ui/design-system/AnimatedText";
import OptimizedImage from "@/components/ui/design-system/OptimizedImage";
import LoadingSpinner from "@/components/ui/design-system/LoadingSpinner";
import SEO from "@/components/ui/design-system/SEO";
import SkipToContent from "@/components/ui/design-system/SkipToContent";
import KeyboardFocusOutline from "@/components/ui/design-system/KeyboardFocusOutline";

// Import park data
import { getParkBySlug, Park } from "@/lib/content/parks-data";

const ParkDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [park, setPark] = useState<Park | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const slug = params?.slug as string;
  
  useEffect(() => {
    // Simulate API fetch with a slight delay
    const fetchPark = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const parkData = getParkBySlug(slug);
          if (parkData) {
            setPark(parkData);
          }
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching park data:", error);
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchPark();
    }
  }, [slug]);
  
  const handleLocationClick = () => {
    console.log("Location clicked!");
  };
  
  // Handle 404 - Park not found
  if (!isLoading && !park) {
    return (
      <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
        <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />
        
        <ModernSection 
          id="not-found" 
          withPattern={true} 
          animationEffect="fade-up" 
          animationDelay={0}
          className="min-h-[60vh] flex items-center justify-center"
        >
          <div className="text-center">
            <ModernText as="h1" size="4xl" weight="bold" className="mb-4">
              Park Not Found
            </ModernText>
            <ModernText as="p" size="lg" color="muted" className="mb-8">
              Sorry, we couldn't find the park you're looking for.
            </ModernText>
            <button 
              onClick={() => router.push("/park")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Browse All Parks
            </button>
          </div>
        </ModernSection>
        
        <Footer />
      </main>
    );
  }
  
  // Generate structured data for SEO
  const generateStructuredData = (park: Park) => {
    return {
      "@context": "https://schema.org",
      "@type": "Park",
      name: park.name,
      description: park.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: park.location.address,
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        addressCountry: "IN"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: park.location.coordinates.latitude,
        longitude: park.location.coordinates.longitude
      },
      openingHours: [
        `Mo-Fr ${park.openingHours.weekdays}`,
        `Sa-Su ${park.openingHours.weekends}`
      ],
      image: park.images.gallery.map(img => `https://dda-parks.gov.in${img}`),
      telephone: "+91-11-24661599",
      priceRange: park.entryFee.adults === 0 ? "Free" : `₹${park.entryFee.adults}`,
      amenityFeature: park.features.map(feature => ({
        "@type": "LocationFeatureSpecification",
        name: feature
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: park.reviews.rating,
        reviewCount: park.reviews.count
      }
    };
  };

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Accessibility components */}
      <SkipToContent contentId="park-content" />
      <KeyboardFocusOutline />
      
      {park && (
        <SEO 
          title={park.seoMetadata.title}
          description={park.seoMetadata.description}
          keywords={park.seoMetadata.keywords}
          ogImage={park.images.main}
          ogType="article"
          structuredData={generateStructuredData(park)}
        />
      )}
      
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Main content */}
      <div className="w-full" id="park-content">
        {isLoading ? (
          <div className="min-h-[80vh] flex items-center justify-center">
            <LoadingSpinner 
              size="lg" 
              color="primary" 
              text="Loading park information..." 
              variant="spinner"
            />
          </div>
        ) : park && (
          <>
            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
              <OptimizedImage
                src={park.images.main}
                alt={park.name}
                fill
                priority
                objectFit="cover"
                className="brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="container mx-auto px-4 py-8 md:py-12">
                  <div data-aos="fade-up">
                    <ModernText as="h1" size="5xl" weight="bold" className="text-white mb-4">
                      {park.name}
                    </ModernText>
                    <div className="flex items-center text-white/90 mb-6">
                      <FaMapMarkerAlt className="mr-2" />
                      <ModernText as="p" size="lg">
                        {park.location.address}
                      </ModernText>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {park.features.map((feature, index) => (
                        <span 
                          key={feature} 
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                          data-aos="fade-up"
                          data-aos-delay={index * 100}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Park Information */}
            <ModernSection 
              id="park-info" 
              withPattern={true} 
              animationEffect="fade-up" 
              animationDelay={0}
              className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2" data-aos="fade-right">
                  <ModernText as="h2" size="3xl" weight="bold" className="mb-6">
                    About {park.name}
                  </ModernText>
                  
                  <ModernText as="p" size="lg" className="mb-8">
                    {park.description}
                  </ModernText>
                  
                  {/* Gallery Preview */}
                  <div className="mb-8">
                    <ModernText as="h3" size="2xl" weight="bold" className="mb-4">
                      Gallery
                    </ModernText>
                    
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      <OptimizedImage
                        src={park.images.gallery[activeImageIndex] || park.images.main}
                        alt={`${park.name} - Gallery image ${activeImageIndex + 1}`}
                        fill
                        objectFit="cover"
                        animation="fade"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      {park.images.gallery.map((image, index) => (
                        <button
                          key={index}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            activeImageIndex === index 
                              ? 'border-green-500 scale-[0.95]' 
                              : 'border-transparent hover:border-green-300'
                          }`}
                          onClick={() => setActiveImageIndex(index)}
                          aria-label={`View gallery image ${index + 1}`}
                        >
                          <OptimizedImage
                            src={image}
                            alt={`${park.name} thumbnail ${index + 1}`}
                            fill
                            objectFit="cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Nearby Attractions */}
                  <div>
                    <ModernText as="h3" size="2xl" weight="bold" className="mb-4">
                      Nearby Attractions
                    </ModernText>
                    
                    <ul className="space-y-2">
                      {park.nearbyAttractions.map((attraction, index) => (
                        <li 
                          key={index}
                          className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                          data-aos="fade-up"
                          data-aos-delay={index * 100}
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          <ModernText as="span">
                            {attraction}
                          </ModernText>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Sidebar */}
                <div data-aos="fade-left">
                  {/* Park Details Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <ModernText as="h3" size="xl" weight="bold" className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Park Details
                    </ModernText>
                    
                    <div className="space-y-4">
                      {/* Opening Hours */}
                      <div className="flex items-start">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-4 mt-1">
                          <FaClock className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <ModernText as="h4" size="base" weight="semibold">
                            Opening Hours
                          </ModernText>
                          <ModernText as="p" size="sm" color="muted">
                            Weekdays: {park.openingHours.weekdays}
                          </ModernText>
                          <ModernText as="p" size="sm" color="muted">
                            Weekends: {park.openingHours.weekends}
                          </ModernText>
                          <ModernText as="p" size="sm" color="muted">
                            Holidays: {park.openingHours.holidays}
                          </ModernText>
                        </div>
                      </div>
                      
                      {/* Entry Fee */}
                      <div className="flex items-start">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-4 mt-1">
                          <FaMoneyBillWave className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <ModernText as="h4" size="base" weight="semibold">
                            Entry Fee
                          </ModernText>
                          {park.entryFee.adults === 0 ? (
                            <ModernText as="p" size="sm" color="muted">
                              Free entry for all visitors
                            </ModernText>
                          ) : (
                            <>
                              <ModernText as="p" size="sm" color="muted">
                                Adults: ₹{park.entryFee.adults}
                              </ModernText>
                              <ModernText as="p" size="sm" color="muted">
                                Children: ₹{park.entryFee.children}
                              </ModernText>
                              <ModernText as="p" size="sm" color="muted">
                                Seniors: ₹{park.entryFee.seniors}
                              </ModernText>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* District */}
                      <div className="flex items-start">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-4 mt-1">
                          <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <ModernText as="h4" size="base" weight="semibold">
                            District
                          </ModernText>
                          <ModernText as="p" size="sm" color="muted">
                            {park.location.district}
                          </ModernText>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Amenities Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <ModernText as="h3" size="xl" weight="bold" className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Amenities
                    </ModernText>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`flex items-center ${park.amenities.hasParking ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                        <FaParking className="mr-2" />
                        <span>Parking</span>
                      </div>
                      <div className={`flex items-center ${park.amenities.hasRestrooms ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                        <FaToilet className="mr-2" />
                        <span>Restrooms</span>
                      </div>
                      <div className={`flex items-center ${park.amenities.hasPlayground ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                        <FaChild className="mr-2" />
                        <span>Playground</span>
                      </div>
                      <div className={`flex items-center ${park.amenities.hasWaterFeature ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                        <FaWater className="mr-2" />
                        <span>Water Feature</span>
                      </div>
                      <div className={`flex items-center ${park.amenities.hasFitnessArea ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                        <FaDumbbell className="mr-2" />
                        <span>Fitness Area</span>
                      </div>
                      <div className={`flex items-center ${park.amenities.hasAccessiblePaths ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                        <FaAccessibleIcon className="mr-2" />
                        <span>Accessible</span>
                      </div>
                      <div className={`flex items-center ${park.amenities.hasPicnicArea ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                        <FaTree className="mr-2" />
                        <span>Picnic Area</span>
                      </div>
                      <div className={`flex items-center ${park.amenities.hasCafeteria ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'}`}>
                        <FaUtensils className="mr-2" />
                        <span>Cafeteria</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reviews Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <ModernText as="h3" size="xl" weight="bold" className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Visitor Reviews
                    </ModernText>
                    
                    <div className="flex items-center mb-4">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mr-4">
                        {park.reviews.rating}
                      </div>
                      <div>
                        <div className="flex text-yellow-400 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg 
                              key={i} 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-5 w-5 ${i < Math.floor(park.reviews.rating) ? 'fill-current' : 'fill-gray-300 dark:fill-gray-600'}`} 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <ModernText as="p" size="sm" color="muted">
                          Based on {park.reviews.count.toLocaleString()} reviews
                        </ModernText>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            </ModernSection>
            
            {/* Events Section */}
            {park.events.length > 0 && (
              <ModernSection 
                id="park-events" 
                withGradient={true} 
                animationEffect="fade-up" 
                animationDelay={0}
                className="bg-dot-pattern"
              >
                <ModernText as="h2" size="3xl" weight="bold" className="mb-8 text-center">
                  Upcoming Events
                </ModernText>
                
                <ModernGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg" staggered={true}>
                  {park.events.map((event, index) => (
                    <div 
                      key={event.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
                    >
                      <ModernText as="h3" size="xl" weight="bold" className="mb-2">
                        {event.name}
                      </ModernText>
                      <ModernText as="p" size="sm" color="primary" className="mb-4">
                        {event.date}
                      </ModernText>
                      <ModernText as="p" color="muted" className="mb-4">
                        {event.description}
                      </ModernText>
                      <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        Learn More
                      </button>
                    </div>
                  ))}
                </ModernGrid>
              </ModernSection>
            )}
            
            {/* Map Section */}
            <ModernSection 
              id="park-map" 
              withPattern={false} 
              animationEffect="fade-up" 
              animationDelay={0}
            >
              <ModernText as="h2" size="3xl" weight="bold" className="mb-8 text-center">
                Location & Directions
              </ModernText>
              
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden aspect-video relative">
                {/* In a real implementation, this would be a Google Maps or similar component */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <ModernText as="p" color="muted">
                    Interactive map would be displayed here
                  </ModernText>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    Get Directions
                  </button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <ModernText as="p" size="lg">
                  {park.name} is located at {park.location.address}
                </ModernText>
              </div>
            </ModernSection>
          </>
        )}
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default ParkDetailPage;
