
"use client";
import React from 'react'
import Link from 'next/link'
import { HiOutlineLocationMarker, HiOutlineArrowRight } from 'react-icons/hi'

import Navbar from "./components/navbar/navbar"
import HeroSlideshow from "./components/hero-slideshow"

import ClassicGrid from "./components/property/classic-grid"
import BestLoctionOne from "./components/best-loction-one"
import SellPropertyOne from "./components/sell-property-one"
import CtaTwo from "./components/cta-two"
import TeamOne from "./components/team-one"
import ClientOne from "./components/client-one"
import BlogOne from "./components/blog-one"
import SubScribe from "./components/sub-scribe"
import Footer from "./components/footer"
import ScrollToTop from "./components/scroll-to-top"
import AosInit from "./components/aos-init"

import { propertyData } from "./data/data"

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

export default function Home() {
  // Function to handle tab clicks
  const handleTabClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const tabs = document.querySelectorAll('.nav-pills .nav-link');

    // Remove active class from all tabs
    tabs.forEach(tab => {
        tab.classList.remove('active');
        (tab as HTMLElement).style.backgroundColor = '#f8f9fa';
        (tab as HTMLElement).style.color = '#212529';
    });

    // Add active class to clicked tab
    event.currentTarget.classList.add('active');
    event.currentTarget.style.backgroundColor = 'var(--primary-color)';
    event.currentTarget.style.color = 'white';
  };

  return (
    <>
        <AosInit />
        <Navbar transparent={true}/>

        <div className="hero-section position-relative" style={{paddingTop: '0'}}>
            {/* Hero slideshow with zoom-out effect - 99acres style */}
            <HeroSlideshow />

            {/* Search box - 99acres style - positioned to be half above and half below the hero image */}
            <div className="container" style={{marginTop: '-65px', position: 'relative', zIndex: 10}}>
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-11 col-md-12">
                        <div className="card border-0 shadow-sm" style={{borderRadius: '8px', overflow: 'hidden'}}>
                            {/* Tabs at the top */}
                            <div className="card-header p-0 bg-white">
                                <ul className="nav nav-tabs border-0 d-flex" role="tablist" style={{marginBottom: '0'}}>
                                    <li className="nav-item flex-fill" role="presentation">
                                        <button className="nav-link active w-100 py-3 rounded-0 border-0 text-center fw-medium"
                                                style={{
                                                    backgroundColor: 'var(--primary-color)',
                                                    color: 'white',
                                                    fontSize: '15px'
                                                }}
                                                id="buy-tab"
                                                type="button"
                                                onClick={handleTabClick}>
                                            Buy
                                        </button>
                                    </li>
                                    <li className="nav-item flex-fill" role="presentation">
                                        <button className="nav-link w-100 py-3 rounded-0 border-0 text-center fw-medium"
                                                style={{
                                                    fontSize: '15px',
                                                    color: '#212529',
                                                    backgroundColor: '#ffffff',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                id="rent-tab"
                                                type="button"
                                                onClick={handleTabClick}>
                                            Rent
                                        </button>
                                    </li>
                                    <li className="nav-item flex-fill" role="presentation">
                                        <button className="nav-link w-100 py-3 rounded-0 border-0 text-center fw-medium"
                                                style={{
                                                    fontSize: '15px',
                                                    color: '#212529',
                                                    backgroundColor: '#ffffff',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                id="new-launch-tab"
                                                type="button"
                                                onClick={handleTabClick}>
                                            New Launch
                                        </button>
                                    </li>
                                    <li className="nav-item flex-fill" role="presentation">
                                        <button className="nav-link w-100 py-3 rounded-0 border-0 text-center fw-medium"
                                                style={{
                                                    fontSize: '15px',
                                                    color: '#212529',
                                                    backgroundColor: '#ffffff',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                id="pg-tab"
                                                type="button"
                                                onClick={handleTabClick}>
                                            PG / Co-living
                                        </button>
                                    </li>
                                    <li className="nav-item flex-fill" role="presentation">
                                        <button className="nav-link w-100 py-3 rounded-0 border-0 text-center fw-medium"
                                                style={{
                                                    fontSize: '15px',
                                                    color: '#212529',
                                                    backgroundColor: '#ffffff',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                id="commercial-tab"
                                                type="button"
                                                onClick={handleTabClick}>
                                            Commercial
                                        </button>
                                    </li>
                                    <li className="nav-item flex-fill" role="presentation">
                                        <button className="nav-link w-100 py-3 rounded-0 border-0 text-center fw-medium"
                                                style={{
                                                    fontSize: '15px',
                                                    color: '#212529',
                                                    backgroundColor: '#ffffff',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                id="plots-tab"
                                                type="button"
                                                onClick={handleTabClick}>
                                            Plots/Land
                                        </button>
                                    </li>
                                    <li className="nav-item flex-fill" role="presentation">
                                        <button className="nav-link w-100 py-3 rounded-0 border-0 text-center fw-medium"
                                                style={{
                                                    fontSize: '15px',
                                                    color: '#212529',
                                                    backgroundColor: '#ffffff',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                id="projects-tab"
                                                type="button"
                                                onClick={handleTabClick}>
                                            Projects
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Search form below tabs */}
                            <div className="card-body p-3">
                                <div className="row g-2 align-items-center">
                                    <div className="col-lg-3 col-md-6">
                                        <select className="form-select py-2 border" style={{fontSize: '14px', height: '45px', boxShadow: 'none'}}>
                                            <option>All Residential</option>
                                            <option>Apartment</option>
                                            <option>Villa</option>
                                            <option>Independent House</option>
                                            <option>Builder Floor</option>
                                            <option>Penthouse</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-5 col-md-6">
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0" style={{height: '45px'}}>
                                                <HiOutlineLocationMarker className="text-muted" style={{fontSize: '18px'}} />
                                            </span>
                                            <input type="text" className="form-control border-start-0 py-2"
                                                style={{fontSize: '14px', height: '45px', boxShadow: 'none'}}
                                                placeholder='Search luxury properties...'/>
                                            <div className="input-group-append" style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10}}>
                                                <div className="d-flex align-items-center">
                                                    <button className="btn btn-link p-0 me-2" style={{color: 'var(--primary-color)'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                                            <line x1="12" y1="19" x2="12" y2="22"></line>
                                                        </svg>
                                                    </button>
                                                    <button className="btn btn-link p-0" style={{color: 'var(--primary-color)'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <line x1="22" y1="12" x2="18" y2="12"></line>
                                                            <line x1="6" y1="12" x2="2" y2="12"></line>
                                                            <line x1="12" y1="6" x2="12" y2="2"></line>
                                                            <line x1="12" y1="22" x2="12" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <select className="form-select py-2 border" style={{fontSize: '14px', height: '45px', boxShadow: 'none'}}>
                                            <option>Price Range</option>
                                            <option>$500K - $1M</option>
                                            <option>$1M - $2M</option>
                                            <option>$2M - $5M</option>
                                            <option>$5M - $10M</option>
                                            <option>$10M+</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <button type="button" className="btn w-100 py-2 fw-medium"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                                                color: 'white',
                                                fontSize: '15px',
                                                height: '45px',
                                                border: 'none',
                                                boxShadow: '0 4px 10px rgba(74, 111, 165, 0.3)',
                                                borderRadius: '6px',
                                                transition: 'all 0.3s ease'
                                            }}>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Light gray background section that appears below the search box */}
            <div style={{backgroundColor: '#f8f9fa', height: '30px', marginTop: '0'}}></div>
        </div>

        <section className="section-modern-alt py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                        <div className="heading-modern text-center mb-5" data-aos="fade-up">
                            <h2 className="heading-gradient-primary" data-text="Featured Properties">Featured Properties</h2>
                            <p className="subheading-modern">Discover our curated collection of exceptional properties, each offering distinctive architecture, premium locations, and unparalleled luxury</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center g-4">
                    {propertyData.slice(0,6).map((item:data, index:number)=>{
                        return(
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index} data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                                <div className="card-modern h-100">
                                    <ClassicGrid item={item}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5" data-aos="fade-up" data-aos-delay="700">
                        <Link href="/listings-list-with-sidebar" className="btn-modern-primary d-inline-flex align-items-center">
                            Browse More Properties <HiOutlineArrowRight className="ms-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section className="section-modern py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                        <div className="heading-modern text-center mb-5" data-aos="fade-up">
                            <h2 className="heading-gradient-secondary" data-text="Explore Prime Locations">Explore Prime Locations</h2>
                            <p className="subheading-modern">Discover extraordinary properties in the world's most prestigious neighborhoods, from waterfront estates to urban penthouses in iconic cities</p>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                    <BestLoctionOne/>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5" data-aos="fade-up" data-aos-delay="400">
                        <Link href="/listings-list-with-sidebar" className="btn-modern-secondary d-inline-flex align-items-center">
                            Explore All Locations <HiOutlineArrowRight className="ms-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <div className="py-2" style={{background: 'var(--neutral-200)'}}></div>

        <section className="section-modern py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="heading-modern text-center mb-5" data-aos="fade-up">
                            <h2 className="heading-gradient-accent" data-text="Premium Properties">Premium Properties</h2>
                            <p className="subheading-modern">An exclusive portfolio of ultra-luxury residences featuring bespoke design, cutting-edge smart home technology, and world-class amenities</p>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                    <SellPropertyOne border={false}/>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5" data-aos="fade-up" data-aos-delay="300">
                        <Link href="/listings-list-with-sidebar" className="btn-modern-accent d-inline-flex align-items-center">
                            View All Premium Properties <HiOutlineArrowRight className="ms-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <div data-aos="fade-up">
            <CtaTwo/>
        </div>

        <section className="section-modern-alt py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="heading-modern text-center mb-5" data-aos="fade-up">
                            <h2 className="heading-gradient-mixed" data-text="Meet Our Expert Agents">Meet Our Expert Agents</h2>
                            <p className="subheading-modern">Our elite team of luxury real estate specialists combines market expertise, negotiation skills, and personalized service to exceed your expectations</p>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                    <TeamOne/>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5" data-aos="fade-up" data-aos-delay="300">
                        <Link href="/listings-list-with-sidebar" className="btn-modern-primary d-inline-flex align-items-center">
                            Meet All Agents <HiOutlineArrowRight className="ms-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section className="section-modern py-5" style={{background: 'var(--bg-light)'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="heading-modern text-center mb-5" data-aos="fade-up">
                            <h2 className="heading-gradient-primary" data-text="What Our Clients Say">What Our Clients Say</h2>
                            <p className="subheading-modern">Discover why discerning clients trust HomeVista for their most significant real estate investments and transactions</p>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                    <ClientOne/>
                </div>
            </div>
        </section>

        <section className="section-modern py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="heading-modern text-center mb-5" data-aos="fade-up">
                            <h2 className="heading-gradient-secondary" data-text="Latest Real Estate Insights">Latest Real Estate Insights</h2>
                            <p className="subheading-modern">Stay ahead with expert analysis of luxury market trends, investment strategies, and exclusive property opportunities</p>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                    <BlogOne/>
                </div>
            </div>
        </section>

        <div data-aos="fade-up">
            <SubScribe/>
        </div>

        <Footer/>
        <ScrollToTop/>
    </>
  )
}
