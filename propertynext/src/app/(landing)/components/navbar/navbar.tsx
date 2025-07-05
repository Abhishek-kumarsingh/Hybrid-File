'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Navbar({ transparent }: { transparent: any }) {
  const [toggle, setIsToggle] = useState<boolean>(false)
  const [scroll, setScroll] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const { data: session, status } = useSession()

  const location = usePathname()
  const current = location

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50)
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial values
    handleScroll()
    handleResize()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSignIn = () => {
    signIn()
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <>
      <div className={`header ${transparent ? 'header-transparent' : 'header-light head-border'} ${scroll ? 'header-fixed' : ''}`}>
        <div className="container-fluid">
          <nav id="navigation" className={windowWidth > 991 ? "navigation navigation-landscape" : "navigation navigation-portrait"}>
            <div className="nav-header" style={{lineHeight:'0'}}>
              <Link className="nav-brand text-logo" href="/">
                <Image src='/img/svg/logo-light.svg' alt="PropertyNext Logo" width={40} height={40} />
                <h5 className="fs-3 fw-bold ms-1 my-0">PropertyNext</h5>
              </Link>
              <div className="nav-toggle" onClick={()=>setIsToggle(!toggle)}></div>
              <div className="mobile_nav">
                <ul>
                  <li>
                    <Link href="#" onClick={handleSignIn}>
                      <Image src='/img/svg/users.svg' alt="" width={24} height={24} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`nav-menus-wrapper ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{transitionProperty:toggle ? 'none' : 'left'}}>
              <span className="nav-menus-wrapper-close-button" onClick={()=>setIsToggle(!toggle)}>✕</span>
              <ul className="nav-menu">
                <li className={current === '/' ? 'active' : ''}><Link href="/">Home</Link></li>
                <li className={current === '/properties' ? 'active' : ''}><Link href="/properties">Properties</Link></li>
                <li className={current === '/about-us' ? 'active' : ''}><Link href="/about-us">About</Link></li>
                <li className={current === '/contact' ? 'active' : ''}><Link href="/contact">Contact</Link></li>
              </ul>

              <ul className="nav-menu nav-menu-social align-to-right">
                {!session ? (
                  <li>
                    <Link href="#" onClick={handleSignIn} className="btn btn-primary">
                      Sign In
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href="/dashboard" className="btn btn-outline-primary">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="#" onClick={handleSignOut} className="btn btn-outline-secondary">
                        Sign Out
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
