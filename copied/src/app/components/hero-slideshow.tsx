'use client';
import React, { useState, useEffect } from 'react';
import './hero-slideshow.css';

interface SlideImage {
  src: string;
  alt: string;
}

const HeroSlideshow: React.FC = () => {
  // Define the images for the slideshow
  const images: SlideImage[] = [
    { src: '/img/banner-1.jpg', alt: 'Real Estate Banner 1' },
    { src: '/img/banner-2.jpg', alt: 'Real Estate Banner 2' },
    { src: '/img/banner-7.jpg', alt: 'Real Estate Banner 3' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  // Function to handle image transition
  useEffect(() => {
    // Start with zoom effect
    setIsZooming(true);

    // Set up the interval for changing images
    const interval = setInterval(() => {
      // Start zoom out effect
      setIsZooming(false);

      // After animation completes, change the image and restart zoom
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsZooming(true);
      }, 500); // This should match the transition duration in CSS
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-slideshow">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide-item ${index === currentImageIndex ? 'active' : ''} ${index === currentImageIndex && isZooming ? 'zooming' : 'zooming-out'}`}
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        />
      ))}

      {/* Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.3))',
        zIndex: 1
      }}></div>
    </div>
  );
};

export default HeroSlideshow;
