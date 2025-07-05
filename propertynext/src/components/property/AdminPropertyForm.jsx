'use client'

import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Row, Col, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ImageUploadZone from './ImageUploadZone'

const AdminPropertyForm = ({ initialData = null, isEdit = false }) => {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState(initialData?.images || [])
  const [uploadingImages, setUploadingImages] = useState(false)
  const router = useRouter()

  // Validation schema
  const propertySchema = yup.object({
    title: yup
      .string()
      .min(5, 'Title must be at least 5 characters')
      .max(100, 'Title cannot exceed 100 characters')
      .required('Property title is required'),
    description: yup
      .string()
      .min(20, 'Description must be at least 20 characters')
      .max(2000, 'Description cannot exceed 2000 characters')
      .required('Property description is required'),
    price: yup
      .number()
      .positive('Price must be a positive number')
      .min(1000, 'Minimum price is $1,000')
      .max(100000000, 'Maximum price is $100,000,000')
      .required('Property price is required'),
    address: yup.string().min(10, 'Address must be at least 10 characters').required('Property address is required'),
    city: yup.string().min(2, 'City must be at least 2 characters').required('City is required'),
    state: yup.string().min(2, 'State must be at least 2 characters').required('State is required'),
    zipCode: yup
      .string()
      .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
      .required('ZIP code is required'),
    country: yup.string().min(2, 'Country must be at least 2 characters').required('Country is required'),
    propertyType: yup
      .string()
      .oneOf(['HOUSE', 'APARTMENT', 'CONDO', 'TOWNHOUSE', 'VILLA', 'LAND', 'COMMERCIAL'], 'Invalid property type')
      .required('Property type is required'),
    bedrooms: yup
      .number()
      .integer('Bedrooms must be a whole number')
      .min(0, 'Bedrooms cannot be negative')
      .max(20, 'Maximum 20 bedrooms allowed')
      .required('Number of bedrooms is required'),
    bathrooms: yup
      .number()
      .integer('Bathrooms must be a whole number')
      .min(0, 'Bathrooms cannot be negative')
      .max(20, 'Maximum 20 bathrooms allowed')
      .required('Number of bathrooms is required'),
    area: yup
      .number()
      .positive('Area must be a positive number')
      .min(100, 'Minimum area is 100 sq ft')
      .max(100000, 'Maximum area is 100,000 sq ft')
      .required('Property area is required'),
    featured: yup.boolean(),
    status: yup.string().oneOf(['ACTIVE', 'PENDING', 'SOLD', 'RENTED', 'INACTIVE'], 'Invalid status').required('Property status is required'),
    approvalStatus: yup
      .string()
      .oneOf(['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW'], 'Invalid approval status')
      .required('Approval status is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(propertySchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price || '',
      address: initialData?.address || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      zipCode: initialData?.zipCode || '',
      country: initialData?.country || 'United States',
      propertyType: initialData?.propertyType || 'HOUSE',
      bedrooms: initialData?.bedrooms || 1,
      bathrooms: initialData?.bathrooms || 1,
      area: initialData?.area || '',
      featured: initialData?.featured || false,
      status: initialData?.status || 'ACTIVE',
      approvalStatus: initialData?.approvalStatus || 'APPROVED', // Admin can directly approve
    },
  })

  const watchedStatus = watch('status')
  const watchedApprovalStatus = watch('approvalStatus')

  const handleImageUpload = async (files) => {
    setUploadingImages(true)
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const data = await response.json()
        return data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      const newImages = uploadedUrls.map((url) => ({ url }))
      setImages((prev) => [...prev, ...newImages])
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`)
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Failed to upload images')
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error('Please upload at least one property image')
      return
    }

    setLoading(true)
    try {
      const propertyData = {
        ...data,
        images: images.map((image, index) => ({
          url: image.url,
          isPrimary: index === 0,
        })),
      }

      const url = isEdit ? `/api/properties/${initialData.id}` : '/api/properties'

      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      })

      if (response.ok) {
        const result = await response.json()
        toast.success(isEdit ? 'Property updated successfully!' : 'Property created successfully!')
        router.push('/property')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to save property')
      }
    } catch (error) {
      console.error('Property save error:', error)
      toast.error('Failed to save property')
    } finally {
      setLoading(false)
    }
  }

  const propertyTypes = [
    { value: 'HOUSE', label: 'House' },
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'CONDO', label: 'Condominium' },
    { value: 'TOWNHOUSE', label: 'Townhouse' },
    { value: 'VILLA', label: 'Villa' },
    { value: 'LAND', label: 'Land/Plot' },
    { value: 'COMMERCIAL', label: 'Commercial' },
  ]

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active', color: 'success' },
    { value: 'PENDING', label: 'Pending', color: 'warning' },
    { value: 'SOLD', label: 'Sold', color: 'secondary' },
    { value: 'RENTED', label: 'Rented', color: 'info' },
    { value: 'INACTIVE', label: 'Inactive', color: 'danger' },
  ]

  const approvalStatusOptions = [
    { value: 'APPROVED', label: 'Approved', color: 'success' },
    { value: 'PENDING', label: 'Pending Review', color: 'warning' },
    { value: 'UNDER_REVIEW', label: 'Under Review', color: 'info' },
    { value: 'REJECTED', label: 'Rejected', color: 'danger' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col lg={8}>
          {/* Basic Information */}
          <Card className="border-0 shadow-sm mb-4">
            <CardHeader className="bg-white border-bottom">
              <h5 className="mb-0">
                <IconifyIcon icon="solar:home-2-bold" className="me-2" />
                Basic Information
              </h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Label>Property Title *</Form.Label>
                  <Form.Control type="text" placeholder="Enter property title" {...register('title')} isInvalid={!!errors.title} />
                  <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter detailed property description"
                    {...register('description')}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Property Type *</Form.Label>
                  <Form.Select {...register('propertyType')} isInvalid={!!errors.propertyType}>
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.propertyType?.message}</Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Price (USD) *</Form.Label>
                  <Form.Control type="number" placeholder="Enter price" {...register('price')} isInvalid={!!errors.price} />
                  <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
                </Col>
              </Row>
            </CardBody>
          </Card>

          {/* Location Information */}
          <Card className="border-0 shadow-sm mb-4">
            <CardHeader className="bg-white border-bottom">
              <h5 className="mb-0">
                <IconifyIcon icon="solar:map-point-bold" className="me-2" />
                Location Information
              </h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control type="text" placeholder="Enter full address" {...register('address')} isInvalid={!!errors.address} />
                  <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>City *</Form.Label>
                  <Form.Control type="text" placeholder="Enter city" {...register('city')} isInvalid={!!errors.city} />
                  <Form.Control.Feedback type="invalid">{errors.city?.message}</Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>State *</Form.Label>
                  <Form.Control type="text" placeholder="Enter state" {...register('state')} isInvalid={!!errors.state} />
                  <Form.Control.Feedback type="invalid">{errors.state?.message}</Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>ZIP Code *</Form.Label>
                  <Form.Control type="text" placeholder="Enter ZIP code" {...register('zipCode')} isInvalid={!!errors.zipCode} />
                  <Form.Control.Feedback type="invalid">{errors.zipCode?.message}</Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Country *</Form.Label>
                  <Form.Control type="text" placeholder="Enter country" {...register('country')} isInvalid={!!errors.country} />
                  <Form.Control.Feedback type="invalid">{errors.country?.message}</Form.Control.Feedback>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Property Details */}
          <Card className="border-0 shadow-sm mb-4">
            <CardHeader className="bg-white border-bottom">
              <h5 className="mb-0">
                <IconifyIcon icon="solar:info-circle-bold" className="me-2" />
                Property Details
              </h5>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                <Form.Label>Bedrooms *</Form.Label>
                <Form.Control type="number" min="0" max="20" {...register('bedrooms')} isInvalid={!!errors.bedrooms} />
                <Form.Control.Feedback type="invalid">{errors.bedrooms?.message}</Form.Control.Feedback>
              </div>

              <div className="mb-3">
                <Form.Label>Bathrooms *</Form.Label>
                <Form.Control type="number" min="0" max="20" {...register('bathrooms')} isInvalid={!!errors.bathrooms} />
                <Form.Control.Feedback type="invalid">{errors.bathrooms?.message}</Form.Control.Feedback>
              </div>

              <div className="mb-3">
                <Form.Label>Area (sq ft) *</Form.Label>
                <Form.Control type="number" min="100" placeholder="Enter area in square feet" {...register('area')} isInvalid={!!errors.area} />
                <Form.Control.Feedback type="invalid">{errors.area?.message}</Form.Control.Feedback>
              </div>

              <div className="mb-3">
                <Form.Check type="checkbox" label="Featured Property" {...register('featured')} />
                <Form.Text className="text-muted">Featured properties appear prominently on the homepage</Form.Text>
              </div>
            </CardBody>
          </Card>

          {/* Status Management */}
          <Card className="border-0 shadow-sm mb-4">
            <CardHeader className="bg-white border-bottom">
              <h5 className="mb-0">
                <IconifyIcon icon="solar:settings-bold" className="me-2" />
                Status Management
              </h5>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                <Form.Label>Property Status *</Form.Label>
                <Form.Select {...register('status')} isInvalid={!!errors.status}>
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </Form.Select>
                <div className="mt-2">
                  <Badge bg={statusOptions.find((s) => s.value === watchedStatus)?.color || 'secondary'}>
                    {statusOptions.find((s) => s.value === watchedStatus)?.label || 'Unknown'}
                  </Badge>
                </div>
              </div>

              <div className="mb-3">
                <Form.Label>Approval Status *</Form.Label>
                <Form.Select {...register('approvalStatus')} isInvalid={!!errors.approvalStatus}>
                  {approvalStatusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </Form.Select>
                <div className="mt-2">
                  <Badge bg={approvalStatusOptions.find((s) => s.value === watchedApprovalStatus)?.color || 'secondary'}>
                    {approvalStatusOptions.find((s) => s.value === watchedApprovalStatus)?.label || 'Unknown'}
                  </Badge>
                </div>
                <Form.Text className="text-muted">As an admin, you can directly set the approval status</Form.Text>
              </div>
            </CardBody>
          </Card>

          {/* Action Buttons */}
          <Card className="border-0 shadow-sm">
            <CardBody>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary" size="lg" disabled={loading || uploadingImages}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      {isEdit ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <IconifyIcon icon="solar:check-circle-bold" className="me-2" />
                      {isEdit ? 'Update Property' : 'Create Property'}
                    </>
                  )}
                </Button>

                <Button type="button" variant="outline-secondary" onClick={() => router.back()} disabled={loading}>
                  <IconifyIcon icon="solar:arrow-left-bold" className="me-2" />
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Image Upload Section */}
      <Row>
        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white border-bottom">
              <h5 className="mb-0">
                <IconifyIcon icon="solar:gallery-bold" className="me-2" />
                Property Images
              </h5>
            </CardHeader>
            <CardBody>
              <ImageUploadZone images={images} onUpload={handleImageUpload} onDelete={removeImage} uploading={uploadingImages} maxImages={10} />
              {images.length === 0 && (
                <Alert variant="warning" className="mt-3">
                  <IconifyIcon icon="solar:danger-triangle-bold" className="me-2" />
                  Please upload at least one property image before saving.
                </Alert>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </form>
  )
}

export default AdminPropertyForm
