import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collections, products, ProductType } from '../../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Filter } from 'lucide-react';

// Define filter categories
const categories = ['All', 'Women', 'Men', 'New Arrivals', 'Sale'];

const FeaturedCollections: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [isGridView, setIsGridView] = useState(true);

  // Filter products based on active category
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products.filter(product => product.featured || product.newArrival));
    } else if (activeCategory === 'New Arrivals') {
      setFilteredProducts(products.filter(product => product.newArrival));
    } else if (activeCategory === 'Sale') {
      setFilteredProducts(products.filter(product => product.discount && product.discount > 0));
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium mb-4">Curated Collections</h2>
          <p className="text-dark-600 max-w-xl mx-auto text-lg">
            Explore our thoughtfully curated collections, designed for the modern individual.
          </p>
        </motion.div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={collection.link}
                className="group relative overflow-hidden block h-[450px] md:h-[500px]"
              >
                {/* Collection Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${collection.image})` }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
                </div>

                {/* Collection Name */}
                <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                  <h3 className="text-white font-playfair text-2xl font-medium tracking-wide mb-2">
                    {collection.name}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm font-inter uppercase tracking-wider overflow-hidden">
                    <span className="mr-2">Explore</span>
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="transform transition-transform duration-300 group-hover:translate-x-2"
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Products Section */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <motion.h3
              className="font-playfair text-2xl md:text-3xl font-medium mb-6 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Featured Pieces
            </motion.h3>

            {/* Category Filters */}
            <motion.div
              className="flex flex-wrap items-center gap-2 md:gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-dark-900 text-white'
                      : 'bg-white text-dark-800 hover:bg-neutral-100'
                  }`}
                >
                  {category}
                </button>
              ))}

              {/* View toggle */}
              <button
                onClick={() => setIsGridView(!isGridView)}
                className="ml-2 p-2 bg-white text-dark-800 hover:bg-neutral-100 transition-colors duration-300"
                aria-label={isGridView ? "Switch to list view" : "Switch to grid view"}
              >
                <Filter size={18} />
              </button>
            </motion.div>
          </div>

          {/* Products Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`view-${isGridView ? 'grid' : 'list'}-${activeCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={isGridView
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                : "space-y-6"
              }
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className={isGridView ? "" : "flex gap-6 bg-white p-4"}
                >
                  <Link
                    to={`/product/${product.id}`}
                    className={`group block ${isGridView ? "relative overflow-hidden" : "flex-shrink-0 w-1/3"}`}
                  >
                    {/* Product Image */}
                    <div className={`${isGridView ? "aspect-[3/4] overflow-hidden" : "aspect-square overflow-hidden"}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Sale Tag */}
                      {product.discount && product.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-gold-500 text-white text-xs font-medium px-2 py-1">
                          {product.discount}% OFF
                        </div>
                      )}

                      {/* New Tag */}
                      {product.newArrival && !product.discount && (
                        <div className="absolute top-4 left-4 bg-dark-900 text-white text-xs font-medium px-2 py-1">
                          NEW
                        </div>
                      )}
                    </div>

                    {/* Quick Shop Overlay - Only in Grid View */}
                    {isGridView && (
                      <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-dark-900 text-sm font-medium flex items-center justify-center">
                          Quick Shop <ArrowRight size={14} className="ml-2" />
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className={`${isGridView ? "pt-4" : "flex-grow"}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-dark-900 mb-1">{product.name}</h4>
                        <p className="text-dark-600 text-sm mb-2">{product.category}</p>
                      </div>
                      <div className="flex items-center">
                        {product.discount && product.discount > 0 ? (
                          <>
                            <span className="text-dark-400 line-through text-sm mr-2">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-gold-700 font-medium">
                              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>

                    {/* Additional Info in List View */}
                    {!isGridView && (
                      <div className="mt-4">
                        <p className="text-dark-600 text-sm mb-4">{product.description}</p>
                        <div className="flex space-x-2">
                          {product.colors.map((color) => (
                            <div
                              key={color}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-3 bg-dark-900 text-white text-sm uppercase tracking-wider font-medium hover:bg-dark-800 transition-colors duration-300"
            >
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;