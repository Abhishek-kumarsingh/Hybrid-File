import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import VehicleViewerPlaceholder from '../3d/VehicleViewerPlaceholder';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  subtitle, 
  ctaText = "Experience Now"
}) => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity based on scroll position for parallax effect
      const scrollValue = window.scrollY;
      const newOpacity = 1 - scrollValue / 700; // Adjust divisor for fade speed
      setScrollOpacity(Math.max(newOpacity, 0));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden" id="hero">
      {/* Background with gradient and grid */}
      <div className="absolute inset-0 grid-bg">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-secondary-900/60 via-transparent to-secondary-900"
          style={{ opacity: scrollOpacity }}
        ></div>
      </div>
      
      {/* 3D Vehicle Viewer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <VehicleViewerPlaceholder />
      </div>
      
      {/* Content */}
      <div 
        className="relative min-h-screen flex flex-col justify-center items-center text-center container mx-auto container-padding"
        style={{ opacity: scrollOpacity }}
      >
        <div 
          className="mt-16 md:mt-0 mb-6 md:mb-8" 
          data-aos="fade-down" 
          data-aos-duration="1000"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-none">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="space-x-4 my-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <Button variant="accent" size="lg">
            {ctaText}
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <a 
        href="#models" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce transition-opacity duration-300"
        style={{ opacity: scrollOpacity * 0.8 }}
      >
        <ChevronDown size={32} className="mx-auto" />
        <span className="sr-only">Scroll down</span>
      </a>
    </section>
  );
};

export default HeroSection;