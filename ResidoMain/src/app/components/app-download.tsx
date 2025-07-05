import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AppDownload() {
  return (
        <section className="bg-light">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 col-md-12 col-sm-12 content-column">
                        <div className="content_block_2">
                            <div className="content-box">
                                <div className="sec-title light">
                                    <p className="d-inline-flex align-items-center justify-content-center label bg-primary text-light">Download apps</p>
                                    <h2 className="fs-1 lh-base">Download App Free App For Android and iPhone</h2>
                                </div>
                                <div className="text">
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto accusantium.</p>
                                </div>
                                <div className="btn-box clearfix mt-5">
                                    <Link href="/" className="download-btn play-store">
                                        <i className="fab fa-google-play"></i>
                                        <span>Download on</span>
                                        <h3>Google Play</h3>
                                    </Link>
                                    <Link href="/" className="download-btn app-store">
                                        <i className="fab fa-apple"></i>
                                        <span>Download on</span>
                                        <h3>App Store</h3>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 image-column">
                        <div className="image-box">
                            <figure className="image"><Image src="/img/app.png" width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/></figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
