import React from 'react'
import Link from 'next/link';

import { propertyData } from '../data/data'
import Image from 'next/image';

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

export default function SellPropertyOne({border}:{border:any}) {
  return (
    <div className="row list-layout">
        {propertyData.slice(0,4).map((item:Property,index:number)=>{
            return(
                <div className="col-xl-6 col-lg-6 col-md-12" key={index}>
                    <div className={`property-listing property-1 bg-white p-2 rounded ${border ? 'border' : 'border-0'}`}>
                        <div className="listing-img-wrapper">
                            <Link href={`/single-property-2/${item.id}`}>
                                {item.image.slice(0,1).map((el,index)=>{
                                    return(
                                        <Image src={el} width={0} height={0} sizes='100vw' style={{width:'100%', height:'210px'}} className="img-fluid mx-auto rounded" alt=""  key={index}/>
                                    )
                                })}
                            </Link>
                        </div>
                        <div className="listing-content">
                            <div className="listing-detail-wrapper-box">
                                <div className="listing-detail-wrapper d-flex align-items-center justify-content-between">
                                    <div className="listing-short-detail">
                                        <span className="label bg-light-danger text-danger d-inline-flex mb-1">For Sale</span>
                                        <h4 className="listing-name mb-1 mt-2"><Link href={`/single-property-2/${item.id}`}>{item.name}</Link></h4>
                                        <div className="fr-can-rating">
                                            <i className="fas fa-star fs-xs filled" style={{margin:'0 2px'}}></i>
                                            <i className="fas fa-star fs-xs filled" style={{margin:'0 2px'}}></i>
                                            <i className="fas fa-star fs-xs filled" style={{margin:'0 2px'}}></i>
                                            <i className="fas fa-star fs-xs filled" style={{margin:'0 2px'}}></i>
                                            <i className="fas fa-star fs-xs" style={{margin:'0 2px'}}></i>
                                            <span className="reviews_text fs-sm text-muted ms-2">(42 Reviews)</span>
                                        </div>
                                    </div>
                                    <div className="list-price">
                                        <h6 className="listing-card-info-price text-primary">{item.value}</h6>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="price-features-wrapper">
                                <div className="list-fx-features d-flex align-items-center justify-content-between mt-3 mb-1">
                                    <div className="listing-card d-flex align-items-center">
                                        <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i className="fa-solid fa-building-shield fs-xs"></i></div><span className="text-muted-2 fs-sm">{item.size}</span>
                                    </div>
                                    <div className="listing-card d-flex align-items-center">
                                        <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i className="fa-solid fa-bed fs-xs"></i></div><span className="text-muted-2 fs-sm">{item.beds}</span>
                                    </div>
                                    <div className="listing-card d-flex align-items-center">
                                        <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1"><i className="fa-solid fa-clone fs-xs"></i></div><span className="text-muted-2 fs-sm">{item.sqft}</span>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="listing-footer-wrapper">
                                <div className="listing-locate">
                                    <span className="listing-location text-muted-2"><i className="fa-solid fa-location-pin me-1"></i>{item.loction}</span>
                                </div>
                                <div className="listing-detail-btn">
                                    <Link href={`/single-property-2/${item.id}`} className="btn btn-sm px-4 fw-medium btn-primary">View</Link>
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
