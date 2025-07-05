"use client"
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
    dots: true,
    slidesToShow: 4,
    infinite: true,
    autoplay:true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToScroll: 1,
    arrows: false, 
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

export default function TeamSliderTwo() {
  return (
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
            
                <div className="team-slide item-slide">
                    <Slider {...settings}>
                        {teamData.map((item:TeamData,index:number)=>{
                            return(
                                <div className="single-team" key={index}>
                                    <div className="team-grid">
                                
                                        <div className="teamgrid-user">
                                            <Image src={item.image} width={120} height={120} alt="" className="img-fluid" />
                                        </div>
                                        
                                        <div className="teamgrid-content">
                                            <h4>{item.name}</h4>
                                            <span>Agent</span>
                                        </div>
                                        
                                        <div className="teamgrid-social">
                                            <ul>
                                                <li><Link href="#" className="f-cl"><i className="fa-brands fa-facebook"></i></Link></li>
                                                <li><Link href="#" className="t-cl"><i className="fa-brands fa-twitter"></i></Link></li>
                                                <li><Link href="#" className="i-cl"><i className="fa-brands fa-instagram"></i></Link></li>
                                                <li><Link href="#" className="l-cl"><i className="fa-brands fa-linkedin"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
  )
}
