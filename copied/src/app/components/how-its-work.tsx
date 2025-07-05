import React from 'react'
import { workData } from '../data/data'
import Image from 'next/image';

interface WorkData{
    image: string;
    title: string;
    desc: string;
    bg: string;
}

export default function HowItsWork() {
  return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                    <div className="sec-heading center">
                        <h2>How It Works?</h2>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
                    </div>
                </div>
            </div>
            
            <div className="row justify-content-center g-4">
                {workData.map((item:WorkData,index:number)=>{
                    return(
                        <div className="col-lg-4 col-md-4" key={index}>
                            <div className={`middle-icon-features-item ${index === 2 ? 'remove' : ''}`}>
                                <div className="icon-features-wrap">
                                    <div className={`middle-icon-large-features-box ${item.bg}`}>
                                        <Image src={item.image} width={45} height={45} alt="" />
                                    </div>
                                </div>
                                <div className="middle-icon-features-content">
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
  )
}
