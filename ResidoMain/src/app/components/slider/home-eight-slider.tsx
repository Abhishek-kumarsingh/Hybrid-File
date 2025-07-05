'use client'
import Link from 'next/link';
import React from 'react'
import Slider from "react-slick";

var settings = {
    dots: false,
    slidesToShow: 1,
    infinite: true,
    autoplay:true,
    autoplaySpeed: 2000,
    speed: 3000,
    slidesToScroll: 1,
  };

export default function HomeEightSlider() {
  return (
    <div className="home-slider margin-bottom-0">
        <Slider {...settings}>
            <div className="item">
                <div className='d-flex align-items-center'  style={{backgroundImage:`url('/img/slider-1.jpg')`, backgroundPosition:'center', backgroundRepeat:'no-repeat',width:'100%', height:"100%"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="home-slider-container">
                                    <div className="home-slider-desc">
                                        <div className="modern-pro-wrap">
                                            <span className="property-type bg-light-success text-success">For Sale</span>
                                            <span className="property-featured bg-danger">Featured</span>
                                        </div>
                                        <div className="home-slider-title">
                                            <h3><Link href="/single-property-page-1">Aashirvaad Apartment</Link></h3>
                                            <span><i className="lni-map-marker"></i> 778 Country St. Panama City, FL</span>
                                        </div>
                                        <div className="slide-property-info">
                                            <ul>
                                                <li>Beds: 4</li>
                                                <li>Bath: 2</li>
                                                <li>sqft: 5270</li>
                                            </ul>
                                        </div>
                                        <div className="listing-price-with-compare">
                                            <h4 className="list-pr fs-3">$2,580</h4>
                                            <div className="lpc-right d-flex align-items-center mt-3">
                                                <Link href="/compare-property" className="square--50 rounded gray-simple me-2" ><i className="fa-solid fa-code-compare"></i></Link>
                                                <Link href="#" className="square--50 rounded gray-simple" ><i className="fa-solid fa-heart"></i></Link>
                                            </div>
                                        </div>
                                        <Link href="/single-property-page-1" className="read-more bg-primary">View Details <i className="fa fa-angle-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="item">
                <div className='d-flex align-items-center'  style={{backgroundImage:`url('/img/slider-2.jpg')`, backgroundPosition:'center', backgroundRepeat:'no-repeat',width:'100%', height:"100%"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="home-slider-container">
                                    <div className="home-slider-desc">
                                        <div className="modern-pro-wrap">
                                            <span className="property-type bg-light-success text-success">For Sale</span>
                                            <span className="property-featured bg-danger">Featured</span>
                                        </div>
                                        <div className="home-slider-title">
                                            <h3><Link href="/single-property-page-1">Aashirvaad Apartment</Link></h3>
                                            <span><i className="lni-map-marker"></i> 778 Country St. Panama City, FL</span>
                                        </div>
                                        
                                        <div className="slide-property-info">
                                            <ul>
                                                <li>Beds: 4</li>
                                                <li>Bath: 2</li>
                                                <li>sqft: 5270</li>
                                            </ul>
                                        </div>
                                        
                                        <div className="listing-price-with-compare">
                                            <h4 className="list-pr fs-3">$2,580</h4>
                                            <div className="lpc-right d-flex align-items-center mt-3">
                                                <Link href="/compare-property" className="square--50 rounded gray-simple me-2"><i className="fa-solid fa-code-compare"></i></Link>
                                                <Link href="#" className="square--50 rounded gray-simple"><i className="fa-solid fa-heart"></i></Link>
                                            </div>
                                        </div>
                                        <Link href="/single-property-page-1" className="read-more bg-primary">View Details <i className="fa fa-angle-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="item">
                <div className='d-flex align-items-center'  style={{backgroundImage:`url('/img/slider-3.jpg')`, backgroundPosition:'center', backgroundRepeat:'no-repeat',width:'100%', height:"100%"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="home-slider-container">
                                    <div className="home-slider-desc">
                                        <div className="modern-pro-wrap">
                                            <span className="property-type bg-light-success text-success">For Sale</span>
                                            <span className="property-featured bg-danger">Featured</span>
                                        </div>
                                        <div className="home-slider-title">
                                            <h3><Link href="/single-property-page-1">Aashirvaad Apartment</Link></h3>
                                            <span><i className="lni-map-marker"></i> 778 Country St. Panama City, FL</span>
                                        </div>
                                        <div className="slide-property-info">
                                            <ul>
                                                <li>Beds: 4</li>
                                                <li>Bath: 2</li>
                                                <li>sqft: 5270</li>
                                            </ul>
                                        </div>
                                        <div className="listing-price-with-compare">
                                            <h4 className="list-pr fs-3">$2,580</h4>
                                            <div className="lpc-right d-flex align-items-center mt-3">
                                                <Link href="/compare-property" className="square--50 rounded gray-simple me-2"><i className="fa-solid fa-code-compare"></i></Link>
                                                <Link href="#" className="square--50 rounded gray-simple"><i className="fa-solid fa-heart"></i></Link>
                                            </div>
                                        </div>
                                        <Link href="/single-property-page-1" className="read-more bg-primary">View Details <i className="fa fa-angle-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slider>
    </div>
  )
}
