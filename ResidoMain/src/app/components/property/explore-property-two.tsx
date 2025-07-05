import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { explorePlace } from '@/app/data/data';

interface Place {
    image: string;
    loction: string;
    property: string;
}

export default function ExplorePropertyTwo() {
  return (
        <div className="row justify-content-center g-4">
            {explorePlace.slice(0,8).map((item:Place,index:number)=>{
                return(
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                        <div className="card border-0 rounded-4 h-100 position-relative">
                            <Link href="/place-search">
                                <div className="abx-thumb" data-overlay="3">
                                    <Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                </div>
                            </Link>
                            <div className="position-absolute top-0 left-0 mt-3 ms-3 z-1">
                                <div className="d-inline-flex align-items-center justify-content-start">
                                    <div className="flex-shrink-0">
                                        <div className="square--50 circle"><Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid h-100 object-fit circle" alt=""/></div>
                                    </div>
                                    <div className="explo-caption ps-3">
                                        <div className="label d-inline-flex bg-primary text-light mb-1">{item.loction}</div>
                                        <div className="text-light fw-medium">{item.property}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
  )
}
