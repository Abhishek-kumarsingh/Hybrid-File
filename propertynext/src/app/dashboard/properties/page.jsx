'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Bed,
  Bath,
  Square
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatRelativeTime, getStatusColor } from '@/lib/utils'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function PropertiesPage() {
  const { data: session } = useSession()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/properties')
      if (response.ok) {
        const data = await response.json()
        setProperties(data.properties || [])
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || property.approvalStatus === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusCounts = () => {
    return {
      all: properties.length,
      PENDING: properties.filter(p => p.approvalStatus === 'PENDING').length,
      APPROVED: properties.filter(p => p.approvalStatus === 'APPROVED').length,
      REJECTED: properties.filter(p => p.approvalStatus === 'REJECTED').length,
    }
  }

  const statusCounts = getStatusCounts()

  const PropertyCard = ({ property }) => (
    <Card className="property-card">
      <CardContent className="p-0">
        {/* Property Image */}
        <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0].url}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Building2 className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={getStatusColor(property.approvalStatus)}>
              {property.approvalStatus}
            </Badge>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(property.price)}
            </p>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm line-clamp-1">{property.address}, {property.city}</span>
          </div>

          {/* Property Features */}
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.area} sq ft</span>
            </div>
          </div>

          {/* Submission Date */}
          <p className="text-xs text-gray-500 mb-4">
            Submitted {formatRelativeTime(property.createdAt)}
          </p>

          {/* Actions */}
          <div className="flex space-x-2">
            <Link href={`/dashboard/properties/${property.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </Link>
            {property.approvalStatus === 'PENDING' && (
              <Link href={`/dashboard/properties/${property.id}/edit`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-600">Manage your property submissions</p>
        </div>
        <Link href="/dashboard/properties/submit">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Submit Property
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="PENDING">
            Pending ({statusCounts.PENDING})
          </TabsTrigger>
          <TabsTrigger value="APPROVED">
            Approved ({statusCounts.APPROVED})
          </TabsTrigger>
          <TabsTrigger value="REJECTED">
            Rejected ({statusCounts.REJECTED})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="mt-6">
          {filteredProperties.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No properties found' : 'No properties yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms'
                    : 'Get started by submitting your first property'
                  }
                </p>
                {!searchTerm && (
                  <Link href="/dashboard/properties/submit">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Property
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
