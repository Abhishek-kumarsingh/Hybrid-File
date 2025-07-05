import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer'
import FooterTop from '../../components/footer-top'
import DetailSidebarThree from '../../components/property/detail-sidebar-three'
import PropertyTab from '../../components/property/property-tab'
import ScrollToTop from '../../components/scroll-to-top'

import { agentData, agentInfo } from '../../data/data'

export default function Page({params}:{params:any}) {
    let data = agentData.find((item:any)=>item.id === parseInt(params.id))
  return (
    <>
        <Navbar transparent={false}/>   

        <div className="image-cover page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Agent Detail</h2>
                        <span className="ipn-subtitle">{data?.name ? data?.name : 'Adam D. Okraar'} From Canada</span>
                    </div>
                </div>
            </div>
        </div>

        <section className="agent-page p-0 gray-simple">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="agency agency-list overlio-40">
                            <div className="agency-avatar">
                                <Image src={`${data?.image ? data?.image : '/img/user-5.jpg'}`} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} alt=""/>
                            </div>
                            <div className="agency-content">
                                <div className="agency-name">
                                    <h4><Link href="/agency-page">{data?.name ? data?.name : 'Adam D. Okraar'}</Link></h4>
                                    <span><i className="lni-map-marker"></i>3599 Huntz Lane</span>
                                </div>
                                <div className="agency-desc">
                                    <p>Think of a news blog that's filled with content hourly on the day of going live However, reviewers tend to be distracted by comprehensible content. In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready.</p>
                                </div>
                                <div className="prt-detios">
                                    <span className="label text-light bg-success">202 Property</span>
                                </div>
                                <ul className="social-icons mt-4">
                                    <li><Link className="facebook" href="#"><i className="fa-brands fa-facebook"></i></Link></li>
                                    <li><Link className="twitter" href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                    <li><Link className="linkedin" href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                    <li><Link className="linkedin" href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
                                </ul>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="min gray-simple">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="block-wrap">
                            <div className="block-header">
                                <h4 className="block-title">Agent Info</h4>
                            </div>
                            <div className="block-body">
                                <ul className="dw-proprty-info">
                                    {agentInfo.map((item:any,index:number)=>{
                                        return(
                                            <li key={index}><strong>{item.title}</strong>{item.subTitle}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        
                        <div className="block-wraps">
                            <PropertyTab/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <DetailSidebarThree/>
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
