import React from 'react';
import Button from '../ui/Button';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 opacity-95"></div>
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 119, 255, 0.1) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(0, 119, 255, 0.1) 1px, transparent 1px)`
        }}
      ></div>
      
      {/* Accent glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-primary-500/20 filter blur-[100px]"></div>
      
      {/* Content */}
      <div className="container mx-auto container-padding relative z-10">
        <div className="glass-card p-8 md:p-12 border border-primary-800/30 max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Ready to Experience the Future?
          </h2>
          <p 
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Schedule a personalized test drive or visit our showroom to explore our vehicles and discover the perfect model for you.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <Button variant="accent" size="lg">Book a Test Drive</Button>
            <Button variant="outline" size="lg">Visit Showroom</Button>
          </div>
          
          <div 
            className="mt-8 pt-8 border-t border-secondary-700"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="300"
          >
            <p className="text-gray-300 text-sm">
              Join the thousands of satisfied customers who have chosen XDRV for their premium vehicle needs.
              Our dedicated team is committed to providing exceptional service and support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;