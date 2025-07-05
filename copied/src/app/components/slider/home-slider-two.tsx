'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import Slider to improve initial load time
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => (
    <div className="slider-loading-placeholder" style={{ height: '400px', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
});

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
  // State to track if component is mounted (for client-side rendering)
  const [isMounted, setIsMounted] = useState(false);

  // Images with dimensions for better performance
  const images = [
    { src: '/img/p-1.jpg', alt: 'Property image 1' },
    { src: '/img/p-2.jpg', alt: 'Property image 2' },
    { src: '/img/p-3.jpg', alt: 'Property image 3' },
    { src: '/img/p-4.jpg', alt: 'Property image 4' }
  ];

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render slider on client-side to prevent hydration errors
  return (
    <div className="featured_slick_gallery gray">
        <div className="featured_slick_gallery-slide home-slider">
            {isMounted ? (
              <Slider {...settings}>
                {images.map((image, index) => (
                  <div className="featured_slick_padd" key={index}>
                    <a href={image.src} className="mfp-gallery">
                      <Image
                        src={image.src}
                        width={800}
                        height={600}
                        priority={index < 2} // Prioritize loading first two images
                        className="img-fluid mx-auto"
                        alt={image.alt}
                      />
                    </a>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="slider-loading-placeholder" style={{ height: '400px', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
        </div>
        <Link href="#" onClick={(e) => e.preventDefault()} className="btn-view-pic">View photos</Link>
    </div>
  )
}
