'use client'
import Image from 'next/image'
import React, { useState } from 'react'

export default function PayamentSidebar() {
    let [open, setOpen] = useState<boolean>(true)
    let [open2, setOpen2] = useState<boolean>(false)
    let [open3, setOpen3] = useState<boolean>(true)
    let [open4, setOpen4] = useState<boolean>(false)
  return (
        <div className="checkout-side">
            <div className="booking-short">
                <Image src='/img/p-14.jpg' width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt="" />
                <h4>Manali To Paris, London</h4>
                <span>Liverpool, London</span>
            </div>
            
            <div className="booking-short-side">
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="bookinDet">
                            <h2 className="mb-0">
                            <button className={`btn btn-link py-0 ${open ? '' : 'collapsed'}`} type="button" onClick={()=>setOpen(!open)}>
                                Booking Detail
                            </button>
                            </h2>
                        </div>

                        <div id="bookinSer" className={`collapse  ${open ? 'show' : ''}`}>
                            <div className="card-body">
                                <ul className="booking-detail-list">
                                    <li>10 May 2020- 20 May 2020</li>
                                    <li>Tour Days<span>5 Days</span></li>
                                    <li>Adults<span>4</span></li>
                                    <li>Children<span>3</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-header" id="extraFeat">
                            <h2 className="mb-0">
                            <button className={`btn btn-link py-0 ${open2 ? '' : 'collapsed'}`} type="button" onClick={()=>setOpen2(!open2)}>
                                Extra Features
                            </button>
                            </h2>
                        </div>
                        <div id="extraSer" className={`collapse  ${open2 ? 'show' : ''}`}>
                            <div className="card-body">
                                <ul className="booking-detail-list">
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="brks"/>
                                            <label className="form-check-label" htmlFor="brks">
                                                Breakfast
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="rsv"/>
                                            <label className="form-check-label" htmlFor="rsv">
                                                Rooms Service
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="wifis"/>
                                            <label className="form-check-label" htmlFor="wifis">
                                                Wifi Free
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="carser"/>
                                            <label className="form-check-label" htmlFor="carser">
                                                Car Driving
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        
                    <div className="card">
                        <div className="card-header" id="CouponCode">
                            <h2 className="mb-0">
                            <button className={`btn btn-link h-auto py-0 ${open3 ? '' : 'collapsed'}`} type="button" onClick={()=>setOpen3(!open3)}>
                                Coupon Code
                            </button>
                            </h2>
                        </div>
                        <div id="couponcd" className={`collapse  ${open3 ? 'show' : ''}`}>
                            <div className="card-body">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Code"/>
                                    <button type="button" className="btn btn-dark full-width mt-2">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="PayMents">
                            <h2 className="mb-0">
                            <button className={`btn btn-link py-0 ${open4 ? '' : 'collapsed'}`} type="button" onClick={()=>setOpen4(!open4)}>
                                Payment
                            </button>
                            </h2>
                        </div>
                        <div id="payser" className={`collapse  ${open4 ? 'show' : ''}`}>
                            <div className="card-body">
                                <ul className="booking-detail-list">
                                    <li>Sub Total<span>$224</span></li>
                                    <li>Extra Price<span>$70</span></li>
                                    <li>Tax<span>$20</span></li>
                                    <li><b>Pay Ammount</b><span>$314</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
