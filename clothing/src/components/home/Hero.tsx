import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

// Preload images
const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const Hero: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax effect values with enhanced range
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.2]);
  const textY = useTransform(scrollY, [0, 400], [0, -80]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Track scroll position for animations
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  // Staggered text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: "easeOut" }
    }
  };

  // Scroll to next section
  const scrollToNext = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero slider data
  const heroSlides = [
    {
      title: "Redefine Elegance",
      subtitle: "Fall/Winter 2023",
      description: "Discover our exquisite new collection, meticulously crafted with sustainable materials and timeless design.",
      image: "https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      video: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-black-and-white-outfit-39880-large.mp4"
    },
    {
      title: "Artisanal Heritage",
      subtitle: "Limited Edition",
      description: "Celebrating craftsmanship with timeless silhouettes and intricate details that honor traditional techniques.",
      image: "https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      video: null
    },
    {
      title: "Modern Minimalism",
      subtitle: "Essentials Collection",
      description: "Clean lines and monochromatic palettes for the modern urbanite, designed for versatility and longevity.",
      image: "https://images.pexels.com/photos/9771195/pexels-photo-9771195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      video: null
    }
  ];

  // Preload images and auto-advance slides
  useEffect(() => {
    // Preload all hero images
    const imagesToPreload = heroSlides.map(slide => slide.image);
    preloadImages(imagesToPreload);

    // Set images as loaded after a short delay to ensure at least the first image is loaded
    const imageLoadTimer = setTimeout(() => {
      setImagesLoaded(true);
    }, 300);

    // Auto-advance slides
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => {
      clearInterval(slideInterval);
      clearTimeout(imageLoadTimer);
    };
  }, [heroSlides.length]);

  // Choose between video or image background
  // Only use video for first slide and only after images are loaded
  const useVideoBackground = currentSlide === 0 && imagesLoaded && heroSlides[currentSlide].video;

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Media (Image or Video) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`slide-bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y, scale }}
            className="absolute inset-0"
          >
            {useVideoBackground ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={heroSlides[currentSlide].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <motion.div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 animate-kenburns"
                style={{
                  backgroundImage: `url(${heroSlides[currentSlide].image})`
                }}
              ></motion.div>
            )}

            {/* No overlay - pure images */}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative h-full flex items-center"
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={`slide-content-${currentSlide}`}
              className="max-w-xl"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              <motion.div
                className="overflow-hidden mb-2"
                variants={itemVariants}
              >
                <motion.p
                  className="text-white text-sm md:text-base uppercase tracking-[0.2em] font-inter mb-4 drop-shadow-lg"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
              </motion.div>

              <motion.div className="overflow-hidden" variants={itemVariants}>
                <motion.h1
                  className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-wide leading-tight mb-4 drop-shadow-xl"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  style={{ textShadow: "0px 4px 8px rgba(0,0,0,0.9)" }}
                >
                  {heroSlides[currentSlide].title.split(' ')[0]} <br />
                  <span className="italic">{heroSlides[currentSlide].title.split(' ').slice(1).join(' ')}</span>
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-white text-lg mb-8 leading-relaxed font-inter drop-shadow-lg"
                variants={itemVariants}
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                variants={itemVariants}
              >
                <Link
                  to="/"
                  className="inline-block bg-dark-950 text-white px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-dark-800 transition-all duration-300 hover:shadow-lg group shadow-elegant"
                >
                  <span className="flex items-center">
                    Shop Now
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
                <Link
                  to="/"
                  className="inline-block bg-white/80 backdrop-blur-sm border border-white text-dark-950 px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-white hover:text-dark-950 transition-all duration-300 shadow-elegant"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="absolute bottom-32 left-4 md:left-16 flex flex-col space-y-2">
            {heroSlides.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-1 transition-all duration-300 ${
                  currentSlide === index ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ y: 5 }}
      >
        <span className="text-white text-xs uppercase tracking-widest mb-2 opacity-80 font-inter">Discover</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-white" size={20} />
        </motion.div>
      </motion.div>

      {/* No decorative lines */}
    </section>
  );
};

export default Hero;