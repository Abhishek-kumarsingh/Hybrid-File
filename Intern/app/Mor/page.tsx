"use client";

import { navItems } from "@/data";
import React from "react"; // Import React if not already imported
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Simp from "@/app/Mor/Simp";

const Home = () => {
    const handleLocationClick = () => {
        // Implement your logic here
        console.log("Location clicked!");
    };

    return (
        <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
                <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />
                <Hero />
                <Simp />
                <Footer />
            </div>
        </main>
    );
};

export default Home;
