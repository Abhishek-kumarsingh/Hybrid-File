import React from 'react'
import Link from 'next/link'

import Footer from '../components/footer'
import FooterTop from '../components/footer-top'
import Navbar from '../components/navbar/navbar'
import PayamentSidebar from '../components/payament-sidebar'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
         <Navbar transparent={false}/>

        <div className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Payment Methode</h2>
                        <span className="ipn-subtitle">Pay your payment</span>
                    </div>
                </div>
            </div>
        </div>

        <section className="gray">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 col-md-12 form-submit">
                        <div className="checkout-wrap">
                            <div className="checkout-head">
                                <ul>
                                    <li className="active"><span><i className="fa-solid fa-check"></i></span>Customer Detail</li>
                                    <li><span>2</span>Payment Information</li>
                                    <li><span>3</span>Confirmation!</li>
                                </ul>
                            </div>
                            <div className="checkout-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <h4 className="mb-3">Billing Detail</h4>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>First Name<i className="req">*</i></label>
                                            <input type="text" className="form-control" defaultValue="Calvin"/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Last Name<i className="req">*</i></label>
                                            <input type="text" className="form-control" defaultValue="Carlo"/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Email<i className="req">*</i></label>
                                            <input type="email" className="form-control" defaultValue="resido@gmail.com"/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" className="form-control" defaultValue="+12 4578 4667"/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Country<i className="req">*</i></label>
                                            <select id="country" className="form-control">
                                                <option defaultValue="1">United State</option>
                                                <option defaultValue="2">United kingdom</option>
                                                <option defaultValue="3">India</option>
                                                <option defaultValue="4">Canada</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>City<i className="req">*</i></label>
                                            <select id="cities" className="form-control">
                                                <option defaultValue="1">Canada, USA</option>
                                                <option defaultValue="2">California</option>
                                                <option defaultValue="3">Newyork</option>
                                                <option defaultValue="4">Liverpool</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label>Special Instruction</label>
                                            <textarea className="form-control"></textarea>
                                        </div>
                                    </div>										
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <input id="a-2" className="form-check-input" name="a-2" type="checkbox"/>
                                            <label htmlFor="a-2" className="form-check-label">Create An Account</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group text-center">
                                            <Link href="#" className="btn btn-primary rounded">Next Step</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="checkout-wrap">
                            <div className="checkout-head">
                                <ul>
                                    <li><span><i className="fa-solid fa-check"></i></span>Customer Detail</li>
                                    <li className="active"><span>2</span>Payment Information</li>
                                    <li><span>3</span>Confirmation!</li>
                                </ul>
                            </div>
                            
                            <div className="checkout-body">
                                <div className="row mb-5">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <h4 className="mb-3">Payment Information</h4>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="switchbtn paying">
                                            <input id="pay-2" className="switchbtn-checkbox" type="radio" defaultValue="2" name="pay-2" defaultChecked/>
                                            <label className="switchbtn-label" htmlFor="pay-2">
                                                Pay with Credit card
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="switchbtn paying">
                                            <input id="pay-3" className="switchbtn-checkbox" type="radio" defaultValue="2" name="pay-2"/>
                                            <label className="switchbtn-label" htmlFor="pay-3">
                                                Pay with PayPal
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Card Holder Name</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Card Number</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>									
                                
                                    <div className="col-lg-5 col-md-5 col-sm-6">
                                        <div className="form-group">
                                            <label>Expire Month</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-5 col-md-5 col-sm-6">
                                        <div className="form-group">
                                            <label>Expire Year</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-2 col-md-2 col-sm-12">
                                        <div className="form-group">
                                            <label>CVC</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>										
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <input id="a-2" className="form-check-input" name="a-2" type="checkbox"/>
                                            <label htmlFor="a-2" className="form-check-label ms-2">By Continuing, you ar'e agree to conditions</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group text-center">
                                            <Link href="#" className="btn btn-primary rounded full-width">Confirm Booking</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="checkout-wrap">
                            <div className="checkout-head">
                                <div className="success-message">
                                    <span className="thumb-check"><i className="fa-solid fa-check-double"></i></span>
                                    <h4>Thank You, Your Booking Order Confirmed!</h4>
                                    <p>A confirmation mail send to your email, Check your inbox.</p>
                                </div>
                            </div>
                            <div className="checkout-body">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12">
                                        <ul className="booking-detail-list">
                                            <li>Booking ID/Num.<span>#BK1254872</span></li>
                                            <li>First Name<span>Calvin</span></li>
                                            <li>Last Name<span>Carlo</span></li>
                                            <li>Email<span>resido@gmail.com</span></li>
                                            <li>Phone<span>91 235 458 7458</span></li>
                                            <li>City<span>California</span></li>
                                            <li>Contry<span>United State</span></li>
                                            <li>Location<span>New Besil, Liverpool</span></li>
                                            <li>Zip<span>215467</span></li>
                                        </ul>
                                        <hr/>
                                        <h4>Payment Detail</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <div className="col-lg-3 col-md-12">
                        <PayamentSidebar/>
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
