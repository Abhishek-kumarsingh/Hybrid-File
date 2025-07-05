'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Select = dynamic(()=>import('react-select'),{ssr:false})

import Slider from 'rc-slider';
import '../../../../node_modules/rc-slider/assets/index.css'

import Ruler from '../ruler';


export default function PropertySidebarTwo({show, setShow}:{show:any, setShow:any}) {
    const [range, setRange] = useState<number[]>([20, 80]); 
    const [open, setopen] = useState<boolean>(false); 

    const handleRangeChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
        setRange(values);
    }
    };

    const ptypes = [
        { value: '1', label: 'Apartment' },
        { value: '1', label: 'Condo' },
        { value: '1', label: 'Family' },
        { value: '1', label: 'Houses' },
        { value: '1', label: 'Villa' },
    ];
    const status = [
        { value: '1', label: 'For Rent' },
        { value: '1', label: 'For Buy' },
        { value: '1', label: 'For Sale' },
    ];
    const minprice = [
        { value: '1', label: 'Less Then $1000' },
        { value: '1', label: '$1000 - $2000' },
        { value: '1', label: '$2000 - $3000' },
        { value: '1', label: '$3000 - $4000' },
        { value: '1', label: 'Above $5000' },
    ];
    const bedrooms = [
        { value: '1', label: '1' },
        { value: '1', label: '2' },
        { value: '1', label: '3' },
        { value: '1', label: '4' },
        { value: '1', label: '5' },
    ];
    const bathrooms = [
        { value: '1', label: '1' },
        { value: '1', label: '2' },
        { value: '1', label: '3' },
        { value: '1', label: '4' },
        { value: '1', label: '5' },
    ];
    const garage = [
        { value: '1', label: 'Any Type' },
        { value: '1', label: 'Yes' },
        { value: '1', label: 'No' },
    ];
    const built = [
        { value: '1', label: '2010' },
        { value: '1', label: '2011' },
        { value: '1', label: '2012' },
        { value: '1', label: '2013' },
        { value: '1', label: '2014' },
        { value: '1', label: '2015' },
        { value: '1', label: '2016' },
    ];
  return (
        <div className={`simple-sidebar sm-sidebar ${show ? 'd-block' : ''}`} id="filter_search"  style={{left:'0'}}>							
        
            <div className="search-sidebar_header">
                <h4 className="ssh_heading">Close Filter</h4>
                <button className="w3-bar-item w3-button w3-large" onClick={()=>setShow(!show)}><i className="fa-regular fa-circle-xmark fs-5 text-muted-2"></i></button>
            </div>
            
            <div className="sidebar-widgets">
                
                <div className="sidebar-widgets">
                    
                    <div className="form-group simple">
                        <div className="input-with-icon">
                            <input type="text" className="form-control" placeholder="Neighborhood"/>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                    
                    <div className="form-group simple">
                        <div className="input-with-icon">
                            <input type="text" className="form-control" placeholder="Location"/>
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                    </div>
                    
                    <div className="form-group simple">
                        <div className="simple-input">
                            <Select options={ptypes} placeholder="Apartment"  className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="form-group simple">
                        <div className="simple-input">
                            <Select options={status} placeholder="Select Status"  className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="form-group simple">
                        <div className="simple-input">
                            <Select options={minprice} placeholder="No Min"  className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="form-group simple">
                        <div className="simple-input">
                            <Select options={bedrooms} placeholder="Bedrooms"  className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="form-group simple">
                        <div className="simple-input">
                            <Select options={bathrooms} placeholder="Bathrooms"  className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="form-group simple">
                        <div className="simple-input">
                            <Select options={garage} placeholder="Choose Rooms"  className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="form-group simple">
                        <div className="simple-input">
                            <Select options={built} placeholder="2011"  className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="form-group">
                                <div className="simple-input">
                                    <input type="text" className="form-control" placeholder="Min Area"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="form-group">
                                <div className="simple-input">
                                    <input type="text" className="form-control" placeholder="Max Area"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                            <h6>Choose Price</h6>
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
                            <Ruler/>
                        </div>
                    </div>									

                    <div className="ameneties-features">
                        <div className="form-group" id="module">
                            <Link role="button" className="" href="#" onClick={()=>setopen(!open)}></Link>
                        </div>
                        {open &&
                            <div className="collapse show" id="advance-search" >
                                <ul className="no-ul-list">
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
                                        <div className="form-check">
                                            <input id="a-3" className="form-check-input" name="a-3" type="checkbox"/>
                                            <label htmlFor="a-3" className="form-check-label">Heating</label>
                                        </div>
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
                                </ul>
                            </div>
                        }
                        
                        <button className="btn btn-primary fw-medium rounded full-width">Find New Home</button>
                    
                    </div>
                
                </div>							
            </div>
        </div>
  )
}
