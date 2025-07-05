'use client'

import LogoBox from '@/components/LogoBox'
import React, { useEffect, useState } from 'react'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import AppMenu from './components/AppMenu'
import { getMenuItems } from '@/helpers/Manu'
import { useLayoutContext } from '@/context/useLayoutContext'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button } from 'react-bootstrap'

const VerticalNavigationBar = ({ collapsed }) => {
  const [menuItems, setMenuItems] = useState([])
  const { theme } = useLayoutContext()
  const [activeSection, setActiveSection] = useState('')

  // Load menu items on client side to prevent suspension
  useEffect(() => {
    setMenuItems(getMenuItems())
  }, [])

  // Detect active section based on URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      const section = path.split('/')[2] || ''
      setActiveSection(section)
    }
  }, [])

  return (
    <aside
      className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${theme === 'dark' ? 'sidebar-dark' : 'sidebar-light'}`}
      id="leftside-menu-container">
      <div className="sidebar-header">
        <LogoBox collapsed={collapsed} />
      </div>

      <div className="sidebar-content">
        <SimplebarReactClient className="sidebar-menu-container" data-simplebar>
          <div className="sidebar-user">
            <div className={`user-info ${collapsed ? 'd-none' : 'd-flex'}`}>
              <div className="user-avatar">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" className="rounded-circle" />
                <span className="user-status online"></span>
              </div>

              <div className="user-details ms-2">
                <h6 className="user-name mb-0">Admin User</h6>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <AppMenu menuItems={menuItems} collapsed={collapsed} activeSection={activeSection} setActiveSection={setActiveSection} />
          </nav>
        </SimplebarReactClient>
      </div>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="sidebar-footer-content">
            <div className="system-status d-flex align-items-center mb-3">
              <IconifyIcon icon="solar:server-bold" className="me-2" />
              <div>
                <div className="small text-muted">System Status</div>
                <div className="d-flex align-items-center">
                  <span className="status-indicator online me-1"></span>
                  <small>All systems operational</small>
                </div>
              </div>
            </div>

            <Button variant="primary" size="sm" className="w-100">
              <IconifyIcon icon="solar:help-bold" className="me-1" />
              Support Center
            </Button>
          </div>
        )}

        {collapsed && (
          <div className="sidebar-footer-icons d-flex flex-column align-items-center">
            <IconifyIcon icon="solar:server-bold" className="mb-3" />
            <IconifyIcon icon="solar:help-bold" />
          </div>
        )}
      </div>
    </aside>
  )
}

export default VerticalNavigationBar
