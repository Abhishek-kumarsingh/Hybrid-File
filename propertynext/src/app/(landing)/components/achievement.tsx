'use client'
import React from 'react'
import { achievementData } from '../data/data'

import CountUp from 'react-countup';

export default function Achievement() {
  return (
    <div className="row align-items-center justify-content-center g-4">
      {achievementData.map((item,index)=>{
        return(
            <div className="col-lg-3 col-md-3 col-sm-6 col-6" key={index}>
                <div className="achievement-wrap">
                    <div className="achievement-content">
                        <h2 className="fs-1"><CountUp className="ctr" end={item.value}/>{item.symbol}</h2>
                        <p className='text-primary'>{item.title}</p>
                    </div>
                </div>
            </div>
        )
      })}
    </div>
  )
}
