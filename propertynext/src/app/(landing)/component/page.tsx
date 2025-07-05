import React from 'react'
import Link from 'next/link'

import Footer from '../components/footer'
import FooterTop from '../components/footer-top'
import Navbar from '../components/navbar/navbar'
import ScrollToTop from '../components/scroll-to-top'

export default function Page() {
  return (
    <div>
        <Navbar transparent={false}/>

        <div className="page-title">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="ipt-title">Components</h2>
                        <span className="ipn-subtitle">Lists of all used components</span>
                    </div>
                </div>
            </div>
        </div>

        <section>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <h4>Typography</h4>
                        <h1>Heading One</h1>
                        <h2>Heading Two</h2>
                        <h3>Heading Three</h3>
                        <h4>Heading Four</h4>
                        <h5>Heading Five</h5>
                        <h6>Heading Six</h6>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <h4 className='mb-4'>Buttons</h4>
                        <button type="submit" className="btn btn-primary mb-3">Simple button</button><br/>
                        <button type="submit" className="btn btn-light-primary btn-rounded mb-3 me-2">Simple button</button>
                        <button type="submit" className="btn btn-success btn-md mb-3">Midium Button</button><br/>
                        <button type="submit" className="btn btn-danger btn-lg me-2">Large Button</button>
                        <button type="submit" className="btn btn-outline-primary">Outline Button</button><br/><br/>
                        <Link href="#" className="btn btn-info rounded-pill mb-3">Simple button</Link><br/>
                        <Link href="#" className="btn btn-light-primary rounded-pill mb-3">Simple button</Link>
                    </div>
                    
                </div>

                <div className="row mt-4">
                
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <h4 className='mb-3'>Shadow & Simple Inputbox</h4>
                        
                        <div className="form-group">
                            <div className="input-with-icon">
                                <input type="text" className="form-control" placeholder="Neighborhood"/>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className='mb-2'>Name</label>
                            <input type="text" className="form-control simple"/>
                        </div>
                    </div>
                    
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <h4>Checkbox & Radio buttons</h4>
                        <ul className="no-ul-list">
                            <li>
                                <input id="a-1" className="form-check-input" name="a-1" type="checkbox"/>
                                <label htmlFor="a-1" className="form-check-label ms-2">Air Condition</label>
                            </li>
                            <li>
                                <input id="a-2" className="form-check-input" name="a-2" type="checkbox"/>
                                <label htmlFor="a-2" className="form-check-label ms-2">Bedding</label>
                            </li>
                            
                        </ul>
                        
                        <ul className="no-ul-list">
                            <li>
                                <input id="a-p" className="form-check-input" name="a-p" type="radio"/>
                                <label htmlFor="a-p" className="form-check-label ms-2">Air Condition</label>
                            </li>
                            <li>
                                <input id="a-c" className="form-check-input" name="a-c" type="radio"/>
                                <label htmlFor="a-c" className="form-check-label ms-2">Bedding</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <FooterTop bg="theme-bg"/>
        <Footer/>
        <ScrollToTop/>
    </div>
  )
}
