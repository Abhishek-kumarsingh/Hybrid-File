import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedCollections from '../components/home/FeaturedCollections';
import Lookbook from '../components/home/Lookbook';
import ProductSlider from '../components/home/ProductSlider';
import Newsletter from '../components/home/Newsletter';
import Testimonials from '../components/home/Testimonials';
import InstagramFeed from '../components/home/InstagramFeed';
import ParallaxShowcase from '../components/home/ParallaxShowcase';
import ScrollStory from '../components/home/ScrollStory';
import AOS from 'aos';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Refresh AOS when the component mounts
    AOS.refresh();
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedCollections />
      <ScrollStory />
      <ParallaxShowcase />
      <Lookbook />
      <ProductSlider />
      <Newsletter />
      <Testimonials />
      <InstagramFeed />
    </div>
  );
};

export default HomePage;