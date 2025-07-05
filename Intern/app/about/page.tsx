"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

// Import our new modern components
import ModernSection from "@/components/ui/design-system/ModernSection";
import ModernText from "@/components/ui/design-system/ModernText";
import ModernGrid from "@/components/ui/design-system/ModernGrid";
import ModernCard from "@/components/ui/design-system/ModernCard";

const Home = () => {
    const handleLocationClick = () => {
        // Implement your logic here
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
                {/* About Us section */}
                <ModernSection
                    id="about-us"
                    withPattern={true}
                    animationEffect="fade-up"
                    animationDelay={0}
                    className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10"
                >
                    <div className="text-center mb-10">
                        <ModernText as="h2" size="3xl" weight="bold" gradient={true} animationDelay={1}>
                            About Delhi Development Authority
                        </ModernText>
                        <ModernText as="p" size="lg" color="muted" className="mt-4 max-w-3xl mx-auto" animationDelay={2}>
                            Committed to creating and maintaining green spaces for the citizens of Delhi since 1957.
                        </ModernText>
                    </div>

                    <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
                        <ModernText as="p" size="lg" className="mb-6">
                            The Delhi Development Authority (DDA) was established in 1957 under the Delhi Development Act to promote and secure the development of Delhi.
                            One of our key responsibilities is the development and maintenance of parks, gardens, and green spaces throughout the city.
                        </ModernText>

                        <ModernText as="p" size="lg" className="mb-6">
                            Our parks division is dedicated to creating sustainable, accessible, and beautiful green spaces that enhance the quality of life for Delhi's residents and visitors.
                            We manage over 800 parks and gardens across the city, ranging from small neighborhood parks to large district parks and biodiversity zones.
                        </ModernText>
                    </div>
                </ModernSection>

                {/* Our Mission section */}
                <ModernSection
                    id="mission"
                    withGradient={true}
                    animationEffect="fade-up"
                    animationDelay={0}
                    paddingY="xl"
                    className="bg-dot-pattern"
                >
                    <ModernGrid columns={{ sm: 1, md: 2 }} gap="lg">
                        <div>
                            <ModernText as="h3" size="2xl" weight="bold" color="primary" animationDelay={1}>
                                Our Mission
                            </ModernText>
                            <ModernText as="p" size="lg" className="mt-4" animationDelay={2}>
                                To create, develop, and maintain world-class parks and green spaces that promote environmental sustainability,
                                community well-being, and ecological balance in the National Capital Territory of Delhi.
                            </ModernText>
                        </div>
                        <div>
                            <ModernText as="h3" size="2xl" weight="bold" color="secondary" animationDelay={3}>
                                Our Vision
                            </ModernText>
                            <ModernText as="p" size="lg" className="mt-4" animationDelay={4}>
                                A greener, healthier Delhi with accessible parks and gardens that enhance biodiversity,
                                improve air quality, and provide recreational spaces for all citizens.
                            </ModernText>
                        </div>
                    </ModernGrid>
                </ModernSection>

                {/* Key Initiatives section */}
                <ModernSection
                    id="initiatives"
                    withPattern={true}
                    animationEffect="fade-up"
                    animationDelay={0}
                >
                    <ModernText as="h2" size="3xl" weight="bold" align="center" className="mb-10" animationDelay={1}>
                        Key Initiatives
                    </ModernText>

                    <ModernGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg" staggered={true} animationEffect="fade-up" animationDelay={2}>
                        <ModernCard
                            title="Biodiversity Parks"
                            description="Restoration of degraded ecosystems to create self-sustaining natural reserves within the urban landscape."
                            variant="primary"
                            animationDelay={0}
                        />
                        <ModernCard
                            title="Smart Parks Initiative"
                            description="Integration of technology for efficient water management, solar lighting, and visitor amenities."
                            variant="secondary"
                            animationDelay={1}
                        />
                        <ModernCard
                            title="Community Gardens"
                            description="Collaborative spaces where residents can grow plants and vegetables while building community connections."
                            variant="accent"
                            animationDelay={2}
                        />
                        <ModernCard
                            title="Water Conservation"
                            description="Implementation of rainwater harvesting and water recycling systems in parks across Delhi."
                            variant="primary"
                            animationDelay={3}
                        />
                        <ModernCard
                            title="Urban Forests"
                            description="Development of dense plantations using native species to create urban carbon sinks."
                            variant="secondary"
                            animationDelay={4}
                        />
                        <ModernCard
                            title="Inclusive Recreation"
                            description="Creating accessible play areas and facilities for people of all ages and abilities."
                            variant="accent"
                            animationDelay={5}
                        />
                    </ModernGrid>
                </ModernSection>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
};

export default Home;
