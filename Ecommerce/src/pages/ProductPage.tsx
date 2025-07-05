import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  RefreshCcw, 
  Shield, 
  Minus, 
  Plus, 
  Star, 
  ChevronRight
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState(products.slice(0, 4));
  
  useEffect(() => {
    // Reset state when product changes
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct);
    
    if (foundProduct) {
      setSelectedImage(foundProduct.images[0]);
      setSelectedColor(foundProduct.colors ? foundProduct.colors[0] : '');
      setSelectedSize(foundProduct.sizes ? foundProduct.sizes[0] : '');
      
      // Find related products from same category
      const related = products
        .filter(p => p.id !== id && p.category === foundProduct.category)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    // Reset quantity
    setQuantity(1);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Only ${product.stock} items in stock`);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const handleAddToWishlist = () => {
    toast.success('Added to wishlist');
  };

  return (
    <div className="py-8">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400" data-aos="fade-up">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-400">Shop</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary-600 dark:hover:text-primary-400">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="truncate">{product.name}</span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Product Images */}
          <div data-aos="fade-right">
            <div className="mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={selectedImage || product.images[0]} 
                alt={product.name} 
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`
                      cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden
                      ${selectedImage === image ? 'ring-2 ring-primary-500' : ''}
                    `}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div data-aos="fade-left">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline mb-4">
                <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="ml-3 badge-accent">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              
              {/* Availability */}
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Availability: 
                  <span className={product.stock > 0 ? 'text-green-600 dark:text-green-400 ml-1 font-medium' : 'text-red-600 ml-1 font-medium'}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </p>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </div>
              
              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`
                          w-10 h-10 rounded-full border-2 transition-all
                          ${selectedColor === color ? 'border-primary-600 dark:border-primary-400 ring-2 ring-primary-200 dark:ring-primary-900' : 'border-gray-300 dark:border-gray-700'}
                        `}
                        style={{ 
                          backgroundColor: color === 'black' ? '#000' : 
                                           color === 'white' ? '#fff' : 
                                           color === 'red' ? '#ef4444' :
                                           color === 'blue' ? '#3b82f6' :
                                           color === 'green' ? '#10b981' :
                                           color === 'yellow' ? '#f59e0b' :
                                           color === 'purple' ? '#8b5cf6' :
                                           color === 'pink' ? '#ec4899' :
                                           color === 'gray' ? '#6b7280' :
                                           color === 'brown' ? '#92400e' : 
                                           color === 'tan' ? '#d4a373' : 
                                           color === 'navy' ? '#1e3a8a' :
                                           color === 'silver' ? '#d1d5db' :
                                           color === 'gold' ? '#fbbf24' :
                                           color === 'camel' ? '#c87941' :
                                           color === 'rose gold' ? '#f9a8d4' :
                                           color
                        }}
                        onClick={() => setSelectedColor(color)}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`
                          px-4 py-2 border rounded-md transition-all
                          ${selectedSize === size ? 'border-primary-600 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-300' : 'border-gray-300 dark:border-gray-700'}
                        `}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                    className="input w-16 text-center"
                  />
                  <button
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  className="btn-primary flex-1 py-3"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </button>
                <button 
                  className="btn-outline flex-1 py-3"
                  onClick={handleAddToWishlist}
                >
                  <Heart size={18} className="mr-2" />
                  Add to Wishlist
                </button>
              </div>
              
              {/* Shipping & Returns */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-6 space-y-4">
                <div className="flex items-start">
                  <Truck size={20} className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Free standard shipping on orders over $100</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <RefreshCcw size={20} className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Easy Returns</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield size={20} className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Secure Payments</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">SSL encrypted checkout</p>
                  </div>
                </div>
              </div>
              
              {/* Social Share */}
              <div className="mt-6 flex items-center">
                <span className="text-gray-600 dark:text-gray-400 mr-4">Share:</span>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <h2 className="text-2xl font-display font-semibold mb-6" data-aos="fade-up">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;