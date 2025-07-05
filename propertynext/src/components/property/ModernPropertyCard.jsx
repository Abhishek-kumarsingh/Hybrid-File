'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star,
  Share2,
  Eye,
  Building2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function ModernPropertyCard({ property }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(!isFavorited)
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Implement share functionality
  }

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)
    }
    return price
  }

  const getPropertyTypeColor = (type) => {
    const colors = {
      'House': 'bg-blue-100 text-blue-800',
      'Apartment': 'bg-green-100 text-green-800',
      'Condo': 'bg-purple-100 text-purple-800',
      'Townhouse': 'bg-orange-100 text-orange-800',
      'Villa': 'bg-pink-100 text-pink-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status) => {
    const colors = {
      'For Sale': 'bg-red-100 text-red-800 border-red-200',
      'For Rent': 'bg-green-100 text-green-800 border-green-200',
      'Sold': 'bg-gray-100 text-gray-800 border-gray-200',
    }
    return colors[status] || 'bg-blue-100 text-blue-800 border-blue-200'
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-2xl">
      <div className="relative overflow-hidden">
        {/* Property Image */}
        <div className="relative h-64 bg-gray-100">
          {property.images && property.images.length > 0 ? (
            <div className="relative h-full">
              <Image
                src={property.images[currentImageIndex]?.url || property.images[0]}
                alt={property.title || property.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Image Navigation Dots */}
              {property.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-200",
                        index === currentImageIndex 
                          ? "bg-white" 
                          : "bg-white/50 hover:bg-white/75"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="text-center text-white">
                <Building2 className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm font-medium">{property.propertyType || property.type}</p>
              </div>
            </div>
          )}
        </div>

        {/* Status and Type Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {property.status && (
            <Badge className={cn("text-xs font-medium", getStatusColor(property.status))}>
              {property.status}
            </Badge>
          )}
          {property.propertyType && (
            <Badge className={cn("text-xs font-medium", getPropertyTypeColor(property.propertyType))}>
              {property.propertyType}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
            onClick={handleFavorite}
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
              )} 
            />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Verification Badge */}
        {property.verified && (
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-green-500 text-white text-xs">
              <Star className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">
            {formatPrice(property.price || property.value)}
          </h3>
          {property.pricePerSqft && (
            <span className="text-sm text-gray-500">
              {formatPrice(property.pricePerSqft)}/sq ft
            </span>
          )}
        </div>

        {/* Property Title */}
        <Link href={`/property/${property.id}`}>
          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {property.title || property.name}
          </h4>
        </Link>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">
            {property.address || property.location}
          </span>
        </div>

        {/* Property Features */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms} bed</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms} bath</span>
              </div>
            )}
            {(property.area || property.sqft) && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.area || property.sqft} sq ft</span>
              </div>
            )}
          </div>
        </div>

        {/* Rating and Reviews */}
        {property.rating && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(property.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {property.reviews || 0} reviews
              </span>
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Link href={`/property/${property.id}`}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
