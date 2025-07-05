'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { 
  Home, 
  Building2, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  X,
  CheckCircle,
  Clock,
  Star,
  MessageSquare,
  Bell,
  UserCheck,
  TrendingUp,
  PlusCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigationItems = {
  ADMIN: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Properties', href: '/dashboard/properties', icon: Building2 },
    { name: 'Property Approvals', href: '/dashboard/approvals', icon: CheckCircle },
    { name: 'Users', href: '/dashboard/users', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  AGENT: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Properties', href: '/dashboard/properties', icon: Building2 },
    { name: 'Add Property', href: '/dashboard/properties/add', icon: PlusCircle },
    { name: 'Clients', href: '/dashboard/clients', icon: Users },
    { name: 'Performance', href: '/dashboard/performance', icon: TrendingUp },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  CUSTOMER: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Properties', href: '/dashboard/properties', icon: Building2 },
    { name: 'Submit Property', href: '/dashboard/properties/submit', icon: PlusCircle },
    { name: 'Favorites', href: '/dashboard/favorites', icon: Star },
    { name: 'Applications', href: '/dashboard/applications', icon: FileText },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]
}

export function Sidebar({ userRole, onClose }) {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigation = navigationItems[userRole] || navigationItems.CUSTOMER

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Error signing out:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-white shadow-lg">
      {/* Logo and close button */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">PropertyNext</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                isActive
                  ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User role badge and logout */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-center">
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            userRole === 'ADMIN' && "bg-purple-100 text-purple-800",
            userRole === 'AGENT' && "bg-blue-100 text-blue-800",
            userRole === 'CUSTOMER' && "bg-green-100 text-green-800"
          )}>
            {userRole}
          </span>
        </div>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={handleSignOut}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </div>
    </div>
  )
}
