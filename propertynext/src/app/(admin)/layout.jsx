'use client'

import Footer from '@/components/layout/Footer'
import AuthProtectionWrapper from '@/components/wrappers/AuthProtectionWrapper'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLayoutContext } from '@/context/useLayoutContext'

const TopNavigationBar = dynamic(() => import('@/components/layout/TopNavigationBar/page'))
const VerticalNavigationBar = dynamic(() => import('@/components/layout/VerticalNavigationBar/page'))

const AdminLayout = ({ children }) => {
  const { theme } = useLayoutContext()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
      if (window.innerWidth < 768 && !sidebarCollapsed) {
        setSidebarCollapsed(true)
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
    }

    handleResize()
    handleFullscreenChange()

    window.addEventListener('resize', handleResize)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [sidebarCollapsed])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <AuthProtectionWrapper>
      <div
        className={`admin-wrapper ${theme} ${isFullscreen ? 'is-fullscreen' : ''} ${isMobile ? 'is-mobile' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <TopNavigationBar toggleSidebar={toggleSidebar} />

        <div className="main-container">
          <div className="vertical-navigation-bar">
            <VerticalNavigationBar collapsed={sidebarCollapsed} />
          </div>

          <div className="page-content">
            <div className="content-wrapper">
              <Container fluid className="px-4">
                {children}
              </Container>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </AuthProtectionWrapper>
  )
}

export default AdminLayout
