import React from 'react'
import Navbar from '../components/navbar/navbar'
import Link from 'next/link'
import { agentData } from '../data/data'
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import Image from 'next/image';

interface AgentData{
    id: number;
    image: string;
    name: string;
    property: string;
    call: string;
    review: string;
}

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>

        <section className="bg-primary position-relative">
            <div className="position-absolute start-0 top-0 w-25 h-15 bg-light rounded-end-pill opacity-25 mt-4"></div>
            <div className="position-absolute start-0 bottom-0 w-15 h-20 bg-light rounded-top-pill opacity-25 ms-4"></div>
            <div className="position-absolute end-0 top-0 w-15 h-25 bg-light rounded-bottom-pill opacity-25 me-4"></div>
            <div className="position-absolute end-0 bottom-0 w-25 h-15 bg-light rounded-start-pill opacity-25 mb-4"></div>
            <div className="ht-30"></div>
            <div className="container">
                <div className="row">
                <div className="col-lg-12 col-md-12">
                    <h2 className="ipt-title text-light">All Agents</h2>
                    <span className="ipn-subtitle">Lists of our all expert agents</span>
                </div>
                </div>
            </div>
            <div className="ht-30"></div>
        </section>

        <section className="gray-simple p-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-12">
                <div className="full-search-2 eclip-search italian-search hero-search-radius shadow-hard overlio-40">
                  <div className="hero-search-content">
                    <div className="row">
                      <div className="col-lg-10 col-md-9 col-sm-12">
                        <div className="form-group">
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
                      <div className="col-lg-2 col-md-3 col-sm-12">
                        <div className="form-group">
                          <Link href="#" className="btn btn-dark full-width">Search</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="gray-simple">
            <div className="container">
                <div className="row justify-content-center g-4">
                {agentData.map((item:AgentData,index:number)=>{
                    return(
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                        <div className="agents-grid card rounded-3 shadow">
                        <div className="agents-grid-wrap">
                            <div className="fr-grid-thumb mx-auto text-center mt-5 mb-3">
                            <Link href={`/agent-page/${item.id}`} className="d-inline-flex p-1 circle border">
                                <Image src={item.image} className="img-fluid circle" width={130} height={130} alt="" />
                            </Link>
                            </div>
                            <div className="fr-grid-deatil text-center">
                            <div className="fr-grid-deatil-flex">
                                <h5 className="fr-can-name mb-0"><Link href={`/agent-page/${item.id}`}>{item.name}</Link></h5>
                                <span className="agent-property text-muted-2">{item.property}</span>
                            </div>
                            </div>
                        </div>
                        
                        <div className="fr-grid-info d-flex align-items-center justify-content-between px-4 py-4">
                            <div className="fr-grid-sder">
                            <ul className="p-0">
                                <li><strong>Call:</strong><span className="fw-medium text-primary ms-2">{item.call}</span></li>
                                <li>
                                <div className="fr-can-rating">
                                    <i className="fas fa-star fs-xs text-warning" style={{margin:'0 2px'}}></i>
                                    <i className="fas fa-star fs-xs text-warning" style={{margin:'0 2px'}}></i>
                                    <i className="fas fa-star fs-xs text-warning" style={{margin:'0 2px'}}></i>
                                    <i className="fas fa-star fs-xs text-warning" style={{margin:'0 2px'}}></i>
                                    <i className="fas fa-star fs-xs text-muted" style={{margin:'0 2px'}}></i>
                                    <span className="reviews_text fs-sm text-muted-2">({item.review})</span>
                                </div>
                                </li>
                            </ul>
                            </div>
                            <div className="fr-grid-deatil-flex-right">
                            <div className="agent-email"><Link href="#" className="square--50 rounded text-danger bg-light-danger"><i className="fa-solid fa-envelope-circle-check"></i></Link></div>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                )
              })}
            </div>
            
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                    <Link href="/listings-list-with-sidebar" className="btn btn-primary px-lg-5 rounded">Explore More Agents</Link>
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
