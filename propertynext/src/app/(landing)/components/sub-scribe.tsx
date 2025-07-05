import Image from 'next/image'
import React from 'react'

const partners = [
    { name: 'PropertyTech', icon: 'solar:buildings-bold-duotone' },
    { name: 'RealEstate Pro', icon: 'solar:home-bold-duotone' },
    { name: 'FinanceHub', icon: 'solar:dollar-bold-duotone' },
    { name: 'SecurePayments', icon: 'solar:shield-check-bold-duotone' },
    { name: 'TechSolutions', icon: 'solar:programming-bold-duotone' },
    { name: 'GlobalRealty', icon: 'solar:global-bold-duotone' },
    { name: 'SmartHomes', icon: 'solar:smart-home-bold-duotone' },
    { name: 'InvestmentGroup', icon: 'solar:chart-bold-duotone' },
    { name: 'PropertyManage', icon: 'solar:key-bold-duotone' },
    { name: 'UrbanDevelopers', icon: 'solar:city-bold-duotone' }
]

export default function SubScribe() {
  return (
    <section className="bg-light">
        <div className="container">
            <div className="row align-items-center justify-content-center gx-5 gy-5">
                {partners.map((item:any,index:number)=>{
                    return(
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={index}>
                            <div className="explor-thumb text-center p-3">
                                <div className="d-flex flex-column align-items-center">
                                    <i className={`${item.icon} fs-1 text-primary mb-2`}></i>
                                    <h6 className="mb-0 text-dark">{item.name}</h6>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="row align-items-center justify-content-center">
                <div className="col-xl-7 col-lg-11">
                    <div className="call-to-act-wrap text-center">
                        <div className="call-to-act-head mb-2">
                            <h2 className="fs-1 mb-3 lh-sm">Subscribe &<br/>get special discount</h2>
                            <span>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi.</span>
                        </div>
                    </div>
                    <div className="call-to-act-form">
                        <form className="newsletter-boxes p-2">
                            <div className="row m-0 g-0">
                                <div className="col-xl-10 col-9">
                                    <input type="text" className="form-control border-0" placeholder="Subscribe Your Email..."/>
                                </div>
                                <div className="col-xl-2 col-3">
                                    <button type="submit" className="btn btn-primary rounded-pill full-width">Subscribe</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
