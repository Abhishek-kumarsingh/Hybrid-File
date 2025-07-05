import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '../components/navbar/navbar'
import PropertyType from '../components/property-type'
import ClassicGrid from '../components/property/classic-grid'
import BestLoctionOne from '../components/best-loction-one'
import SellPropertyOne from '../components/sell-property-one'
import CtaTwo from '../components/cta-two'
import TeamOne from '../components/team-one'
import ClientOne from '../components/client-one'
import BlogOne from '../components/blog-one'
import SubScribe from '../components/sub-scribe'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

import { propertyData } from '../data/data'

interface data {
    id: number;
    image: string[];
    tag: string[];
    tag2: string;
    type: string;
    name: string;
    loction: string;
    size: string;
    beds: string;
    sqft: string;
    value: string;
}

export default function Page() {
  return (
    <>
        <Navbar transparent={true}/>

        <div className="light-bg hero-banner">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                        <p className="d-inline-flex sm-small text-light rounded-5 px-2 py-1 bg-dark align-items-center">We just launched our service in New York, United States<span className="sm-small px-2 rounded-5 bg-primary text-light ms-2">New</span></p>
                        <h2 className='my-3'>Find Your Dream House<br/>In Europe Now.</h2>
                        <p className="small">Find homes in 80+ different countries represented byb 700 leading member brokerages.</p>
                        <div className="full-search-2 eclip-search italian-search hero-search-radius mt-5">
                            <div className="hero-search-content">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 b-r">
                                        <div className="form-group">
                                            <div className="choose-propert-type">
                                                <ul>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" id="typbuy" name="typeprt"/>
                                                            <label className="form-check-label" htmlFor="typbuy">Buy</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" id="typrent" name="typeprt" defaultChecked/>
                                                            <label className="form-check-label" htmlFor="typrent">Rent</label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-lg-6 col-md-5 col-sm-12 px-xl-0 px-lg-0 px-md-0">
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
                                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12">
                                        <div className="form-group">
                                            <button type="button" className="btn btn-dark full-width">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="searches-lists">
                            <ul>
                                <li><span>Popular Searches:</span></li>
                                <li><Link href="#">2 BHK</Link></li>
                                <li><Link href="#" className="active">Banglaw</Link></li>
                                <li><Link href="#">Apartment</Link></li>
                                <li><Link href="#">London</Link></li>
                                <li><Link href="#">Villa</Link></li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                        <div className="">
                            <Image src='/img/side-city-1.png' width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-10">
                        <div className="sec-heading mb-4 mss">
                            <h2>Choose Property Type</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <PropertyType/>
            </div>
        </section>
        <div className="clearfix"></div>

        <section className="gray-simple">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                        <div className="sec-heading mss">
                            <h2>Featured Property For Sale</h2>
                            <p>At vero eos et accusamus dignissimos ducimus</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center g-4">
                    {propertyData.slice(0,6).map((item:data, index:number)=>{
                        return(
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index}>
                                <ClassicGrid item={item}/>
                            </div>
                        )
                    })}
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                        <Link href="/listings-list-with-sidebar" className="btn btn-primary px-md-5 rounded">Browse More Properties</Link>
                    </div>
                </div>
            </div>		
        </section>

        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Find Best Locations</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <BestLoctionOne/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                        <Link href="/listings-list-with-sidebar" className="btn btn-primary px-md-5 rounded">Browse More Locations</Link>
                    </div>
                </div>
            </div>
        </section>
        <hr className="opacity-25"></hr>

        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Featured Property For Sale</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <SellPropertyOne border={true}/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-4">
                        <Link href="/listings-list-with-sidebar" className="btn btn-primary px-lg-5 rounded">Browse More Properties</Link>
                    </div>
                </div>
            </div>		
        </section>

        <CtaTwo/>

        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Explore Featured Agents</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <TeamOne/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                        <Link href="/listings-list-with-sidebar" className="btn btn-primary px-lg-5 rounded">Explore More Agents</Link>
                    </div>
                </div>
            </div>
        </section>
        <div className="clearfix"></div>

        <section className="gray-bg">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Good Reviews by Customers</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <ClientOne/>
            </div>
        </section>

        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Latest Updates By Resido</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <BlogOne/>
            </div>		
        </section>

        <SubScribe/>

        <Footer/>
        <ScrollToTop/>
    </>
  )
}
