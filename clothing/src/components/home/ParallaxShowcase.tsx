import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ParallaxShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.7, 1], [0, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1]);
  const scale2 = useTransform(scrollYProgress, [0.3, 0.8], [0.8, 1.1]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5]);

  // Product showcase data
  const showcaseItems = [
    {
      title: "Artisanal Craftsmanship",
      description: "Each piece is meticulously crafted by skilled artisans using traditional techniques passed down through generations.",
      image: "https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      position: "left",
      y: y1,
      opacity: opacity1,
      scale: scale1,
      rotate: rotate1
    },
    {
      title: "Sustainable Materials",
      description: "We source only the finest sustainable materials, ensuring both luxury and environmental responsibility in every garment.",
      image: "https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      position: "right",
      y: y2,
      opacity: opacity2,
      scale: scale2,
      rotate: rotate2
    },
    {
      title: "Timeless Design",
      description: "Our designs transcend trends, creating pieces that become cherished staples in your wardrobe for years to come.",
      image: "https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      position: "left",
      y: y3,
      opacity: opacity3,
      scale: scale1,
      rotate: rotate1
    }
  ];

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-beige-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-100 opacity-30 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-softPink-100 opacity-20 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-6">Our Philosophy</h2>
          <p className="text-dark-600 max-w-2xl mx-auto text-lg">
            Discover the elements that define our brand and make each ELYSIAN piece a work of art.
          </p>
        </motion.div>

        {/* Showcase Items */}
        <div className="space-y-40 md:space-y-64">
          {showcaseItems.map((item, index) => (
            <div 
              key={index}
              className={`flex flex-col ${item.position === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
            >
              {/* Image */}
              <motion.div 
                className="w-full md:w-1/2 h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-elegant"
                style={{ 
                  y: item.y,
                  opacity: item.opacity,
                  scale: item.scale,
                  rotate: item.rotate
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div 
                className="w-full md:w-1/2"
                style={{ opacity: item.opacity }}
              >
                <span className="inline-block text-dark-600 text-sm uppercase tracking-widest mb-4 font-inter">
                  0{index + 1}
                </span>
                <h3 className="font-playfair text-3xl md:text-4xl font-medium mb-6">
                  {item.title}
                </h3>
                <p className="text-dark-600 text-lg mb-8 leading-relaxed">
                  {item.description}
                </p>
                <div className="h-px w-16 bg-dark-300 mb-8"></div>
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-dark-900 font-medium hover:text-primary-800 transition-colors duration-300 group"
                >
                  Learn more
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link
            to="/collections"
            className="inline-flex items-center px-10 py-4 bg-dark-900 text-white text-sm uppercase tracking-wider font-medium hover:bg-dark-800 transition-colors duration-300 shadow-elegant"
          >
            Explore Our Collections
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxShowcase;
