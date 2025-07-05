'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { HoverEffect } from '@/components/ui/hovereffect';
import { Park } from '@/types/types';

interface CardHoverEffectDemoProps {
    parksData: Park[];
}

const CardHoverEffectDemo: React.FC<CardHoverEffectDemoProps> = ({ parksData }) => {
    const [filteredParks, setFilteredParks] = useState<Park[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [distanceFilter, setDistanceFilter] = useState<string>('All');
    const [ratingFilter, setRatingFilter] = useState<string>('All');
    const [costFilter, setCostFilter] = useState<string>('All');

    useEffect(() => {
        if (parksData.length > 0) {
            setFilteredParks(parksData);
            setIsLoading(false);
        }
    }, [parksData]);

    const filterParks = useCallback((distance: string, rating: string, cost: string) => {
        let filtered = parksData;

        // Apply distance filter
        if (distance !== 'All') {
            filtered = filtered.filter((park) => park.distance !== undefined && park.distance <= parseInt(distance));
        }

        // Apply rating filter
        if (rating !== 'All') {
            filtered = filtered.filter((park) => park.rating !== undefined && park.rating >= parseInt(rating));
        }

        // Apply cost filter
        if (cost !== 'All') {
            filtered = filtered.filter((park) => park.cost !== undefined && park.cost <= parseInt(cost));
        }

        setFilteredParks(filtered);
    }, [parksData]);

    // Function to handle distance filter
    const handleDistanceFilter = (distance: string) => {
        setDistanceFilter(distance);
        filterParks(distance, ratingFilter, costFilter);
    };

    // Function to handle rating filter
    const handleRatingFilter = (rating: string) => {
        setRatingFilter(rating);
        filterParks(distanceFilter, rating, costFilter);
    };

    // Function to handle cost filter
    const handleCostFilter = (cost: string) => {
        setCostFilter(cost);
        filterParks(distanceFilter, ratingFilter, cost);
    };

    if (isLoading) {
        return <div>Loading parks data...</div>;
    }

    if (filteredParks.length === 0) {
        return <div>No parks found matching the current filters.</div>;
    }

    return (
        <section className="max-w-5xl mx-auto px-8">
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

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Top Ratings</h2>
                <HoverEffect items={filteredParks} />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Most Visited</h2>
                <HoverEffect items={filteredParks.slice(0, 3)} />
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Popular</h2>
                <HoverEffect items={filteredParks.slice(0, 3)} />
            </section>
        </section>
    );
};

export default CardHoverEffectDemo;