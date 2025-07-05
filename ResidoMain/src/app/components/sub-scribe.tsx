import Image from 'next/image'
import React from 'react'

const images = ['/img/partners/booking.png','/img/partners/columbia.png','/img/partners/Payoneer.png','/img/partners/Paypal.png','/img/partners/razorpay.png','/img/partners/microsoft.png','/img/partners/microsoft.png','/img/partners/trivago.png','/img/partners/visa.png','/img/partners/columbia.png']

export default function SubScribe() {
  return (
    <section className="bg-light">
        <div className="container">
            <div className="row align-items-center justify-content-center gx-5 gy-5">
                {images.map((item:any,index:number)=>{
                    return(
                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={index}>
                            <div className="explor-thumb">
                                <Image src={item} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
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
