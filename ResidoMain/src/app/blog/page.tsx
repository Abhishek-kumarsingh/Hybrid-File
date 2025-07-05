import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '../components/navbar/navbar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

import { blogData } from '../data/data'

interface BlogData {
    id: number;
    image: string;
    date: string;
    title: string;
    desc: string;
}

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/> 
        <div className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Our Articles</h2>
                        <span className="ipn-subtitle">See Our Latest Articles & News</span>
                    </div>
                </div>
            </div>
        </div>

        <section className="gray-simple">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="sec-heading center">
                            <h2>Latest News</h2>
                            <p>We post regulary most powerful articles for help and support.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center g-4">
                    {blogData.map((item:BlogData,index:number)=>{
                        return(
                            <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
                                <div className="blog-wrap-grid h-100 shadow">
                                    <div className="blog-thumb">
                                        <Link href={`/blog-detail/${item.id}`}><Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt="" /></Link>
                                    </div>
                                    <div className="blog-info">
                                        <span className="post-date label bg-seegreen text-light"><i className="ti-calendar"></i>{item.date}</span>
                                    </div>
                                    <div className="blog-body">
                                        <h4 className="bl-title"><Link href={`/blog-detail/${item.id}`}>{item.title}</Link></h4>
                                        <p>{item.desc} </p>
                                        <Link href={`/blog-detail/${item.id}`} className="text-primary fw-medium">Continue<i className="fa-solid fa-arrow-right ms-2"></i></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <ul className="pagination p-center">
                            <li className="page-item">
                                <Link className="page-link" href="#" aria-label="Previous">
                                <i className="fa-solid fa-arrow-left-long"></i>
                                <span className="sr-only">Previous</span>
                                </Link>
                            </li>
                            <li className="page-item"><Link className="page-link" href="#">1</Link></li>
                            <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                            <li className="page-item active"><Link className="page-link" href="#">3</Link></li>
                            <li className="page-item"><Link className="page-link" href="#">...</Link></li>
                            <li className="page-item"><Link className="page-link" href="#">18</Link></li>
                            <li className="page-item">
                                <Link className="page-link" href="#" aria-label="Next">
                                <i className="fa-solid fa-arrow-right-long"></i>
                                <span className="sr-only">Next</span>
                                </Link>
                            </li>
                        </ul>
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
