"use client"
import React, { useState } from 'react'

export default function Faqs({faqData}:{faqData:any}) {
    let [activeTab, setActiveTab] = useState<number>(1)

  return (
    <div className="accordion border-0">
        {faqData.map((item:any,index:any)=>{
            return(
                <div className="card mb-2" key={index}>
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                        <button className={`btn btn-link ${activeTab === item.id ? '' : 'collapsed'}`} type="button" onClick={()=>setActiveTab(item.id)}>
                            {item.title}
                        </button>
                        </h2>
                    </div>

                    <div id="collapseOne" className={`collapse  ${activeTab === item.id ? 'show' : ''}`}>
                        <div className="card-body">
                            <p className="ac-para">{item.desc}</p>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
