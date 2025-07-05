'use client'

import React from 'react'
import { Container } from 'react-bootstrap'
import PageTitle from '@/components/PageTitle'
import AdminPropertyForm from '@/components/property/AdminPropertyForm'

const PropertyAddPage = () => {
  return (
    <>
      <PageTitle title="Add Property" subName="Create a new property listing with admin privileges" />

      <Container fluid>
        <AdminPropertyForm />
      </Container>
    </>
  )
}

export default PropertyAddPage
