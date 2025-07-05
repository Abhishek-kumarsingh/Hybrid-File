import React from 'react'

import Navbar from '../components/navbar/navbar'
import FilterTop from '../components/filter-top'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'
import ListOne from '../components/property/list-one'

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>

        <section className="gray-simple">
            <div className="container">
                <div className="row m-0">
                    <FilterTop/>
                </div>
                <ListOne/>
            </div>	
        </section>

        <FooterTop bg="theme-bg"/>

        <Footer/>

        <ScrollToTop/>
    </>
  )
}
