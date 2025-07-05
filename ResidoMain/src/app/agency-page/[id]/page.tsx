import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../../components/navbar/navbar';
import DetailSidebarThree from '../../components/property/detail-sidebar-three';
import AgencyTab from '../../components/agency-tab';
import FooterTop from '../../components/footer-top';
import Footer from '../../components/footer';
import ScrollToTop from '../../components/scroll-to-top';

import { agencyData, agentInfo } from '../../data/data';

export default function Page({params}:{params:any}) {
    let data = agencyData.find((item:any)=>item.id === parseInt(params.id))
  return (
    <>
        <Navbar transparent={false}/>

        <div className="image-cover page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Agency Detail</h2>
                        <span className="ipn-subtitle">{data?.name ? data?.name : 'Modern house'}</span>
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
                                <Image src={data?.image ? data?.image :'/img/ag-1.png'} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} alt=""/>
                            </div>
                            <div className="agency-content">
                                <div className="agency-name">
                                    <h4><Link href="/agency-page">{data?.name ? data?.name : 'Modern house'}</Link></h4>
                                    <span><i className="lni-map-marker"></i>3599 Huntz Lane</span>
                                </div>
                                <div className="agency-desc">
                                <p>Most text editors like MS Word or Lotus Notes generate random lorem text when needed, either as pre-installed module or plug-in to be added. Word selection or sequence don't necessarily match the original, which is intended to add variety. Presentation software like Keynote.</p>
                                </div>
                                <div className="prt-detios">
                                    <span className="label text-light bg-success">176 Property</span>
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


        <section className="gray">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="block-wrap">
                            <div className="block-header ags">
                                <h4 className="block-title">Agency Info</h4>
                                <Link href="/add-agent" className="btn btn-seegreen">Add New Agent</Link>
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
                            <AgencyTab/>
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
