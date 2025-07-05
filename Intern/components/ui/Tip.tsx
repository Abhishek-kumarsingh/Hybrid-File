import React from "react";
import { AnimatedTooltip } from "./animatedtooltip";
import { motion } from "framer-motion";

const people = [
    {
        id: 1,
        name: "John Doe",
        designation: "Park Manager",
        image: "/images/image1.jpg", // Adjust the image paths based on your actual file names
    },
    {
        id: 2,
        name: "Robert Johnson",
        designation: "Horticulturist",
        image: "/images/image2.jpg",
    },
    {
        id: 3,
        name: "Jane Smith",
        designation: "Conservation Specialist",
        image: "/images/image3.jpg",
    },
    {
        id: 4,
        name: "Emily Davis",
        designation: "Community Coordinator",
        image: "/images/image3.jpg",
    },
    // Add more people as needed
];

export function Tip() {
    return (
        <div className="flex flex-col items-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                Meet our dedicated team of park professionals working to maintain and improve Delhi's green spaces.
            </p>

            <motion.div
                className="flex flex-row flex-wrap items-center justify-center w-full gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    staggerChildren: 0.1
                }}
            >
                <AnimatedTooltip items={people} />
            </motion.div>

            <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <a
                    href="/team"
                    className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center text-sm group"
                >
                    <span>View Full Team</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </motion.div>
        </div>
    );
}

export default Tip;
