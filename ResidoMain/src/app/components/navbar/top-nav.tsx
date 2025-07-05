import Link from 'next/link'
import React from 'react'

export default function TopNav() {
  return (
    <>
    <div className="top-header">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="cn-info">
                        <ul>
                            <li><i className="lni-phone-handset"></i>91 256 584 5748</li>
                            <li><i className="ti-email"></i>support@Rikada.com</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <ul className="top-social">
                        <li><Link href="#"><i className="lni-facebook"></i></Link></li>
                        <li><Link href="#"><i className="lni-linkedin"></i></Link></li>
                        <li><Link href="#"><i className="lni-instagram"></i></Link></li>
                        <li><Link href="#"><i className="lni-twitter"></i></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>   
    </>
  )
}
