import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Tag, Clock, User } from 'lucide-react';

// Blog post data
const blogPosts = [
  {
    id: 'post1',
    title: 'The Art of Slow Fashion: Why Quality Trumps Quantity',
    excerpt: 'Explore the philosophy behind slow fashion and how investing in fewer, higher-quality pieces can transform your wardrobe and reduce environmental impact.',
    image: 'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Sustainability',
    author: 'Sophia Reynolds',
    date: 'June 15, 2023',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 'post2',
    title: 'Summer 2023 Style Guide: Effortless Elegance for Warm Days',
    excerpt: 'Discover our curated selection of summer essentials that combine comfort and sophistication for the perfect seasonal wardrobe.',
    image: 'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Style Guide',
    author: 'Marcus Chen',
    date: 'May 28, 2023',
    readTime: '4 min read',
    featured: true
  },
  {
    id: 'post3',
    title: 'Behind the Seams: The Craftsmanship of Our Signature Collection',
    excerpt: 'Take a journey through our atelier and discover the meticulous attention to detail that goes into creating each piece in our signature collection.',
    image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Craftsmanship',
    author: 'Olivia Patel',
    date: 'April 10, 2023',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 'post4',
    title: 'The Psychology of Color in Fashion: How Your Clothes Affect Your Mood',
    excerpt: 'Explore the fascinating relationship between color choices in your wardrobe and their subtle influence on your daily emotions and interactions.',
    image: 'https://images.pexels.com/photos/5704847/pexels-photo-5704847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Fashion Psychology',
    author: 'James Wilson',
    date: 'March 22, 2023',
    readTime: '7 min read',
    featured: false
  },
  {
    id: 'post5',
    title: 'Capsule Wardrobes: Minimalist Approach to Maximum Style',
    excerpt: 'Learn how to build a versatile capsule wardrobe that reduces decision fatigue while ensuring you always have the perfect outfit for any occasion.',
    image: 'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Minimalism',
    author: 'Sophia Reynolds',
    date: 'February 15, 2023',
    readTime: '5 min read',
    featured: false
  },
  {
    id: 'post6',
    title: 'Sustainable Fabrics: A Guide to Eco-Friendly Materials',
    excerpt: 'Discover the innovative sustainable fabrics that are revolutionizing the fashion industry and how to identify truly eco-friendly materials.',
    image: 'https://images.pexels.com/photos/9771195/pexels-photo-9771195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Sustainability',
    author: 'Olivia Patel',
    date: 'January 30, 2023',
    readTime: '8 min read',
    featured: false
  }
];

// Categories
const categories = [
  'All',
  'Sustainability',
  'Style Guide',
  'Craftsmanship',
  'Fashion Psychology',
  'Minimalism'
];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
          <div className="absolute inset-0 bg-dark-950/60"></div>
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
              <motion.h1 
                className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The Journal
              </motion.h1>
              
              <motion.p 
                className="text-white/90 text-lg mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Insights, inspiration, and stories from the world of fashion, sustainability, and design.
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="font-playfair text-3xl md:text-4xl font-medium mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Articles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="group block">
                  <div className="aspect-[16/9] overflow-hidden rounded-lg mb-6">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-sm text-dark-600 flex items-center">
                      <Tag size={14} className="mr-1" />
                      {post.category}
                    </span>
                    <span className="text-sm text-dark-600 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-medium mb-3 group-hover:text-primary-800 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-dark-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-600 flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </span>
                    <span className="text-sm text-dark-600">{post.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts with Filters */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <motion.h2 
              className="font-playfair text-3xl font-medium mb-6 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              All Articles
            </motion.h2>
            
            <div className="w-full md:w-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pr-10"
                />
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
              </motion.div>
              
              {/* Category Dropdown */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="input appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>
          </div>
          
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="card"
              >
                <Link to={`/blog/${post.id}`} className="group block">
                  <div className="aspect-[16/9] overflow-hidden rounded-lg mb-6 -mt-6 -mx-6">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-xs text-dark-600 flex items-center">
                      <Tag size={12} className="mr-1" />
                      {post.category}
                    </span>
                    <span className="text-xs text-dark-600 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-3 group-hover:text-primary-800 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-dark-600 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-dark-600">
                    <span className="flex items-center">
                      <User size={12} className="mr-1" />
                      {post.author}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-dark-600 mb-4">No articles found matching your criteria.</p>
              <button 
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="btn btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="flex justify-center mt-12">
              <button className="btn btn-primary">
                Load More Articles
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-beige-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2 
              className="font-playfair text-3xl md:text-4xl font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p 
              className="text-dark-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Stay updated with our latest articles, style guides, and exclusive offers.
            </motion.p>
            <motion.form 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="input flex-grow"
                required
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </motion.form>
            <motion.p 
              className="text-dark-500 text-sm mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
