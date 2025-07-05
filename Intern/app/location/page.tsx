"use client";

import { navItems } from "@/data";
import { useState } from "react";
import { FaMapMarkerAlt, FaDirections, FaSearch, FaFilter, FaList, FaThLarge } from "react-icons/fa";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import ModernCard from "@/components/ui/design-system/ModernCard";

// Sample location data
const parkLocations = [
    {
        id: 1,
        name: "Lodhi Gardens",
        address: "Lodhi Road, New Delhi",
        district: "Central Delhi",
        type: "Heritage Park",
        facilities: ["Walking Trails", "Historical Monuments", "Picnic Areas", "Botanical Garden"],
        image: "/images/image1.jpg",
        coordinates: { lat: 28.5933, lng: 77.2207 }
    },
    {
        id: 2,
        name: "Nehru Park",
        address: "Vinay Marg, Chanakyapuri, New Delhi",
        district: "South Delhi",
        type: "City Park",
        facilities: ["Jogging Track", "Open Gym", "Children's Play Area", "Musical Fountain"],
        image: "/images/image2.jpg",
        coordinates: { lat: 28.5883, lng: 77.1989 }
    },
    {
        id: 3,
        name: "Deer Park",
        address: "Hauz Khas, New Delhi",
        district: "South Delhi",
        type: "Wildlife Park",
        facilities: ["Lake", "Deer Enclosure", "Walking Paths", "Bird Watching"],
        image: "/images/image3.jpg",
        coordinates: { lat: 28.5542, lng: 77.2030 }
    },
    {
        id: 4,
        name: "Buddha Jayanti Park",
        address: "Ridge Road, New Delhi",
        district: "North Delhi",
        type: "Themed Park",
        facilities: ["Buddha Statue", "Meditation Areas", "Picnic Spots", "Nature Trails"],
        image: "/images/image1.jpg",
        coordinates: { lat: 28.6129, lng: 77.1824 }
    },
    {
        id: 5,
        name: "Japanese Park",
        address: "Sector 12, Rohini, New Delhi",
        district: "North West Delhi",
        type: "Themed Park",
        facilities: ["Japanese Garden", "Amphitheater", "Boating", "Children's Play Area"],
        image: "/images/image2.jpg",
        coordinates: { lat: 28.7351, lng: 77.1179 }
    },
    {
        id: 6,
        name: "District Park Janakpuri",
        address: "C-2 Block, Janakpuri, New Delhi",
        district: "West Delhi",
        type: "District Park",
        facilities: ["Sports Facilities", "Walking Track", "Open Gym", "Children's Area"],
        image: "/images/image3.jpg",
        coordinates: { lat: 28.6209, lng: 77.0791 }
    },
];

// Filter options
const districts = ["All Districts", "Central Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi", "North West Delhi"];
const parkTypes = ["All Types", "Heritage Park", "City Park", "Wildlife Park", "Themed Park", "District Park"];

