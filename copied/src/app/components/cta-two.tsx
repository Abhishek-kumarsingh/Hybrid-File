'use client'
import React from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image';

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import '../../../node_modules/tiny-slider/dist/tiny-slider.css'

import CountUp from 'react-countup';

export default function CtaTwo() {
    let clientData =[
        {
            desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            name:'Harman Carlo',
            position:'Google Manager'
        },
        {
            desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            name:'Dhananjay Verma',
            position:'Shreethemes Manager'
        },
        {
            desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            name:'Bharti Carlo',
            position:'BootstrapWire Manager'
        },
        {
            desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            name:'Shreekant Tripathi',
            position:'Megroo Developer'
        },
        {
            desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            name:'Rajnish Shukla',
            position:'Airbnb Leader'
        },
    ]

    const settings = {
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        nav: false,
        speed: 400,
        gutter: 0,
    };
  return (
        <section className="bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
                        <div className="trustscrore-wrap">
                            <div className="trustscrore-title">
                                <h2>4.8</h2>
                            </div>
                            <div className="trustscrore-rates">
                                <div className="trustscrore-stars">
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                </div>
                                <div className="trustscrore-stars-title"><span>Trustscore on 176 Reviews</span></div>
                            </div>
                            <div className="trustscrore-info">
                                <div className="trustscrore-subtitle"><span>Check all reviews on</span></div>
                                <div className="trustscrore-brand"><Image src='/img/brand.png' width={0} height={0} sizes='100vw' style={{width:'200px', height:'auto'}} className="img-fluid" alt=""/></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="single-reviews">
                            <TinySlider settings={settings}>
                                {clientData.map((item,index)=>{
                                    return(
                                        <div className="single-item-reviews" key={index}>
                                            <div className="single-item-reviews-desc">
                                                <p>{item.desc}</p>
                                            </div>
                                            <div className="single-item-reviews-info">
                                                <h4>{item.name}</h4>
                                                <p className="text-primary">{item.position}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </TinySlider>
                        </div>
                    </div>
                </div>
                
                <div className="row align-items-center justify-content-between">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="counter-info-groups">
                            <div className="single-counter-wrap">
                                <div className="single-counter-title">
                                    <h2>$<CountUp className="ctr" end={310}/>M</h2>
                                </div>
                                <div className="single-counter-subtitle">
                                    <p>Owned from<br/>properties transaction</p>
                                </div>
                            </div>
                            
                            <div className="single-counter-wrap">
                                <div className="single-counter-title">
                                    <h2><CountUp className="ctr" end={40}/>K</h2>
                                </div>
                                <div className="single-counter-subtitle">
                                    <p>Properties for<br/>Buy & Sell</p>
                                </div>
                            </div>
                            
                            <div className="single-counter-wrap">
                                <div className="single-counter-title">
                                    <h2><CountUp className="ctr" end={500}/></h2>
                                </div>
                                <div className="single-counter-subtitle">
                                    <p>Daily Completed<br/>transaction</p>
                                </div>
                            </div>
                            <div className="single-counter-wrap">
                                <div className="single-counter-title">
                                    <h2><CountUp className="ctr" end={111}/>M</h2>
                                </div>
                                <div className="single-counter-subtitle">
                                    <p>Happy Customers<br/>from Resido</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
