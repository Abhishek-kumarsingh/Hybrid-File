import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '../components/navbar/navbar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'

export default function Page() {
  return (
    <>
        <Navbar transparent={false}/>   

        <section className="error-wrap">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-10">
                        <div className="text-center">
                            <Image src="/img/404.png" width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                            <p>Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper</p>
                            <Link className="btn btn-primary px-5" href="/">Back To Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <FooterTop bg="theme-bg"/>
        <Footer/>
    </>
  )
}
