"use client"
import React, { useState } from 'react'
import Link from 'next/link';

import Select from 'react-select';

import Navbar from '../components/navbar/navbar'
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';

export default function Checkout() {
    let[show, setShow] = useState<boolean>(false)
    let[show2, setShow2] = useState<boolean>(false)

    const country = [
        { value: '1', label: 'United State' },
        { value: '1', label: 'United kingdom' },
        { value: '1', label: 'India' },
        { value: '1', label: 'Canada' },
    ];
    const city = [
        { value: '1', label: 'Punjab' },
        { value: '1', label: 'Chandigarh' },
        { value: '1', label: 'Allahabad' },
        { value: '1', label: 'Lucknow' },
    ];
  return (
    <>
    <Navbar transparent={false}/>  

    <div className="page-title">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <h2 className="ipt-title">Checkout</h2>
                    <span className="ipn-subtitle">Proceed For Payment</span>
                </div>
            </div>
        </div>
    </div> 

    <section className="gray-simple">
        <div className="container">
        
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="alert bg-success text-light text-center" role="alert">
                        Hi Dear, Have you already an account? <Link href="#" className="text-warning" onClick={()=>setShow(!show)}>Please Login</Link>
                    </div>
                </div>
                
                <div className="col-lg-12 col-md-12">	
                    <div id="login-frm" className={`collapse mb-5 ${show ? 'show' : ''}`}>
                        <div className="row">
                            
                            <div className="col-lg-5 col-md-4 col-sm-6">
                                <div className="form-group">
                                    <div className="input-with-icons">
                                        <input type="text" className="form-control" placeholder="Username"/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-5 col-md-4 col-sm-6">
                                <div className="form-group">
                                    <div className="input-with-icons">
                                        <input type="text" className="form-control" placeholder="*******"/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-2 col-md-4 col-sm-12">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary full-width">Submit</button>
                                </div>
                            </div>
                            
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="exclop-wrap d-flex align-items-center justify-content-between">
                                    <div className="exclop">
                                        <input id="a-1" className="form-check-input" name="a-1" type="checkbox"/>
                                        <label htmlFor="a-1" className="form-check-label ms-2">Remember Me</label>
                                    </div>
                                    <div className="exclop-last">
                                        <Link href="#" className="fw-medium text-primary">Forget Password?</Link>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="row form-submit">
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="row m-0">
                        <div className="submit-page">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3>Billing Detail</h3>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Name<i className="req">*</i></label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Email<i className="req">*</i></label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Company Name</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Country<i className="req">*</i></label>
                                        <Select options={country}  className="form-control" placeholder="Country"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Street<i className="req">*</i></label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Apartment</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Town/City<i className="req">*</i></label>
                                        <Select options={city}  className="form-control" placeholder="City"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>State<i className="req">*</i></label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Postcode/Zip<i className="req">*</i></label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Phone<i className="req">*</i></label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Landline</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <label className='mb-2'>Additional Information</label>
                                        <textarea className="form-control ht-50"></textarea>
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <input id="a-2" className="form-check-input" name="a-2" type="checkbox"/>
                                        <label htmlFor="a-2" className="form-check-label ms-2">Create An Account</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Your Order</h3>
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="product-wrap">
                            <h5>Platinum</h5>
                            <ul>
                                <li><strong>Total</strong>$319</li>
                                <li><strong>Subtotal</strong>$319</li>
                                <li><strong>Tax</strong>$10</li>
                                <li><strong>Total</strong>$329</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="alert bg-danger text-light text-center" role="alert">
                            Have You Coupon? <Link href="#" className="text-warning" onClick={()=>setShow2(!show2)}>Click Here</Link>
                        </div>
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                        <div id="coupon-frm" className={`collapse ${show2 ? 'show' : ''}`}>
                            <input type="text" className="form-control mb-2" placeholder="Coupon Code"/>
                            <button type="submit" className="btn btn-primary full-width mb-2">Apply Coupon</button>
                        </div>
                    </div>
                    
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="pay-wrap">
                            <div className="pay-wrap-header">
                                <h4>Platinum</h4>
                                <div className="pw-right">
                                    <h3 className="text-primary">$12<sub>\Month</sub></h3>
                                </div>
                            </div>
                            <div className="pay-wrap-content">
                                <div className="pw-first-content">
                                    <h4>Your Features</h4>
                                    <button data-toggle="collapse" data-target="#change-plan">Change Plan</button>
                                </div>
                                <div id="change-plan" className="collapse">
                                    <ul className="no-ul-list">
                                        <li>
                                            <input id="basic" className="form-check-input" name="plan" type="radio"/>
                                            <label htmlFor="basic" className="form-check-label">Basic Plan</label>
                                        </li>
                                        <li>
                                            <input id="platinum" className="form-check-input" name="plan" type="radio" defaultChecked/>
                                            <label htmlFor="platinum" className="form-check-label">Platinum</label>
                                        </li>
                                        <li>
                                            <input id="standard" className="form-check-input" name="plan" type="radio"/>
                                            <label htmlFor="standard" className="form-check-label">Standard</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="pw-content-detail">
                                    <ul className="pw-features">
                                        <li>First Features</li>
                                        <li>Second Features</li>
                                        <li>Third Features</li>
                                        <li>Fourth Features</li>
                                    </ul>
                                </div>
                                <div className="pw-btn-wrap">
                                    <Link href="/payment" className="btn btn-primary rounded full-width">Proceed Payment</Link>
                                </div>
                            </div>
                        </div>
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
