import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FooterLight() {
  return (
    <footer className="light-footer skin-light-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="footer-widget">
              <Link className="nav-footer-logo" href="/">
                <Image src="/img/svg/logo-light.svg" width={65} height={65} alt="HomeVista Logo" />
                <h5 className="fs-2 fw-bold ms-1 my-0">HomeVista</h5>
              </Link>
              <div className="footer-add">
                <p>Collins Street West, Victoria 8007, Australia.</p>
                <p>+1 246-345-0695</p>
                <p>info@example.com</p>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4">
            <div className="footer-widget">
              <h4 className="widget-title">Navigations</h4>
              <ul className="footer-menu">
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/faq">FAQs Page</Link>
                </li>
                <li>
                  <Link href="/checkout">Checkout</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="footer-widget">
              <h4 className="widget-title">The Highlights</h4>
              <ul className="footer-menu">
                <li>
                  <Link href="#">Apartment</Link>
                </li>
                <li>
                  <Link href="#">My Houses</Link>
                </li>
                <li>
                  <Link href="#">Restaurant</Link>
                </li>
                <li>
                  <Link href="#">Nightlife</Link>
                </li>
                <li>
                  <Link href="#">Villas</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">My Account</h4>
              <ul className="footer-menu">
                <li>
                  <Link href="#">My Profile</Link>
                </li>
                <li>
                  <Link href="#">My account</Link>
                </li>
                <li>
                  <Link href="#">My Property</Link>
                </li>
                <li>
                  <Link href="#">Favorites</Link>
                </li>
                <li>
                  <Link href="#">Cart</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Download Apps</h4>
              <Link href="#" className="other-store-link">
                <div className="other-store-app">
                  <div className="os-app-icon">
                    <Image src="/img/svg/google-play-light.svg" width={38} height={38} alt="" />
                  </div>
                  <div className="os-app-caps">
                    {' '}
                    Google Play<span>Get It Now</span>
                  </div>
                </div>
              </Link>
              <Link href="#" className="other-store-link">
                <div className="other-store-app">
                  <div className="os-app-icon">
                    <Image src="/img/svg/apple-store-light.svg" width={38} height={38} alt="" />
                  </div>
                  <div className="os-app-caps">
                    App Store<span>Now it Available</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <p className="mb-0">© {new Date().getFullYear()} HomeVista. All rights reserved.</p>
            </div>
            <div className="col-lg-6 col-md-6 text-right">
              <ul className="footer-bottom-social">
                <li>
                  <Link href="https://www.facebook.com/shreethemes" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/shreethemes" target="_blank">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/shreethemes/" target="_blank">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/shreethemes" target="_blank">
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
