import React from 'react'
import Link from 'next/link'

export default function CtaOne() {
  return (
        <section className="image-cover" style={{backgroundImage:`url('/img/banner-2.jpg')`, backgroundRepeat:'no-repeat'}} data-overlay="4">
            <div className="ht-80"></div>
            <div className="container position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-8">
                        <div className="caption-wrap-content text-center">
                            <h2 className="fs-1">Search Perfect Place in your City</h2>
                            <p className="mb-5">We post regulary most powerful articles for help and support.</p>
                            <Link href="#" className="btn btn-whites fw-medium rounded">Explore More Property</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ht-80"></div>
        </section>
        
  )
}
