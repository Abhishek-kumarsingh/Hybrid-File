'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import { propertyData } from '@/app/data/data'
import GridProperty from './grid-property';

interface Data{
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

export default function PropertyTab() {
    let [activeTab, setActiveTab] = useState<number>(1)

  return (
        <div className="block-wraps-header">
            <div className="block-header">
                <ul className="nav nav-pills">
                    <li className="nav-item" role="presentation">
                        <Link scroll={false} className={`nav-link px-4 ${activeTab === 1 ? 'active' :''}`} id="rental-tab" href="#" onClick={()=>setActiveTab(1)}>Rental</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link scroll={false} className={`nav-link px-4 ${activeTab === 2 ? 'active' :''}`} id="sale-tab" href="#" onClick={()=>setActiveTab(2)}>For Sale</Link>
                    </li>
                </ul>
            </div>
            
            <div className="block-body">
                <div className="tab-content" id="pills-tabContent">
                    <div className={`tab-pane fade ${activeTab === 1 ? 'show active' :''}`} id="rental" role="tabpanel" aria-labelledby="rental-tab">
                        <div className="row justify-content-center g-4">
                            {propertyData.slice(0,6).map((item:Data,index:number)=>{
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
                    
                    <div className={`tab-pane fade ${activeTab === 2 ? 'show active' :''}`} id="sale" role="tabpanel" aria-labelledby="sale-tab">
                        <div className="row justify-content-center g-4">
                            {propertyData.slice(3,9).map((item:Data,index:number)=>{
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
