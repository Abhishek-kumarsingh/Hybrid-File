import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Emma Stone',
    role: 'Model & Influencer',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    quote: 'LUXE has completely transformed my wardrobe and my confidence. Their pieces always make me feel like I\'m walking the runway, even in everyday life.'
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Fashion Photographer',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    quote: 'Working with LUXE has been a game-changer for my photography career. Their designs bring an unparalleled level of sophistication and edge to every shoot.'
  },
  {
    id: 3,
    name: 'Sophia Martinez',
    role: 'Celebrity Stylist',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    quote: 'When my clients need to make a statement, LUXE is my go-to brand. The quality, design, and attention to detail are unmatched in the industry.'
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = (activeIndex + 1) % testimonials.length;
    setAnimating(true);
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    setAnimating(true);
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-neon-pink/5 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4"
            data-aos="fade-up"
          >
            CLIENT <span className="text-neon-pink">TESTIMONIALS</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-gray-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Hear what fashion leaders and influencers have to say about their LUXE experience.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <Quote size={120} className="opacity-10 absolute -top-16 -left-10 text-neon-pink" />
          
          <div className="carousel-container relative h-[400px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-all duration-500 ease-in-out ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < activeIndex || (activeIndex === 0 && index === testimonials.length - 1)
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-neon-pink/30 shadow-[0_0_20px_rgba(255,0,255,0.4)]">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <p className="text-xl md:text-2xl italic mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <h4 className="text-lg font-montserrat font-bold text-neon-pink">{testimonial.name}</h4>
                      <p className="text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-10 space-x-4">
            <button 
              onClick={previous}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-neon-pink/20 hover:border-neon-pink transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index ? 'bg-neon-pink w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-neon-pink/20 hover:border-neon-pink transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;