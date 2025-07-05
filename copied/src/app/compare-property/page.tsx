import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '../components/navbar/navbar'
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
                        <h2 className="ipt-title">Compare Property</h2>
                        <span className="ipn-subtitle">Compare your Selected Property</span>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="pricing pricing-5">
                    <div className="row">
                        <div className="col-lg-3 text-center d-lg-block d-md-none d-sm-none d-none">
                            <div className="comp-property-blank">
                            </div>
                            <ul>
                                <li><span>Area</span></li>
                                <li><span>Rooms</span></li>
                                <li><span>Bedrooms</span></li>
                                <li><span>Bathrooms</span></li>
                                <li><span>Air Conditioning</span></li>
                                <li><span>Swimming Pool</span></li>
                                <li><span>Laundry Room</span></li>
                                <li><span>Window Covering</span></li>
                                <li><span>Building Age</span></li>
                                <li><span>Alarm</span></li>
                                <li><span>Heating</span></li>
                                <li><span>Parking</span></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12 text-center">
                            <div className="comp-property">
                                <Link href="#">
                                    <div className="clp-img">
                                        <Image src="/img/p-1.jpg" width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                        <span className="remove-from-compare"><i className="fa-solid fa-xmark"></i></span>
                                    </div>

                                    <div className="clp-title mb-2">
                                        <h4 className=''>Eagle Apartments</h4>
                                        <span>$275,000</span>
                                    </div>
                                </Link>
                            </div>
                            <ul>
                                <li>1750 sq ft<span className="show-mb"></span></li>
                                <li>3<span className="show-mb">Rooms</span></li>
                                <li>2<span className="show-mb">Bedrooms</span></li>
                                <li>2<span className="show-mb">Bathrooms</span></li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Air Conditioning</span>
                                </li>
                                <li>
                                    <div className="crossmark"></div>
                                    <span className="show-mb"> No Swimming Pool</span>
                                </li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Laundry Room</span>
                                </li>
                                <li>
                                    <div className="crossmark"></div>
                                    <span className="show-mb">No Window Covering</span>
                                </li>
                                <li>1 - 5 Year<span className="show-mb">Age</span></li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Alarm</span>
                                </li>
                                <li>Forced Air<span className="show-mb">Forced Air</span></li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Parking</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12 text-center pricing--emphasise">
                            <div className="comp-property">
                                <Link href="#">
                                    <div className="clp-img">
                                        <Image src="/img/p-2.jpg" width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                        <span className="remove-from-compare"><i className="fa-solid fa-xmark"></i></span>
                                    </div>

                                    <div className="clp-title">
                                        <h4>Eagle Apartments</h4>
                                        <span>$275,000</span>
                                    </div>
                                </Link>
                            </div>
                            <ul>
                                <li>1750 sq ft<span className="show-mb">Area</span></li>
                                <li>3<span className="show-mb">Rooms</span></li>
                                <li>2<span className="show-mb">Bedrooms</span></li>
                                <li>2<span className="show-mb">Bathrooms</span></li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Air Conditioning</span>
                                </li>
                                <li>
                                    <div className="crossmark"></div>
                                    <span className="show-mb"> No Swimming Pool</span>
                                </li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Laundry Room</span>
                                </li>
                                <li>
                                    <div className="crossmark"></div>
                                    <span className="show-mb">No Window Covering</span>
                                </li>
                                <li>1 - 5 Year<span className="show-mb">Age</span></li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Alarm</span>
                                </li>
                                <li> Gas<span className="show-mb">Gas Heating</span></li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Parking</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="col-lg-3 col-md-4 col-sm-12 text-center">
                            <div className="comp-property">
                                <Link href="#">
                                    <div className="clp-img">
                                        <Image src='/img/p-3.jpg' width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                        <span className="remove-from-compare"><i className="fa-solid fa-xmark"></i></span>
                                    </div>

                                    <div className="clp-title">
                                        <h4>Eagle Apartments</h4>
                                        <span>$275,000</span>
                                    </div>
                                </Link>
                            </div>
                            <ul>
                                <li>1750 sq ft<span className="show-mb">Area</span></li>
                                <li>3<span className="show-mb">Rooms</span></li>
                                <li>2<span className="show-mb">Bedrooms</span></li>
                                <li>2<span className="show-mb">Bathrooms</span></li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Air Conditioning</span>
                                </li>
                                <li>
                                    <div className="crossmark"></div>
                                    <span className="show-mb"> No Swimming Pool</span>
                                </li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Laundry Room</span>
                                </li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Window Covering</span>
                                </li>
                                <li>
                                    1 - 5 Year
                                    <span className="show-mb">Age</span>
                                </li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Alarm</span>
                                </li>
                                <li>Forced Air<span className="show-mb">Forced Air</span></li>
                                <li>
                                    <div className="checkmark"></div>
                                    <span className="show-mb">Parking</span>
                                </li>
                            </ul>
                        </div>
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
