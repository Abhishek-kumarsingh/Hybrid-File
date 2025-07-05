import React from 'react'

import Navbar from '../components/navbar/navbar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>

        <div className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Contact Us</h2>
                        <span className="ipn-subtitle">Lists of our all Popular agencies</span>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-7">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label className='mb-2'>Name</label>
                                    <input type="text" className="form-control simple"/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label className='mb-2'>Email</label>
                                    <input type="email" className="form-control simple"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label className='mb-2'>Subject</label>
                            <input type="text" className="form-control simple"/>
                        </div>
                        
                        <div className="form-group">
                            <label className='mb-2'>Message</label>
                            <textarea className="form-control simple"></textarea>
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-primary px-5 rounded" type="submit">Submit Request</button>
                        </div>
                                        
                    </div>
                    
                    <div className="col-lg-5 col-md-5">
                        <div className="contact-info">
                            <h2>Get In Touch</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            
                            <div className="cn-info-detail mt-4">
                                <div className="cn-info-icon">
                                    <i className="fa-solid fa-house"></i>
                                </div>
                                <div className="cn-info-content">
                                    <h4 className="cn-info-title">Reach Us</h4>
                                    2512, New Market,<br/>Eliza Road, Sincher 80 CA,<br/>Canada, USA
                                </div>
                            </div>
                            <div className="cn-info-detail">
                                <div className="cn-info-icon">
                                    <i className="fa-solid fa-envelope-circle-check"></i>
                                </div>
                                <div className="cn-info-content">
                                    <h4 className="cn-info-title">Drop A Mail</h4>
                                    support@Rikada.com<br/>Rikada@gmail.com
                                </div>
                            </div>
                            <div className="cn-info-detail">
                                <div className="cn-info-icon">
                                    <i className="fa-solid fa-phone-volume"></i>
                                </div>
                                <div className="cn-info-content">
                                    <h4 className="cn-info-title">Call Us</h4>
                                    (41) 123 521 458<br/>+91 235 548 7548
                                </div>
                            </div>
                        </div>
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
