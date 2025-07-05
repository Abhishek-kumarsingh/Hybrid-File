'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function HomeMap() {
    const [show, setShow] = useState(false);

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

    return (
        <div className="home-map-banner full-wrapious">
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

            <div className="advance-search-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn btn-primary" onClick={()=>setShow(!show)}>Advance Search</button>
                            <div id="ad-search" className={`collapse ${show ? 'show' : ''}`}>
                                <div className="map-search-box">
                                    <div className="full-search-2 eclip-search italian-search hero-search-radius rounded-4 border">
                                        <div className="hero-search-content">
                                            <div className="row">
                                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 b-r">
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
                                                <div className="col-xl-7 col-lg-7 col-md-5 col-sm-12 p-md-0 elio">
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
                                                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12">
                                                    <div className="form-group">
                                                        <button type="button" className="btn btn-dark full-width">Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
