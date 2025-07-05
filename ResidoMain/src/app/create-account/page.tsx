import React from 'react'
import Link from 'next/link'

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
                        <h2 className="ipt-title">Create An Account</h2>
                        <span className="ipn-subtitle">Register On Resido Today</span>
                    </div>
                </div>
            </div>
        </div>

        <section className="gray-simple">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-9">
                        <div className="card border-0 rounded-4 p-xl-4 p-lg-4 p-md-4 p-3">
                            
                            <div className="simple-form">
                                <div className="form-header text-center mb-5">
                                    <div className="effco-logo mb-2">
                                        <Link className="d-flex align-items-center justify-content-center" href="/">
                                            <span className="svg-icon text-primary svg-icon-2hx">
                                                <svg width="90" height="90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8797 15.375C15.9797 15.075 15.9797 14.775 15.9797 14.475C15.9797 13.775 15.7797 13.075 15.4797 12.475C14.7797 11.275 13.4797 10.475 11.9797 10.475C11.7797 10.475 11.5797 10.475 11.3797 10.575C7.37971 11.075 4.67971 14.575 2.57971 18.075L10.8797 3.675C11.3797 2.775 12.5797 2.775 13.0797 3.675C13.1797 3.875 13.2797 3.975 13.3797 4.175C15.2797 7.575 16.9797 11.675 15.8797 15.375Z" fill="currentColor"/>
                                                    <path opacity="0.3" d="M20.6797 20.6749C16.7797 20.6749 12.3797 20.275 9.57972 17.575C10.2797 18.075 11.0797 18.375 11.9797 18.375C13.4797 18.375 14.7797 17.5749 15.4797 16.2749C15.6797 15.9749 15.7797 15.675 15.7797 15.375V15.2749C16.8797 11.5749 15.2797 7.47495 13.2797 4.07495L21.6797 18.6749C22.2797 19.5749 21.6797 20.6749 20.6797 20.6749ZM8.67972 18.6749C8.17972 17.8749 7.97972 16.975 7.77972 15.975C7.37972 13.575 8.67972 10.775 11.3797 10.375C7.37972 10.875 4.67972 14.375 2.57972 17.875C2.47972 18.075 2.27972 18.375 2.17972 18.575C1.67972 19.475 2.27972 20.475 3.27972 20.475H10.3797C9.67972 20.175 9.07972 19.3749 8.67972 18.6749Z" fill="currentColor"/>
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                    <h4 className="fs-2">Create Account On Resido</h4>
                                </div>
                                <form>
                                    
                                    <div className="row">
                                        
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group mb-3">
                                                <label className='mb-2'>Full Name</label>
                                                <input type="text" className="form-control" placeholder="Full Name"/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className='mb-2'>Email</label>
                                                <input type="email" className="form-control" placeholder="Email"/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className='mb-2'>Username</label>
                                                <input type="text" className="form-control" placeholder="Username"/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className='mb-2'>Password</label>
                                                <input type="password" className="form-control" placeholder="*******"/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className='mb-2'>Phone</label>
                                                <input type="tel" className="form-control" placeholder="123 546 5847"/>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label className='mb-2'>Signup As</label>
                                                <select className="form-control">
                                                    <option>As a Customer</option>
                                                    <option>As a Agent</option>
                                                    <option>As a Agency</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary full-width fw-medium">Create Account<i className="fa-solid fa-arrow-right-long ms-2"></i></button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-divider"><span>Or SignUp via</span></div>
                            <div className="social-login mb-3">
                                <ul>
                                    <li><Link href="#" className="btn connect-fb"><i className="ti-facebook"></i>Facebook</Link></li>
                                    <li><Link href="#" className="btn connect-google"><i className="ti-google"></i>Google+</Link></li>
                                </ul>
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
