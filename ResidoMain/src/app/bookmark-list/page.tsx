"use client"
import React, { useState } from 'react'
import Link from 'next/link'

import UserNav from '../components/navbar/user-nav'
import AdminSidebar from '../components/admin-sidebar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

import { bookMarkProperty } from '../data/property'

interface Bookmark{
    image: string;
    name: string;
    loction: string;
    value: string;
}

export default function BookmarkList() {
    let [show, setShow] = useState<boolean>(false)
  return (
    <>
    <UserNav/>

    <div className="page-title">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <h2 className="ipt-title">Welcome!</h2>
                    <span className="ipn-subtitle">Welcome To Your Account</span>
                </div>
            </div>
        </div>
    </div>   

    <section className="bg-light">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="filter_search_opt">
                        <Link href="#" onClick={()=>setShow(!show)} className="btn btn-dark full-width mb-4">Dashboard Navigation<i className="fa-solid fa-bars ms-2"></i></Link>
                    </div>
                </div>
            </div>
                        
            <div className="row">
                
                <div className="col-lg-3 col-md-12">
                    
                    <div className="simple-sidebar sm-sidebar" id="filter_search">
                        
                        <div className="search-sidebar_header">
                            <h4 className="ssh_heading">Close Filter</h4>
                            <button  className="w3-bar-item w3-button w3-large"><i className="fa-regular fa-circle-xmark fs-5 text-muted-2"></i></button>
                        </div>
                        
                        <div className="sidebar-widgets">
                            <AdminSidebar show={show} setShow={setShow}/>
                        </div>
                        
                    </div>
                </div>
                
                <div className="col-lg-9 col-md-12">
                    <div className="dashboard-wraper">
                    
                        <div className="form-submit">	
                            <h4>Bookmark Property</h4>
                        </div>
                        
                        <table className="property-table-wrap responsive-table bkmark">

                            <tbody>
                                <tr>
                                    <th><i className="fa fa-file-text"></i> Property</th>
                                    <th></th>
                                </tr>
                                {bookMarkProperty.map((item:Bookmark,index:number)=>{
                                    return(
                                        <tr key={index}>
                                            <td className="property-container">
                                                <img src={item.image} alt=""/>
                                                <div className="title">
                                                    <h4><Link href="#">{item.name}</Link></h4>
                                                    <span>{item.loction} </span>
                                                    <span className="table-property-price">{item.value}</span>
                                                </div>
                                            </td>
                                            <td className="action">
                                                <Link href="#" className="delete"><i className="fa-solid fa-trash-can"></i> Delete</Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
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
