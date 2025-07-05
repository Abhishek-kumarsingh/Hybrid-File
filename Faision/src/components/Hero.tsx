import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    'https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg',
    'https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgrounds[currentBg]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      <div className="absolute inset-0 hero-gradient"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
            data-aos="fade-up"
          >
            <span className="block">WEAR</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-neon-pink via-neon-purple to-neon-teal">
              CONFIDENCE
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-xl opacity-80 mb-10 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Elevate your style with our exclusive designer collections. 
            Where fashion meets the future.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <button className="neon-button rounded-full group flex items-center">
              SHOP NOW
              <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </button>
            <button className="border border-white/30 hover:border-white px-6 py-2 rounded-full transition-all duration-300">
              EXPLORE COLLECTIONS
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentBg === index ? 'bg-neon-pink w-8' : 'bg-white/30'
            }`}
            onClick={() => setCurrentBg(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;