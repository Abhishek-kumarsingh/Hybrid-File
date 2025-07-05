'use client'
import React from 'react'

import Navbar from '../components/navbar/navbar'
import FilterTop from '../components/filter-top'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

import ListTwo from '../components/property/list-two'

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>
        <section className="gray-simple">
            <div className="container">
                <div className="row m-0">
                    <FilterTop/>
                </div>
                <ListTwo/>
            </div>	
        </section>

        <FooterTop bg="theme-bg"/>

        <Footer/>

        <ScrollToTop/>
    </>
  )
}
