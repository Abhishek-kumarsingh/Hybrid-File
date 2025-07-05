import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TransformationItem {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
}

interface GalleryItem {
  id: number;
  image: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'transformations'>('gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTransformation, setSelectedTransformation] = useState<TransformationItem | null>(null);

  const galleryItems: GalleryItem[] = [
    { id: 1, image: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'facility' },
    { id: 2, image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'facility' },
    { id: 3, image: 'https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'classes' },
    { id: 4, image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'facility' },
    { id: 5, image: 'https://images.pexels.com/photos/136404/pexels-photo-136404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'classes' },
    { id: 6, image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'classes' }
  ];

  const transformations: TransformationItem[] = [
    {
      id: 1,
      title: 'Mike\'s 12-Week Transformation',
      description: 'Mike lost 30 pounds and gained significant muscle mass through a structured strength program and nutrition plan.',
      beforeImage: 'https://images.pexels.com/photos/4793362/pexels-photo-4793362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      afterImage: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
      duration: '12 weeks'
    },
    {
      id: 2,
      title: 'Sarah\'s 6-Month Journey',
      description: 'Sarah focused on building strength and endurance, transforming her body composition while improving her overall health markers.',
      beforeImage: 'https://images.pexels.com/photos/6551136/pexels-photo-6551136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      afterImage: 'https://images.pexels.com/photos/2468339/pexels-photo-2468339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '6 months'
    },
    {
      id: 3,
      title: 'David\'s Recovery Journey',
      description: 'After a sports injury, David worked with our recovery specialists to rebuild strength and surpass his previous fitness level.',
      beforeImage: 'https://images.pexels.com/photos/1599174/pexels-photo-1599174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      afterImage: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      duration: '8 months'
    }
  ];

  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            Our <span className="text-neon-blue">Gallery</span>
          </h2>
          <p className="text-lg text-gray-300" data-aos="fade-up" data-aos-delay="100">
            Explore our state-of-the-art facility and see real transformations from our members.
          </p>

          <div 
            className="mt-8 inline-flex items-center p-1 bg-dark-gray rounded-full" 
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'gallery' ? 'bg-neon-blue text-black' : 'text-white'
              }`}
              onClick={() => setActiveTab('gallery')}
            >
              Facility
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'transformations' ? 'bg-neon-blue text-black' : 'text-white'
              }`}
              onClick={() => setActiveTab('transformations')}
            >
              Transformations
            </button>
          </div>
        </div>

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-aos="fade-up"
          >
            {galleryItems.map((item, index) => (
              <div 
                key={item.id}
                className="overflow-hidden rounded-xl cursor-pointer group relative"
                onClick={() => setSelectedImage(item.image)}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <img 
                  src={item.image}
                  alt={`Gallery item ${item.id}`}
                  className="w-full h-[300px] object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <p className="text-lg font-semibold uppercase tracking-wider">
                      {item.category}
                    </p>
                    <p className="text-sm">Click to view</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transformations Tab */}
        {activeTab === 'transformations' && (
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-aos="fade-up"
          >
            {transformations.map((item, index) => (
              <div 
                key={item.id}
                className="card-glass overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                onClick={() => setSelectedTransformation(item)}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="grid grid-cols-2">
                  <div className="aspect-square relative">
                    <span className="absolute top-2 left-2 bg-dark-gray px-2 py-1 text-xs rounded-md">Before</span>
                    <img 
                      src={item.beforeImage}
                      alt={`Before - ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square relative">
                    <span className="absolute top-2 right-2 bg-neon-blue text-black px-2 py-1 text-xs rounded-md">After</span>
                    <img 
                      src={item.afterImage}
                      alt={`After - ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.duration}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-dark-gray hover:bg-light-gray transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Transformation Detail Modal */}
        {selectedTransformation && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
            onClick={() => setSelectedTransformation(null)}
          >
            <div 
              className="card-glass max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-dark-gray hover:bg-light-gray transition-colors z-10"
                onClick={() => setSelectedTransformation(null)}
              >
                <X size={24} />
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="relative">
                  <div className="grid grid-cols-2 h-full">
                    <div className="relative">
                      <span className="absolute top-2 left-2 bg-dark-gray px-2 py-1 text-xs rounded-md">Before</span>
                      <img 
                        src={selectedTransformation.beforeImage}
                        alt={`Before - ${selectedTransformation.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute top-2 right-2 bg-neon-blue text-black px-2 py-1 text-xs rounded-md">After</span>
                      <img 
                        src={selectedTransformation.afterImage}
                        alt={`After - ${selectedTransformation.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{selectedTransformation.title}</h3>
                  <p className="text-neon-blue mb-4">{selectedTransformation.duration}</p>
                  <p className="text-gray-300 mb-6">{selectedTransformation.description}</p>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4">Program Details</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-neon-blue rounded-full mt-2"></div>
                        <span>Personalized training program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
                        <span>Nutrition plan and guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-neon-red rounded-full mt-2"></div>
                        <span>Regular progress tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-neon-blue rounded-full mt-2"></div>
                        <span>Weekly check-ins with trainer</span>
                      </li>
                    </ul>
                  </div>
                  
                  <a href="#schedule" className="btn btn-primary text-black mt-8 w-full text-center">
                    Start Your Transformation
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;