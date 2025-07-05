'use client';

import React, { useState } from 'react';
import { Card, CardBody, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { IconifyIcon } from '@/components/wrappers/IconifyIcon';

const PropertySearch = ({ onSearch, loading = false, className = '' }) => {
    const [searchData, setSearchData] = useState({
        search: '',
        type: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        city: '',
        state: ''
    });

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
        { value: '', label: 'Any' },
        { value: '1', label: '1+' },
        { value: '2', label: '2+' },
        { value: '3', label: '3+' },
        { value: '4', label: '4+' },
        { value: '5', label: '5+' }
    ];

    const bathroomOptions = [
        { value: '', label: 'Any' },
        { value: '1', label: '1+' },
        { value: '2', label: '2+' },
        { value: '3', label: '3+' },
        { value: '4', label: '4+' }
    ];

    const priceRanges = [
        { min: '', max: '', label: 'Any Price' },
        { min: '0', max: '100000', label: 'Under $100K' },
        { min: '100000', max: '250000', label: '$100K - $250K' },
        { min: '250000', max: '500000', label: '$250K - $500K' },
        { min: '500000', max: '750000', label: '$500K - $750K' },
        { min: '750000', max: '1000000', label: '$750K - $1M' },
        { min: '1000000', max: '', label: 'Over $1M' }
    ];

    const handleInputChange = (field, value) => {
        setSearchData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePriceRangeChange = (range) => {
        setSearchData(prev => ({
            ...prev,
            minPrice: range.min,
            maxPrice: range.max
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Remove empty values
        const cleanedData = Object.keys(searchData).reduce((acc, key) => {
            if (searchData[key] !== '' && searchData[key] !== null && searchData[key] !== undefined) {
                acc[key] = searchData[key];
            }
            return acc;
        }, {});

        onSearch(cleanedData);
    };

    const handleReset = () => {
        const resetData = {
            search: '',
            type: '',
            minPrice: '',
            maxPrice: '',
            bedrooms: '',
            bathrooms: '',
            city: '',
            state: ''
        };
        setSearchData(resetData);
        onSearch(resetData);
    };

    return (
        <Card className={`property-search ${className}`}>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    {/* Main Search Bar */}
                    <Row className="mb-3">
                        <Col>
                            <InputGroup size="lg">
                                <InputGroup.Text>
                                    <IconifyIcon icon="solar:magnifer-bold" />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by location, property name, or keywords..."
                                    value={searchData.search}
                                    onChange={(e) => handleInputChange('search', e.target.value)}
                                />
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <IconifyIcon icon="solar:refresh-bold" className="me-2 spin" />
                                            Searching...
                                        </>
                                    ) : (
                                        <>
                                            <IconifyIcon icon="solar:magnifer-bold" className="me-2" />
                                            Search
                                        </>
                                    )}
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    {/* Advanced Filters */}
                    <Row className="g-3">
                        {/* Property Type */}
                        <Col md={3}>
                            <Form.Label>Property Type</Form.Label>
                            <Form.Select
                                value={searchData.type}
                                onChange={(e) => handleInputChange('type', e.target.value)}
                            >
                                {propertyTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        {/* Price Range */}
                        <Col md={3}>
                            <Form.Label>Price Range</Form.Label>
                            <Form.Select
                                value={`${searchData.minPrice}-${searchData.maxPrice}`}
                                onChange={(e) => {
                                    const [min, max] = e.target.value.split('-');
                                    handlePriceRangeChange({ min, max });
                                }}
                            >
                                {priceRanges.map((range, index) => (
                                    <option key={index} value={`${range.min}-${range.max}`}>
                                        {range.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        {/* Bedrooms */}
                        <Col md={2}>
                            <Form.Label>Bedrooms</Form.Label>
                            <Form.Select
                                value={searchData.bedrooms}
                                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                            >
                                {bedroomOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        {/* Bathrooms */}
                        <Col md={2}>
                            <Form.Label>Bathrooms</Form.Label>
                            <Form.Select
                                value={searchData.bathrooms}
                                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                            >
                                {bathroomOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        {/* Reset Button */}
                        <Col md={2} className="d-flex align-items-end">
                            <Button
                                variant="outline-secondary"
                                className="w-100"
                                onClick={handleReset}
                                disabled={loading}
                            >
                                <IconifyIcon icon="solar:refresh-bold" className="me-2" />
                                Reset
                            </Button>
                        </Col>
                    </Row>

                    {/* Location Filters */}
                    <Row className="g-3 mt-2">
                        <Col md={6}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                value={searchData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter state"
                                value={searchData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                            />
                        </Col>
                    </Row>

                    {/* Custom Price Range */}
                    <Row className="g-3 mt-2">
                        <Col md={6}>
                            <Form.Label>Min Price ($)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Minimum price"
                                value={searchData.minPrice}
                                onChange={(e) => handleInputChange('minPrice', e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Max Price ($)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Maximum price"
                                value={searchData.maxPrice}
                                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>
            </CardBody>


        </Card>
    );
};

export default PropertySearch;
