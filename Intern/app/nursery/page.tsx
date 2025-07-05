"use client";

import { navItems } from "@/data";
import { useState } from "react";
import Image from "next/image";
import { FaLeaf, FaSeedling, FaTree, FaWater, FaShoppingBasket, FaMapMarkerAlt } from "react-icons/fa";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import ModernCard from "@/components/ui/design-system/ModernCard";

// Sample nursery data
const nurseryData = [
    {
        id: 1,
        name: "DDA Central Nursery",
        location: "Siri Fort, South Delhi",
        specialties: ["Native Plants", "Ornamental Trees", "Medicinal Plants"],
        image: "/images/image1.jpg",
    },
    {
        id: 2,
        name: "Yamuna Biodiversity Nursery",
        location: "East Delhi",
        specialties: ["Riverine Species", "Wetland Plants", "Fruit Trees"],
        image: "/images/image2.jpg",
    },
    {
        id: 3,
        name: "Aravalli Green Nursery",
        location: "South Delhi",
        specialties: ["Drought Resistant Plants", "Rock Garden Species", "Succulents"],
        image: "/images/image3.jpg",
    },
    {
        id: 4,
        name: "Delhi Ridge Nursery",
        location: "North Delhi",
        specialties: ["Forest Species", "Shade Trees", "Butterfly Garden Plants"],
        image: "/images/image1.jpg",
    },
];

// Sample plant categories
const plantCategories = [
    { name: "Ornamental Plants", icon: <FaLeaf className="text-green-500 text-2xl" />, count: 120 },
    { name: "Medicinal Herbs", icon: <FaSeedling className="text-green-600 text-2xl" />, count: 85 },
    { name: "Fruit Trees", icon: <FaTree className="text-green-700 text-2xl" />, count: 45 },
    { name: "Water Plants", icon: <FaWater className="text-blue-500 text-2xl" />, count: 30 },
    { name: "Indoor Plants", icon: <FaLeaf className="text-emerald-500 text-2xl" />, count: 75 },
    { name: "Garden Supplies", icon: <FaShoppingBasket className="text-amber-600 text-2xl" />, count: 200 },
];

const NurseryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
                {/* Nursery Introduction */}
                <ModernSection
                    id="nursery-intro"
                    withPattern={true}
                    animationEffect="fade-up"
                    animationDelay={0}
                    className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
                >
                    <div className="text-center mb-10">
                        <ModernText as="h2" size="3xl" weight="bold" gradient={true} animationDelay={1}>
                            DDA Nurseries
                        </ModernText>
                        <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
                            Discover a wide variety of plants, trees, and gardening supplies at our nurseries across Delhi.
                        </ModernText>
                    </div>

                    <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
                        <ModernText as="p" size="lg" className="mb-6">
                            The Delhi Development Authority maintains several nurseries throughout the city to support our parks and gardens,
                            as well as to provide quality plants to the public at affordable prices. Our nurseries specialize in native species,
                            ornamental plants, and environmentally beneficial vegetation suited to Delhi's climate.
                        </ModernText>
                    </div>
                </ModernSection>

                {/* Plant Categories */}
                <ModernSection
                    id="plant-categories"
                    withGradient={true}
                    animationEffect="fade-up"
                    animationDelay={0}
                    paddingY="xl"
                    className="bg-dot-pattern"
                >
                    <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
                        Plant Categories
                    </ModernText>

                    <ModernGrid columns={{ sm: 2, md: 3, lg: 6 }} gap="md" staggered={true} animationEffect="fade-up" animationDelay={2}>
                        {plantCategories.map((category, index) => (
                            <div
                                key={category.name}
                                className={`text-center p-4 rounded-xl transition-all duration-300 cursor-pointer
                                    ${selectedCategory === category.name
                                        ? 'bg-green-100 dark:bg-green-900/30 shadow-md'
                                        : 'hover:bg-green-50 dark:hover:bg-green-900/20'}`}
                                onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
                            >
                                <div className="flex justify-center mb-3">{category.icon}</div>
                                <ModernText as="h3" size="lg" weight="semibold" animationDelay={index}>
                                    {category.name}
                                </ModernText>
                                <ModernText as="p" size="sm" color="muted" animationDelay={index + 0.5}>
                                    {category.count} varieties
                                </ModernText>
                            </div>
                        ))}
                    </ModernGrid>
                </ModernSection>

                {/* Our Nurseries */}
                <ModernSection
                    id="our-nurseries"
                    withPattern={true}
                    animationEffect="fade-up"
                    animationDelay={0}
                >
                    <ModernText as="h2" size="3xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
                        Our Nurseries
                    </ModernText>

                    <ModernGrid columns={{ sm: 1, md: 2 }} gap="lg" staggered={true} animationEffect="fade-up" animationDelay={2}>
                        {nurseryData.map((nursery, index) => (
                            <ModernCard
                                key={nursery.id}
                                title={nursery.name}
                                description={
                                    <div>
                                        <div className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
                                            <FaMapMarkerAlt className="mr-2" />
                                            {nursery.location}
                                        </div>
                                        <div className="mt-3">
                                            <ModernText as="h4" size="sm" weight="medium" color="muted">
                                                Specialties:
                                            </ModernText>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {nursery.specialties.map(specialty => (
                                                    <span
                                                        key={specialty}
                                                        className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                                    >
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                }
                                image={nursery.image}
                                variant={index % 2 === 0 ? "primary" : "secondary"}
                                animationDelay={index}
                                className="h-full"
                            />
                        ))}
                    </ModernGrid>
                </ModernSection>

                {/* Gardening Tips */}
                <ModernSection
                    id="gardening-tips"
                    withGradient={true}
                    animationEffect="fade-up"
                    animationDelay={0}
                    className="glassmorphism my-8"
                >
                    <ModernText as="h2" size="2xl" weight="bold" align="center" className="mb-8" animationDelay={1}>
                        Seasonal Gardening Tips
                    </ModernText>

                    <div className="bg-white/30 dark:bg-black/30 rounded-xl p-6 backdrop-blur-sm">
                        <ModernText as="h3" size="xl" weight="semibold" color="primary" className="mb-4" animationDelay={2}>
                            Summer Gardening in Delhi
                        </ModernText>

                        <ul className="space-y-3 list-disc pl-5">
                            <li data-aos="fade-up" data-aos-delay="300">
                                <ModernText as="p" size="base">
                                    Water plants early in the morning or late in the evening to reduce evaporation.
                                </ModernText>
                            </li>
                            <li data-aos="fade-up" data-aos-delay="350">
                                <ModernText as="p" size="base">
                                    Use mulch around plants to retain soil moisture and reduce watering needs.
                                </ModernText>
                            </li>
                            <li data-aos="fade-up" data-aos-delay="400">
                                <ModernText as="p" size="base">
                                    Choose drought-resistant plants like Bougainvillea, Portulaca, and succulents.
                                </ModernText>
                            </li>
                            <li data-aos="fade-up" data-aos-delay="450">
                                <ModernText as="p" size="base">
                                    Provide shade for sensitive plants during peak afternoon heat.
                                </ModernText>
                            </li>
                        </ul>
                    </div>
                </ModernSection>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
};

export default NurseryPage;
