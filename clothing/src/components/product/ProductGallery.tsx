import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, isFullscreen]);

  const handlePrev = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!isFullscreen) {
      setIsZoomed(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <motion.div
      ref={galleryRef}
      className={`transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 ${
        isFullscreen ? 'h-full p-4' : ''
      }`}>
        {/* Thumbnails */}
        <div className={`hidden lg:flex lg:col-span-2 flex-col space-y-4 ${
          isFullscreen ? 'h-full overflow-y-auto' : ''
        }`}>
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative border overflow-hidden transition-all duration-300 ${
                activeImage === index
                  ? 'border-dark-900 shadow-elegant'
                  : 'border-transparent hover:border-neutral-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={image}
                alt={`${name} - thumbnail ${index + 1}`}
                className="w-full h-24 object-cover"
              />
              {activeImage === index && (
                <motion.div
                  className="absolute inset-0 bg-dark-900 bg-opacity-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Main Image */}
        <div
          className={`lg:col-span-10 relative overflow-hidden group ${
            isFullscreen ? 'h-full flex items-center justify-center' : ''
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${activeImage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={toggleZoom}
              onMouseMove={handleMouseMove}
              style={{
                height: isFullscreen ? '100%' : '600px',
              }}
            >
              <motion.img
                ref={imageRef}
                src={images[activeImage]}
                alt={`${name} - main image`}
                className="w-full h-full object-contain"
                initial={{ scale: 1 }}
                animate={{
                  scale: isZoomed ? 2 : 1,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      }
                    : undefined
                }
              />

              {/* Zoom Indicator */}
              <AnimatePresence>
                {!isZoomed && isHovering && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-glass"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ZoomIn className="w-6 h-6 text-dark-900" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-glass z-10"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovering || isFullscreen ? 1 : 0,
              x: isHovering || isFullscreen ? 0 : -10
            }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-glass z-10"
            initial={{ opacity: 0, x: 10 }}
            animate={{
              opacity: isHovering || isFullscreen ? 1 : 0,
              x: isHovering || isFullscreen ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Fullscreen Toggle */}
          <motion.button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-glass z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isHovering || isFullscreen ? 1 : 0,
              y: isHovering || isFullscreen ? 0 : -10
            }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <X className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </motion.button>

          {/* Image Counter */}
          <motion.div
            className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-glass"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovering || isFullscreen ? 1 : 0,
              y: isHovering || isFullscreen ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
          >
            {activeImage + 1} / {images.length}
          </motion.div>
        </div>

        {/* Mobile Thumbnails */}
        <div className="flex lg:hidden space-x-3 justify-center mt-4">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`transition-all duration-300 ${
                activeImage === index
                  ? 'w-8 h-1 bg-dark-900'
                  : 'w-3 h-1 bg-dark-400'
              }`}
              whileTap={{ scale: 0.9 }}
              aria-label={`View image ${index + 1}`}
            ></motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen Close Button (Mobile) */}
      {isFullscreen && (
        <motion.button
          onClick={toggleFullscreen}
          className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-glass lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Exit fullscreen"
        >
          <X className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default ProductGallery;