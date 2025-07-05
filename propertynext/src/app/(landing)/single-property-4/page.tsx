import React from 'react'

import Navbar from '../components/navbar/navbar'
import HomeSliderTwo from '../components/slider/home-slider-two'
import PropertyDetail from '../components/property/property-detail'
import DetailSidebar from '../components/property/detail-sidebar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>  
        <HomeSliderTwo/>

        <section className="gray-simple">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="property_block_wrap style-2 p-4">
                            <div className="prt-detail-title-desc">
                                <span className="label text-light bg-success">For Sale</span>
                                <h3 className='mt-3'>Jannat Graynight Mood In Siver Colony, London</h3>
                                <span><i className="lni-map-marker"></i> 778 Country St. Panama City, FL</span>
                                <h3 className="prt-price-fix text-primary mt-2">$7,600<sub>/month</sub></h3>
                                <div className="list-fx-features">
                                    <div className="listing-card-info-icon">
                                        <div className="inc-fleat-icon me-1"><img src='/img/bed.svg' width="13" alt=""/></div>3 Beds
                                    </div>
                                    <div className="listing-card-info-icon">
                                        <div className="inc-fleat-icon me-1"><img src='/img/bathtub.svg' width="13" alt=""/></div>1 Bath
                                    </div>
                                    <div className="listing-card-info-icon">
                                        <div className="inc-fleat-icon me-1"><img src='/img/move.svg' width="13" alt=""/></div>800 sqft
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PropertyDetail/>
                    </div>
                    
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <DetailSidebar/>
                    </div>
                </div>
            </div>
        </section>

        <FooterTop bg="theme-bg"/>
        <Footer/>

        <ScrollToTop/>
    </>
  )
}