const LocationPage = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
    const [selectedType, setSelectedType] = useState("All Types");
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleLocationClick = () => {
        console.log("Location clicked!");
    };

    // Filter parks based on selections
    const filteredParks = parkLocations.filter(park => {
        const matchesDistrict = selectedDistrict === "All Districts" || park.district === selectedDistrict;
        const matchesType = selectedType === "All Types" || park.type === selectedType;
        const matchesSearch = searchQuery === "" || 
            park.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            park.address.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesDistrict && matchesType && matchesSearch;
    });

    return (
        <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
            {/* Fixed navigation */}
            <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

            {/* Hero section */}
            <Hero />

            {/* Main content with container styling */}
            <div className="w-full">
                {/* Location Introduction */}
                <ModernSection 
                    id="location-intro" 
                    withPattern={true} 
                    animationEffect="fade-up" 
                    animationDelay={0}
                    className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
                >
                    <div className="text-center mb-10">
                        <ModernText as="h2" size="3xl" weight="bold" gradient={true} animationDelay={1}>
                            Find Parks Near You
                        </ModernText>
                        <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
                            Discover DDA parks and gardens across Delhi with our interactive location finder.
                        </ModernText>
                    </div>
                </ModernSection>

                {/* Search and Filter Section */}
                <ModernSection 
                    id="search-filter" 
                    withGradient={false} 
                    animationEffect="fade-up" 
                    animationDelay={0}
                    paddingY="md"
                    className="bg-white dark:bg-gray-900 shadow-sm"
                >
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-1/3" data-aos="fade-right">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search parks by name or address..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        {/* Filters */}
                        <div className="flex flex-wrap gap-3 items-center" data-aos="fade-left">
                            <div className="flex items-center">
                                <FaFilter className="mr-2 text-gray-500" />
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
                            
                            <select 
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                {parkTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            
                            {/* View toggle */}
                            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                <button 
                                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <FaThLarge className={viewMode === 'grid' ? 'text-green-600' : 'text-gray-500'} />
                                </button>
                                <button 
                                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <FaList className={viewMode === 'list' ? 'text-green-600' : 'text-gray-500'} />
                                </button>
                            </div>
                        </div>
                    </div>
                </ModernSection>

                {/* Parks Listing */}
                <ModernSection 
                    id="parks-listing" 
                    withPattern={true} 
                    animationEffect="fade-up" 
                    animationDelay={0}
                    paddingY="xl"
                >
                    {filteredParks.length > 0 ? (
                        viewMode === 'grid' ? (
                            <ModernGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg" staggered={true} animationEffect="fade-up" animationDelay={1}>
                                {filteredParks.map((park, index) => (
                                    <ModernCard 
                                        key={park.id}
                                        title={park.name} 
                                        description={
                                            <div>
                                                <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
                                                    <FaMapMarkerAlt className="mr-2" />
                                                    {park.address}
                                                </div>
                                                <div className="mt-3">
                                                    <ModernText as="h4" size="sm" weight="medium" color="muted">
                                                        Facilities:
                                                    </ModernText>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {park.facilities.slice(0, 3).map(facility => (
                                                            <span 
                                                                key={facility} 
                                                                className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                                            >
                                                                {facility}
                                                            </span>
                                                        ))}
                                                        {park.facilities.length > 3 && (
                                                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                                                +{park.facilities.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        image={park.image}
                                        variant={index % 3 === 0 ? "primary" : index % 3 === 1 ? "secondary" : "accent"}
                                        animationDelay={index * 0.1}
                                    >
                                        <button className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                                            <FaDirections />
                                            <span>Get Directions</span>
                                        </button>
                                    </ModernCard>
                                ))}
                            </ModernGrid>
                        ) : (
                            <div className="space-y-4" data-aos="fade-up">
                                {filteredParks.map((park, index) => (
                                    <div 
                                        key={park.id} 
                                        className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        <div className="relative w-full md:w-1/4 h-48 md:h-auto">
                                            <img 
                                                src={park.image} 
                                                alt={park.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <ModernText as="h3" size="xl" weight="bold">
                                                {park.name}
                                            </ModernText>
                                            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                                                <FaMapMarkerAlt className="mr-2" />
                                                {park.address}
                                            </div>
                                            <div className="mt-2">
                                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 mr-2">
                                                    {park.district}
                                                </span>
                                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                                                    {park.type}
                                                </span>
                                            </div>
                                            <div className="mt-3">
                                                <ModernText as="h4" size="sm" weight="medium" color="muted">
                                                    Facilities:
                                                </ModernText>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {park.facilities.map(facility => (
                                                        <span 
                                                            key={facility} 
                                                            className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                                        >
                                                            {facility}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                                                    <FaDirections />
                                                    <span>Get Directions</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="text-center py-12">
                            <ModernText as="h3" size="xl" weight="medium" color="muted">
                                No parks found matching your criteria
                            </ModernText>
                            <ModernText as="p" className="mt-2">
                                Try adjusting your filters or search query
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

export default LocationPage;
