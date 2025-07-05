import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import components
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ModelsSection from './components/sections/ModelsSection';
import FeaturesSection from './components/sections/FeaturesSection';
import CustomizeSection from './components/sections/CustomizeSection';
import SpecsSection from './components/sections/SpecsSection';
import GallerySection from './components/sections/GallerySection';
import CtaSection from './components/sections/CtaSection';
import Footer from './components/layout/Footer';

// Import data
import { vehicleModels } from './data/models';

function App() {
  const activeModel = vehicleModels[0]; // For demo purposes, we're using the first model
  
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic'
    });
    
    // Update AOS on window resize
    window.addEventListener('resize', () => {
      AOS.refresh();
    });
    
    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-secondary-900 text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection 
          title="Unleash the Future of Driving"
          subtitle="Experience cutting-edge technology and extraordinary performance with our premium vehicles."
        />
        
        <ModelsSection />
        
        <FeaturesSection />
        
        <CustomizeSection />
        
        <SpecsSection />
        
        <GallerySection />
        
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;