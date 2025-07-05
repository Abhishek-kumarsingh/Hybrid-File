'use client';

import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Badge, Button, Carousel, Table } from 'react-bootstrap';
import { IconifyIcon } from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';

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

const PropertyDetailView = ({ property, onEdit }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const statusColors = {
        ACTIVE: 'success',
        PENDING: 'warning',
        SOLD: 'info',
        RENTED: 'primary',
        INACTIVE: 'secondary'
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculatePricePerSqFt = () => {
        if (property.area && property.price) {
            return (property.price / property.area).toFixed(2);
        }
        return 'N/A';
    };

    return (
        <div className="property-detail-view">
            <Row>
                {/* Image Gallery */}
                <Col lg={8}>
                    <Card className="mb-4">
                        <CardBody className="p-0">
                            {property.images && property.images.length > 0 ? (
                                <Carousel
                                    activeIndex={activeImageIndex}
                                    onSelect={setActiveImageIndex}
                                    indicators={property.images.length > 1}
                                    controls={property.images.length > 1}
                                >
                                    {property.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <Image
                                                src={image.url}
                                                alt={`${property.title} - Image ${index + 1}`}
                                                width={800}
                                                height={400}
                                                className="d-block w-100 object-fit-cover"
                                                style={{ height: '400px' }}
                                            />
                                            {image.isPrimary && (
                                                <Badge
                                                    bg="primary"
                                                    className="position-absolute top-0 start-0 m-3"
                                                >
                                                    Primary Image
                                                </Badge>
                                            )}
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            ) : (
                                <div
                                    className="d-flex align-items-center justify-content-center text-white property-gradient-card"
                                    style={{
                                        height: '400px',
                                        background: getPropertyGradient(property.propertyType)
                                    }}
                                >
                                    <div className="text-center">
                                        <IconifyIcon icon={getPropertyIcon(property.propertyType)} className="fs-1 mb-3 property-type-icon" />
                                        <h3 className="text-white mb-2">{property.propertyType}</h3>
                                        <h5 className="text-white opacity-75">{property.title}</h5>
                                        <p className="text-white opacity-50">Property visualization</p>
                                    </div>
                                </div>
                            )}
                        </CardBody>
                    </Card>

                    {/* Property Description */}
                    <Card>
                        <CardBody>
                            <h5>Description</h5>
                            <p className="text-muted">{property.description}</p>
                        </CardBody>
                    </Card>
                </Col>

                {/* Property Details */}
                <Col lg={4}>
                    <Card className="mb-4">
                        <CardBody>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <h4 className="mb-0">{property.title}</h4>
                                <Badge bg={statusColors[property.status]}>
                                    {property.status}
                                </Badge>
                            </div>

                            <h3 className="text-primary mb-3">{formatPrice(property.price)}</h3>

                            <div className="mb-3">
                                <IconifyIcon icon="solar:map-point-bold" className="me-2 text-muted" />
                                <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                            </div>

                            <Row className="g-3 mb-4">
                                <Col xs={4}>
                                    <div className="text-center">
                                        <IconifyIcon icon="solar:bed-bold" className="fs-4 text-primary" />
                                        <div className="fw-bold">{property.bedrooms}</div>
                                        <small className="text-muted">Bedrooms</small>
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <div className="text-center">
                                        <IconifyIcon icon="solar:bath-bold" className="fs-4 text-primary" />
                                        <div className="fw-bold">{property.bathrooms}</div>
                                        <small className="text-muted">Bathrooms</small>
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <div className="text-center">
                                        <IconifyIcon icon="solar:ruler-bold" className="fs-4 text-primary" />
                                        <div className="fw-bold">{property.area}</div>
                                        <small className="text-muted">Sq Ft</small>
                                    </div>
                                </Col>
                            </Row>

                            <Button
                                variant="primary"
                                className="w-100 mb-3"
                                onClick={onEdit}
                            >
                                <IconifyIcon icon="solar:pen-bold" className="me-2" />
                                Edit Property
                            </Button>

                            {property.featured && (
                                <Badge bg="warning" className="w-100 py-2">
                                    <IconifyIcon icon="solar:star-bold" className="me-2" />
                                    Featured Property
                                </Badge>
                            )}
                        </CardBody>
                    </Card>

                    {/* Property Information */}
                    <Card className="mb-4">
                        <CardBody>
                            <h6 className="mb-3">Property Information</h6>
                            <Table size="sm" className="mb-0">
                                <tbody>
                                    <tr>
                                        <td className="text-muted">Type:</td>
                                        <td className="text-capitalize">{property.propertyType}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted">Price per sq ft:</td>
                                        <td>${calculatePricePerSqFt()}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted">Country:</td>
                                        <td>{property.country}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted">Created:</td>
                                        <td>{formatDate(property.createdAt)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-muted">Updated:</td>
                                        <td>{formatDate(property.updatedAt)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                    {/* Owner Information */}
                    {property.owner && (
                        <Card>
                            <CardBody>
                                <h6 className="mb-3">Owner Information</h6>
                                <div className="d-flex align-items-center">
                                    {property.owner.image ? (
                                        <Image
                                            src={property.owner.image}
                                            alt={property.owner.name}
                                            width={50}
                                            height={50}
                                            className="rounded-circle me-3"
                                        />
                                    ) : (
                                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                                            <IconifyIcon icon="solar:user-bold" className="text-white" />
                                        </div>
                                    )}
                                    <div>
                                        <div className="fw-bold">{property.owner.name}</div>
                                        <small className="text-muted">{property.owner.email}</small>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </Col>
            </Row>

            {/* Reviews Section */}
            {property.reviews && property.reviews.length > 0 && (
                <Row className="mt-4">
                    <Col>
                        <Card>
                            <CardBody>
                                <h5 className="mb-3">
                                    Reviews ({property.reviews.length})
                                    {property.avgRating && (
                                        <Badge bg="warning" className="ms-2">
                                            <IconifyIcon icon="solar:star-bold" className="me-1" />
                                            {property.avgRating.toFixed(1)}
                                        </Badge>
                                    )}
                                </h5>

                                {property.reviews.slice(0, 5).map((review, index) => (
                                    <div key={index} className="border-bottom pb-3 mb-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div className="d-flex align-items-center">
                                                {review.user?.image ? (
                                                    <Image
                                                        src={review.user.image}
                                                        alt={review.user.name}
                                                        width={32}
                                                        height={32}
                                                        className="rounded-circle me-2"
                                                    />
                                                ) : (
                                                    <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                                        <IconifyIcon icon="solar:user-bold" className="text-white fs-6" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="fw-bold">{review.user?.name}</div>
                                                    <small className="text-muted">{formatDate(review.createdAt)}</small>
                                                </div>
                                            </div>
                                            <div className="text-warning">
                                                {[...Array(5)].map((_, i) => (
                                                    <IconifyIcon
                                                        key={i}
                                                        icon={i < review.rating ? "solar:star-bold" : "solar:star-outline"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {review.comment && (
                                            <p className="text-muted mb-0">{review.comment}</p>
                                        )}
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}

            <style jsx>{`
                .object-fit-cover {
                    object-fit: cover;
                }
            `}</style>
        </div>
    );
};

export default PropertyDetailView;
