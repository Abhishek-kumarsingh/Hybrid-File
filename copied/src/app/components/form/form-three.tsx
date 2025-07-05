"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic';

import Slider from 'rc-slider';
import '../../../../node_modules/rc-slider/assets/index.css'

const Select = dynamic(()=>import('react-select'),{ssr:false})

export default function FormThree() {
    let [show, setShow] = useState<Boolean>(false)

    const [range, setRange] = useState<number[]>([20, 80]); 
    
    const handleRangeChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
        setRange(values);
        }
    };

    const loction = [
        { value: '1', label: 'Los Angeles, CA' },
        { value: '1', label: 'New York City, NY' },
        { value: '1', label: 'Chicago, IL' },
        { value: '1', label: 'Houston, TX' },
        { value: '1', label: 'Philadelphia, PA' },
        { value: '1', label: 'San Antonio, TX' },
        { value: '1', label: 'San Jose, CA' },
    ]

    const rooms = [
        { value: '1', label: '1' },
        { value: '1', label: '2' },
        { value: '1', label: '3' },
        { value: '1', label: '4' },
        { value: '1', label: '5' },
    ]
  return (
    <div className="full-search-2 eclip-search italian-search hero-search-radius shadow-hard mt-5">
        <div className="hero-search-content">
            <div className="row">
            
                <div className="col-lg-3 col-md-4 col-sm-12 b-r">
                    <div className="form-group">
                        <div className="choose-propert-type">
                            <ul>
                                <li>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="typbuy" name="typeprt"/>
                                        <label className="form-check-label" htmlFor="typbuy">For Buy</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="typrent" name="typeprt" defaultChecked/>
                                        <label className="form-check-label" htmlFor="typrent">For Rent</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-6 col-md-4 col-sm-12 p-md-0 elio">
                    <div className="form-group border-start borders">
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
                
                <div className="col-lg-1 col-md-1 col-sm-2">
                    <div className="form-group">
                        <Link className="collapsed ad-search" onClick={()=>setShow(!show)} href="#"><i className="fa fa-sliders-h"></i></Link>
                    </div>
                </div>
                
                <div className="col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <button type="button" className="btn btn-primary full-width">Search</button>
                    </div>
                </div>
                        
            </div>
            <div className={`collapse mt-5 ${show ? 'show' : ''}`}>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="form-group mb-2 position-relative">
                            <div className="input-with-icon2">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <Select options={loction} className="form-control ps-4" placeholder="City/Town"/>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="form-group mb-2 position-relative">
                            <div className="input-with-icon2">
                                <i className="fas fa-bed"></i>
                            </div>
                            <Select options={rooms} className="form-control ps-5" placeholder="Bedrooms"/>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="form-group mb-2 position-relative">
                            <div className="input-with-icon2">
                                <i className="fas fa-bath"></i>
                            </div>
                            <Select options={rooms} className="form-control ps-5" placeholder="Bathrooms"/>
                        </div>
                    </div>
                    
                </div>
                
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" placeholder="min price" />
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" placeholder="max price" />
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" placeholder="min sqft" />
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" placeholder="max sqft" />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 mt-2">
                        <h6>Advance Price</h6>
                        <div className="rg-slider">
                        <Slider
                            range 
                            min={0}
                            max={100}
                            defaultValue={[20, 80]} 
                            value={range}
                            onChange={handleRangeChange} 
                            allowCross={false} 
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                            <span>Min: {range[0]}</span>
                            <span>Max: {range[1]}</span>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="row">
                
                    <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                        <h4 className="text-dark fs-6 fw-semibold">Amenities & Features</h4>
                        <ul className="no-ul-list third-row">
                            <li>
                                <div className="form-check">
                                    <input id="a-1" className="form-check-input" name="a-1" type="checkbox"/>
                                    <label htmlFor="a-1" className="form-check-label">Air Condition</label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-2" className="form-check-input" name="a-2" type="checkbox"/>
                                    <label htmlFor="a-2" className="form-check-label">Bedding</label>
                                </div>
                            </li>
                            <li>
                                <input id="a-3" className="form-check-input" name="a-3" type="checkbox"/>
                                <label htmlFor="a-3" className="form-check-label ms-2">Heating</label>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-4" className="form-check-input" name="a-4" type="checkbox"/>
                                    <label htmlFor="a-4" className="form-check-label">Internet</label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-5" className="form-check-input" name="a-5" type="checkbox"/>
                                    <label htmlFor="a-5" className="form-check-label">Microwave</label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-6" className="form-check-input" name="a-6" type="checkbox"/>
                                    <label htmlFor="a-6" className="form-check-label">Smoking Allow</label>
                                </div>	
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-7" className="form-check-input" name="a-7" type="checkbox"/>
                                    <label htmlFor="a-7" className="form-check-label">Terrace</label>
                                </div>	
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-8" className="form-check-input" name="a-8" type="checkbox"/>
                                    <label htmlFor="a-8" className="form-check-label">Balcony</label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-9" className="form-check-input" name="a-9" type="checkbox"/>
                                    <label htmlFor="a-9" className="form-check-label">Icon</label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-10" className="form-check-input" name="a-10" type="checkbox"/>
                                    <label htmlFor="a-10" className="form-check-label">Wi-Fi</label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-11" className="form-check-input" name="a-11" type="checkbox"/>
                                    <label htmlFor="a-11" className="form-check-label">Beach</label>
                                </div>
                            </li>
                            <li>
                                <div className="form-check">
                                    <input id="a-12" className="form-check-input" name="a-12" type="checkbox"/>
                                    <label htmlFor="a-12" className="form-check-label">Parking</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
