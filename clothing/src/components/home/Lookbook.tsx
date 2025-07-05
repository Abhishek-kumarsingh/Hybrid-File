import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lookbookSlides, products } from '../../data/products';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Extended lookbook data with more editorial content
const editorialContent = [
  {
    id: 'editorial-1',
    title: 'The Art of Minimalism',
    subtitle: 'STYLE GUIDE',
    description: 'Embrace the power of simplicity with our curated selection of minimalist essentials that transcend seasons and trends.',
    image: 'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    products: ['p3', 'p8', 'p5']
  },
  {
    id: 'editorial-2',
    title: 'Urban Sophistication',
    subtitle: 'CITY COLLECTION',
    description: 'Navigate the concrete jungle with pieces that blend functionality and elegance for the modern urbanite.',
    image: 'https://images.pexels.com/photos/9771195/pexels-photo-9771195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    products: ['p2', 'p7', 'p5']
  }
];

const Lookbook: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  // Handle horizontal scroll
  const handleHorizontalScroll = (direction: 'left' | 'right') => {
    if (horizontalScrollRef.current) {
      const scrollAmount = 400; // Adjust as needed
      const currentScroll = horizontalScrollRef.current.scrollLeft;

      horizontalScrollRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Slider navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === lookbookSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? lookbookSlides.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Get featured products for the editorial
  const getProductsById = (ids: string[]) => {
    return products.filter(product => ids.includes(product.id));
  };

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-beige-50 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium mb-4">The Lookbook</h2>
          <p className="text-dark-600 max-w-xl mx-auto text-lg">
            Editorial inspiration for the season's most coveted pieces.
          </p>
        </motion.div>

        {/* Main Lookbook Slider */}
        <div className="relative mb-24">
          {/* Slider */}
          <div className="overflow-hidden rounded-lg shadow-elegant">
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-${activeSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-[600px] md:h-[700px]"
              >
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${lookbookSlides[activeSlide].image})` }}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-950/70 via-dark-950/40 to-transparent"></div>
                </motion.div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <motion.div
                      className="max-w-lg"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <motion.span
                        className="inline-block text-white/80 text-sm uppercase tracking-widest mb-4 font-inter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {lookbookSlides[activeSlide].id.includes('lb') ? 'Featured Collection' : 'Editorial'}
                      </motion.span>

                      <motion.h3
                        className="font-playfair text-4xl md:text-5xl text-white font-medium mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {lookbookSlides[activeSlide].title}
                      </motion.h3>

                      <motion.p
                        className="text-white/90 text-lg mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        {lookbookSlides[activeSlide].description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <Link
                          to="/"
                          className="inline-flex items-center px-8 py-3 bg-white text-dark-900 text-sm uppercase tracking-wider font-medium hover:bg-beige-100 transition-colors duration-300 group"
                        >
                          Explore Collection
                          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 hover:bg-white transition-all z-10 shadow-glass"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 hover:bg-white transition-all z-10 shadow-glass"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {lookbookSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`transition-all duration-300 ${
                  activeSlide === index
                    ? 'w-8 h-1 bg-dark-900'
                    : 'w-3 h-1 bg-dark-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Editorial Section */}
        {editorialContent.map((editorial, index) => (
          <div
            key={editorial.id}
            className={`mb-32 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
              {/* Editorial Image */}
              <motion.div
                className="relative h-[400px] md:h-[600px] overflow-hidden rounded-lg shadow-elegant"
                style={{ y: index % 2 === 0 ? y : undefined }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${editorial.image})` }}
                >
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent"></div>
                </div>

                {/* Editorial Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-white/80 text-sm uppercase tracking-widest mb-2 font-inter block">
                    {editorial.subtitle}
                  </span>
                  <h3 className="font-playfair text-3xl md:text-4xl text-white font-medium">
                    {editorial.title}
                  </h3>
                </div>
              </motion.div>

              {/* Editorial Content */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-dark-600 text-sm uppercase tracking-widest mb-4 font-inter">
                  {editorial.subtitle}
                </span>
                <h3 className="font-playfair text-3xl md:text-4xl font-medium mb-6">
                  {editorial.title}
                </h3>
                <p className="text-dark-600 text-lg mb-8 leading-relaxed">
                  {editorial.description}
                </p>
                <div className="mb-8">
                  <Link
                    to="/"
                    className="inline-flex items-center text-dark-900 font-medium hover:text-primary-800 transition-colors duration-300 group"
                  >
                    Read the full editorial
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Featured Products */}
                <div>
                  <h4 className="font-medium text-dark-900 mb-4">Featured in this story</h4>
                  <div className="flex space-x-4">
                    {getProductsById(editorial.products).map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="w-20 h-20 md:w-24 md:h-24"
                      >
                        <Link to={`/product/${product.id}`} className="block relative group">
                          <div className="w-full h-full overflow-hidden rounded-md">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/20 transition-colors duration-300 rounded-md"></div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}

        {/* Horizontal Scroll Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <motion.h3
              className="font-playfair text-2xl md:text-3xl font-medium"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Shop the Look
            </motion.h3>

            <div className="flex space-x-2">
              <motion.button
                onClick={() => handleHorizontalScroll('left')}
                className="p-2 bg-white text-dark-800 hover:bg-neutral-100 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={() => handleHorizontalScroll('right')}
                className="p-2 bg-white text-dark-800 hover:bg-neutral-100 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>

          {/* Horizontal Scrollable Content */}
          <div
            ref={horizontalScrollRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {products.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                className="flex-shrink-0 w-[280px] md:w-[320px]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/product/${product.id}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="font-medium text-dark-900 mb-1 group-hover:text-primary-800 transition-colors duration-300">
                    {product.name}
                  </h4>
                  <p className="text-dark-600 text-sm">${product.price.toFixed(2)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View Full Lookbook Button */}
        <div className="text-center mt-16">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 bg-dark-900 text-white text-sm uppercase tracking-wider font-medium hover:bg-dark-800 transition-colors duration-300"
          >
            View Full Lookbook
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar but allowing scroll */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
      `}</style>
    </section>
  );
};

export default Lookbook;