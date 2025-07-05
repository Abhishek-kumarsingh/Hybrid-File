import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { explorePlace } from '../data/data'

interface Place {
    image: string;
    loction: string;
    property: string;
}

export default function ExplorePropertyOne() {
  return (
    <div className="row justify-content-center row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4">
        {explorePlace.map((item:Place,index:number)=>{
            return(
                <div className="col" key={index}>
                    <div className="position-relative">
                        <Link href="/grid-layout-with-sidebar" className="d-flex align-items-center justify-content-start border rounded-pill p-2">
                            <div className="explod-thumb flex-shrink-0"><Image src={item.image} className="img-fluid circle" width={65} height={65} alt=""/></div>
                            <div className="explod-caps ps-3">
                                <h5 className="fs-5 fw-medium mb-0">{item.loction}</h5>
                                <p className="text-muted-2 fs-sm m-0">{item.property}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
