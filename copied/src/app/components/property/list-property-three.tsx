'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import '../../../../node_modules/tiny-slider/dist/tiny-slider.css'

const settings = {
    items: 1,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    nav: true,
    speed: 400,
    gutter: 0,
};

export default function ListPropertyThree({item}:{item:any}) {
    let [open, setOpen] = useState<boolean>(false)

  return (
    <>
        <div className="property-listing list_view style_new">
            <div className="listing-img-wrapper position-relative">
                <div className="like_unlike_prt">
                    <label className="toggler toggler-danger"><input type="checkbox"/><i className="fa fa-heart"></i></label>
                </div>
                <div className="position-absolute top-0 left-0 ms-3 mt-3 z-1">
                    {item.tag.map((el:any, index:number)=>{
                      return(
                        
                        <div key={index} className={`label text-light d-inline-flex align-items-center justify-content-center mx-1 ${el === 'Verified' ? 'bg-success' : ''} ${el === 'SuperAgent' ? 'bg-purple' : ''} ${el === 'New' ? 'bg-danger' : ''}`}>
                          {el === 'Verified' && <img src='/img/svg/verified.svg' alt="" className='me-1' />}

                          {el === 'SuperAgent' && <img src='/img/svg/user-1.svg' alt="" className='me-1'/>}

                          {el === 'New' && <img src='/img/svg/moon.svg' alt="" className='me-1'/>}
                            {el}
                        </div>
                      )
                    })}
                </div>
                <div className="list-img-slide">
                    <div className="clior">
                        <TinySlider settings={settings}>
                            {item.image.map((el:any, index:number) => {
                                return(
                                    <div key={index}><Link href={`/single-property-1/${item.id}`}><img src={el} className="img-fluid mx-auto" alt="" /></Link></div>
                                )
                            })}
                        </TinySlider>
                    </div>
                </div>
            </div>

            
            
             <div className="list_view_flex">
            
                <div className="listing-detail-wrapper mt-1">
                    <div className="listing-short-detail-wrap">
                        <div className="_card_list_flex mb-2">
                            <div className="_card_flex_01 d-flex align-items-center">
                                {item.tag2 === "For Rent" && <span className="label bg-light-success text-success me-2">For Rent</span>}
                                {item.tag2 === "For Sell" && <span className="label bg-light-danger text-danger me-2">For Sell</span>}
                                <span className="label bg-light-purple text-purple">{item.type}</span>
                            </div>
                            <div className="_card_flex_last">
                                <h6 className="listing-info-price text-primary fs-4 mb-0">{item.value}</h6>
                            </div>
                        </div>
                        <div className="_card_list_flex">
                            <div className="_card_flex_01">
                                <h4 className="listing-name mt-3"><Link href="/single-property-1" className="prt-link-detail">4789 Resot Relly Market, Montreal Canada, HAQC445</Link></h4>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="price-features-wrapper">
                    <div className="list-fx-features d-flex align-items-center justify-content-between">
                        <div className="listing-card d-flex align-items-center">
                            <div className="square--30 text-muted-2 fs-sm circle gray-simple me-2"><i className="fa-solid fa-building-shield fs-sm"></i></div><span className="text-muted-2">{item.size}</span>
                        </div>
                        <div className="listing-card d-flex align-items-center">
                            <div className="square--30 text-muted-2 fs-sm circle gray-simple me-2"><i className="fa-solid fa-bed fs-sm"></i></div><span className="text-muted-2">{item.beds}</span>
                        </div>
                        <div className="listing-card d-flex align-items-center">
                            <div className="square--30 text-muted-2 fs-sm circle gray-simple me-2"><i className="fa-solid fa-clone fs-sm"></i></div><span className="text-muted-2">{item.sqft}</span>
                        </div>
                    </div>
                </div>
                
                <div className="listing-detail-footer pl-0">
                    <div className="footer-first">
                        <Link href="#" className="btn btn-md btn-primary fw-medium me-1" onClick={()=>setOpen(!open)}>
                            <span className="svg-icon text-light svg-icon-2hx me-1">
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                                    <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="currentColor"/>
                                </svg>
                            </span>Availability
                        </Link>
                        <a href="tel:4048651904" className="btn btn-md btn-light-primary px-3 me-1">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 21C6 21.6 6.4 22 7 22H17C17.6 22 18 21.6 18 21V20H6V21Z" fill="currentColor"/>
                                    <path d="M12 4C11.4 4 11 3.6 11 3V2H13V3C13 3.6 12.6 4 12 4Z" fill="currentColor"/>
                                    <path opacity="0.3" d="M18 3V20H6V3C6 2.4 6.4 2 7 2H17C17.6 2 18 2.4 18 3ZM16 11C16 8.5 13.7 6.49998 11.1 7.09998C9.60001 7.39998 8.50001 8.6001 8.10001 10.1001C7.80001 11.5001 8.2 12.7 9 13.7L11.2 16.2C11.6 16.6 12.3 16.6 12.7 16.2L14.9 13.7C15.6 13 16 12 16 11Z" fill="currentColor"/>
                                    <path d="M12 12.5C12.8284 12.5 13.5 11.8284 13.5 11C13.5 10.1716 12.8284 9.5 12 9.5C11.1716 9.5 10.5 10.1716 10.5 11C10.5 11.8284 11.1716 12.5 12 12.5Z" fill="currentColor"/>
                            </svg>
                            </span>
                        </a>
                        <Link href="#" className="btn btn-md btn-light-primary px-3 me-1">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor"/>
                                    <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor"/>
                                </svg>
                            </span>
                        </Link>
                        <Link href="#" className="btn btn-md btn-light-primary px-3">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.3721 4.65439C17.6415 4.23815 16.8052 4 15.9142 4C14.3444 4 12.9339 4.73924 12.003 5.89633C11.0657 4.73913 9.66 4 8.08626 4C7.19611 4 6.35789 4.23746 5.62804 4.65439C4.06148 5.54462 3 7.26056 3 9.24232C3 9.81001 3.08941 10.3491 3.25153 10.8593C4.12155 14.9013 9.69287 20 12.0034 20C14.2502 20 19.875 14.9013 20.7488 10.8593C20.9109 10.3491 21 9.81001 21 9.24232C21.0007 7.26056 19.9383 5.54462 18.3721 4.65439Z" fill="currentColor"/>
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div> 
        </div>
        {open &&
            <div className="modal fade show" style={{display: 'block', backgroundColor:"#0000008a"}}>
                <div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
                    <div className="modal-content" id="sign-up">
                        <span className="mod-close" onClick={()=>setOpen(!open)}><i className="fa-solid fa-circle-xmark text-muted-2 fs-5"></i></span>
                        <div className="modal-body">
                            <div className="text-center">
                                <h2 className="mb-0">CONTACT</h2>
                                <h4 className="mb-0">5689 Resot Relly, Canada</h4>
                                <a className="_calss_tyui theme-cl" href="tel:4048651904">(404) 865-1904</a>
                            </div>
                            <div className="login-form">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>Message</label>
                                                <textarea className="form-control ht-120">I'm interested in 5689 Resot Relly, Canada. Please send me current availability and additional details.</textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>Name*</label>
                                                <input type="text" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>Email*</label>
                                                <input type="email" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="default-terms_wrap">
                                        <div className="default-terms_flex">
                                            <input id="tm" className="form-check-input" name="tm" type="checkbox"/>
                                            <label htmlFor="tm" className="form-check-label"></label>
                                        </div>
                                        <div className="default-terms">By submitting this form, you agree to our <Link href="#" title="Terms of Service">Terms of Service</Link> and <Link href="#" title="Privacy Policy">Privacy Policy</Link>.</div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <button type="submit" className="btn btn-primary full-width fw-medium">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
  )
}
