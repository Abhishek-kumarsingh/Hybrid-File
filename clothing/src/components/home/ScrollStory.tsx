import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ScrollStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Story sections with animations
  const storySections = [
    {
      title: "The Vision",
      description: "Our journey began with a simple vision: to create clothing that combines exceptional craftsmanship with sustainable practices.",
      startProgress: 0,
      endProgress: 0.3
    },
    {
      title: "The Craft",
      description: "Every piece is meticulously crafted by skilled artisans who bring decades of experience to their work.",
      startProgress: 0.3,
      endProgress: 0.6
    },
    {
      title: "The Future",
      description: "We're committed to pushing the boundaries of sustainable fashion, proving that luxury and responsibility can coexist beautifully.",
      startProgress: 0.6,
      endProgress: 0.9
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-dark-950"
    >
      {/* Fixed content container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
              backgroundAttachment: 'fixed'
            }}
          >
          </div>
          <div className="absolute inset-0 bg-dark-950/60"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white font-medium mb-8"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
                y: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50])
              }}
            >
              Our Story
            </motion.h2>

            {/* Story Sections */}
            <motion.div
              className="max-w-3xl mx-auto bg-dark-950/30 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-elegant"
              style={{
                opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]),
                y: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [50, 0, 0, -50])
              }}
            >
              {storySections.map((section, index) => (
                <motion.div
                  key={index}
                  className="mb-12 last:mb-0"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [section.startProgress, section.startProgress + 0.05, section.endProgress - 0.05, section.endProgress],
                      [0, 1, 1, 0]
                    ),
                    y: useTransform(
                      scrollYProgress,
                      [section.startProgress, section.startProgress + 0.05, section.endProgress - 0.05, section.endProgress],
                      [30, 0, 0, -30]
                    )
                  }}
                >
                  <h3 className="text-3xl md:text-4xl text-white font-playfair mb-4">{section.title}</h3>
                  <p className="text-white/90 text-lg md:text-xl mb-6 leading-relaxed">{section.description}</p>
                  {index < storySections.length - 1 && <div className="h-px w-16 bg-white/30 mx-auto"></div>}
                </motion.div>
              ))}
            </motion.div>

            {/* Final CTA */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.8, 0.9], [0, 1]),
                scale: useTransform(scrollYProgress, [0.8, 0.9], [0.9, 1])
              }}
              className="mt-8"
            >
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 bg-white text-dark-900 text-sm uppercase tracking-wider font-medium hover:bg-neutral-100 transition-colors duration-300 group shadow-elegant"
              >
                Discover Our Story
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-1/3 max-w-xs h-1 bg-white/20 rounded-full overflow-hidden"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        >
          <div className="h-full w-full bg-white"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollStory;
