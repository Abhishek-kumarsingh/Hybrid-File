'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Button, Badge, Dropdown, Form, Row, Col, Pagination, Spinner } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { propertyApi } from '@/lib/api-client';
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

const PropertyList = ({ onEdit, onView }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        city: '',
        search: ''
    });

    const statusColors = {
        ACTIVE: 'success',
        PENDING: 'warning',
        SOLD: 'info',
        RENTED: 'primary',
        INACTIVE: 'secondary'
    };

    const fetchProperties = async (page = 1, newFilters = filters) => {
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
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        fetchProperties(1, newFilters);
    };

    const handlePageChange = (page) => {
        fetchProperties(page);
    };

    const handleDelete = async (propertyId) => {
        if (!confirm('Are you sure you want to delete this property?')) {
            return;
        }

        try {
            await propertyApi.delete(propertyId);
            toast.success('Property deleted successfully');
            fetchProperties(pagination.page);
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Failed to delete property');
        }
    };

    const handleStatusChange = async (propertyId, newStatus) => {
        try {
            await propertyApi.update(propertyId, { status: newStatus });
            toast.success('Property status updated');
            fetchProperties(pagination.page);
        } catch (error) {
            console.error('Error updating property status:', error);
            toast.error('Failed to update property status');
        }
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
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card>
            <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Properties</h4>
                    <Button variant="primary" onClick={() => onEdit && onEdit(null)}>
                        <IconifyIcon icon="solar:add-circle-bold" className="me-2" />
                        Add Property
                    </Button>
                </div>

                {/* Filters */}
                <Row className="mb-4">
                    <Col md={3}>
                        <Form.Control
                            type="text"
                            placeholder="Search properties..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="PENDING">Pending</option>
                            <option value="SOLD">Sold</option>
                            <option value="RENTED">Rented</option>
                            <option value="INACTIVE">Inactive</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="condo">Condo</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="villa">Villa</option>
                            <option value="studio">Studio</option>
                            <option value="commercial">Commercial</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            value={filters.city}
                            onChange={(e) => handleFilterChange('city', e.target.value)}
                        />
                    </Col>
                    <Col md={3}>
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                setFilters({ status: '', type: '', city: '', search: '' });
                                fetchProperties(1, { status: '', type: '', city: '', search: '' });
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Col>
                </Row>

                {/* Properties Table */}
                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" />
                        <p className="mt-2">Loading properties...</p>
                    </div>
                ) : (
                    <>
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Owner</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((property) => (
                                    <tr key={property.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                {property.images?.[0] ? (
                                                    <Image
                                                        src={property.images[0].url}
                                                        alt={property.title}
                                                        width={60}
                                                        height={45}
                                                        className="rounded me-3 object-fit-cover"
                                                    />
                                                ) : (
                                                    <div
                                                        className="d-flex align-items-center justify-content-center text-white rounded me-3"
                                                        style={{
                                                            width: '60px',
                                                            height: '45px',
                                                            background: getPropertyGradient(property.propertyType),
                                                            fontSize: '1.2rem'
                                                        }}
                                                    >
                                                        <IconifyIcon icon={getPropertyIcon(property.propertyType)} />
                                                    </div>
                                                )}
                                                <div>
                                                    <h6 className="mb-1">{property.title}</h6>
                                                    <small className="text-muted">
                                                        {property.bedrooms} bed • {property.bathrooms} bath • {property.area} sq ft
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-capitalize">{property.propertyType}</span>
                                        </td>
                                        <td>
                                            <strong>{formatPrice(property.price)}</strong>
                                        </td>
                                        <td>
                                            <div>
                                                <div>{property.city}</div>
                                                <small className="text-muted">{property.state}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    as={Badge}
                                                    bg={statusColors[property.status]}
                                                    className="cursor-pointer"
                                                >
                                                    {property.status}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleStatusChange(property.id, 'ACTIVE')}>
                                                        Active
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleStatusChange(property.id, 'PENDING')}>
                                                        Pending
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleStatusChange(property.id, 'SOLD')}>
                                                        Sold
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleStatusChange(property.id, 'RENTED')}>
                                                        Rented
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleStatusChange(property.id, 'INACTIVE')}>
                                                        Inactive
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td>
                                            <div>
                                                <div>{property.owner?.name}</div>
                                                <small className="text-muted">{property.owner?.email}</small>
                                            </div>
                                        </td>
                                        <td>{formatDate(property.createdAt)}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline-secondary" size="sm">
                                                    <IconifyIcon icon="solar:menu-dots-bold" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => onView && onView(property)}>
                                                        <IconifyIcon icon="solar:eye-bold" className="me-2" />
                                                        View
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => onEdit && onEdit(property)}>
                                                        <IconifyIcon icon="solar:pen-bold" className="me-2" />
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item
                                                        className="text-danger"
                                                        onClick={() => handleDelete(property.id)}
                                                    >
                                                        <IconifyIcon icon="solar:trash-bin-minimalistic-bold" className="me-2" />
                                                        Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>
                                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} properties
                                </div>
                                <Pagination>
                                    <Pagination.Prev
                                        disabled={pagination.page === 1}
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                    />
                                    {[...Array(pagination.pages)].map((_, index) => (
                                        <Pagination.Item
                                            key={index + 1}
                                            active={pagination.page === index + 1}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next
                                        disabled={pagination.page === pagination.pages}
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                    />
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default PropertyList;
