'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Badge, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const PropertyApprovalDashboard = () => {
    const [pendingProperties, setPendingProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [approvalAction, setApprovalAction] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [stats, setStats] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        underReview: 0
    });

    useEffect(() => {
        fetchPendingProperties();
        fetchStats();
    }, []);

    const fetchPendingProperties = async () => {
        try {
            const response = await fetch('/api/admin/properties/pending');
            if (response.ok) {
                const data = await response.json();
                setPendingProperties(data.properties || []);
            } else {
                toast.error('Failed to fetch pending properties');
            }
        } catch (error) {
            console.error('Error fetching pending properties:', error);
            toast.error('Error loading properties');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/dashboard/stats');
            if (response.ok) {
                const data = await response.json();
                setStats({
                    pending: data.overview?.pendingProperties || 0,
                    approved: data.overview?.approvedProperties || 0,
                    rejected: data.overview?.rejectedProperties || 0,
                    underReview: data.overview?.underReviewProperties || 0
                });
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleApprovalAction = (property, action) => {
        setSelectedProperty(property);
        setApprovalAction(action);
        setShowApprovalModal(true);
        setRejectionReason('');
        setNotes('');
    };

    const submitApproval = async () => {
        if (approvalAction === 'REJECTED' && !rejectionReason.trim()) {
            toast.error('Rejection reason is required');
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(`/api/properties/${selectedProperty.id}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    approvalStatus: approvalAction,
                    rejectionReason: rejectionReason.trim(),
                    notes: notes.trim()
                }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                setShowApprovalModal(false);
                fetchPendingProperties();
                fetchStats();
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to process approval');
            }
        } catch (error) {
            console.error('Error processing approval:', error);
            toast.error('Error processing approval');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            PENDING: { variant: 'warning', text: 'Pending' },
            APPROVED: { variant: 'success', text: 'Approved' },
            REJECTED: { variant: 'danger', text: 'Rejected' },
            UNDER_REVIEW: { variant: 'info', text: 'Under Review' }
        };
        
        const config = statusConfig[status] || statusConfig.PENDING;
        return <Badge bg={config.variant}>{config.text}</Badge>;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            {/* Statistics Cards */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <CardBody className="text-center">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <div className="avatar-sm bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center">
                                    <IconifyIcon icon="solar:clock-circle-bold" className="text-warning fs-20" />
                                </div>
                            </div>
                            <h4 className="mb-1">{stats.pending}</h4>
                            <p className="text-muted mb-0">Pending Approval</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <CardBody className="text-center">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <div className="avatar-sm bg-success-subtle rounded-circle d-flex align-items-center justify-content-center">
                                    <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-20" />
                                </div>
                            </div>
                            <h4 className="mb-1">{stats.approved}</h4>
                            <p className="text-muted mb-0">Approved</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <CardBody className="text-center">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <div className="avatar-sm bg-danger-subtle rounded-circle d-flex align-items-center justify-content-center">
                                    <IconifyIcon icon="solar:close-circle-bold" className="text-danger fs-20" />
                                </div>
                            </div>
                            <h4 className="mb-1">{stats.rejected}</h4>
                            <p className="text-muted mb-0">Rejected</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 shadow-sm">
                        <CardBody className="text-center">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <div className="avatar-sm bg-info-subtle rounded-circle d-flex align-items-center justify-content-center">
                                    <IconifyIcon icon="solar:eye-bold" className="text-info fs-20" />
                                </div>
                            </div>
                            <h4 className="mb-1">{stats.underReview}</h4>
                            <p className="text-muted mb-0">Under Review</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Pending Properties List */}
            <Card className="border-0 shadow-sm">
                <CardHeader className="bg-white border-bottom">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">
                            <IconifyIcon icon="solar:home-2-bold" className="me-2" />
                            Properties Pending Approval
                        </h5>
                        <Badge bg="warning">{pendingProperties.length} Pending</Badge>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    {pendingProperties.length === 0 ? (
                        <div className="text-center py-5">
                            <IconifyIcon icon="solar:inbox-bold" className="fs-48 text-muted mb-3" />
                            <h6 className="text-muted">No properties pending approval</h6>
                            <p className="text-muted mb-0">All properties have been reviewed</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Property</th>
                                        <th>Owner</th>
                                        <th>Price</th>
                                        <th>Location</th>
                                        <th>Submitted</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingProperties.map((property) => (
                                        <tr key={property.id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 me-3">
                                                        {property.images?.[0] ? (
                                                            <img 
                                                                src={property.images[0].url} 
                                                                alt={property.title}
                                                                className="rounded"
                                                                style={{ width: '60px', height: '45px', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <div 
                                                                className="bg-light rounded d-flex align-items-center justify-content-center"
                                                                style={{ width: '60px', height: '45px' }}
                                                            >
                                                                <IconifyIcon icon="solar:home-bold" className="text-muted" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">{property.title}</h6>
                                                        <small className="text-muted">{property.propertyType}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="fw-medium">{property.owner?.name || 'N/A'}</div>
                                                    <small className="text-muted">{property.owner?.email}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="fw-medium">{formatCurrency(property.price)}</span>
                                            </td>
                                            <td>
                                                <div>
                                                    <div>{property.city}</div>
                                                    <small className="text-muted">{property.state}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <small>{new Date(property.createdAt).toLocaleDateString()}</small>
                                            </td>
                                            <td>
                                                {getStatusBadge(property.approvalStatus)}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        onClick={() => handleApprovalAction(property, 'APPROVED')}
                                                        title="Approve"
                                                    >
                                                        <IconifyIcon icon="solar:check-bold" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => handleApprovalAction(property, 'REJECTED')}
                                                        title="Reject"
                                                    >
                                                        <IconifyIcon icon="solar:close-bold" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="info"
                                                        onClick={() => handleApprovalAction(property, 'UNDER_REVIEW')}
                                                        title="Mark Under Review"
                                                    >
                                                        <IconifyIcon icon="solar:eye-bold" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Approval Modal */}
            <Modal show={showApprovalModal} onHide={() => setShowApprovalModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {approvalAction === 'APPROVED' && 'Approve Property'}
                        {approvalAction === 'REJECTED' && 'Reject Property'}
                        {approvalAction === 'UNDER_REVIEW' && 'Mark Under Review'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProperty && (
                        <>
                            <div className="mb-3">
                                <h6>Property: {selectedProperty.title}</h6>
                                <p className="text-muted mb-0">Owner: {selectedProperty.owner?.name}</p>
                            </div>

                            {approvalAction === 'REJECTED' && (
                                <div className="mb-3">
                                    <Form.Label>Rejection Reason *</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        placeholder="Please provide a detailed reason for rejection..."
                                        required
                                    />
                                </div>
                            )}

                            <div className="mb-3">
                                <Form.Label>Additional Notes (Optional)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Any additional notes or comments..."
                                />
                            </div>

                            {approvalAction === 'APPROVED' && (
                                <Alert variant="success">
                                    <IconifyIcon icon="solar:check-circle-bold" className="me-2" />
                                    This property will be approved and made live on the platform.
                                </Alert>
                            )}

                            {approvalAction === 'REJECTED' && (
                                <Alert variant="danger">
                                    <IconifyIcon icon="solar:close-circle-bold" className="me-2" />
                                    This property will be rejected and the owner will be notified.
                                </Alert>
                            )}

                            {approvalAction === 'UNDER_REVIEW' && (
                                <Alert variant="info">
                                    <IconifyIcon icon="solar:eye-bold" className="me-2" />
                                    This property will be marked as under review for further evaluation.
                                </Alert>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant={approvalAction === 'APPROVED' ? 'success' : approvalAction === 'REJECTED' ? 'danger' : 'info'}
                        onClick={submitApproval}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Processing...
                            </>
                        ) : (
                            <>
                                {approvalAction === 'APPROVED' && 'Approve Property'}
                                {approvalAction === 'REJECTED' && 'Reject Property'}
                                {approvalAction === 'UNDER_REVIEW' && 'Mark Under Review'}
                            </>
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PropertyApprovalDashboard;
