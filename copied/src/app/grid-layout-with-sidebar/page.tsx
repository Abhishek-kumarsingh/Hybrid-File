import React from 'react'

import Navbar from '../components/navbar/navbar'
import GridOne from '../components/property/grid-one'
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
                        <h2 className="ipt-title">Grid Layout With Sidebar</h2>
                        <span className="ipn-subtitle">Property Grid With Sidebar</span>
                    </div>
                </div>
            </div>
        </div>

        <section className="gray-simple">
           <GridOne/>
        </section>

        <FooterTop bg="theme-bg"/>

        <Footer/>

        <ScrollToTop/>
    </>
  )
}
