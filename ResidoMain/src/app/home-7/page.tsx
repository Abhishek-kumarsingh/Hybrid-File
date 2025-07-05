import React from 'react'
import Link from 'next/link'

import NavLight from '../components/navbar/nav-light'
import FormTwo from '../components/form/form-two'
import ExplorePropertyTwo from '../components/property/explore-property-two'
import GridPropertyOne from '../components/property/grid-property-one'
import TeamOne from '../components/team-one'
import HowItsWork from '../components/how-its-work'
import CtaOne from '../components/property/cta-one'
import BlogOne from '../components/blog-one'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
        <NavLight/>

        <div className="image-cover hero-banner" style={{backgroundImage:`url('/img/banner-7.jpg')`, backgroundRepeat:'no-repeat'}} data-overlay="6">
            <div className="container">
                <h1 className="big-header-capt mb-0">Find Your Property</h1>
                <p className="text-center mb-5">From as low as $10 per day with limited time offer</p>
                <div className="full-search-2 eclip-search italian-search hero-search-radius shadow mt-5">
                    <div className="hero-search-content">
                        <FormTwo/>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Explore Good places</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <ExplorePropertyTwo/>
            </div>	
        </section>

        <section className="bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center">
                            <h2>Explore Good places</h2>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                        </div>
                    </div>
                </div>
                <GridPropertyOne border={false}/>
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
            <HowItsWork/>
        </section>

        <div className="clearfix"></div>

        <CtaOne/>

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

        <FooterTop bg="theme-bg"/>

        <Footer/>

        <ScrollToTop/>
    </>
  )
}
