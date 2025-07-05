import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { featureProperty } from '@/app/data/property'

export default function DetailSidebarThree() {
  return (
        <div className="details-sidebar">
            <div className="sides-widget">
                <div className="sides-widget-header bg-primary">
                    <div className="agent-photo"><Image src='/img/user-6.jpg' width={60} height={60} alt=""/></div>
                    <div className="sides-widget-details">
                        <h4><Link href="#">Adam D. Okraar</Link></h4>
                        <span><i className="lni-phone-handset"></i>(91) 123 456 7895</span>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="sides-widget-body simple-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" placeholder="Your Email"/>
                    </div>
                    <div className="form-group">
                        <label>Phone No.</label>
                        <input type="text" className="form-control" placeholder="Your Phone"/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" defaultValue="I'm interested in this property."></textarea>
                    </div>
                    <button className="btn btn-dark rounded full-width">Send Message</button>
                </div>
            </div>
            <div className="sidebar-widgets">
                <h4>Featured Property</h4>
                <div className="sidebar_featured_property">
                    {featureProperty.map((item:any,index:number)=>{
                        return(
                            <div className="sides_list_property" key={index}>
                                <div className="sides_list_property_thumb">
                                    <Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                </div>
                                <div className="sides_list_property_detail">
                                    <h4><Link href="/single-property-1">{item.name}</Link></h4>
                                    <span><i className="fa-solid fa-location-dot mt-2"></i>{item.loction}</span>
                                    <div className="lists_property_price">
                                        <div className="lists_property_types">
                                            {item.type === "For Sale" && <div className="property_types_vlix sale">For Sale</div>}
                                            {item.type === "For Rent" && <div className="property_types_vlix">For Rent</div>}
                                            {item.type === "For Buy" && <div className="property_types_vlix buy">For Buy</div>}
                                        </div>
                                        <div className="lists_property_price_value">
                                            <h4>{item.value}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
  )
}
