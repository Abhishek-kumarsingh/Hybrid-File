import React from 'react'

import Navbar from '../components/navbar/navbar'
import ClassicLayout from '../components/property/classic-layout'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
    <Navbar transparent={false}/> 

    <div className="page-title">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <h2 className="ipt-title">Classical Property width Sidebar</h2>
                    <span className="ipn-subtitle">Classical Property List With Sidebar</span>
                </div>
            </div>
        </div>
    </div>

    <section className="gray-simple">
        <ClassicLayout/>		
    </section>

    <FooterTop bg="theme-bg"/>

    <Footer/>

    <ScrollToTop/>

    </>
  )
}
