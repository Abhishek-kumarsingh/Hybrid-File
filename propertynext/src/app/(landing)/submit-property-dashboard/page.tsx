'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import UserNav from '../components/navbar/user-nav'
import AdminSidebar from '../components/admin-sidebar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

const Select = dynamic(()=>import('react-select'),{ssr:false})

export default function page() {

    let [show, setShow] = useState(false)

    const status = [
        { value: '1', label: 'For Rent' },
        { value: '1', label: 'For Sale' },
    ];
    const ptypes = [
        { value: '1', label: 'Houses' },
        { value: '1', label: 'Apartment' },
        { value: '1', label: 'Villas' },
        { value: '1', label: 'Commercial' },
        { value: '1', label: 'Offices' },
        { value: '1', label: 'Garage' },
    ];
    const bedrooms = [
        { value: '1', label: '1' },
        { value: '1', label: '2' },
        { value: '1', label: '3' },
        { value: '1', label: '4' },
        { value: '1', label: '5' },
        { value: '1', label: '6' },
    ];
    const age = [
        { value: '1', label: '0 - 5 Years' },
        { value: '1', label: '0 - 10Years' },
        { value: '1', label: '0 - 15 Years' },
        { value: '1', label: '0 - 20 Years' },
        { value: '1', label: '20+ Years' },
    ];
  return (
    <>
         <UserNav/>

        <div className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Welcome!</h2>
                        <span className="ipn-subtitle">Welcome To Your Account</span>
                    </div>
                </div>
            </div>
        </div>   

        <section className="bg-light">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="filter_search_opt">
                        <Link href="" onClick={()=>setShow(!show)} className="btn btn-dark full-width mb-4">Dashboard Navigation<i className="fa-solid fa-bars ms-2"></i></Link>
                    </div>
                </div>
            </div>
                        
            <div className="row">
                <div className="col-lg-3 col-md-12">
                    <AdminSidebar show={show} setShow={setShow}/>
                </div>
                
                <div className="col-lg-9 col-md-12">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                            <h4>Your Current Package: <span className="pc-title text-primary">Gold Package</span></h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="dashboard-stat widget-1">
                                <div className="dashboard-stat-content"><h4>607</h4> <span>Listings Included</span></div>
                                <div className="dashboard-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
                            </div>	
                        </div>
                        
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="dashboard-stat widget-2">
                                <div className="dashboard-stat-content"><h4>102</h4> <span>Listings Remaining</span></div>
                                <div className="dashboard-stat-icon"><i className="ti-pie-chart"></i></div>
                            </div>	
                        </div>
                        
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="dashboard-stat widget-3">
                                <div className="dashboard-stat-content"><h4>70</h4> <span>Featured Included</span></div>
                                <div className="dashboard-stat-icon"><i className="ti-user"></i></div>
                            </div>	
                        </div>
                        
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="dashboard-stat widget-4">
                                <div className="dashboard-stat-content"><h4>30</h4> <span>Featured Remaining</span></div>
                                <div className="dashboard-stat-icon"><i className="fa-solid fa-location-dot"></i></div>
                            </div>	
                        </div>
                        
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="dashboard-stat widget-5">
                                <div className="dashboard-stat-content"><h4>Unlimited</h4> <span>Images / per listing</span></div>
                                <div className="dashboard-stat-icon"><i className="ti-pie-chart"></i></div>
                            </div>	
                        </div>
                        
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="dashboard-stat widget-6">
                                <div className="dashboard-stat-content"><h4>2021-02-26</h4> <span>Ends On</span></div>
                                <div className="dashboard-stat-icon"><i className="ti-user"></i></div>
                            </div>	
                        </div>

                    </div>
            
                    <div className="dashboard-wraper">
                        
                        <div className="row">
                            
                            <div className="col-lg-12 col-md-12">
                            
                                <div className="submit-pages">
                                    
                                    <div className="form-submit">	
                                        <h3 className='mb-3'>Basic Information</h3>
                                        <div className="submit-section">
                                            <div className="row">
                                            
                                                <div className="form-group col-md-12">
                                                    <label className='mb-2'>Property Title<span className="tip-topdata" data-tip="Property Title"><i className="fa-solid fa-info"></i></span></label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>Status</label>
                                                    <Select options={status}  className="form-control" placeholder="Select Status"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>Property Type</label>
                                                    <Select options={ptypes}  className="form-control" placeholder="Show All"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>Price</label>
                                                    <input type="text" className="form-control" placeholder="USD"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>Area</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>Bedrooms</label>
                                                    <Select options={bedrooms}  className="form-control" placeholder="Bedrooms"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>Bathrooms</label>
                                                    <Select options={bedrooms}  className="form-control" placeholder="Bathrooms"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="form-submit">	
                                        <h3>Gallery</h3>
                                        <div className="submit-section">
                                            <div className="row">
                                                <div className="form-group col-md-12">
                                                    <label>Upload Gallery</label>
                                                    <form action="/upload-target" className="dropzone dz-clickable primary-dropzone">
                                                        <div className="dz-default dz-message">
                                                            <i className="ti-gallery"></i>
                                                            <span>Drag & Drop To Change Logo</span>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="form-submit">	
                                        <h3>Location</h3>
                                        <div className="submit-section">
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>Address</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>City</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>State</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2'>Zip Code</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="form-submit">	
                                        <h3>Detailed Information</h3>
                                        <div className="submit-section">
                                            <div className="row">
                                            
                                                <div className="form-group col-md-12">
                                                    <label className='mb-2'>Description</label>
                                                    <textarea className="form-control h-120"></textarea>
                                                </div>
                                                
                                                <div className="form-group col-md-4">
                                                    <label className='mb-2'>Building Age (optional)</label>
                                                    <Select options={age}  className="form-control" placeholder="Select An Option"/>
                                                </div>
                                                
                                                <div className="form-group col-md-4">
                                                    <label className='mb-2'>Garage (optional)</label>
                                                    <Select options={bedrooms}  className="form-control" placeholder="Choose Rooms"/>
                                                </div>
                                                
                                                <div className="form-group col-md-4">
                                                    <label className='mb-2'>Rooms (optional)</label>
                                                    <Select options={bedrooms}  className="form-control" placeholder="Choose Rooms"/>
                                                </div>
                                                
                                                <div className="form-group col-md-12">
                                                    <label className='mb-2'>Other Features (optional)</label>
                                                    <div className="o-features">
                                                        <ul className="no-ul-list third-row">
                                                            <li>
                                                                <input id="a-1" className="form-check-input" name="a-1" type="checkbox"/>
                                                                <label htmlFor="a-1" className="form-check-label ms-2">Air Condition</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-2" className="form-check-input" name="a-2" type="checkbox"/>
                                                                <label htmlFor="a-2" className="form-check-label ms-2">Bedding</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-3" className="form-check-input" name="a-3" type="checkbox"/>
                                                                <label htmlFor="a-3" className="form-check-label ms-2">Heating</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-4" className="form-check-input" name="a-4" type="checkbox"/>
                                                                <label htmlFor="a-4" className="form-check-label ms-2">Internet</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-5" className="form-check-input" name="a-5" type="checkbox"/>
                                                                <label htmlFor="a-5" className="form-check-label ms-2">Microwave</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-6" className="form-check-input" name="a-6" type="checkbox"/>
                                                                <label htmlFor="a-6" className="form-check-label ms-2">Smoking Allow</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-7" className="form-check-input" name="a-7" type="checkbox"/>
                                                                <label htmlFor="a-7" className="form-check-label ms-2">Terrace</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-8" className="form-check-input" name="a-8" type="checkbox"/>
                                                                <label htmlFor="a-8" className="form-check-label ms-2">Balcony</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-9" className="form-check-input" name="a-9" type="checkbox"/>
                                                                <label htmlFor="a-9" className="form-check-label ms-2">Icon</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-10" className="form-check-input" name="a-10" type="checkbox"/>
                                                                <label htmlFor="a-10" className="form-check-label ms-2">Wi-Fi</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-11" className="form-check-input" name="a-11" type="checkbox"/>
                                                                <label htmlFor="a-11" className="form-check-label ms-2">Beach</label>
                                                            </li>
                                                            <li>
                                                                <input id="a-12" className="form-check-input" name="a-12" type="checkbox"/>
                                                                <label htmlFor="a-12" className="form-check-label ms-2">Parking</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="form-submit">	
                                        <h3>Contact Information</h3>
                                        <div className="submit-section">
                                            <div className="row">
                                                <div className="form-group col-md-4">
                                                    <label className='mb-2'>Name</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className='mb-2'>Email</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className='mb-2'>Phone (optional)</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group col-lg-12 col-md-12">
                                        <label>GDPR Agreement *</label>
                                        <ul className="no-ul-list">
                                            <li>
                                                <input id="aj-1" className="form-check-input" name="aj-1" type="checkbox"/>
                                                <label htmlFor="aj-1" className="form-check-label ms-2">I consent to having this website store my submitted information so they can respond to my inquiry.</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="form-group col-lg-12 col-md-12">
                                        <button className="btn btn-primary px-5 rounded" type="submit">Submit & Preview</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <FooterTop bg="theme-bg "/>

    <Footer/>

    <ScrollToTop/>
    </>
  )
}
