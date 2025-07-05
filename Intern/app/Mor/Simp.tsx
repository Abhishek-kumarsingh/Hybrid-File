import { useState } from 'react';
import { HoverEffect } from '@/components/ui/hovereffect';

interface Project {
    name: string;
    description: string;
    url: string;
    distance: number;
    rating: number;
    cost: number;
}

export const CardHoverEffectDemo = () => {
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
    const [distanceFilter, setDistanceFilter] = useState<string>('All');
    const [ratingFilter, setRatingFilter] = useState<string>('All');
    const [costFilter, setCostFilter] = useState<string>('All');

    // Function to handle distance filter
    const handleDistanceFilter = (distance: string) => {
        setDistanceFilter(distance);
        filterProjects(distance, ratingFilter, costFilter);
    };

    // Function to handle rating filter
    const handleRatingFilter = (rating: string) => {
        setRatingFilter(rating);
        filterProjects(distanceFilter, rating, costFilter);
    };

    // Function to handle cost filter
    const handleCostFilter = (cost: string) => {
        setCostFilter(cost);
        filterProjects(distanceFilter, ratingFilter, cost);
    };

    // Function to filter projects based on distance, rating, and cost filters
    const filterProjects = (distance: string, rating: string, cost: string) => {
        let filtered = projects;

        // Apply distance filter
        if (distance !== 'All') {
            filtered = filtered.filter((project) => project.distance <= parseInt(distance));
        }

        // Apply rating filter
        if (rating !== 'All') {
            filtered = filtered.filter((project) => project.rating >= parseFloat(rating));
        }

        // Apply cost filter
        if (cost !== 'All') {
            filtered = filtered.filter((project) => project.cost <= parseInt(cost));
        }

        setFilteredProjects(filtered);
    };

    return (
        <div className="max-w-5xl mx-auto px-8">
            {/* Distance, Rating, and Cost filter sections */}
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4 md:mb-8">
                {/* Distance filter dropdown */}
                <div className="flex-1">
                    <label htmlFor="distanceFilter" className="sr-only">Select Distance Filter</label>
                    <select
                        id="distanceFilter"
                        value={distanceFilter}
                        onChange={(e) => handleDistanceFilter(e.target.value)}
                        aria-label="Select Distance Filter"
                        className="dropdown-filter rounded-lg bg-transparent border border-gray-300 px-4 py-2 w-full"
                    >
                        <option value="All">All</option>
                        <option value="3">Within 3 km</option>
                        <option value="5">Within 5 km</option>
                        <option value="10">Within 10 km</option>
                    </select>
                </div>

                {/* Rating filter dropdown */}
                <div className="flex-1">
                    <label htmlFor="ratingFilter" className="sr-only">Select Rating Filter</label>
                    <select
                        id="ratingFilter"
                        value={ratingFilter}
                        onChange={(e) => handleRatingFilter(e.target.value)}
                        aria-label="Select Rating Filter"
                        className="dropdown-filter rounded-lg bg-transparent border border-gray-300 px-4 py-2 w-full"
                    >
                        <option value="All">Top Rating</option>
                        <option value="4.5">4.5+</option>
                        <option value="4.0">4.0+</option>
                        <option value="3.5">3.5+</option>
                    </select>
                </div>

                {/* Cost filter dropdown */}
                <div className="flex-1">
                    <label htmlFor="costFilter" className="sr-only">Select Cost Filter</label>
                    <select
                        id="costFilter"
                        value={costFilter}
                        onChange={(e) => handleCostFilter(e.target.value)}
                        aria-label="Select Cost Filter"
                        className="dropdown-filter rounded-lg bg-transparent border border-gray-300 px-4 py-2 w-full"
                    >
                        <option value="All">Money Less Than...</option>
                        <option value="1000">Less than $1000</option>
                        <option value="500">Less than $500</option>
                        <option value="100">Less than $100</option>
                    </select>
                </div>
            </div>

            {/* Filtered projects section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Top Ratings</h2>
                <HoverEffect items={filteredProjects} />
            </div>

            {/* Most Visited section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Most Visited</h2>
                <HoverEffect items={filteredProjects.slice(0, 3)} /> {/* Display top 3 most visited projects */}
            </div>

            {/* Popular section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Popular</h2>
                <HoverEffect items={filteredProjects.slice(0, 3)} /> {/* Display top 3 most visited projects */}

            </div>

        </div>
    );
};

const projects: Project[] = [
    {
        name: "Restaurant A",
        description: "A great restaurant within 3 km.",
        url: "https://example.com",
        distance: 3,
        rating: 4.7,
        cost: 500,
    },
    {
        name: "Restaurant B",
        description: "Another restaurant within 5 km.",
        url: "https://example.com",
        distance: 5,
        rating: 4.5,
        cost: 800,
    },
    {
        name: "Restaurant C",
        description: "A popular restaurant within 10 km.",
        url: "https://example.com",
        distance: 10,
        rating: 4.2,
        cost: 300,
    },
    // Add more projects with distance, rating, and cost properties
];

export default CardHoverEffectDemo;
