import React from 'react'
import Link from 'next/link'
import { propertyType } from '../data/data'


export default function PropertyType() {
  return (
    <div className="row justify-content-center gx-3 gy-3">
        {propertyType.map((item,index)=>{
            return(
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={index}>
                    <div className="classical-cats-wrap style_2 shadows">
                        <Link href="#" className="classical-cats-boxs bg-white rounded-4 px-3 py-4">
                            <div className="classical-cats-icon circle bg-light-info text-primary fs-2">
                                <i className={item.icon}></i>
                            </div>
                            <div className="classical-cats-wrap-content">
                                <h4>{item.name}</h4>
                                <p>{item.property}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
