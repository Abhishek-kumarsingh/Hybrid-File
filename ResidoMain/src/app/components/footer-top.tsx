import React from 'react'
import Link from 'next/link'

export default function FooterTop({bg}:{bg:any}) {
  return (
        <section className={`call-to-act-wrap ${bg}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="call-to-act">
                            <div className="call-to-act-head">
                                <h3>Want to Become a Real Estate Agent?</h3>
                                <span>We'll help you to grow your career and growth.</span>
                            </div>
                            <Link href="#" className="btn btn-call-to-act">SignUp Today</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
