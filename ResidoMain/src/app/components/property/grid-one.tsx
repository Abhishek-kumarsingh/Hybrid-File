'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import SideFilter from '../side-filter'
import PropertySelect from './property-select'
import GridProperty from './grid-property'

import { propertyData } from '@/app/data/data'

export default function GridOne() {
    const [show, setShow] = useState<boolean>(false)
  return (
    <div className="container">
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <div className="filter_search_opt">
                    <Link href="#" className="btn btn-dark full-width mb-4" onClick={()=>setShow(!show)}>
                        <span className="svg-icon text-light svg-icon-2hx me-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor"/>
                            </svg>
                        </span>Open Filter Option
                    </Link>
                </div>
            </div>
        </div>
        
        <div className="row">
        
            <div className="col-lg-4 col-md-12 col-sm-12">
                <SideFilter show={show} setShow={setShow}/>
            </div>
            
            <div className="col-lg-8 col-md-12 col-sm-12">
                
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12">
                        <div className="item-shorting-box">
                            <div className="item-shorting clearfix">
                                <div className="left-column pull-left"><h4 className="fs-6 m-0">Found 1-10 of 142 Results</h4></div>
                            </div>
                            <div className="item-shorting-box-right">
                                <div className="shorting-by">
                                    <PropertySelect/>
                                </div>
                                <ul className="shorting-list">
                                    <li>
                                        <Link href="/grid-layout-with-sidebar" className="active w-12 h-12">
                                            <span className="svg-icon text-seegreen svg-icon-2hx">
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
                                        <Link href="/list-layout-with-sidebar" className="w-12 h-12">
                                            <span className="svg-icon text-muted-2 svg-icon-2hx">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.3" d="M14 10V20C14 20.6 13.6 21 13 21H10C9.4 21 9 20.6 9 20V10C9 9.4 9.4 9 10 9H13C13.6 9 14 9.4 14 10ZM20 9H17C16.4 9 16 9.4 16 10V20C16 20.6 16.4 21 17 21H20C20.6 21 21 20.6 21 20V10C21 9.4 20.6 9 20 9Z" fill="currentColor"/>
                                                    <path d="M7 10V20C7 20.6 6.6 21 6 21H3C2.4 21 2 20.6 2 20V10C2 9.4 2.4 9 3 9H6C6.6 9 7 9.4 7 10ZM21 6V3C21 2.4 20.6 2 20 2H3C2.4 2 2 2.4 2 3V6C2 6.6 2.4 7 3 7H20C20.6 7 21 6.6 21 6Z" fill="currentColor"/>
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row justify-content-center g-4">
                    {propertyData.slice(0,6).map((item,index)=>{
                        return(
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" key={index}>
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
            
        </div>
    </div>	
  )
}
