'use client'
import React from 'react'
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Select = dynamic(()=>import('react-select'),{ssr:false})

export default function FilterTop() {
    const item = [
        { value: '1', label: 'Low Price' },
        { value: '1', label: 'High Price' },
        { value: '1', label: 'Most Popular' },
    ];
  return (
        <div className="short_wraping">
            <div className="row align-items-center">
                <div className="col-lg-2 col-md-6 col-sm-12  col-sm-6">
                    <ul className="shorting_grid">
                        <li>
                            <Link href="/grid-layout-with-sidebar">
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
                            <Link href="/list-layout-with-sidebar">
                                <span className="svg-icon text-seegreen svg-icon-2hx">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.3" d="M14 10V20C14 20.6 13.6 21 13 21H10C9.4 21 9 20.6 9 20V10C9 9.4 9.4 9 10 9H13C13.6 9 14 9.4 14 10ZM20 9H17C16.4 9 16 9.4 16 10V20C16 20.6 16.4 21 17 21H20C20.6 21 21 20.6 21 20V10C21 9.4 20.6 9 20 9Z" fill="currentColor"/>
                                        <path d="M7 10V20C7 20.6 6.6 21 6 21H3C2.4 21 2 20.6 2 20V10C2 9.4 2.4 9 3 9H6C6.6 9 7 9.4 7 10ZM21 6V3C21 2.4 20.6 2 20 2H3C2.4 2 2 2.4 2 3V6C2 6.6 2.4 7 3 7H20C20.6 7 21 6.6 21 6Z" fill="currentColor"/>
                                    </svg>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
        
                <div className="col-lg-7 col-md-12 col-sm-12 order-lg-2 order-md-3 elco_bor col-sm-12">
                    <div className="shorting_pagination">
                        <div className="shorting_pagination_laft">
                            <h5>Showing 1-25 of 72 results</h5>
                        </div>
                        <div className="shorting_pagination_right">
                            <ul>
                                <li style={{margin:'0 2px'}}><Link href="#" className="active">1</Link></li>
                                <li style={{margin:'0 2px'}}><Link href="#">2</Link></li>
                                <li style={{margin:'0 2px'}}><Link href="#">3</Link></li>
                                <li style={{margin:'0 2px'}}><Link href="#">4</Link></li>
                                <li style={{margin:'0 2px'}}><Link href="#">5</Link></li>
                                <li style={{margin:'0 2px'}}><Link href="#">6</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
        
                <div className="col-lg-3 col-md-6 col-sm-12 order-lg-3 order-md-2 col-sm-6 pe-0">
                    <div className="shorting-right">
                        <label className="me-2">Short By:</label>
                        <div className="shorting-by border rounded">
                            <Select options={item}  className="form-control rounded"/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
  )
}
