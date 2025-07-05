'use client'

import { useSession } from 'next-auth/react'
import { AdminDashboard } from '@/components/dashboard/AdminDashboard'
import { AgentDashboard } from '@/components/dashboard/AgentDashboard'
import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const renderDashboard = () => {
    switch (session.user.role) {
      case 'ADMIN':
        return <AdminDashboard user={session.user} />
      case 'AGENT':
        return <AgentDashboard user={session.user} />
      case 'CUSTOMER':
        return <CustomerDashboard user={session.user} />
      default:
        return <CustomerDashboard user={session.user} />
    }
  }

  return (
    <div className="space-y-6">
      {renderDashboard()}
    </div>
  )
}
