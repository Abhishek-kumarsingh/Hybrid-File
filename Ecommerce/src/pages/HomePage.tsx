import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ChevronRight, Sparkles, Star, TrendingUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products, categories } from '../data/products';

const HomePage: React.FC = () => {
  // Filter products
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  const newArrivals = products.filter(product => product.newArrival).slice(0, 4);
  const bestSellers = products.filter(product => product.bestSeller).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-purple-900 dark:from-navy-950 dark:via-navy-900 dark:to-purple-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-20 -left-20 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-full h-1/2 bg-gradient-radial from-purple-500/10 to-transparent"></div>
        </div>

        <div className="container py-20 md:py-32 min-h-[85vh] flex items-center relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white mb-6">
                <Sparkles size={16} className="mr-2 text-teal-400" />
                <span>Discover the 2025 Collection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight text-white">
                Elevate Your <span className="gradient-text">Lifestyle</span>
              </h1>

              <p className="mt-6 text-lg text-gray-300 max-w-lg">
                Discover premium products that combine futuristic design, exceptional quality, and sustainable materials. For those who appreciate the extraordinary.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/shop"
                  className="btn-primary btn-glow px-8 py-4 text-base font-semibold rounded-lg"
                >
                  Shop Now
                  <ChevronRight size={18} className="ml-2" />
                </Link>

                <Link
                  to="/collections"
                  className="btn-outline border-white/20 text-white hover:bg-white/10 px-8 py-4 text-base font-semibold rounded-lg"
                >
                  View Collections
                </Link>
              </div>

              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    <span className="font-semibold text-white">4.9</span> from over 2,500 reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative" data-aos="fade-left" data-aos-duration="1000">
              <div className="relative">
                {/* Main product image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-float">
                  <img
                    src="https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Hero Product"
                    className="w-full h-[500px] object-cover"
                  />

                  {/* Floating product badge */}
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                    New Arrival
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -bottom-10 -left-10 z-20 glass rounded-xl p-4 shadow-lg animate-float" style={{animationDelay: '0.5s'}}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center text-white">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Trending Now</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">+200% this week</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 z-0 w-40 h-40 bg-gradient-to-r from-teal-500/30 to-purple-500/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 right-20 z-0 w-40 h-40 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path
              fill="currentColor"
              className="text-gray-50 dark:text-navy-900"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-navy-900 dark:to-navy-900/50 -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 opacity-70"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal-200 dark:bg-teal-900/20 rounded-full blur-3xl -z-10 opacity-70"></div>

        <div className="container">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
              <Sparkles size={16} className="mr-2" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-4xl font-display font-bold mt-4">Shop by Category</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Explore our carefully curated collections of premium products designed for the modern lifestyle
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {categories.slice(0, 4).map((category, index) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl card-glow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-display font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-gray-300 mt-1">{category.productCount} Products</p>
                  <Link
                    to={`/shop?category=${category.id}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-white"
                  >
                    <span className="border-b border-white/0 group-hover:border-white transition-all duration-300">
                      Explore Collection
                    </span>
                    <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-100 dark:bg-navy-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-gray-900 dark:text-white font-medium transition-colors"
              data-aos="fade-up"
            >
              View All Categories
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-navy-900/50 dark:to-navy-800 -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-40 left-0 w-72 h-72 bg-teal-200 dark:bg-teal-900/20 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="container">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-sm font-medium mb-4">
              <Star size={16} className="mr-2" />
              <span>Premium Selection</span>
            </div>
            <h2 className="text-4xl font-display font-bold mt-4">Featured Products</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
              Handpicked selections from our premium collection, curated for exceptional quality and design
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, index) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={index * 100} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center" data-aos="fade-up">
            <Link
              to="/shop?featured=true"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium transition-all shadow-md hover:shadow-lg"
            >
              View All Featured
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Featured product highlight */}
          <div className="mt-20 bg-gradient-to-r from-teal-500/10 to-purple-500/10 dark:from-teal-900/20 dark:to-purple-900/20 rounded-2xl overflow-hidden shadow-xl" data-aos="fade-up">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12 lg:p-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                  <Sparkles size={16} className="mr-2 text-teal-500 dark:text-teal-400" />
                  <span>Editor's Choice</span>
                </div>
                <h3 className="text-3xl font-display font-bold">Premium Leather Backpack</h3>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Crafted from genuine leather with meticulous attention to detail. Perfect for work, travel, or everyday use with multiple compartments and a sleek design.
                </p>
                <div className="mt-6 flex items-center space-x-4">
                  <span className="text-2xl font-bold">$129.99</span>
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">$159.99</span>
                </div>
                <div className="mt-8">
                  <Link
                    to="/product/1"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    View Details
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="relative h-full">
                <img
                  src="https://images.pexels.com/photos/1170261/pexels-photo-1170261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Premium Leather Backpack"
                  className="w-full h-full object-cover aspect-square md:aspect-auto md:h-full"
                />
                <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                  20% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-navy-800 dark:to-navy-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="container">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 text-sm font-medium mb-4">
              <Sparkles size={16} className="mr-2" />
              <span>Just Launched</span>
            </div>
            <h2 className="text-4xl font-display font-bold mt-4">New Arrivals</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
              Discover our latest additions featuring cutting-edge designs and innovative materials
            </p>
          </div>

          <div className="relative">
            {/* Glow effect behind the products */}
            <div className="absolute inset-0 flex justify-center">
              <div className="w-2/3 h-full bg-gradient-radial from-pink-500/20 to-transparent blur-3xl -z-10"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
              {newArrivals.map((product, index) => (
                <div key={product.id} data-aos="fade-up" data-aos-delay={index * 100} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center" data-aos="fade-up">
            <Link
              to="/shop?new=true"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium transition-all shadow-md hover:shadow-lg"
            >
              View All New Arrivals
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* New arrivals feature */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="0">
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold">Limited Edition</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Exclusive products with limited availability. Once they're gone, they're gone forever.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="100">
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold">Special Pricing</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Introductory prices on all new arrivals for a limited time. Shop now for the best deals.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="200">
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold">Exclusive Features</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Our new arrivals feature cutting-edge technology and innovative designs not found elsewhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-purple-900 to-navy-900 animated-gradient"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
              <defs>
                <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
                  <animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite"></animate>
                  <stop offset="0%" stopColor="rgba(255, 0, 255, 0.5)"></stop>
                  <stop offset="100%" stopColor="rgba(255, 0, 255, 0)"></stop>
                </radialGradient>
                <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
                  <animate attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
                  <stop offset="0%" stopColor="rgba(0, 255, 255, 0.5)"></stop>
                  <stop offset="100%" stopColor="rgba(0, 255, 255, 0)"></stop>
                </radialGradient>
                <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
                  <animate attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
                  <stop offset="0%" stopColor="rgba(0, 255, 0, 0.5)"></stop>
                  <stop offset="100%" stopColor="rgba(0, 255, 0, 0)"></stop>
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient1)">
                <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite" />
                <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="17s" repeatCount="indefinite"/>
              </rect>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient2)">
                <animate attributeName="x" dur="23s" values="0%;-25%;0%" repeatCount="indefinite" />
                <animate attributeName="y" dur="24s" values="25%;-25%;25%" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="18s" repeatCount="indefinite"/>
              </rect>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient3)">
                <animate attributeName="x" dur="25s" values="-25%;0%;-25%" repeatCount="indefinite" />
                <animate attributeName="y" dur="26s" values="0%;-25%;0%" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="19s" repeatCount="indefinite"/>
              </rect>
            </svg>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right" data-aos-duration="1000">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white mb-6">
                <Sparkles size={16} className="mr-2 text-pink-400" />
                <span>Limited Time Offer</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight text-white">
                Summer Collection <br />
                <span className="gradient-text-pink">Up to 50% Off</span>
              </h2>

              <p className="mt-6 text-lg text-gray-300 max-w-lg">
                Discover our exclusive summer collection featuring premium designs at special prices. Limited time offer, don't miss out on these incredible savings!
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Sale Ends In</p>
                    <p className="text-pink-300">3 days, 14 hours</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Free Shipping</p>
                    <p className="text-pink-300">On orders over $50</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/shop?sale=true"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-pink-500/30 transition-all duration-300 font-medium"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Shop the Sale
                </Link>
              </div>
            </div>

            <div className="relative" data-aos="fade-left" data-aos-duration="1000">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-float">
                <img
                  src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Summer Sale"
                  className="w-full h-[500px] object-cover"
                />

                <div className="absolute top-6 right-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-6 rounded-full font-bold text-xl shadow-lg flex items-center justify-center">
                  <div className="relative animate-spin-slow">
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text>
                        <textPath href="#circlePath" className="text-xs">
                          50% OFF • LIMITED TIME • 50% OFF •
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <span className="absolute text-2xl font-bold">50%</span>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-10 z-20 glass rounded-xl p-4 shadow-lg animate-float" style={{animationDelay: '0.7s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Exclusive Pricing</p>
                    <p className="text-xs text-gray-300">Save up to 50% today</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 z-0 w-40 h-40 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 right-20 z-0 w-40 h-40 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-navy-900 -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-40 right-0 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-teal-200 dark:bg-teal-900/20 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="container">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-4">
              <TrendingUp size={16} className="mr-2" />
              <span>Most Popular</span>
            </div>
            <h2 className="text-4xl font-display font-bold mt-4">Best Sellers</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
              Our most popular products loved by customers worldwide, featuring exceptional quality and design
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((product, index) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={index * 100} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center" data-aos="fade-up">
            <Link
              to="/shop?bestseller=true"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all shadow-md hover:shadow-lg"
            >
              View All Best Sellers
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="0">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-purple-500/20 to-purple-500/10 dark:from-purple-500/30 dark:to-purple-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold gradient-text">25K+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Happy Customers</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-teal-500/20 to-teal-500/10 dark:from-teal-500/30 dark:to-teal-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold gradient-text">4.9/5</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Customer Rating</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-pink-500/20 to-pink-500/10 dark:from-pink-500/30 dark:to-pink-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold gradient-text">150+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Premium Products</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-orange-500/20 to-orange-500/10 dark:from-orange-500/30 dark:to-orange-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold gradient-text">30+</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-navy-900 dark:to-navy-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-200 dark:bg-teal-900/20 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="container">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-sm font-medium mb-4">
              <Star size={16} className="mr-2" />
              <span>Customer Reviews</span>
            </div>
            <h2 className="text-4xl font-display font-bold mt-4">What Our Customers Say</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Hear from our satisfied customers about their experience shopping with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                position: "Fashion Designer",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                quote: "The quality of the products exceeded my expectations. The attention to detail and craftsmanship is evident in every piece. Definitely my go-to shop for premium items.",
                rating: 5,
                color: "purple"
              },
              {
                name: "Michael Chen",
                position: "Tech Entrepreneur",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                quote: "Fast shipping, excellent customer service, and outstanding product quality. I've been a loyal customer for years and recommend Luxe to all my friends and family.",
                rating: 5,
                color: "teal"
              },
              {
                name: "Emma Rodriguez",
                position: "Interior Designer",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                quote: "I love the curated selection of sustainable products. It's refreshing to find a store that prioritizes both style and environmental responsibility.",
                rating: 5,
                color: "pink"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`card-glow card-glow-${testimonial.color} relative overflow-hidden rounded-2xl`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-8 relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-navy-700 shadow-md"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <svg className="absolute -top-4 -left-2 w-10 h-10 text-gray-200 dark:text-gray-700" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 relative z-10 pl-6">"{testimonial.quote}"</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verified Purchase</p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-${testimonial.color}-500/10 dark:bg-${testimonial.color}-500/20 rounded-bl-3xl -z-0`}></div>
              </div>
            ))}
          </div>

          {/* Testimonial highlight */}
          <div className="mt-16 text-center" data-aos="fade-up">
            <Link
              to="/reviews"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium transition-all shadow-md hover:shadow-lg"
            >
              Read More Reviews
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white dark:from-purple-900 dark:to-navy-900 -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-20 -left-20 w-60 h-60 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-full h-1/2 bg-gradient-radial from-purple-500/5 dark:from-purple-500/10 to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12" data-aos="fade-up">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Stay in the Loop</h2>
                <p className="mt-4 text-gray-800 dark:text-gray-300 text-lg font-medium">
                  Subscribe to our newsletter for exclusive offers, early access to new products, and design inspiration.
                </p>

                <form className="mt-8">
                  <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <div className="relative flex-grow">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-5 py-4 rounded-lg bg-white dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/30 whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>

                <div className="mt-8 flex flex-wrap justify-center gap-8">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-800 dark:text-gray-300 text-sm font-semibold">Exclusive Offers</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-800 dark:text-gray-300 text-sm font-semibold">New Product Alerts</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-800 dark:text-gray-300 text-sm font-semibold">No Spam, Unsubscribe Anytime</span>
                  </div>
                </div>

                <p className="mt-6 text-sm text-gray-700 dark:text-gray-400 font-medium">
                  By subscribing, you agree to our <a href="#" className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 underline font-bold">Privacy Policy</a> and consent to receive updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-white dark:bg-navy-900">
        <div className="container">
          <div className="text-center" data-aos="fade-up">
            <h2 className="text-3xl font-display font-bold gradient-text">Ready to Elevate Your Shopping Experience?</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover a world of premium products designed for the modern lifestyle. Join thousands of satisfied customers today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium transition-all shadow-md hover:shadow-lg"
              >
                Start Shopping
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-lg bg-gray-100 dark:bg-navy-800 hover:bg-gray-200 dark:hover:bg-navy-700 text-gray-900 dark:text-white font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;