import React from 'react'
import Image from 'next/image'

import Navbar from '../../components/navbar/navbar'
import HomeSliderTwo from '../../components/slider/home-slider-two'
import PropertyDetail from '../../components/property/property-detail'
import DetailSidebar from '../../components/property/detail-sidebar'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import ScrollToTop from '../../components/scroll-to-top'
import { propertyData } from '@/app/data/data'

export default function Page({ params }: { params: { id: string } } ) {
    let data = propertyData.find((item:any)=>item.id === parseInt(params.id))
  return (
    <>
        <Navbar transparent={false}/>   
        <HomeSliderTwo/>

        <section className="gray-simple rtl p-0">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-11 col-md-12">
                
                        <div className="property_block_wrap style-3">
                        
                            <div className="pbw-flex-1">
                                <div className="pbw-flex-thumb">
                                    <Image src='/img/agency-1.png' width={128} height={128} className="img-fluid" alt="" />
                                </div>
                            </div>
                            
                            <div className="pbw-flex">
                                <div className="prt-detail-title-desc">
                                    <span className="label text-light bg-success">For Sale</span>
                                    <h3 className='mt-3'>{data?.name}</h3>
                                    <span><i className="lni-map-marker"></i> 778 Country St. Panama City, FL</span>
                                    <h3 className="prt-price-fix text-primary mt-2">$7,600<sub>/month</sub></h3>
                                    <div className="list-fx-features">
                                        <div className="listing-card-info-icon">
                                            <div className="inc-fleat-icon me-1"><Image src='/img/bed.svg' width={13} height={13} alt=""/></div>3 Beds
                                        </div>
                                        <div className="listing-card-info-icon">
                                            <div className="inc-fleat-icon me-1"><Image src='/img/bathtub.svg' width={13} height={13} alt=""/></div>1 Bath
                                        </div>
                                        <div className="listing-card-info-icon">
                                            <div className="inc-fleat-icon me-1"><Image src='/img/move.svg' width={13} height={13} alt=""/></div>800 sqft
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	
                </div>
            </div>
        </section>

        <section className="gray-simple min">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
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
