'use client'
import React from 'react'

import { propertyData } from '@/app/data/data';

import Slider from "react-slick";
import GridProperty from './grid-property';

interface data{
    id: number;
    image: string[];
    tag: string[];
    tag2: string;
    type: string;
    name: string;
    loction: string;
    size: string;
    beds: string;
    sqft: string;
    value: string;
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

export default function PropertySliderTwo() {
  return (
        <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12">
                <div className="floral-wraps">
                    <div className="slide-livok top-arrow">
                        <Slider {...settings}>
                            {propertyData.map((item:data,index:number)=>{
                                return(
                                    <div className="single-slide" key={index}>
                                        <div className='property-listing card border rounded-3'>
                                            <GridProperty item={item} border={false}/>
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
