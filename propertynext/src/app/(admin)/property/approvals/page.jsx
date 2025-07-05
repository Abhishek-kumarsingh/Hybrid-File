'use client';

import React from 'react';
import { Container } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
import PropertyApprovalDashboard from '@/components/dashboard/PropertyApprovalDashboard';

const PropertyApprovalsPage = () => {
    return (
        <>
            <PageTitle
                title="Property Approvals"
                subName="Review and approve property submissions"
            />

            <Container fluid>
                <PropertyApprovalDashboard />
            </Container>
        </>
    );
};

export default PropertyApprovalsPage;
