import React from 'react'
import Link from 'next/link'

import Navbar from '../components/navbar/navbar'
import FormThree from '../components/form/form-three'
import PropertySliderTwo from '../components/property/property-slider-two'
import TopPlaceOne from '../components/top-place-one'
import TeamSlider from '../components/team-slider'
import ClientOne from '../components/client-one'
import PricingOne from '../components/pricing-one'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>

        <div className="image-bottom hero-banner bg-primary" style={{backgroundImage:`url('/img/banner.svg')`, backgroundRepeat:'no-repeat'}} data-overlay="0">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 col-md-11 col-sm-12">
                        <div className="inner-banner-text text-center mb-2">
                            <h2 className="mb-4"><span className="font-normal">Ready. Set. Sold</span></h2>
                            <p className="fs-5 fw-light px-xl-4 px-lg-4">Cicero famously orated against his political opponent Lucius Sergius Catilina. Occasionally the first Oration against Catiline is taken for type specimens</p>
                        </div>
                        <FormThree/>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-lg-7 col-md-10">
                        <div className="small-heads">
                            <h2 className="fs-5 mb-0">Property For Rent</h2>
                            <p>Recent Rent Properties</p>
                        </div>
                    </div>
                </div>
                <PropertySliderTwo/>
            </div>
        </section>

        <div className="clearfix"></div>

        <section className="pt-0">
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-lg-7 col-md-10">
                        <div className="small-heads">
                            <h2 className="fs-5 mb-0">Properties For Sell</h2>
                            <p>Best Properties For Sell</p>
                        </div>
                    </div>
                </div>
                <PropertySliderTwo/>
            </div>
        </section>

        <div className="clearfix"></div>

        <section className="pt-0">
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-lg-7 col-md-10">
                        <div className="small-heads">
                            <h2 className="fs-5 mb-0">Explore Top Places</h2>
                            <p>Best Places</p>
                        </div>
                    </div>
                </div>
               <TopPlaceOne/>
            </div>
        </section>
        <div className="clearfix"></div>

        <section className="pt-0">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12">
                        <div className="bg-primary rounded-4 py-md-5 px-md-5 p-4">
                            <div className="row align-items-center justify-content-between py-5">
                                <div className="col-xl-9 col-lg-8 col-md-7 my-2">
                                    <h2 className="fs-1 text-light lh-base">New Projects in United States</h2>
                                    <p className="text-light m-0">New projects, verified by our quality control teams.</p>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-5 my-2">
                                    <Link href="#" className="btn btn-lg btn-whites full-width fw-medium">View New Projects</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="clearfix"></div>

        <section className="pt-0">
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-lg-7 col-md-10">
                        <div className="small-heads">
                            <h2 className="fs-5 mb-0">Meet Top Agents</h2>
                            <p>Top Agents</p>
                        </div>
                    </div>
                </div>
                <TeamSlider/>
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

        <FooterTop bg="theme-bg"/>
        
        <Footer/>

        <ScrollToTop/>
    </>
  )
}
