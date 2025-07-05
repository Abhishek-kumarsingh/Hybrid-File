import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { teamData } from '../data/data'

export default function TeamOne() {
  return (
        <div className="row justify-content-center g-4">
            {teamData.map((item,index)=>{
                return(
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                        <div className="agents-grid card rounded-3 shadow">
                            <div className="agents-grid-wrap">
                                <div className="fr-grid-thumb mx-auto text-center mt-5 mb-3">
                                    <Link href="/agent-page" className="d-inline-flex p-1 circle border">
                                        <Image src={item.image} className="img-fluid circle" width={130} height={130} alt="" />
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
                                                <i className="fas fa-star fs-xs text-warning" style={{margin:"0px 2px"}}></i>
                                                <i className="fas fa-star fs-xs text-warning" style={{margin:"0px 2px"}}></i>
                                                <i className="fas fa-star fs-xs text-warning" style={{margin:"0px 2px"}}></i>
                                                <i className="fas fa-star fs-xs text-warning" style={{margin:"0px 2px"}}></i>
                                                <i className="fas fa-star fs-xs text-muted" style={{margin:"0px 2px"}}></i>
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
  )
}
