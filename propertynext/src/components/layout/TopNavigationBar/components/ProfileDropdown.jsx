'use client'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'

const ProfileDropdown = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Retrieve deviceId from localStorage (or generate if needed)
      const deviceId = localStorage.getItem('deviceId')

      // Fetch userId from JWT cookie (can't directly access httpOnly cookie from JS)
      // So either store userId in localStorage during login OR decode token on server
      const res = await fetch('/api/auth/session') // Your own endpoint or next-auth session
      const sessionData = await res.json()
      const userId = sessionData?.user?.id

      // Call custom logout endpoint
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          deviceId,
        }),
      })

      // Clear local device info if needed
      localStorage.removeItem('deviceId')

      // Redirect
      router.push('/auth/sign-in')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Dropdown className="topbar-item" drop="down">
      <DropdownToggle as="a" type="button" className="topbar-button content-none">
        <span className="d-flex align-items-center">
          <Image className="rounded-circle" width={32} src={avatar1} alt="avatar" />
        </span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <DropdownHeader as="h6" className="dropdown-header">
          Welcome!
        </DropdownHeader>
        <DropdownItem as={Link} href="/profile">
          <IconifyIcon icon="solar:calendar-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">My Schedules</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/pages/pricing">
          <IconifyIcon icon="solar:wallet-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/support/faqs">
          <IconifyIcon icon="solar:help-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">Help</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/auth/lock-screen">
          <IconifyIcon icon="solar:lock-keyhole-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">Lock screen</span>
        </DropdownItem>
        <div className="dropdown-divider my-1" />
        <DropdownItem onClick={handleLogout} className="text-danger" style={{ cursor: 'pointer' }}>
          <IconifyIcon icon="solar:logout-3-broken" className="align-middle me-2 fs-18" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProfileDropdown
