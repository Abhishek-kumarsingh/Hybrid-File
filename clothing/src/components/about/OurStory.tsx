import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const OurStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for text
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.7, 1, 1, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Semi-transparent overlay for better text visibility */}
          <div className="absolute inset-0 bg-dark-950/60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            style={{ y: textY, opacity }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-dark-950/30 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg"
          >
            <h2 className="font-playfair text-3xl md:text-5xl text-white font-medium mb-6">Our Story</h2>

            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl text-white font-playfair mb-4">The Vision</h3>
              <p className="text-white/90 text-lg md:text-xl mb-6 leading-relaxed">
                Our journey began with a simple vision: to create clothing that combines exceptional craftsmanship with sustainable practices.
              </p>
              <div className="h-px w-16 bg-white/30 mx-auto mb-8"></div>
            </div>

            <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
              At ELYSIAN, we believe that true luxury lies in the perfect balance of exceptional quality,
              timeless design, and responsible production. Our mission is to create clothing that not only
              looks and feels exquisite but also respects our planet and the people who make it.
            </p>

            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              We are committed to pushing the boundaries of sustainable fashion, proving that ethical
              practices and luxury can coexist beautifully. Every piece in our collection tells a story
              of craftsmanship, innovation, and conscious creation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
