import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Link from 'next/link'

import PropertyDetail from '../../components/property/property-detail'
import DetailSidebar from '../../components/property/detail-sidebar'
import FooterTop from '../../components/footer-top'
import Footer from '../../components/footer'
import ScrollToTop from '@/app/components/scroll-to-top'

import { propertyData } from '@/app/data/data'

export default function Page({ params }: { params: { id: string } }) {
    let data = propertyData.find((item:any)=>item.id === parseInt(params.id))
  return (
    <>
        <Navbar transparent={false}/>   

        <section className="bg-title">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-11 col-md-12">
                        <div className="property_block_wrap style-4">
                            <div className="prt-detail-title-desc">
                                <span className="label text-light bg-warning mb-1 d-inline-flex">For Sale</span>
                                <h3 className="text-light mt-3">{data?.name}</h3>
                                <span><i className="lni-map-marker"></i> 778 Country St. Panama City, FL</span>
                                <h3 className="prt-price-fix text-light mt-2">$7,600<sub>/month</sub></h3>
                                <div className="pbwts-social">
                                    <ul className='mt-2'>
                                        <li>Share:</li>
                                        <li><Link href="#"><i className="fa-brands fa-facebook"></i></Link></li>
                                        <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
                                        <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                        <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>	
                </div>
            </div>
        </section>
        <section className="gray-simple">
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
