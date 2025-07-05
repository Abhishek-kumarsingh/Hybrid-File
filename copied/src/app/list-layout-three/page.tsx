import React from 'react'
import Navbar from '../components/navbar/navbar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'
import ListThree from '../components/property/list-three'

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>
        <section className="gray-simple">
            <ListThree/>
        </section>

        <FooterTop bg="theme-bg"/>

        <Footer/>

        <ScrollToTop/>
    </>
  )
}
