import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10;
  const tax = subtotal * 0.07; // Example: 7% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center" data-aos="fade-up">
        <div className="max-w-md mx-auto">
          <ShoppingBag size={80} className="mx-auto text-gray-300 dark:text-gray-700 mb-6" />
          <h1 className="text-2xl font-display font-semibold mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/shop" className="btn-primary px-8 py-3">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container">
        <h1 className="text-3xl font-display font-semibold mb-8" data-aos="fade-up">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2" data-aos="fade-right">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid md:grid-cols-7 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="md:col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Subtotal</div>
                <div className="text-center">Actions</div>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map(item => (
                  <div key={item.id} className="p-4 md:grid md:grid-cols-7 md:gap-4 md:items-center">
                    {/* Product info */}
                    <div className="flex items-center space-x-4 md:col-span-3 mb-4 md:mb-0">
                      <Link to={`/product/${item.id}`} className="block flex-shrink-0 w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div>
                        <Link to={`/product/${item.id}`} className="font-medium hover:text-primary-600 dark:hover:text-primary-400">
                          {item.name}
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                          Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:text-center text-sm md:text-base">
                      <span className="inline-block md:hidden font-medium mr-2">Price:</span>
                      ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="flex items-center justify-between md:justify-center my-4 md:my-0">
                      <span className="inline-block md:hidden font-medium mr-2">Quantity:</span>
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                        <button
                          className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-md"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-md"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="md:text-center font-semibold">
                      <span className="inline-block md:hidden font-medium mr-2">Subtotal:</span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    
                    {/* Actions */}
                    <div className="md:text-center mt-4 md:mt-0">
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Cart Actions */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <Link to="/shop" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                  <ArrowRight size={16} className="mr-1 rotate-180" />
                  Continue Shopping
                </Link>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div data-aos="fade-left">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="input rounded-r-none"
                  />
                  <button className="btn-primary rounded-l-none">Apply</button>
                </div>
              </div>
              
              {/* Checkout Button */}
              <Link to="/checkout" className="btn-primary w-full py-3 flex items-center justify-center">
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2" />
              </Link>
              
              {/* Additional Info */}
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <p>
                  Free shipping on orders over $100
                </p>
                <p>
                  Estimated delivery time: 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;