'use client'

import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import PropertyDetailView from '@/components/property/PropertyDetailView'
import PropertyUploadForm from '@/components/property/PropertyUploadForm'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useLayoutContext } from '@/context/useLayoutContext'
import { propertyApi } from '@/lib/api-client'

// Dashboard styles are now in globals.css

const PropertyDashboardPage = () => {
  const { theme } = useLayoutContext()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [filterPeriod, setFilterPeriod] = useState('month')
  const [isLoading, setIsLoading] = useState(true)
  const [properties, setProperties] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    revenue: 0,
  })

  // Load dashboard data
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const propertiesResponse = await propertyApi.getAll()

      const propertiesData = propertiesResponse?.data || propertiesResponse || []
      setProperties(propertiesData)

      // Calculate stats from real data
      const totalProperties = propertiesData.length || 0
      const activeProperties = propertiesData.filter((p) => p.status === 'active').length || 0
      const pendingProperties = propertiesData.filter((p) => p.status === 'pending').length || 0
      const totalRevenue = propertiesData.reduce((sum, p) => sum + (p.price || 0), 0) || 0

      setStats({
        total: totalProperties,
        active: activeProperties,
        pending: pendingProperties,
        revenue: totalRevenue,
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      // Use fallback data for demo
      const fallbackProperties = [
        { id: 1, title: 'Modern Apartment', location: 'Downtown', price: 250000, status: 'active', type: 'Apartment' },
        { id: 2, title: 'Family House', location: 'Suburbs', price: 450000, status: 'active', type: 'House' },
        { id: 3, title: 'Luxury Villa', location: 'Hillside', price: 850000, status: 'pending', type: 'Villa' },
        { id: 4, title: 'Office Space', location: 'Business District', price: 320000, status: 'active', type: 'Commercial' },
        { id: 5, title: 'Land Plot', location: 'Countryside', price: 120000, status: 'pending', type: 'Land' },
      ]

      setProperties(fallbackProperties)
      setStats({
        total: fallbackProperties.length,
        active: fallbackProperties.filter((p) => p.status === 'active').length,
        pending: fallbackProperties.filter((p) => p.status === 'pending').length,
        revenue: fallbackProperties.reduce((sum, p) => sum + p.price, 0),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewProperty = (property) => {
    setSelectedProperty(property)
    setShowDetailModal(true)
  }

  const handleEditProperty = (property) => {
    setSelectedProperty(property)
    setIsEdit(!!property)
    setShowEditModal(true)
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setSelectedProperty(null)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedProperty(null)
    setIsEdit(false)
  }

  const handleFormSuccess = () => {
    setShowEditModal(false)
    setSelectedProperty(null)
    setIsEdit(false)
    loadDashboardData() // Reload data instead of page refresh
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="new-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Property Management</h1>
            <p className="dashboard-subtitle">Monitor and manage your property portfolio</p>
          </div>
          <div className="header-right">
            <div className="header-actions">
              <select className="period-selector" value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)}>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button className="btn-primary" onClick={() => handleEditProperty(null)}>
                <IconifyIcon icon="solar:add-circle-bold" />
                Add Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <IconifyIcon icon="solar:home-2-bold" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{isLoading ? '...' : formatNumber(stats.total)}</div>
            <div className="stat-label">Total Properties</div>
            <div className="stat-change positive">
              <IconifyIcon icon="solar:arrow-up-bold" />
              +12.5% from last month
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <IconifyIcon icon="solar:check-circle-bold" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{isLoading ? '...' : formatNumber(stats.active)}</div>
            <div className="stat-label">Active Listings</div>
            <div className="stat-change positive">
              <IconifyIcon icon="solar:arrow-up-bold" />
              +8.3% from last month
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <IconifyIcon icon="solar:hourglass-bold" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{isLoading ? '...' : formatNumber(stats.pending)}</div>
            <div className="stat-label">Pending Approvals</div>
            <div className="stat-change negative">
              <IconifyIcon icon="solar:arrow-down-bold" />
              -5.1% from last month
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <IconifyIcon icon="solar:dollar-minimalistic-bold" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{isLoading ? '...' : formatCurrency(stats.revenue)}</div>
            <div className="stat-label">Total Value</div>
            <div className="stat-change positive">
              <IconifyIcon icon="solar:arrow-up-bold" />
              +18.2% from last month
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card" onClick={() => (window.location.href = '/admin/property/list')}>
            <div className="action-icon blue">
              <IconifyIcon icon="solar:list-bold" />
            </div>
            <div className="action-content">
              <h3>View All Properties</h3>
              <p>Browse complete property listings</p>
            </div>
          </button>

          <button className="action-card" onClick={() => (window.location.href = '/admin/property/approvals')}>
            <div className="action-icon green">
              <IconifyIcon icon="solar:check-square-bold" />
            </div>
            <div className="action-content">
              <h3>Approve Listings</h3>
              <p>Review pending property approvals</p>
            </div>
          </button>

          <button className="action-card" onClick={() => (window.location.href = '/dashboards/analytics')}>
            <div className="action-icon purple">
              <IconifyIcon icon="solar:chart-bold" />
            </div>
            <div className="action-content">
              <h3>View Analytics</h3>
              <p>Detailed performance insights</p>
            </div>
          </button>

          <button className="action-card" onClick={() => (window.location.href = '/admin/reports')}>
            <div className="action-icon orange">
              <IconifyIcon icon="solar:file-bold" />
            </div>
            <div className="action-content">
              <h3>Generate Reports</h3>
              <p>Create detailed property reports</p>
            </div>
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="analytics-section">
        <div className="analytics-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Property Listings Trend</h3>
              <div className="chart-actions">
                <button className="btn-icon">
                  <IconifyIcon icon="solar:restart-bold" />
                </button>
                <button className="btn-icon">
                  <IconifyIcon icon="solar:download-bold" />
                </button>
              </div>
            </div>
            <div className="chart-content">
              {isLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <div className="chart-placeholder">
                  <IconifyIcon icon="solar:chart-bold" />
                  <p>Property trends chart will be displayed here</p>
                </div>
              )}
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Property Types Distribution</h3>
              <span className="status-badge">Updated</span>
            </div>
            <div className="chart-content">
              {isLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading distribution...</p>
                </div>
              ) : (
                <div className="property-types">
                  {[
                    { type: 'Apartment', percentage: 35, color: 'blue' },
                    { type: 'House', percentage: 25, color: 'green' },
                    { type: 'Villa', percentage: 15, color: 'orange' },
                    { type: 'Commercial', percentage: 15, color: 'purple' },
                    { type: 'Land', percentage: 10, color: 'red' },
                  ].map((item, index) => (
                    <div key={index} className="property-type-item">
                      <div className={`type-indicator ${item.color}`}></div>
                      <span className="type-name">{item.type}</span>
                      <span className="type-percentage">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Overview */}
      <div className="properties-overview">
        <div className="properties-grid">
          <div className="properties-card">
            <div className="card-header">
              <h3>Recent Properties</h3>
              <button className="view-all-btn">
                View All <IconifyIcon icon="solar:arrow-right-bold" />
              </button>
            </div>
            <div className="card-content">
              {isLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading properties...</p>
                </div>
              ) : properties.length > 0 ? (
                <div className="properties-list">
                  {properties.slice(0, 5).map((property, index) => (
                    <div key={index} className="property-item" onClick={() => handleViewProperty(property)}>
                      <div className="property-info">
                        <h4>{property.title}</h4>
                        <p>{property.location}</p>
                        <span className="property-price">{formatCurrency(property.price)}</span>
                      </div>
                      <div className={`property-status ${property.status}`}>{property.status}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <IconifyIcon icon="solar:home-2-bold" />
                  <p>No properties found</p>
                </div>
              )}
            </div>
          </div>

          <div className="properties-card">
            <div className="card-header">
              <h3>Top Performing Properties</h3>
              <button className="view-all-btn">
                View All <IconifyIcon icon="solar:arrow-right-bold" />
              </button>
            </div>
            <div className="card-content">
              {isLoading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading top properties...</p>
                </div>
              ) : properties.length > 0 ? (
                <div className="properties-list">
                  {properties.slice(0, 5).map((property, index) => (
                    <div key={index} className="property-item" onClick={() => handleViewProperty(property)}>
                      <div className="property-info">
                        <h4>{property.title}</h4>
                        <p>{property.location}</p>
                        <span className="property-price">{formatCurrency(property.price)}</span>
                      </div>
                      <div className="property-rank">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <IconifyIcon icon="solar:star-bold" />
                  <p>No top properties available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Management Table */}
      <div className="property-table-section">
        <div className="table-header">
          <h3>All Properties</h3>
          <div className="table-actions">
            <div className="search-box">
              <IconifyIcon icon="solar:magnifer-bold" />
              <input type="text" placeholder="Search properties..." className="search-input" />
            </div>
            <button className="btn-secondary">
              <IconifyIcon icon="solar:filter-bold" />
              Filter
            </button>
          </div>
        </div>
        <div className="table-content">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading property data...</p>
            </div>
          ) : properties.length > 0 ? (
            <div className="properties-table">
              <div className="table-header-row">
                <div className="table-cell">Property</div>
                <div className="table-cell">Location</div>
                <div className="table-cell">Price</div>
                <div className="table-cell">Status</div>
                <div className="table-cell">Actions</div>
              </div>
              {properties.map((property, index) => (
                <div key={index} className="table-row">
                  <div className="table-cell">
                    <div className="property-cell">
                      <h4>{property.title}</h4>
                      <p>{property.type}</p>
                    </div>
                  </div>
                  <div className="table-cell">{property.location}</div>
                  <div className="table-cell">{formatCurrency(property.price)}</div>
                  <div className="table-cell">
                    <span className={`status-badge ${property.status}`}>{property.status}</span>
                  </div>
                  <div className="table-cell">
                    <div className="action-buttons">
                      <button className="btn-icon" onClick={() => handleViewProperty(property)}>
                        <IconifyIcon icon="solar:eye-bold" />
                      </button>
                      <button className="btn-icon" onClick={() => handleEditProperty(property)}>
                        <IconifyIcon icon="solar:pen-bold" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <IconifyIcon icon="solar:home-2-bold" />
              <p>No properties found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showDetailModal && (
        <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="xl" className={theme === 'dark' ? 'dark-modal' : ''}>
          <Modal.Header closeButton>
            <Modal.Title>Property Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProperty && (
              <PropertyDetailView
                property={selectedProperty}
                onEdit={() => {
                  setShowDetailModal(false)
                  handleEditProperty(selectedProperty)
                }}
              />
            )}
          </Modal.Body>
        </Modal>
      )}

      {showEditModal && (
        <Modal
          show={showEditModal}
          onHide={handleCloseEditModal}
          size="xl"
          backdrop="static"
          keyboard={false}
          className={theme === 'dark' ? 'dark-modal' : ''}>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? 'Edit Property' : 'Add New Property'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PropertyUploadForm initialData={selectedProperty} isEdit={isEdit} onSuccess={handleFormSuccess} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}

export default PropertyDashboardPage
