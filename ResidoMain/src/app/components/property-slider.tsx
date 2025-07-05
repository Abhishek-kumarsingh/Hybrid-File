'use client'
import React from 'react'
import { propertyData } from '../data/data'
import GridProperty from './property/grid-property'

import Slider from "react-slick";

var settings = {
    dots: true,
    slidesToShow: 3,
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

interface Property{
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

export default function PropertySlider() {
  return (
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <div className="property-slide btm">
                        <Slider {...settings}>
                            {propertyData.map((item:Property,index:number)=>{
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
  )
}
