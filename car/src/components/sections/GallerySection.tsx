import React, { useState } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Front Angle View',
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/3879071/pexels-photo-3879071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Interior Dashboard',
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/10641815/pexels-photo-10641815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Side Profile',
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/16259455/pexels-photo-16259455/free-photo-of-lamborghini-aventador.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Rear Lights Detail',
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/13635481/pexels-photo-13635481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Performance Wheels',
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/12252923/pexels-photo-12252923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Aerial View',
  },
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Find the selected image object
  const selectedImageObj = selectedImage 
    ? galleryImages.find(img => img.id === selectedImage)
    : null;
  
  // Open the image modal
  const openModal = (id: string) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };
  
  // Close the image modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <section id="gallery" className="section-padding bg-secondary-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-40"></div>
      
      {/* Content */}
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Gallery
          </h2>
          <p 
            className="text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Experience the stunning design and attention to detail of our vehicles.
          </p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              className="overflow-hidden rounded-xl glass-card cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
              onClick={() => openModal(image.id)}
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay={index * 50}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Image Modal */}
      {selectedImage && selectedImageObj && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white hover:text-primary-500 transition-colors"
            onClick={closeModal}
          >
            <X size={32} />
            <span className="sr-only">Close</span>
          </button>
          
          <div className="max-w-4xl w-full">
            <div className="overflow-hidden rounded-xl">
              <img 
                src={selectedImageObj.url} 
                alt={selectedImageObj.title} 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">{selectedImageObj.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;