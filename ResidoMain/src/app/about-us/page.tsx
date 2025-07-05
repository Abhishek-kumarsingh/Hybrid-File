import React from 'react'
import Image from 'next/image'

import Navbar from '../components/navbar/navbar'
import TeamSliderTwo from '../components/team-slider-two'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
    const data = [
        {
            icon:'fa-solid fa-unlock-keyhole text-primary',
            title:'Fully Secure & 24x7 Dedicated Support',
            desc:'If you are an individual client, or just a business startup looking for good backlinks for your website.'
        },
        {
            icon:'fa-brands fa-twitter text-primary',
            title:'Manage your Social & Busness Account Carefully',
            desc:'If you are an individual client, or just a business startup looking for good backlinks for your website.'
        },
        {
            icon:'fa-solid fa-layer-group text-primary',
            title:'We are Very Hard Worker and loving',
            desc:'If you are an individual client, or just a business startup looking for good backlinks for your website.'
        },
    ]

  return (
    <>
        <Navbar transparent={false}/>   

        <div className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">About Us</h2>
                        <span className="ipn-subtitle">Who we are & our mission</span>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <Image src='/img/sb.png' width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt="" />
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="story-wrap explore-content">
                            <h2>Our Story</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="gray-bg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="sec-heading center">
                            <h2>Meet Our Team</h2>
                            <p>Professional & Dedicated Team</p>
                        </div>
                    </div>
                </div>
            <TeamSliderTwo/>
            </div>
        </section>

        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="sec-heading center">
                            <h2>Our Mission & Work Process</h2>
                            <p>Professional & Dedicated Team</p>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        {data.map((item:any,index:number)=>{
                            return(
                                <div className="icon-mi-left" key={index}>
                                    <i className={item.icon}></i>
                                    <div className="icon-mi-left-content">
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <img src="/img/vec-2.png" className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </section>

        <FooterTop bg="theme-bg"/>

        <Footer/>

        <ScrollToTop/>
    </>
  )
}
