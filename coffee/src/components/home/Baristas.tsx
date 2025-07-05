import React, { useEffect } from 'react';
import AOS from 'aos';
import { Star } from 'lucide-react';
import { baristas } from '../../data/baristasData';

const Baristas: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section id="baristas" className="section">
      <div className="container-custom">
        <div className="section-title">
          <h2 data-aos="fade-up">Meet Our Team</h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-text/80 max-w-3xl mx-auto mt-4">
            The talented people behind your perfect cup
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {baristas.map((barista, index) => (
            <div 
              key={barista.id}
              className="text-center group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-md">
                <img 
                  src={barista.image} 
                  alt={barista.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Bio Overlay */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm overflow-auto max-h-full">{barista.bio}</p>
                </div>
              </div>
              
              <h3 className="text-xl mb-1">{barista.name}</h3>
              <p className="text-primary-light font-medium mb-2">{barista.role}</p>
              
              {/* Stars */}
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={16}
                    className={i < Math.floor(barista.rating) ? "text-primary-light fill-primary-light" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-sm text-text/70">{barista.rating.toFixed(1)}</span>
              </div>
              
              <p className="text-sm inline-block bg-secondary text-primary-dark px-3 py-1 rounded-full">
                {barista.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Baristas;