import React, { useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const steamRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Stagger steam animation
    steamRefs.current.forEach((steam, index) => {
      if (steam) {
        steam.style.animationDelay = `${index * 0.4}s`;
      }
    });
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Coffee cup decorative element */}
      <div className="absolute bottom-20 -left-10 md:left-10 opacity-60 w-40 h-40">
        <div className="w-24 h-24 rounded-full border-4 border-white/30 relative">
          {/* Steam effects */}
          <div 
            ref={el => el && steamRefs.current.push(el)} 
            className="absolute -top-8 left-2 w-3 h-8 bg-white/50 rounded-full animate-steam"
          ></div>
          <div 
            ref={el => el && steamRefs.current.push(el)} 
            className="absolute -top-6 left-8 w-3 h-6 bg-white/60 rounded-full animate-steam"
          ></div>
          <div 
            ref={el => el && steamRefs.current.push(el)} 
            className="absolute -top-10 left-14 w-4 h-10 bg-white/40 rounded-full animate-steam"
          ></div>
        </div>
        <div className="w-12 h-6 border-b-4 border-l-4 border-r-4 border-white/30 ml-12 rounded-b-xl"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center text-white">
        <h1 className="mb-4 text-white animate-fade-in">
          <span className="block font-handwritten text-3xl md:text-4xl text-secondary mb-2">Welcome to</span>
          Brewed Bliss
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto text-secondary">
          <Typewriter
            words={[
              'Artisanal Coffee Experience',
              'Handcrafted With Love',
              'Where Every Sip Tells A Story'
            ]}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a href="#menu" className="btn btn-primary">
            Explore Our Menu
          </a>
          <a href="#reservation" className="btn btn-secondary">
            Visit Us
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;