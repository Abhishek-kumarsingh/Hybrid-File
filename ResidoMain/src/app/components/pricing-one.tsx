import React from 'react'
import Link from 'next/link'

import { pricingData } from '../data/data'

export default function PricingOne() {
  return (
    <div className="row align-items-center justify-content-center g-lg-4 g-md-3 g-4">
        {pricingData.map((item,index)=>{
            return(
                <div className="col-xl-4 col-lg-4 col-md-4" key={index}>
                    <div className="pricing-wrap py-3 px-3">
                        <div className={`pricing-header ${item.bg}`}>
                            <h4 className="pr-value text-light"><sup className="text-light opacity-75">$</sup>{item.value}</h4>
                            <h4 className={`pr-title ${item.titleText}`}>{item.title}</h4>
                        </div>
                        <div className="pricing-body px-2">
                            <ul className="p-0">
                                {item.feature.map((el,index)=>{
                                    return(
                                        <li key={index}><span className="text-success me-2"><i className="fa-solid fa-circle-check"></i></span>{el}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="pricing-bottom mt-5 mb-1 px-2">
                            <Link href="#" className={item.btn}>Choose Plan</Link>
                        </div>
                    </div>
                </div>
            )
        })}  
    </div>
  )
}
