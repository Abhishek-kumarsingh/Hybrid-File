'use client'

import { useState, useEffect } from 'react'
import {
  Building2,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency, formatNumber, formatRelativeTime } from '@/lib/utils'
import Link from 'next/link'

export function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    pendingApprovals: 0,
    approvedToday: 0
  })
  const [recentProperties, setRecentProperties] = useState([])
  const [pendingApprovals, setPendingApprovals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch dashboard statistics
      try {
        const statsResponse = await fetch('/api/admin/dashboard/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)

          // Set pending approvals from stats
          if (statsData?.recentSubmissions) {
            setPendingApprovals(statsData.recentSubmissions)
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }

      // Fetch recent properties
      try {
        const propertiesResponse = await fetch('/api/properties?limit=5&sort=createdAt:desc')
        if (propertiesResponse.ok) {
          const propertiesData = await propertiesResponse.json()
          setRecentProperties(propertiesData.properties || [])
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100">
          Here's what's happening with your property management system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={formatNumber(stats?.overview?.totalProperties || 0)}
          change="+12% from last month"
          icon={Building2}
          trend="up"
        />
        <StatCard
          title="Active Users"
          value={formatNumber(stats?.overview?.totalUsers || 0)}
          change="+8% from last month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Pending Approvals"
          value={formatNumber(stats?.overview?.pendingProperties || 0)}
          change="3 new today"
          icon={Clock}
          trend="up"
        />
        <StatCard
          title="Approved Properties"
          value={formatNumber(stats?.overview?.approvedProperties || 0)}
          change="+5 from yesterday"
          icon={CheckCircle}
          trend="up"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/properties/add">
                  <Button className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Property
                  </Button>
                </Link>
                <Link href="/dashboard/users">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                </Link>
                <Link href="/dashboard/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database</span>
                  <Badge variant="success">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Response</span>
                  <Badge variant="success">Fast</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Storage</span>
                  <Badge variant="warning">85% Used</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Backup</span>
                  <Badge variant="success">Up to date</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Property Approvals</CardTitle>
                <CardDescription>Properties waiting for your review</CardDescription>
              </div>
              <Link href="/dashboard/approvals">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No pending approvals</p>
              ) : (
                <div className="space-y-4">
                  {pendingApprovals.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.address}</p>
                        <p className="text-sm font-medium text-green-600">
                          {formatCurrency(property.price)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="warning">Pending</Badge>
                        <Link href={`/dashboard/properties/${property.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
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

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Properties</CardTitle>
              <CardDescription>Latest property submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {recentProperties.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No recent properties</p>
              ) : (
                <div className="space-y-4">
                  {recentProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-gray-600">{property.address}</p>
                        <p className="text-xs text-gray-500">
                          {formatRelativeTime(property.createdAt)}
                        </p>
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
      </Tabs>
    </div>
  )
}
