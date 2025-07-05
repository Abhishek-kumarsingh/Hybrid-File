'use client'

import { useState, useEffect } from 'react'
import { 
  Building2, 
  Heart, 
  FileText, 
  Clock, 
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  MessageSquare,
  Bell
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency, formatNumber, formatRelativeTime } from '@/lib/utils'
import Link from 'next/link'

export function CustomerDashboard({ user }) {
  const [stats, setStats] = useState({
    myProperties: 0,
    favorites: 0,
    applications: 0,
    notifications: 0
  })
  const [myProperties, setMyProperties] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch user's properties
      try {
        const propertiesResponse = await fetch('/api/user/properties')
        if (propertiesResponse.ok) {
          const propertiesData = await propertiesResponse.json()
          setMyProperties(propertiesData.properties || [])
          setStats(prev => ({ ...prev, myProperties: propertiesData.properties?.length || 0 }))
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
      }

      // Fetch user statistics
      try {
        const statsResponse = await fetch('/api/user/properties/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(prev => ({ ...prev, ...statsData }))
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className="text-xs text-gray-500 mt-1">{change}</p>
            )}
          </div>
          <div className={`p-3 bg-${color}-100 rounded-full`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-purple-100">
          Manage your property submissions and track their approval status.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Properties"
          value={formatNumber(stats?.myProperties || 0)}
          change="Total submitted"
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Favorites"
          value={formatNumber(stats?.favorites || 0)}
          change="Saved properties"
          icon={Heart}
          color="red"
        />
        <StatCard
          title="Applications"
          value={formatNumber(stats?.applications || 0)}
          change="Property applications"
          icon={FileText}
          color="green"
        />
        <StatCard
          title="Notifications"
          value={formatNumber(stats?.notifications || 0)}
          change="Unread messages"
          icon={Bell}
          color="yellow"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your property submissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/properties/submit">
                  <Button className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit New Property
                  </Button>
                </Link>
                <Link href="/dashboard/properties">
                  <Button variant="outline" className="w-full justify-start">
                    <Building2 className="mr-2 h-4 w-4" />
                    View All Properties
                  </Button>
                </Link>
                <Link href="/dashboard/favorites">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    View Favorites
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Property Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Property Status Overview</CardTitle>
                <CardDescription>Current status of your submissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Pending Review</span>
                  </div>
                  <Badge variant="warning">
                    {myProperties.filter(p => p.approvalStatus === 'PENDING').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Approved</span>
                  </div>
                  <Badge variant="success">
                    {myProperties.filter(p => p.approvalStatus === 'APPROVED').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Rejected</span>
                  </div>
                  <Badge variant="destructive">
                    {myProperties.filter(p => p.approvalStatus === 'REJECTED').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Properties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Property Submissions</CardTitle>
                <CardDescription>Your latest property submissions</CardDescription>
              </div>
              <Link href="/dashboard/properties">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {myProperties.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No properties submitted yet</p>
                  <Link href="/dashboard/properties/submit">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Submit Your First Property
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myProperties.slice(0, 5).map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.address}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <p className="text-sm font-medium text-green-600">
                            {formatCurrency(property.price)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Submitted {formatRelativeTime(property.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            property.approvalStatus === 'APPROVED' ? 'success' :
                            property.approvalStatus === 'REJECTED' ? 'destructive' : 'warning'
                          }
                        >
                          {property.approvalStatus}
                        </Badge>
                        <Link href={`/dashboard/properties/${property.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Property approved</p>
                    <p className="text-sm text-gray-600">Your downtown apartment listing was approved</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New message received</p>
                    <p className="text-sm text-gray-600">Admin commented on your property submission</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Plus className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Property submitted</p>
                    <p className="text-sm text-gray-600">You submitted a new property for review</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Properties</CardTitle>
              <CardDescription>Properties you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No favorite properties yet</p>
                <Link href="/properties">
                  <Button variant="outline">
                    Browse Properties
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
