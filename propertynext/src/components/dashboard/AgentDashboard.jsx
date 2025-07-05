'use client'

import { useState, useEffect } from 'react'
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Plus,
  MessageSquare,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency, formatNumber, formatRelativeTime } from '@/lib/utils'
import Link from 'next/link'

export function AgentDashboard({ user }) {
  const [stats, setStats] = useState({
    myProperties: 0,
    activeListings: 0,
    totalClients: 0,
    monthlyCommission: 0
  })
  const [myProperties, setMyProperties] = useState([])
  const [recentClients, setRecentClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch agent statistics
      try {
        const statsResponse = await fetch('/api/agents/performance')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }

      // Fetch agent's properties
      try {
        const propertiesResponse = await fetch('/api/user/properties?limit=5')
        if (propertiesResponse.ok) {
          const propertiesData = await propertiesResponse.json()
          setMyProperties(propertiesData.properties || [])
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className={`text-xs flex items-center mt-1 ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {change}
              </p>
            )}
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Icon className="h-6 w-6 text-blue-600" />
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
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-green-100">
          Manage your property listings and track your performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Properties"
          value={formatNumber(stats?.myProperties || 0)}
          change="+2 this month"
          icon={Building2}
          trend="up"
        />
        <StatCard
          title="Active Listings"
          value={formatNumber(stats?.activeListings || 0)}
          change="3 pending approval"
          icon={Eye}
          trend="up"
        />
        <StatCard
          title="Total Clients"
          value={formatNumber(stats?.totalClients || 0)}
          change="+5 this month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Monthly Commission"
          value={formatCurrency(stats?.monthlyCommission || 0)}
          change="+15% from last month"
          icon={DollarSign}
          trend="up"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your property listings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/properties/add">
                  <Button className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Property
                  </Button>
                </Link>
                <Link href="/dashboard/properties">
                  <Button variant="outline" className="w-full justify-start">
                    <Building2 className="mr-2 h-4 w-4" />
                    View All Properties
                  </Button>
                </Link>
                <Link href="/dashboard/clients">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Clients
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Properties */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Properties</CardTitle>
                  <CardDescription>Your latest listings</CardDescription>
                </div>
                <Link href="/dashboard/properties">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {myProperties.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No properties yet</p>
                ) : (
                  <div className="space-y-4">
                    {myProperties.slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{property.title}</h4>
                          <p className="text-xs text-gray-600">{property.address}</p>
                          <p className="text-xs font-medium text-green-600">
                            {formatCurrency(property.price)}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            property.approvalStatus === 'APPROVED' ? 'success' :
                            property.approvalStatus === 'REJECTED' ? 'destructive' : 'warning'
                          }
                          className="text-xs"
                        >
                          {property.approvalStatus}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>This Month's Performance</CardTitle>
                <CardDescription>Your key metrics for this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Properties Listed</span>
                  <span className="text-lg font-bold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Properties Sold</span>
                  <span className="text-lg font-bold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Commission Earned</span>
                  <span className="text-lg font-bold">{formatCurrency(stats?.monthlyCommission || 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Client Satisfaction</span>
                  <span className="text-lg font-bold">4.8/5</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goals & Targets</CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Monthly Sales Target</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>New Clients Target</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Listing Target</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Client Activity</CardTitle>
                <CardDescription>Latest interactions with your clients</CardDescription>
              </div>
              <Link href="/dashboard/clients">
                <Button variant="outline" size="sm">
                  View All Clients
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">New message from John Doe</p>
                      <p className="text-sm text-gray-600">Interested in downtown property</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Viewing scheduled with Sarah Smith</p>
                      <p className="text-sm text-gray-600">Tomorrow at 2:00 PM</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
