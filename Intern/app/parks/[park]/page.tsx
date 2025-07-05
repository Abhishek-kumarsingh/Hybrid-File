"use client";

import { useEffect, useState } from 'react';
import { navItems } from "@/data";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import ParentComponent from "@/components/ui/ParentComponent";
import GoogleMapComponent from "@/components/ui/GoogleMapComponent";
import Attraction from "@/components/Attraction";
import { Demo } from "@/app/parks/Demo";
import { Park } from "@/types/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { FaStar, FaComments } from "react-icons/fa";

const Home = () => {
    const [parkData, setParkData] = useState<Park | null>(null);

    const handleLocationClick = () => {
        // Implement your logic here
        console.log("Location clicked!");
    };

    useEffect(() => {
        const fetchParkData = async () => {
            const url = new URL(window.location.href);
            const parkName = url.pathname.split('/').pop(); // Extract the last part of the URL as the park name

            if (!parkName) {
                console.error('Invalid park name');
                return;
            }

            const apiUrl = `/api/parks/${parkName}`;

            try {
                const res = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Error fetching park data');
                }

                const data = await res.json();
                setParkData(data);
            } catch (error) {
                console.error('Error fetching park data:', error);
            }
        };

        fetchParkData();
    }, []);
    return (
        <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
            {/* Fixed navigation */}
            <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

            {/* Hero section */}
            <Hero />

            {/* Main content with container styling */}
            <div className="w-full">
                {/* Park details */}
                <ScrollReveal>
                    {parkData ? (
                        <Demo parkData={parkData} />
                    ) : (
                        <div className="container-section">
                            <div className="animate-pulse space-y-4">
                                <div className="h-32 bg-muted rounded-lg w-full"></div>
                            </div>
                        </div>
                    )}
                </ScrollReveal>

                {/* Rate & Feedback button */}
                {parkData && (
                    <ScrollReveal delay={0.2}>
                        <div className="container-section py-4">
                            <Link href={`/parks/${parkData.url}/feedback`}>
                                <button className="btn-accent w-full md:w-auto flex items-center justify-center gap-2 py-3 px-6">
                                    <FaStar />
                                    <FaComments />
                                    <span>Rate & Provide Feedback</span>
                                </button>
                            </Link>
                        </div>
                    </ScrollReveal>
                )}

                {/* Additional information */}
                <ScrollReveal delay={0.3}>
                    <ParentComponent />
                </ScrollReveal>

                {/* Map */}
                <ScrollReveal delay={0.4}>
                    {parkData ? (
                        <GoogleMapComponent parkData={parkData} />
                    ) : (
                        <div className="container-section">
                            <div className="animate-pulse space-y-4">
                                <div className="h-64 bg-muted rounded-lg w-full"></div>
                            </div>
                        </div>
                    )}
                </ScrollReveal>

                {/* Attractions */}
                <ScrollReveal delay={0.5}>
                    <Attraction />
                </ScrollReveal>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
};

export default Home;
