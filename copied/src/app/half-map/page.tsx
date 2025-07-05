'use client'
import React, { useState } from 'react'
import Link from 'next/link';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import Select from 'react-select';

import Slider from 'rc-slider';
import '../../../node_modules/rc-slider/assets/index.css'

import FullNavbar from '../components/navbar/full-navbar';
import ListPropertyFour from '../components/property/list-property-four';
import ScrollToTop from '../components/scroll-to-top';

import { propertyData } from '../data/data';


export default function Page() {
    const [range, setRange] = useState<number[]>([20, 80]); 
    const [open, setOpen] = useState<boolean>(false); 

    const handleRangeChange = (values: number | number[]) => {
        if (Array.isArray(values)) {
        setRange(values);
    }
    };

    const defaultProps = {
        center: {
            lat: 37.7749, // Latitude for San Francisco
            lng: -122.4194, // Longitude for San Francisco
        },
        zoom: 16,
    };

      const markerPositions = [
        { lat: 37.7749, lng: -122.4194 }, 
        { lat: 37.7740, lng: -122.4190 }, 
        { lat: 37.7750, lng: -122.4200 }, 
        { lat: 37.7730, lng: -122.4180 },
        { lat: 37.7760, lng: -122.4210 }, 
        { lat: 37.7770, lng: -122.4220 }, 
    ];

    const ptypes = [
        { value: '1', label: 'Apartment' },
        { value: '1', label: 'Condo' },
        { value: '1', label: 'Family' },
        { value: '1', label: 'Houses' },
        { value: '1', label: 'Villa' },
    ];

    const bedrooms = [
        { value: '1', label: '1' },
        { value: '1', label: '2' },
        { value: '1', label: '3' },
        { value: '1', label: '4' },
        { value: '1', label: '5' },
    ];

  return (
    <>
    <FullNavbar transparent={false}/>   
    <div>
        <div className="home-map-banner full-wrapious d-md-none">
            <div style={{ height: '600px', width: '100%' }}>
                <LoadScript googleMapsApiKey="">
                    <GoogleMap
                        mapContainerStyle={{ height: '600px', width: '100%' }}
                        center={defaultProps.center}
                        zoom={defaultProps.zoom}
                    >
                        {markerPositions.map((position, index) => (
                        <Marker key={index} position={position} />
                    ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
        <div className="row me-md-2 p-0">
            <div className="col-md-5 d-md-block">
                <LoadScript googleMapsApiKey="">
                    <GoogleMap
                        mapContainerStyle={{ height: '100%', width: '100%' }}
                        center={defaultProps.center}
                        zoom={defaultProps.zoom}
                    >
                        {markerPositions.map((position, index) => (
                        <Marker key={index} position={position} />
                    ))}
                    </GoogleMap>
                </LoadScript>
            </div>
            <div className="col-md-7 p-4">
                <div className="fs-content">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="_mp_filter mb-3">
                                <div className="_mp_filter_first">
                                    <h4 className='mb-4'>Where to Say?</h4>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Neighborhood, City etc."/>
                                        <div className="input-group-append">
                                            <button type="submit" className="input-group-text"><i className="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="_mp_filter_last">
                                    <Link scroll={false} className="map_filter" href="#" onClick={()=>setOpen(!open)}><i className="fa fa-sliders-h mr-2"></i>Filter</Link>
                                </div>
                            </div>
                        </div>
                        {open &&
                            <div className="col-lg-12 col-md-12 mt-4">
                                <div className="collapse show d-block" id="filtermap">
                                    <div className="row">
                            
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <div className="simple-input">
                                                    <Select options={ptypes} placeholder="Show All"  className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                            
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <div className="simple-input">
                                                    <Select options={ptypes} placeholder="Show All"  className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <div className="simple-input">
                                                    <Select options={bedrooms} placeholder="Bedrooms"  className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="simple-input">
                                                <Select options={bedrooms} placeholder="Bathrooms"  className="form-control"/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                                            <h6>Choose Price</h6>
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
                                        
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <h6>Advance Features</h6>
                                            <ul className="row p-0 m-0">
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-1" className="form-check-input" name="a-1" type="checkbox"/>
                                                        <label htmlFor="a-1" className="form-check-label">Air Condition</label>
                                                    </div>
                                                </li>
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-2" className="form-check-input" name="a-2" type="checkbox"/>
                                                        <label htmlFor="a-2" className="form-check-label">Bedding</label>
                                                    </div>
                                                </li>
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-3" className="form-check-input" name="a-3" type="checkbox"/>
                                                        <label htmlFor="a-3" className="form-check-label">Heating</label>
                                                    </div>
                                                </li>
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-4" className="form-check-input" name="a-4" type="checkbox"/>
                                                        <label htmlFor="a-4" className="form-check-label">Internet</label>
                                                    </div>
                                                </li>
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-5" className="form-check-input" name="a-5" type="checkbox"/>
                                                        <label htmlFor="a-5" className="form-check-label">Microwave</label>
                                                    </div>
                                                </li>
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-6" className="form-check-input" name="a-6" type="checkbox"/>
                                                        <label htmlFor="a-6" className="form-check-label">Smoking Allow</label>
                                                    </div>
                                                </li>
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-7" className="form-check-input" name="a-7" type="checkbox"/>
                                                        <label htmlFor="a-7" className="form-check-label">Terrace</label>
                                                    </div>
                                                </li>
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-8" className="form-check-input" name="a-8" type="checkbox"/>
                                                        <label htmlFor="a-8" className="form-check-label">Balcony</label>
                                                    </div>
                                                </li>
                                                <li className="col-xl-4 col-lg-6 col-md-6 p-0">
                                                    <div className="form-check">
                                                        <input id="a-9" className="form-check-input" name="a-9" type="checkbox"/>
                                                        <label htmlFor="a-9" className="form-check-label">Icon</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="col-lg-12 col-md-12 col-sm-12 mb-4 mt-4">
                                            <div className="elgio_filter">
                                                <div className="elgio_ft_first">
                                                    <button className="btn btn-dark">
                                                        Reset<span className="reset_counter">3</span>
                                                    </button>
                                                </div>
                                                <div className="elgio_ft_last">
                                                    <button className="btn btn-gray mr-2">Cancel</button>
                                                    <button className="btn btn-primary mr-2">See 76 Properties</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    
                    <div className="row justify-content-center list-layout">
                        {propertyData.map((item,index)=>{
                            return(
                                <div className="col-xl-12 col-lg-12 col-md-12" key={index}>
                                    <ListPropertyFour item={item} border={true}/>
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
    </div>
    <div className="clearfix"></div>

    <ScrollToTop/>
    </>
  )
}
