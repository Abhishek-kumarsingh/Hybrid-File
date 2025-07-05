import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  before: string;
  after: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'look1',
    title: 'Urban Transformation',
    before: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
    after: 'https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg',
    description: 'From casual everyday to high-fashion urban look with our signature pieces.'
  },
  {
    id: 'look2',
    title: 'Evening Elegance',
    before: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
    after: 'https://images.pexels.com/photos/6766238/pexels-photo-6766238.jpeg',
    description: 'Transform a simple silhouette into a breathtaking evening statement.'
  },
  {
    id: 'look3',
    title: 'Streetwear Elevation',
    before: 'https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg',
    after: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg',
    description: 'Street basics reimagined with designer touches for an elevated everyday look.'
  },
];

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [showAfter, setShowAfter] = useState(false);

  const openLightbox = (item: GalleryItem) => {
    setCurrentItem(item);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-20 bg-dark-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4"
            data-aos="fade-up"
          >
            STYLE <span className="text-neon-teal">TRANSFORMATIONS</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-gray-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            See the before and after of our styling magic. Drag the slider to reveal the transformation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id}
              className="glass-card rounded-xl overflow-hidden cursor-pointer"
              onClick={() => openLightbox(item)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={item.before} 
                  alt={`${item.title} - Before`} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-montserrat font-bold">{item.title}</h3>
                    <p className="text-gray-300 text-sm mt-2">Click to see transformation</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && currentItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white hover:text-neon-pink"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <div className="max-w-4xl w-full">
            <div className="relative overflow-hidden rounded-xl">
              <div className="relative h-[70vh]">
                <img 
                  src={showAfter ? currentItem.after : currentItem.before} 
                  alt={`${currentItem.title} - ${showAfter ? 'After' : 'Before'}`} 
                  className="w-full h-full object-cover object-center transition-opacity duration-500"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-900/90 to-transparent">
                  <h3 className="text-2xl font-montserrat font-bold">{currentItem.title}</h3>
                  <p className="text-gray-300 mt-2">{currentItem.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-neon-pink font-bold">
                      {showAfter ? 'AFTER' : 'BEFORE'}
                    </p>
                    <button 
                      className="neon-button rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAfter(!showAfter);
                      }}
                    >
                      SHOW {showAfter ? 'BEFORE' : 'AFTER'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;