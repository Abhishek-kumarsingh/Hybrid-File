// Import necessary libraries
"use client"
import React, { useEffect, useState } from "react";
import { navItems } from "@/data";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import CardHoverEffectDemo from "@/app/type/[type]/Simp";
import { Park } from "@/types/types";

const Home: React.FC = () => {
    const [parksData, setParksData] = useState<Park[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleLocationClick = () => {
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

            const apiUrl = `/api/type/${parkName}`;

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
                setParksData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching park data:', error);
            }
        };

        fetchParkData();
    }, []);

    return (
        <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
                <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />
                <Hero />
                {loading ? (
                    <p>Loading...</p>
                ) : parksData.length ? (
                    <CardHoverEffectDemo parksData={parksData} />
                ) : (
                    <p>No park data found.</p>
                )}
                <Footer />
            </div>
        </main>
    );
};

export default Home;
