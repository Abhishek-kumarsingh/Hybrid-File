'use client'
import React from 'react'
import Link from 'next/link';

import Slider from "react-slick";

import { explorePlace } from '../data/data'
import Image from 'next/image';

interface Location{
    image: string;
    loction: string;
    property: string;
}

var settings = {
    dots: false,
    slidesToShow: 4,
    infinite: true,
    speed: 500,
    autoplay:true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

export default function TopPlaceOne() {
  return (
    <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12">
            <div className="floral-wraps">
                <div className="slide-livok top-arrow">
                    <Slider {...settings}>
                        {explorePlace.map((item:Location,index:number)=>{
                            return(
                                <div className="single-slide mt-2" key={index}>
                                    <div className="card border-0 rounded-4 h-100 position-relative">
                                        <Link href="/place-search">
                                            <div className="abx-thumb" data-overlay="3">
                                                <Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                            </div>
                                        </Link>
                                        <div className="position-absolute top-0 left-0 mt-3 ms-3 z-1">
                                            <div className="d-inline-flex align-items-center justify-content-start">
                                                <div className="flex-shrink-0">
                                                    <div className="square--50 circle"><Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid h-100 object-fit circle" alt=""/></div>
                                                </div>
                                                <div className="explo-caption ps-3">
                                                    <div className="label d-inline-flex bg-primary text-light mb-1">{item.loction}</div>
                                                    <div className="text-light fw-medium">{item.property}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    </div>
  )
}
