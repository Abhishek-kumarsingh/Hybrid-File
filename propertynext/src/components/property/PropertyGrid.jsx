'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Pagination, Form, Button } from 'react-bootstrap';
import { propertyApi } from '@/lib/api-client';
import PropertyCard from './PropertyCard';
import { IconifyIcon } from '@/components/wrappers/IconifyIcon';
import { toast } from 'react-hot-toast';

const PropertyGrid = ({
    filters = {},
    showFilters = true,
    itemsPerPage = 12,
    showOwner = false,
    onFavorite = null
}) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: itemsPerPage,
        total: 0,
        pages: 0
    });
    const [localFilters, setLocalFilters] = useState({
        search: '',
        type: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        city: '',
        status: 'ACTIVE',
        sortBy: 'createdAt',
        sortOrder: 'desc',
        ...filters
    });
    const [favorites, setFavorites] = useState(new Set());

    const propertyTypes = [
        { value: '', label: 'All Types' },
        { value: 'house', label: 'House' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'villa', label: 'Villa' },
        { value: 'studio', label: 'Studio' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'land', label: 'Land' }
    ];

    const bedroomOptions = [
        { value: '', label: 'Any Bedrooms' },
        { value: '1', label: '1+ Bedroom' },
        { value: '2', label: '2+ Bedrooms' },
        { value: '3', label: '3+ Bedrooms' },
        { value: '4', label: '4+ Bedrooms' },
        { value: '5', label: '5+ Bedrooms' }
    ];

    const sortOptions = [
        { value: 'createdAt-desc', label: 'Newest First' },
        { value: 'createdAt-asc', label: 'Oldest First' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'title-asc', label: 'Name: A to Z' },
        { value: 'title-desc', label: 'Name: Z to A' },
        { value: 'area-desc', label: 'Largest First' },
        { value: 'area-asc', label: 'Smallest First' }
    ];

    const fetchProperties = async (page = 1, newFilters = localFilters) => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: pagination.limit,
                ...newFilters
            };

            // Remove empty filters
            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === null || params[key] === undefined) {
                    delete params[key];
                }
            });

            const response = await propertyApi.getAll(params);
            setProperties(response.properties);
            setPagination(response.pagination);
        } catch (error) {
            console.error('Error fetching properties:', error);
            toast.error('Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        // Auto-search for certain filters
        if (key === 'type' || key === 'bedrooms' || key === 'status') {
            fetchProperties(1, newFilters);
        }
    };

    const handleSortChange = (sortValue) => {
        const [sortBy, sortOrder] = sortValue.split('-');
        const newFilters = { ...localFilters, sortBy, sortOrder };
        setLocalFilters(newFilters);
        fetchProperties(1, newFilters);
    };

    const handleSearch = () => {
        fetchProperties(1, localFilters);
    };

    // Debounced search for text inputs
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (localFilters.search || localFilters.city || localFilters.minPrice || localFilters.maxPrice) {
                fetchProperties(1, localFilters);
            }
        }, 500); // 500ms delay

        return () => clearTimeout(timeoutId);
    }, [localFilters.search, localFilters.city, localFilters.minPrice, localFilters.maxPrice]);

    const handlePageChange = (page) => {
        fetchProperties(page);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFavoriteToggle = (propertyId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(propertyId)) {
            newFavorites.delete(propertyId);
            toast.success('Removed from favorites');
        } else {
            newFavorites.add(propertyId);
            toast.success('Added to favorites');
        }
        setFavorites(newFavorites);

        if (onFavorite) {
            onFavorite(propertyId, newFavorites.has(propertyId));
        }
    };

    const clearFilters = () => {
        const clearedFilters = {
            search: '',
            type: '',
            minPrice: '',
            maxPrice: '',
            bedrooms: '',
            city: '',
            status: 'ACTIVE',
            sortBy: 'createdAt',
            sortOrder: 'desc'
        };
        setLocalFilters(clearedFilters);
        fetchProperties(1, clearedFilters);
    };

    return (
        <div className="property-grid">
            {/* Filters */}
            {showFilters && (
                <div className="bg-light py-4 mb-4">
                    <Container>
                        <Row className="g-3">
                            <Col md={3}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search properties..."
                                    value={localFilters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Select
                                    value={localFilters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                >
                                    {propertyTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    placeholder="Min Price"
                                    value={localFilters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    placeholder="Max Price"
                                    value={localFilters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Select
                                    value={localFilters.bedrooms}
                                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                                >
                                    {bedroomOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={1}>
                                <Button variant="primary" onClick={handleSearch} className="w-100">
                                    <IconifyIcon icon="solar:magnifer-bold" />
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={3}>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    value={localFilters.city}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Select
                                    value={`${localFilters.sortBy}-${localFilters.sortOrder}`}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                >
                                    {sortOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={3}>
                                <Button variant="outline-secondary" onClick={clearFilters}>
                                    <IconifyIcon icon="solar:refresh-bold" className="me-2" />
                                    Clear Filters
                                </Button>
                            </Col>
                            <Col md={3}>
                                <div className="text-muted small">
                                    <IconifyIcon icon="solar:info-circle-bold" className="me-1" />
                                    Search updates automatically as you type
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}

            <Container>
                {/* Results Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4>
                        {loading ? 'Loading...' : `${pagination.total} Properties Found`}
                    </h4>
                    <div className="text-muted">
                        {!loading && pagination.total > 0 && (
                            <>
                                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                            </>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-5">
                        <Spinner animation="border" size="lg" />
                        <p className="mt-3">Loading properties...</p>
                    </div>
                )}

                {/* No Results */}
                {!loading && properties.length === 0 && (
                    <Alert variant="info" className="text-center py-5">
                        <IconifyIcon icon="solar:home-smile-bold" className="fs-1 mb-3" />
                        <h5>No properties found</h5>
                        <p>Try adjusting your search criteria or clear filters to see more results.</p>
                        <Button variant="primary" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    </Alert>
                )}

                {/* Property Grid */}
                {!loading && properties.length > 0 && (
                    <>
                        <Row className="g-4">
                            {properties.map((property) => (
                                <Col key={property.id} lg={4} md={6}>
                                    <PropertyCard
                                        property={property}
                                        onFavorite={handleFavoriteToggle}
                                        isFavorite={favorites.has(property.id)}
                                        showOwner={showOwner}
                                    />
                                </Col>
                            ))}
                        </Row>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination>
                                    <Pagination.First
                                        disabled={pagination.page === 1}
                                        onClick={() => handlePageChange(1)}
                                    />
                                    <Pagination.Prev
                                        disabled={pagination.page === 1}
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                    />

                                    {/* Page Numbers */}
                                    {[...Array(Math.min(5, pagination.pages))].map((_, index) => {
                                        let pageNumber;
                                        if (pagination.pages <= 5) {
                                            pageNumber = index + 1;
                                        } else if (pagination.page <= 3) {
                                            pageNumber = index + 1;
                                        } else if (pagination.page >= pagination.pages - 2) {
                                            pageNumber = pagination.pages - 4 + index;
                                        } else {
                                            pageNumber = pagination.page - 2 + index;
                                        }

                                        return (
                                            <Pagination.Item
                                                key={pageNumber}
                                                active={pagination.page === pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                            >
                                                {pageNumber}
                                            </Pagination.Item>
                                        );
                                    })}

                                    <Pagination.Next
                                        disabled={pagination.page === pagination.pages}
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                    />
                                    <Pagination.Last
                                        disabled={pagination.page === pagination.pages}
                                        onClick={() => handlePageChange(pagination.pages)}
                                    />
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default PropertyGrid;
