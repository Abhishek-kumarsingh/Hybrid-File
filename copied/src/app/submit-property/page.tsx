'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Navbar from '../components/navbar/navbar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

const Select = dynamic(()=>import('react-select'),{ssr:false})

export default function Page() {

    const [file, setFile] = useState('');
    const [show, setShow] = useState<boolean>(false)

    function handleChange(e:any) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

    const status = [
        { value: '1', label: 'For Rent' },
        { value: '1', label: 'For Sale' },
    ];
    const type = [
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
        <Navbar transparent={false}/>  

        <div className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Submit Property</h2>
                        <span className="ipn-subtitle">Just Submit Your Property</span>
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
                        <div id="login-frm" className={`collapse mb-5 ${show ? 'show' : '' }`}>
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
                                            <label htmlFor="a-1" className="form-check-label ms-1">Remember Me</label>
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
                
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="submit-page">
                            <div className="form-submit">	
                                <h3>Basic Information</h3>
                                <div className="submit-section">
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label className='mb-2'>Property Title<span className="tip-topdata" data-tip="Property Title"><i className="fa-solid fa-info"></i></span></label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2'>Status</label>
                                            <Select options={status} className="form-control" placeholder="Select Status"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2'>Property Type</label>
                                            <Select options={type} className="form-control" placeholder="Show All"/>
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
                                            <Select options={bedrooms} className="form-control" placeholder="Bedrooms"/>
                                        </div>
                                        
                                        <div className="form-group col-md-6">
                                            <label className='mb-2'>Bathrooms</label>
                                            <Select options={bedrooms} className="form-control" placeholder="Bathrooms"/>
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
                                                <div className='position-absolute w-100 h-100 top-0 bottom-0'>
                                                    <input type="file" onChange={handleChange} style={{width:'100%', height:'100%', opacity:'0'}}/>
                                                </div>
                                                {file && 
                                                    <div className='dz-image'>
                                                    <img src={file} alt='' style={{width:'120px', height:'120px', borderRadius:'15px'}}/>
                                                    </div>
                                                }
                                                {!file && 
                                                    <div className="dz-default dz-message">
                                                        <i className="fa-solid fa-images"></i>
                                                        <span>Drag & Drop To Change Logo</span>
                                                    </div>
                                                }
                                                
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
                                            <Select options={age} className="form-control" placeholder="Select An Option"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className='mb-2'>Garage (optional)</label>
                                            <Select options={bedrooms} className="form-control" placeholder="Choose Rooms"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className='mb-2'>Rooms (optional)</label>
                                            <Select options={bedrooms} className="form-control" placeholder="Choose Rooms"/>
                                        </div>
                                        
                                        <div className="form-group col-md-12">
                                            <label className='mb-2'>Other Features (optional)</label>
                                            <div className="o-features">
                                                <ul className="no-ul-list third-row">
                                                    <li>
                                                        <input id="a-1" className="form-check-input me-2" name="a-1" type="checkbox"/>
                                                        <label htmlFor="a-1" className="form-check-label">Air Condition</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-2" className="form-check-input me-2" name="a-2" type="checkbox"/>
                                                        <label htmlFor="a-2" className="form-check-label">Bedding</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-3" className="form-check-input me-2" name="a-3" type="checkbox"/>
                                                        <label htmlFor="a-3" className="form-check-label">Heating</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-4" className="form-check-input me-2" name="a-4" type="checkbox"/>
                                                        <label htmlFor="a-4" className="form-check-label">Internet</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-5" className="form-check-input me-2" name="a-5" type="checkbox"/>
                                                        <label htmlFor="a-5" className="form-check-label">Microwave</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-6" className="form-check-input me-2" name="a-6" type="checkbox"/>
                                                        <label htmlFor="a-6" className="form-check-label">Smoking Allow</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-7" className="form-check-input me-2" name="a-7" type="checkbox"/>
                                                        <label htmlFor="a-7" className="form-check-label">Terrace</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-8" className="form-check-input me-2" name="a-8" type="checkbox"/>
                                                        <label htmlFor="a-8" className="form-check-label">Balcony</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-9" className="form-check-input me-2" name="a-9" type="checkbox"/>
                                                        <label htmlFor="a-9" className="form-check-label">Icon</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-10" className="form-check-input me-2" name="a-10" type="checkbox"/>
                                                        <label htmlFor="a-10" className="form-check-label">Wi-Fi</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-11" className="form-check-input me-2" name="a-11" type="checkbox"/>
                                                        <label htmlFor="a-11" className="form-check-label">Beach</label>
                                                    </li>
                                                    <li>
                                                        <input id="a-12" className="form-check-input me-2" name="a-12" type="checkbox"/>
                                                        <label htmlFor="a-12" className="form-check-label">Parking</label>
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
                                        <input id="aj-1" className="form-check-input me-2" name="aj-1" type="checkbox"/>
                                        <label htmlFor="aj-1" className="form-check-label">I consent to having this website store my submitted information so they can respond to my inquiry.</label>
                                    </li>
                                </ul>
                            </div>
                            <div className="form-group col-lg-12 col-md-12">
                                <button className="btn btn-primary fw-medium px-5" type="button">Submit & Preview</button>
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
