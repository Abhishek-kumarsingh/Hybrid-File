'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
import PropertyList from '@/components/property/PropertyList';
import PropertyUploadForm from '@/components/property/PropertyUploadForm';
import PropertyDetailView from '@/components/property/PropertyDetailView';

const PropertyManagementPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = (property) => {
        setSelectedProperty(property);
        setIsEdit(!!property);
        setShowForm(true);
    };

    const handleView = (property) => {
        setSelectedProperty(property);
        setShowDetail(true);
    };

    const handleFormSuccess = (property) => {
        setShowForm(false);
        setSelectedProperty(null);
        setIsEdit(false);
        // Refresh the property list
        window.location.reload();
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedProperty(null);
        setIsEdit(false);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedProperty(null);
    };

    return (
        <>
            <PageTitle 
                title="Property Management" 
                subName="Manage all properties in the system"
            />
            
            <Container fluid>
                <Row>
                    <Col>
                        <PropertyList 
                            onEdit={handleEdit}
                            onView={handleView}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Property Form Modal */}
            <Modal 
                show={showForm} 
                onHide={handleCloseForm}
                size="xl"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEdit ? 'Edit Property' : 'Add New Property'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PropertyUploadForm
                        initialData={selectedProperty}
                        isEdit={isEdit}
                        onSuccess={handleFormSuccess}
                    />
                </Modal.Body>
            </Modal>

            {/* Property Detail Modal */}
            <Modal 
                show={showDetail} 
                onHide={handleCloseDetail}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Property Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProperty && (
                        <PropertyDetailView 
                            property={selectedProperty}
                            onEdit={() => {
                                setShowDetail(false);
                                handleEdit(selectedProperty);
                            }}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PropertyManagementPage;
