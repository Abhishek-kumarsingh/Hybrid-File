import React from 'react'
import Link from 'next/link'

import Navbar from '../components/navbar/navbar'
import FooterTop from '../components/footer-top'
import PropertySelect from '../components/property/property-select'
import FilterModal from '../components/property/filter-modal'
import GridProperty from '../components/property/grid-property'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

import { propertyData } from '../data/data'

interface Property{
    id: number;
    image: string[];
    tag: string[];
    tag2: string;
    type: string;
    name: string;
    loction: string;
    size: string;
    beds: string;
    sqft: string;
    value: string;
}

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>

        <section className="bg-primary position-relative">
            <div className="position-absolute start-0 top-0 w-25 h-15 bg-light rounded-end-pill opacity-25 mt-4"></div>
            <div className="position-absolute start-0 bottom-0 w-15 h-20 bg-light rounded-top-pill opacity-25 ms-4"></div>
            <div className="position-absolute end-0 top-0 w-15 h-25 bg-light rounded-bottom-pill opacity-25 me-4"></div>
            <div className="position-absolute end-0 bottom-0 w-25 h-15 bg-light rounded-start-pill opacity-25 mb-4"></div>
            <div className="ht-30"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-12">
                        <div className="full-search-2 eclip-search italian-search hero-search-radius shadow-hard">
                            <div className="hero-search-content">
                                <div className="row">
                                    <div className="col-lg-10 col-md-9 col-sm-12">
                                        <div className="form-group">
                                            <div className="position-relative">
                                                <input type="text" className="form-control border-0 ps-5" placeholder="Search for a location"/>
                                                <div className="position-absolute top-50 start-0 translate-middle-y ms-2">
                                                    <span className="svg-icon text-primary svg-icon-2hx">
                                                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.3" d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z" fill="currentColor"/>
                                                            <path d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z" fill="currentColor"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-3 col-sm-12">
                                        <div className="form-group">
                                            <Link href="#" className="btn btn-dark full-width">Search</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ht-30"></div>
        </section>

        <section className="gray-simple">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12">
                        <div className="item-shorting-box">
                            <div className="item-shorting clearfix">
                                <div className="left-column pull-left"><h4 className="m-0 fs-6">Found 1-10 of 142 Results</h4></div>
                            </div>
                            <div className="item-shorting-box-right">
                                <div className="shorting-by">
                                    <PropertySelect/>
                                </div>
                                <ul className="shorting-list">
                                    <li>
                                        <Link href="/grid" className="w-12 h-12">
                                            <span className="svg-icon text-muted-2 svg-icon-2hx">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor"/>
                                                    <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor"/>
                                                    <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor"/>
                                                    <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor"/>
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/list-layout-full" className="active w-12 h-12">
                                            <span className="svg-icon text-seegreen svg-icon-2hx">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.3" d="M14 10V20C14 20.6 13.6 21 13 21H10C9.4 21 9 20.6 9 20V10C9 9.4 9.4 9 10 9H13C13.6 9 14 9.4 14 10ZM20 9H17C16.4 9 16 9.4 16 10V20C16 20.6 16.4 21 17 21H20C20.6 21 21 20.6 21 20V10C21 9.4 20.6 9 20 9Z" fill="currentColor"/>
                                                    <path d="M7 10V20C7 20.6 6.6 21 6 21H3C2.4 21 2 20.6 2 20V10C2 9.4 2.4 9 3 9H6C6.6 9 7 9.4 7 10ZM21 6V3C21 2.4 20.6 2 20 2H3C2.4 2 2 2.4 2 3V6C2 6.6 2.4 7 3 7H20C20.6 7 21 6.6 21 6Z" fill="currentColor"/>
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <FilterModal/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="row justify-content-center g-4">
                    {propertyData.map((item:Property,index:number)=>{
                        return(
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index}>
                                <GridProperty item={item} border={false}/>
                            </div>
                        )
                    })}
                </div>
                
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <ul className="pagination p-center">
                            <li className="page-item">
                                <Link className="page-link" href="#" aria-label="Previous">
                                    <i className="fa-solid fa-arrow-left-long"></i>
                                    <span className="sr-only">Previous</span>
                                </Link>
                            </li>
                            <li className="page-item"><Link className="page-link" href="#">1</Link></li>
                            <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                            <li className="page-item active"><Link className="page-link" href="#">3</Link></li>
                            <li className="page-item"><Link className="page-link" href="#">...</Link></li>
                            <li className="page-item"><Link className="page-link" href="#">18</Link></li>
                            <li className="page-item">
                                <Link className="page-link" href="#" aria-label="Next">
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                    <span className="sr-only">Next</span>
                                </Link>
                            </li>
                        </ul>
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
