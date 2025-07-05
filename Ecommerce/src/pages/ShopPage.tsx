import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Product } from '../types/product';

const ShopPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'newest',
  });
  
  const [priceRanges] = useState([
    { value: 'under-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: 'over-200', label: 'Over $200' },
  ]);

  // Parse query parameters on mount and when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || '';
    
    setFilters(prev => ({
      ...prev,
      category
    }));
  }, [location]);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Category filter
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }
    
    // Price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under-50':
          result = result.filter(p => p.price < 50);
          break;
        case '50-100':
          result = result.filter(p => p.price >= 50 && p.price < 100);
          break;
        case '100-200':
          result = result.filter(p => p.price >= 100 && p.price < 200);
          break;
        case 'over-200':
          result = result.filter(p => p.price >= 200);
          break;
      }
    }
    
    // Sorting
    switch (filters.sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Assuming higher IDs are newer products for demo purposes
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }
    
    setFilteredProducts(result);
  }, [filters]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      sortBy: 'newest',
    });
  };

  return (
    <div className="py-8">
      <div className="container">
        {/* Page Header */}
        <div className="mb-8 text-center" data-aos="fade-up">
          <h1 className="text-3xl md:text-4xl font-display font-semibold">Shop</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse our collection of premium products
          </p>
        </div>
        
        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0" data-aos="fade-right">
            <button
              className="btn-outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              Filters {showFilters ? <X size={18} className="ml-2" /> : <ChevronDown size={18} className="ml-2" />}
            </button>
            
            {(filters.category || filters.priceRange) && (
              <button
                className="btn-outline text-sm"
                onClick={clearFilters}
              >
                <X size={16} className="mr-1" /> Clear Filters
              </button>
            )}
          </div>
          
          <div className="flex items-center" data-aos="fade-left">
            <span className="text-gray-600 dark:text-gray-400 mr-2">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="input py-1"
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        
        {/* Expanded Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 animate-slide-down" data-aos="fade-down">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <SlidersHorizontal size={16} className="mr-1" />
                  Categories
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={filters.category === ''}
                      onChange={() => handleFilterChange('category', '')}
                      className="mr-2"
                    />
                    <label htmlFor="category-all">All Categories</label>
                  </div>
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        checked={filters.category === category.id}
                        onChange={() => handleFilterChange('category', category.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category.id}`}>{category.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <SlidersHorizontal size={16} className="mr-1" />
                  Price Range
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="price-all"
                      name="price"
                      checked={filters.priceRange === ''}
                      onChange={() => handleFilterChange('priceRange', '')}
                      className="mr-2"
                    />
                    <label htmlFor="price-all">All Prices</label>
                  </div>
                  {priceRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`price-${range.value}`}
                        name="price"
                        checked={filters.priceRange === range.value}
                        onChange={() => handleFilterChange('priceRange', range.value)}
                        className="mr-2"
                      />
                      <label htmlFor={`price-${range.value}`}>{range.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Count */}
        <div className="mb-6 text-gray-600 dark:text-gray-400" data-aos="fade-up">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" data-aos="fade-up">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or browse our categories.
            </p>
            <button
              className="btn-primary mt-4"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;