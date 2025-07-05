'use client';

import React from 'react';
import { Container } from 'react-bootstrap';
import PropertyGrid from '@/components/property/PropertyGrid';

const PropertiesPage = () => {
    const handleFavorite = (propertyId: string, isFavorite: boolean) => {
        // Handle favorite logic here
        // You can integrate with user preferences or local storage
        console.log(`Property ${propertyId} ${isFavorite ? 'added to' : 'removed from'} favorites`);
    };

    return (
        <div className="properties-page">
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <Container>
                    <div className="text-center">
                        <h1 className="display-4 fw-bold mb-3">Find Your Dream Property</h1>
                        <p className="lead mb-0">
                            Discover the perfect home from our extensive collection of premium properties
                        </p>
                    </div>
                </Container>
            </section>

            {/* Properties Grid */}
            <section className="py-5">
                <PropertyGrid
                    showFilters={true}
                    itemsPerPage={12}
                    showOwner={true}
                    onFavorite={handleFavorite}
                />
            </section>
        </div>
    );
};

export default PropertiesPage;
