import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Lookbook collections data
const lookbookCollections = [
  {
    id: 'summer-2023',
    title: 'Summer Breeze',
    subtitle: 'Summer 2023',
    description: 'Effortless silhouettes in breathable fabrics, designed for warm days and balmy nights.',
    coverImage: 'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9771195/pexels-photo-9771195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  {
    id: 'autumn-2023',
    title: 'Autumn Whispers',
    subtitle: 'Fall 2023',
    description: 'Rich textures and warm tones inspired by the changing leaves and crisp autumn air.',
    coverImage: 'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5704847/pexels-photo-5704847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  {
    id: 'winter-2023',
    title: 'Winter Elegance',
    subtitle: 'Winter 2023',
    description: 'Sophisticated layers and sumptuous fabrics for the coldest months of the year.',
    coverImage: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5704847/pexels-photo-5704847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9771195/pexels-photo-9771195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  {
    id: 'essentials',
    title: 'Timeless Essentials',
    subtitle: 'Core Collection',
    description: 'Our signature pieces that form the foundation of every wardrobe, transcending seasons and trends.',
    coverImage: 'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9771195/pexels-photo-9771195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  }
];

// Editorial features data
const editorialFeatures = [
  {
    id: 'urban-nomad',
    title: 'Urban Nomad',
    description: 'Versatile pieces for the modern explorer, designed to transition seamlessly from city streets to weekend getaways.',
    image: 'https://images.pexels.com/photos/9771195/pexels-photo-9771195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'artisanal-heritage',
    title: 'Artisanal Heritage',
    description: 'A celebration of traditional craftsmanship and techniques that have been passed down through generations.',
    image: 'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'minimalist-luxe',
    title: 'Minimalist Luxe',
    description: 'Clean lines and understated elegance that embody the philosophy that less is more.',
    image: 'https://images.pexels.com/photos/5704847/pexels-photo-5704847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const LookbookPage: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Get selected collection data
  const selectedCollectionData = selectedCollection
    ? lookbookCollections.find(collection => collection.id === selectedCollection)
    : null;

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

  // Handle gallery navigation
  const nextImage = () => {
    if (selectedCollectionData) {
      setCurrentImageIndex((prev) =>
        prev === selectedCollectionData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedCollectionData) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedCollectionData.images.length - 1 : prev - 1
      );
    }
  };

  // Close gallery
  const closeGallery = () => {
    setSelectedCollection(null);
    setCurrentImageIndex(0);
  };

  return (
    <div ref={containerRef} className="pt-20 relative">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/70 to-dark-950/30"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.span
                className="inline-block text-white/80 text-sm uppercase tracking-widest mb-4 font-inter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Editorial
              </motion.span>

              <motion.h1
                className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The Lookbook
              </motion.h1>

              <motion.p
                className="text-white/90 text-lg mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Explore our seasonal collections and editorial features, showcasing the essence of ELYSIAN's design philosophy.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Seasonal Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-playfair text-3xl md:text-4xl font-medium mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Seasonal Collections
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {lookbookCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedCollection(collection.id);
                  setCurrentImageIndex(0);
                }}
              >
                <div className="relative h-[500px] overflow-hidden rounded-lg shadow-elegant">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${collection.coverImage})` }}
                  >
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-dark-950/30 to-transparent"></div>
                  </div>

                  {/* Collection Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-white/80 text-sm uppercase tracking-widest mb-2 font-inter block">
                      {collection.subtitle}
                    </span>
                    <h3 className="font-playfair text-3xl text-white font-medium mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-white/90 mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="inline-flex items-center text-white text-sm font-medium group-hover:underline">
                      View Collection
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Features */}
      <section className="py-20 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.h2
              className="font-playfair text-3xl md:text-4xl font-medium mb-6 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Editorial Features
            </motion.h2>

            <div className="flex space-x-2">
              <motion.button
                onClick={() => handleHorizontalScroll('left')}
                className="p-2 bg-white text-dark-800 hover:bg-neutral-100 transition-colors duration-300 shadow-elegant"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll left"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={() => handleHorizontalScroll('right')}
                className="p-2 bg-white text-dark-800 hover:bg-neutral-100 transition-colors duration-300 shadow-elegant"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll right"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
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
            {editorialFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="flex-shrink-0 w-[300px] md:w-[400px]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/lookbook/${feature.id}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-elegant mb-4">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="font-playfair text-xl font-medium mb-2 group-hover:text-primary-800 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-dark-600 text-sm line-clamp-2">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[600px] overflow-hidden rounded-lg shadow-elegant"
              style={{ y: y1 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/5704847/pexels-photo-5704847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Behind the scenes"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-dark-600 text-sm uppercase tracking-widest mb-4 font-inter block">Behind the Scenes</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-6">The Making of Our Lookbook</h2>
              <p className="text-dark-600 text-lg mb-6 leading-relaxed">
                Step behind the camera and discover the creative process that brings our collections to life. From location scouting to the final edit, every detail is carefully considered to showcase our designs in their best light.
              </p>
              <p className="text-dark-600 text-lg mb-8 leading-relaxed">
                Our team of photographers, stylists, and creative directors work together to create visual stories that capture the essence of each collection, inspired by art, architecture, nature, and the diverse world around us.
              </p>
              <Link
                to="/blog/behind-the-scenes"
                className="btn btn-primary group"
              >
                Read the Full Story
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collection Gallery Modal */}
      <AnimatePresence>
        {selectedCollection && selectedCollectionData && (
          <motion.div
            className="fixed inset-0 bg-dark-950/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Gallery Header */}
              <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-dark-950/80 to-transparent">
                <div>
                  <span className="text-white/80 text-sm uppercase tracking-widest font-inter block">
                    {selectedCollectionData.subtitle}
                  </span>
                  <h3 className="text-white text-2xl font-medium">
                    {selectedCollectionData.title}
                  </h3>
                </div>
                <button
                  onClick={closeGallery}
                  className="text-white hover:text-white/80 transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Gallery Images */}
              <div className="h-[90vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${currentImageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <img
                      src={selectedCollectionData.images[currentImageIndex]}
                      alt={`${selectedCollectionData.title} - image ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Gallery Navigation */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-t from-dark-950/80 to-transparent">
                <button
                  onClick={prevImage}
                  className="text-white hover:text-white/80 transition-colors p-2"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="text-white text-sm">
                  {currentImageIndex + 1} / {selectedCollectionData.images.length}
                </div>
                <button
                  onClick={nextImage}
                  className="text-white hover:text-white/80 transition-colors p-2"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
};

export default LookbookPage;
