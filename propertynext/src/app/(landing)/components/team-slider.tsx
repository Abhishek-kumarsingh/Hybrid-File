'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import Slider from "react-slick";

import { teamData } from '../data/data'

interface TeamData{
    image: string;
    name: string;
    property: string;
    call: string;
    review: string;
}

var settings = {
  dots: false,
  slidesToShow: 4,
  infinite: true,
  autoplay:true,
  autoplaySpeed: 2000,
  speed: 500,
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

export default function TeamSlider() {
  return (
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12">
            <div className="floral-wraps">
                <div className="slide-livok top-arrow">
                  <Slider {...settings}>
                    {teamData.map((item:TeamData,index:number)=>{
                      return(
                        <div className="single-slide mt-2" key={index}>
                            <div className="agents-grid card rounded-3 border">
                                <div className="agents-grid-wrap">
                                    <div className="fr-grid-thumb mx-auto text-center mt-5 mb-3">
                                        <Link href="/agent-page" className="d-inline-flex p-1 circle border">
                                            <Image src={item.image}  className="img-fluid circle" width={130} height={130} alt="" />
                                        </Link>
                                    </div>
                                    <div className="fr-grid-deatil text-center">
                                        <div className="fr-grid-deatil-flex">
                                            <h5 className="fr-can-name mb-0"><Link href="#">{item.name}</Link></h5>
                                            <span className="agent-property text-muted-2">{item.property}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fr-grid-info d-flex align-items-center justify-content-between px-4 py-4">
                                    <div className="fr-grid-sder">
                                        <ul className="p-0">
                                            <li><strong>Call:</strong><span className="fw-medium text-primary ms-2">{item.call}</span></li>
                                            <li>
                                                <div className="fr-can-rating">
                                                    <i className="fas fa-star fs-xs text-warning" style={{margin:'0 2px'}}></i>
                                                    <i className="fas fa-star fs-xs text-warning" style={{margin:'0 2px'}}></i>
                                                    <i className="fas fa-star fs-xs text-warning" style={{margin:'0 2px'}}></i>
                                                    <i className="fas fa-star fs-xs text-warning" style={{margin:'0 2px'}}></i>
                                                    <i className="fas fa-star fs-xs text-muted" style={{margin:'0 2px'}}></i>
                                                    <span className="reviews_text fs-sm text-muted-2">({item.review})</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="fr-grid-deatil-flex-right">
                                        <div className="agent-email"><Link href="#" className="square--50 rounded text-danger bg-light-danger"><i className="fa-solid fa-envelope-circle-check"></i></Link></div>
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
