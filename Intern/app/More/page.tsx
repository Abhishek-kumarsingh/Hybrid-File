"use client";

import { navItems } from "@/data";

import More1 from "@/components/More";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { useEffect, useState } from "react";
import { Park } from "@/types/types"

const More = () => {
    const [parkData, setParkData] = useState<Park[] | null>(null);

    const handleLocationClick = () => {
        // Implement your logic here
        console.log("Location clicked!");
    };

    useEffect(() => {
        const fetchParkData = async () => {
            const apiUrl = `/api/parks`;

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
        <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
                <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />
                {parkData ? <More1 parks={parkData} /> : <p> No Nearby Parks Found </p>}
                <Footer />
            </div>
        </main>
    );
};

export default More;
