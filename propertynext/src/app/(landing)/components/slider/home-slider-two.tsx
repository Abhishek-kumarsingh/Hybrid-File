'use client'
import React from 'react'
import Link from 'next/link'
import Slider from "react-slick";

var settings = {
    dots: false,
    slidesToShow: 2,
    infinite: true,
    autoplay:true,
    autoplaySpeed: 2000,
    speed: 3000,
    slidesToScroll: 1,
    centerMode: true,
  };

export default function HomeSliderTwo() {
  return (
    <div className="featured_slick_gallery gray">
        <div className="featured_slick_gallery-slide home-slider">
            <Slider {...settings}>
                <div className="featured_slick_padd"><a href="assets/img/p-1.jpg" className="mfp-gallery"><img src='/img/p-1.jpg' className="img-fluid mx-auto" alt="" /></a></div>
                <div className="featured_slick_padd"><a href="assets/img/p-2.jpg" className="mfp-gallery"><img src='/img/p-2.jpg' className="img-fluid mx-auto" alt="" /></a></div>
                <div className="featured_slick_padd"><a href="assets/img/p-3.jpg" className="mfp-gallery"><img src='/img/p-3.jpg' className="img-fluid mx-auto" alt="" /></a></div>
                <div className="featured_slick_padd"><a href="assets/img/p-4.jpg" className="mfp-gallery"><img src='/img/p-4.jpg' className="img-fluid mx-auto" alt="" /></a></div>
            </Slider>
        </div>
        <Link href="#" className="btn-view-pic">View photos</Link>
    </div>
  )
}
