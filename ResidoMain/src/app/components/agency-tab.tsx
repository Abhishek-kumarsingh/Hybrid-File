'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import { agentData, propertyData } from '../data/data'
import GridProperty from './property/grid-property';

interface AgentData{
    id: number;
    image: string;
    name: string;
    property: string;
    call: string;
    review: string;
}

interface Property{
    id: number;
    image: string[];
    tag: string[];
    tag2: string;
    type: string;
    name: string;
    loction: string;
    size: string;
    beds: string;
    sqft: string;
    value: string;
}

export default function AgencyTab() {
    let [activeTab, setActiveTab] = useState<number>(1)
  return (
        <div className="block-wraps-header">
            <div className="block-header">
                <ul className="nav nav-pills py-2" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <Link scroll={false} className={`nav-link px-4 ${activeTab === 1 ? 'active' : ''}`} href="#" onClick={()=>setActiveTab(1)}>Agents</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link scroll={false} className={`nav-link px-4 ${activeTab === 2 ? 'active' : ''}`} href="#" onClick={()=>setActiveTab(2)}>Property</Link>
                    </li>
                </ul>
            </div>
        
            <div className="block-body">
                <div className="tab-content" id="pills-tabContent">
                    <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="agent">
                        <div className="row justify-content-center g-4">
                            {agentData.map((item:AgentData,index:number)=>{
                                return(
                                    <div className="col-lg-6 col-md-6 col-sm-12" key={index}>
                                        <div className="agents-grid card rounded-3 border">
                                            <div className="agents-grid-wrap">
                                                <div className="fr-grid-thumb mx-auto text-center mt-5 mb-3">
                                                    <Link href={`/agent-page/${item.id}`} className="d-inline-flex p-1 circle border">
                                                        <img src={item.image} className="img-fluid circle" width="130" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="fr-grid-deatil text-center">
                                                    <div className="fr-grid-deatil-flex">
                                                        <h5 className="fr-can-name mb-0"><Link href="#">{item.name}</Link></h5>
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
                                <Link href="#" className="btn btn-primary px-lg-5 rounded">Explore More Agents</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="property">
                        <div className="row justify-content-center g-4">
                            {propertyData.slice(0,6).map((item:Property,index:number)=>{
                                return(
                                    <div className="col-lg-6 col-md-6 col-sm-12" key={index}>
                                        <GridProperty item={item} border={true}/>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                                <Link href="#" className="btn btn-primary px-md-5 rounded">Browse More Properties</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
