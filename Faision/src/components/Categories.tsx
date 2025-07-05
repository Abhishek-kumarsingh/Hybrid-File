import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  id: string;
  title: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 'men',
    title: 'MEN',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    description: 'Redefine masculinity with our cutting-edge men\'s collection, from street casual to formal elegance.'
  },
  {
    id: 'women',
    title: 'WOMEN',
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
    description: 'Elevate your style with our women\'s lines that blend contemporary fashion with timeless sophistication.'
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    description: 'Complete your look with our curated selection of accessories, from statement pieces to subtle accents.'
  },
  {
    id: 'limited',
    title: 'LIMITED DROPS',
    image: 'https://images.pexels.com/photos/5119407/pexels-photo-5119407.jpeg',
    description: 'Exclusive, limited-edition pieces that define the cutting edge of fashion. Once they\'re gone, they\'re gone.'
  }
];

const Categories: React.FC = () => {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  return (
    <section id="collections" className="py-20 bg-dark-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            EXPLORE OUR <span className="text-neon-teal">COLLECTIONS</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Discover our latest collections, from everyday essentials to statement pieces that define the season.
          </p>
        </div>
        
        {/* Tabs for larger screens */}
        <div className="hidden md:block">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-dark-700/50 rounded-full p-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeTab === category.id 
                      ? 'bg-dark-900 text-neon-teal shadow-lg' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {categories.map((category) => (
                activeTab === category.id && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="h-96 rounded-xl overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                        />
                      </div>
                      <div className="flex flex-col justify-center space-y-6">
                        <h3 className="text-3xl font-montserrat font-bold">{category.title}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {category.description}
                        </p>
                        <div>
                          <button className="neon-button rounded-md">
                            SHOP {category.title}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Flip cards for mobile */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              className="h-96 w-full relative perspective-1000 cursor-pointer"
              onClick={() => setFlippedCard(flippedCard === category.id ? null : category.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  flippedCard === category.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="relative h-full rounded-xl overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-montserrat font-bold">{category.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-card rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-montserrat font-bold mb-4">{category.title}</h3>
                    <p className="text-gray-300">
                      {category.description}
                    </p>
                  </div>
                  <button className="neon-button rounded-md self-start">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;