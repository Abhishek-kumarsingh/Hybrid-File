'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Upload, MapPin, Home, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function SubmitPropertyPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    propertyType: 'House',
    bedrooms: '',
    bathrooms: '',
    area: '',
    images: []
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          area: parseFloat(formData.area),
          images: formData.images.length > 0 ? formData.images : ['https://via.placeholder.com/400x300']
        }),
      })

      if (response.ok) {
        toast.success('Property submitted successfully! It will be reviewed by our admin team.')
        router.push('/dashboard/properties')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to submit property')
      }
    } catch (error) {
      console.error('Error submitting property:', error)
      toast.error('An error occurred while submitting the property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Submit Property</h1>
            <p className="text-gray-600">Add a new property for admin review</p>
          </div>
        </div>
        <Badge variant="info">Pending Review</Badge>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Property Details</span>
          </CardTitle>
          <CardDescription>
            Fill in the details below to submit your property for review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Property Title *</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Beautiful 3BR House in Downtown"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your property..."
                required
              />
            </div>

            {/* Price and Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Price *
                </label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="500000"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bedrooms *</label>
                <Input
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="3"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bathrooms *</label>
                <Input
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="2"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Area (sq ft) *</label>
                <Input
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="2000"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Address *</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City *</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">ZIP Code *</label>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Country *</label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link href="/dashboard">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Property'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
