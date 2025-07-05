// src/app/(admin)/property/grid/components/PropertiesData.jsx
'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { apiClient, ApiError } from '@/lib/api-client' // Adjust path if needed

// --- PropertiesCard Component (remains the same as the previous full code) ---
const PropertiesCard = ({ id, title, location, price, bedrooms, bathrooms, area, propertyType, status, image }) => {
  // ... (keep the existing PropertiesCard code from the previous full response)
  const getStatusVariant = (statusString) => {
    const s = statusString?.toUpperCase()
    switch (s) {
      case 'ACTIVE':
        return 'success'
      case 'RENTED':
        return 'info'
      case 'SOLD':
        return 'danger'
      case 'PENDING':
        return 'warning'
      case 'INACTIVE':
        return 'secondary'
      default:
        return 'light'
    }
  }

  const getStatusText = (statusString) => {
    const s = statusString?.toUpperCase()
    switch (s) {
      case 'ACTIVE':
        return 'For Sale'
      case 'RENTED':
        return 'Rented'
      case 'SOLD':
        return 'Sold'
      case 'PENDING':
        return 'Pending'
      case 'INACTIVE':
        return 'Inactive'
      default:
        return statusString || 'N/A'
    }
  }

  const getPropertyTypeIcon = (type) => {
    const lowerType = type?.toLowerCase() || ''
    if (lowerType.includes('villa') || lowerType.includes('residences') || lowerType.includes('bungalow')) {
      return 'solar:home-bold-duotone'
    }
    if (lowerType.includes('apartment') || lowerType.includes('penthouse')) {
      return 'solar:buildings-3-bold-duotone'
    }
    return 'solar:city-bold-duotone'
  }

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
  }

  const variant = getStatusVariant(status)
  const statusText = getStatusText(status)
  const typeIcon = getPropertyTypeIcon(propertyType)

  const [isSaved, setIsSaved] = useState(Math.random() > 0.5)
  const toggleSave = () => setIsSaved(!isSaved)

  return (
    <Card className="overflow-hidden h-100">
      <div className="position-relative">
        {image ? (
          <Image
            src={image}
            alt={title || 'Property Image'}
            width={400}
            height={250}
            className="img-fluid rounded-top object-fit-cover"
            style={{ aspectRatio: '16/10' }}
            onError={(e) => {
              e.target.src = '/placeholder-property.jpg'
            }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center text-white rounded-top"
            style={{
              height: '250px',
              background: getPropertyGradient(propertyType)
            }}
          >
            <div className="text-center">
              <IconifyIcon icon={getPropertyTypeIcon(propertyType)} className="fs-1 mb-2" />
              <h6 className="text-white mb-0">{propertyType}</h6>
            </div>
          </div>
        )}
        <span className="position-absolute top-0 start-0 p-1">
          <button
            type="button"
            className={`btn ${isSaved ? 'btn-warning' : 'bg-warning-subtle'} avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded ${isSaved ? 'text-light' : 'text-warning'}`}
            onClick={toggleSave}
            aria-label={isSaved ? 'Unsave property' : 'Save property'}>
            <IconifyIcon icon="solar:bookmark-broken" />
          </button>
        </span>
        <span className="position-absolute top-0 end-0 p-1">
          <span className={`badge bg-${variant} text-white fs-13`}>{statusText}</span>
        </span>
      </div>
      <CardBody className="d-flex flex-column">
        <div className="d-flex align-items-center gap-2 mb-2">
          <div className="avatar bg-light rounded flex-centered">
            <IconifyIcon icon={typeIcon} width={24} height={24} className="fs-24 text-primary" />
          </div>
          <div>
            <Link href={`/properties/${id}`} className="text-dark fw-medium fs-16 stretched-link">
              {title || 'Untitled Property'}
            </Link>
            <p className="text-muted mb-0 fs-14">{location || 'Unknown Location'}</p>
          </div>
        </div>
        <Row className="mt-auto g-2">
          <Col xs={6} lg={4}>
            <span className="badge bg-light-subtle text-muted border fs-12 w-100 py-2">
              <span className="fs-16">
                <IconifyIcon icon="solar:bed-broken" className="align-middle" />
              </span>
               {bedrooms || 0} Beds
            </span>
          </Col>
          <Col xs={6} lg={4}>
            <span className="badge bg-light-subtle text-muted border fs-12 w-100 py-2">
              <span className="fs-16">
                <IconifyIcon icon="solar:bath-broken" className="align-middle" />
              </span>
               {bathrooms || 0} Bath
            </span>
          </Col>
          <Col xs={12} lg={4}>
            <span className="badge bg-light-subtle text-muted border fs-12 w-100 py-2">
              <span className="fs-16">
                <IconifyIcon icon="solar:square-area-broken" />
              </span>
               {area || 0} sqft
            </span>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="bg-light-subtle d-flex justify-content-between align-items-center border-top">
        <p className={`fw-medium fs-16 mb-0 ${status?.toUpperCase() === 'SOLD' ? 'text-muted text-decoration-line-through' : 'text-dark'}`}>
          ${parseFloat(price || '0').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div>
          <Link href={`/properties/${id}/inquire`} className="link-primary fw-medium">
            More Inquiry <IconifyIcon icon="ri:arrow-right-line" className="align-middle" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

// --- PropertiesData Component ---
const PropertiesData = () => {
  const [properties, setProperties] = useState([])
  const [pagination, setPagination] = useState(null) // State for pagination info
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1) // For pagination
  const limit = 10 // Or get from a config or state

  // Function to fetch properties, now accepts a page number
  const fetchProperties = async (page) => {
    try {
      setLoading(true)
      setError(null)
      // Your API client likely takes query params for pagination
      // e.g., apiClient.get(`/properties?page=${page}&limit=${limit}`)
      // For now, assuming your apiClient.get might not directly support query params easily,
      // or you might add them to the endpoint string directly:
      const endpoint = `/properties?page=${page}&limit=${limit}`
      const responseData = await apiClient.get(endpoint)

      // ** THIS IS THE KEY CHANGE **
      if (responseData && Array.isArray(responseData.properties)) {
        setProperties(responseData.properties)
        if (responseData.pagination) {
          setPagination(responseData.pagination)
        }
      } else {
        console.error("API response is not in the expected format (missing 'properties' array):", responseData)
        setError('Received an unexpected data format from the server.')
        setProperties([])
        setPagination(null)
      }
    } catch (e) {
      console.error('Failed to fetch properties:', e)
      if (e instanceof ApiError) {
        setError(`API Error (${e.status}): ${e.message}`)
      } else if (e instanceof Error) {
        setError(e.message || 'An unexpected error occurred while fetching properties.')
      } else {
        setError('An unknown error occurred while fetching properties.')
      }
      setProperties([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties(currentPage)
  }, [currentPage]) // Re-fetch when currentPage changes

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && (!pagination || newPage <= pagination.pages)) {
      setCurrentPage(newPage)
    }
  }

  if (loading && properties.length === 0) {
    // Show loading only if no properties are yet displayed
    return (
      <Col xl={9} lg={12} className="text-center py-5">
        <p>Loading properties...</p>
      </Col>
    )
  }

  if (error) {
    return (
      <Col xl={9} lg={12} className="text-center py-5">
        <p className="text-danger">Error loading properties: {error}</p>
        <button onClick={() => fetchProperties(currentPage)} className="btn btn-primary mt-2">
          Retry
        </button>
      </Col>
    )
  }

  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <Col xl={9} lg={12} className="text-center py-5">
        <p>No properties found.</p>
      </Col>
    )
  }

  return (
    <Col xl={9} lg={12}>
      {loading && (
        <div className="text-center py-2">
          <em>Updating...</em>
        </div>
      )}{' '}
      {/* Subtle loading indicator for page changes */}
      <Row className="g-4">
        {properties.map((item) => (
          <Col lg={4} md={6} key={item.id || Math.random()}>
            <PropertiesCard {...item} />
          </Col>
        ))}
      </Row>
      {/* Dynamic Pagination */}
      {pagination && pagination.pages > 0 && (
        <div className="p-3 border-top mt-4">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-end mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
              </li>
              {/* Simple pagination: show current, prev/next if exist, first/last */}
              {/* For more complex pagination (e.g., ellipsis, more page numbers), you'd need more logic */}
              {pagination.pages > 1 && currentPage > 2 && (
                <li className="page-item">
                  <button className="page-link" onClick={() => handlePageChange(1)}>
                    1
                  </button>
                </li>
              )}
              {currentPage > 3 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}

              {currentPage > 1 && (
                <li className="page-item">
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                    {currentPage - 1}
                  </button>
                </li>
              )}
              <li className="page-item active" aria-current="page">
                <span className="page-link">{currentPage}</span>
              </li>
              {currentPage < pagination.pages && (
                <li className="page-item">
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    {currentPage + 1}
                  </button>
                </li>
              )}

              {currentPage < pagination.pages - 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              {pagination.pages > 1 && currentPage < pagination.pages - 1 && (
                <li className="page-item">
                  <button className="page-link" onClick={() => handlePageChange(pagination.pages)}>
                    {pagination.pages}
                  </button>
                </li>
              )}

              <li className={`page-item ${currentPage === pagination.pages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.pages}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </Col>
  )
}

export default PropertiesData
