import React from 'react'

import Navbar from '../components/navbar/navbar'
import HomeMap from '../components/map/home-map'
import ClassicLayout from '../components/property/classic-layout'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
    <Navbar transparent={false}/>
    <HomeMap/>

    <section className="gray-simple">
        <ClassicLayout/>		
    </section>

    <FooterTop bg="theme-bg"/>
    <Footer/>
    <ScrollToTop/>
    </>
  )
}
