import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Plus } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

// Function to determine card glow color based on product category
const getCategoryGlowClass = (category: string): string => {
  switch (category) {
    case 'electronics':
      return 'card-glow-teal';
    case 'clothing':
    case 'bags':
    case 'accessories':
      return 'card-glow-purple';
    case 'watches':
    case 'home':
    case 'fitness':
      return 'card-glow-pink';
    default:
      return 'card-glow-purple';
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const categoryGlowClass = getCategoryGlowClass(product.category);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist`);
  };

  return (
    <div
      className={`card card-glow ${categoryGlowClass} h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300`}
      data-aos="fade-up"
    >
      <Link to={`/product/${product.id}`} className="block group flex-1 flex flex-col">
        <div className="card-image card-image-hover">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-navy-800/50 overflow-hidden rounded-t-xl">
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover w-full h-full product-img-zoom"
              loading="lazy"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <div className="flex space-x-3 mb-4">
              <button
                onClick={handleAddToWishlist}
                className="p-2 bg-white/90 dark:bg-navy-800/90 rounded-full shadow-lg hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Add to wishlist"
              >
                <Heart size={18} />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-2 bg-white/90 dark:bg-navy-800/90 rounded-full shadow-lg hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Add to cart"
              >
                <ShoppingCart size={18} />
              </button>
              <Link
                to={`/product/${product.id}`}
                className="p-2 bg-white/90 dark:bg-navy-800/90 rounded-full shadow-lg hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Quick view"
              >
                <Eye size={18} />
              </Link>
            </div>
          </div>

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.originalPrice && (
              <span className="badge-accent shadow-md">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
            {product.newArrival && (
              <span className="badge-primary shadow-md">New</span>
            )}
            {product.bestSeller && (
              <span className="badge-secondary shadow-md">Best Seller</span>
            )}
          </div>
        </div>

        <div className="card-content flex flex-col flex-1 p-3">
          <h3 className="font-medium text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">{product.name}</h3>
          <div className="flex items-baseline mt-1 space-x-2">
            <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : i < product.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                ({product.reviewCount})
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 transition-colors"
              aria-label="Add to cart"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;