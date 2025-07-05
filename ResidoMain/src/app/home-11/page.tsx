import React from 'react'
import Link from 'next/link'

import Navbar from '../components/navbar/navbar'
import FormThree from '../components/form/form-three'
import Categories from '../components/categories'
import BestLoctionOne from '../components/best-loction-one'
import ClassicGrid from '../components/property/classic-grid'
import TeamOne from '../components/team-one'
import ClientOne from '../components/client-one'
import PricingOne from '../components/pricing-one'
import AppDownload from '../components/app-download'
import SubScribeTwo from '../components/sub-scribe-two'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

import { propertyData } from '../data/data'

interface Data{
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
        <div className="image-cover hero-banner" style={{backgroundImage:`url('/img/city-banner.png')`, backgroundColor:'#eff6ff', backgroundRepeat:'no-repeat'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 col-md-11 col-sm-12">
                        <div className="inner-banner-text text-center">
                            <p className="d-inline-flex sm-small text-light rounded-5 px-2 py-1 bg-info align-items-center">We just launched our service in New York, United States<span className="sm-small px-2 rounded-5 bg-white text-dark ms-2">New</span></p>
                            <h2 className='mt-3 mb-4'>Find <span className="text-primary">Real Properties</span> at Cheapest Price in california</h2>
                            <p className="small">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores occaecati cupiditate quas molestias excepturi</p>
                        </div>
                        <FormThree/>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center mb-4">
                            <h2>Explore categories</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <Categories/>
            </div>
        </section>
        <div className="clearfix"></div>

        <section className="pt-0">
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
                    {propertyData.slice(0,6).map((item:Data,index:number)=>{
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
                            <h2>See our packages</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <PricingOne/>
            </div>	
        </section>

        <AppDownload/>

        <SubScribeTwo/>
        <Footer/>

        <ScrollToTop/>
    </>
  )
}
