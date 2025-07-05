import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { X } from 'lucide-react';
import { galleryImages } from '../../data/galleryData';
import { GalleryImage } from '../../types';

const Gallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const openModal = (image: GalleryImage) => {
    setActiveImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="section bg-secondary">
      <div className="container-custom">
        <div className="section-title">
          <h2 data-aos="fade-up">Gallery</h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-text/80 max-w-3xl mx-auto mt-4">
            Moments captured in our cozy space
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              className="gallery-item relative overflow-hidden rounded-lg cursor-pointer group"
              data-aos="fade-up"
              data-aos-delay={index % 4 * 100}
              onClick={() => openModal(image)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="gallery-overlay absolute inset-0 bg-primary/60 flex items-center justify-center text-white p-4 text-center">
                <div>
                  <p className="text-sm uppercase tracking-wider mb-2">{image.category}</p>
                  <p className="text-lg font-handwritten">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-secondary p-2 bg-primary/50 rounded-full transition-colors"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>
          
          <div className="max-w-4xl w-full">
            <img 
              src={activeImage.src}
              alt={activeImage.alt}
              className="w-full max-h-[80vh] object-contain"
            />
            <p className="text-white text-center mt-4 max-w-2xl mx-auto">{activeImage.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;