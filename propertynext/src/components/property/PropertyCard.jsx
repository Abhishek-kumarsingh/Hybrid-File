'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { IconifyIcon } from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';

// Helper functions for property styling
const getPropertyGradient = (propertyType) => {
    const gradients = {
        'Apartment': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'Villa': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'Penthouse': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'Condo': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'Townhouse': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'House': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'Commercial': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'Office': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'default': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    };
    return gradients[propertyType] || gradients.default;
};

const getPropertyIcon = (propertyType) => {
    const icons = {
        'Apartment': 'solar:buildings-3-bold-duotone',
        'Villa': 'solar:home-bold-duotone',
        'Penthouse': 'solar:buildings-2-bold-duotone',
        'Condo': 'solar:home-2-bold-duotone',
        'Townhouse': 'solar:buildings-bold-duotone',
        'House': 'solar:home-smile-bold-duotone',
        'Commercial': 'solar:home-angle-bold-duotone',
        'Office': 'solar:buildings-bold-duotone',
        'default': 'solar:home-bold-duotone'
    };
    return icons[propertyType] || icons.default;
};

const PropertyCard = ({ property, onFavorite, isFavorite = false, showOwner = false }) => {
    const [imageError, setImageError] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getStatusColor = (status) => {
        const colors = {
            ACTIVE: 'success',
            PENDING: 'warning',
            SOLD: 'info',
            RENTED: 'primary',
            INACTIVE: 'secondary'
        };
        return colors[status] || 'secondary';
    };

    const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0];

    return (
        <Card className="property-card h-100 shadow-sm">
            {/* Image Section */}
            <div className="position-relative">
                {primaryImage && !imageError ? (
                    <Image
                        src={primaryImage.url}
                        alt={property.title}
                        width={400}
                        height={250}
                        className="card-img-top object-fit-cover"
                        style={{ height: '250px' }}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div
                        className="card-img-top d-flex align-items-center justify-content-center text-white"
                        style={{
                            height: '250px',
                            background: getPropertyGradient(property.propertyType)
                        }}
                    >
                        <div className="text-center">
                            <IconifyIcon icon={getPropertyIcon(property.propertyType)} className="fs-1 mb-2" />
                            <h6 className="text-white mb-0">{property.propertyType}</h6>
                        </div>
                    </div>
                )}

                {/* Status Badge */}
                <Badge
                    bg={getStatusColor(property.status)}
                    className="position-absolute top-0 start-0 m-3"
                >
                    {property.status}
                </Badge>

                {/* Featured Badge */}
                {property.featured && (
                    <Badge
                        bg="warning"
                        className="position-absolute top-0 end-0 m-3"
                    >
                        <IconifyIcon icon="solar:star-bold" className="me-1" />
                        Featured
                    </Badge>
                )}

                {/* Favorite Button */}
                {onFavorite && (
                    <Button
                        variant={isFavorite ? "danger" : "outline-light"}
                        size="sm"
                        className="position-absolute bottom-0 end-0 m-3 rounded-circle"
                        onClick={(e) => {
                            e.preventDefault();
                            onFavorite(property.id);
                        }}
                        style={{ width: '40px', height: '40px' }}
                    >
                        <IconifyIcon
                            icon={isFavorite ? "solar:heart-bold" : "solar:heart-outline"}
                        />
                    </Button>
                )}

                {/* Image Count */}
                {property.images && property.images.length > 1 && (
                    <div className="position-absolute bottom-0 start-0 m-3">
                        <Badge bg="dark" className="opacity-75">
                            <IconifyIcon icon="solar:gallery-bold" className="me-1" />
                            {property.images.length}
                        </Badge>
                    </div>
                )}
            </div>

            <Card.Body className="d-flex flex-column">
                {/* Price */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="text-primary mb-0">{formatPrice(property.price)}</h5>
                    {property.avgRating && (
                        <div className="text-warning">
                            <IconifyIcon icon="solar:star-bold" className="me-1" />
                            <small>{property.avgRating.toFixed(1)}</small>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h6 className="card-title mb-2 text-truncate" title={property.title}>
                    {property.title}
                </h6>

                {/* Location */}
                <p className="text-muted mb-3 small">
                    <IconifyIcon icon="solar:map-point-bold" className="me-1" />
                    {property.city}, {property.state}
                </p>

                {/* Property Details */}
                <div className="row g-2 mb-3 text-center">
                    <div className="col-4">
                        <div className="border rounded p-2">
                            <IconifyIcon icon="solar:bed-bold" className="text-primary d-block mb-1" />
                            <small className="fw-bold">{property.bedrooms}</small>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Beds</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="border rounded p-2">
                            <IconifyIcon icon="solar:bath-bold" className="text-primary d-block mb-1" />
                            <small className="fw-bold">{property.bathrooms}</small>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Baths</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="border rounded p-2">
                            <IconifyIcon icon="solar:ruler-bold" className="text-primary d-block mb-1" />
                            <small className="fw-bold">{property.area}</small>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Sq Ft</div>
                        </div>
                    </div>
                </div>

                {/* Property Type */}
                <div className="mb-3">
                    <Badge bg="light" text="dark" className="text-capitalize">
                        {property.propertyType}
                    </Badge>
                </div>

                {/* Owner Info */}
                {showOwner && property.owner && (
                    <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                        {property.owner.image ? (
                            <Image
                                src={property.owner.image}
                                alt={property.owner.name}
                                width={32}
                                height={32}
                                className="rounded-circle me-2"
                            />
                        ) : (
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                <IconifyIcon icon="solar:user-bold" className="text-white fs-6" />
                            </div>
                        )}
                        <div>
                            <div className="fw-bold small">{property.owner.name}</div>
                            <small className="text-muted">Owner</small>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-auto">
                    <div className="d-grid gap-2">
                        <Link href={`/single-property-1?id=${property.id}`} passHref>
                            <Button variant="primary" size="sm">
                                <IconifyIcon icon="solar:eye-bold" className="me-2" />
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card.Body>


        </Card>
    );
};

export default PropertyCard;
