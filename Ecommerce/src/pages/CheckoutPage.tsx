import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, ChevronRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10;
  const tax = subtotal * 0.07; // Example: 7% tax
  const total = subtotal + shipping + tax;
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  
  const [step, setStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process order (mock)
    setTimeout(() => {
      toast.success('Order placed successfully!');
      clearCart();
      // Navigate to success page
    }, 1500);
  };
  
  const goToStep = (newStep: number) => {
    if (newStep > step) {
      // Validate current step before proceeding
      if (step === 1) {
        if (!formData.email || !formData.firstName || !formData.lastName || 
            !formData.address || !formData.city || !formData.state || 
            !formData.zipCode || !formData.country) {
          toast.error('Please fill all required fields');
          return;
        }
      }
    }
    
    setStep(newStep);
    window.scrollTo(0, 0);
  };
  
  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-display font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You need to add items to your cart before checking out.
          </p>
          <Link to="/shop" className="btn-primary px-8 py-3">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container">
        <h1 className="text-3xl font-display font-semibold mb-2" data-aos="fade-up">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8" data-aos="fade-up">
          <div className="flex items-center justify-between md:justify-start md:space-x-8 pt-3">
            <button 
              className={`flex items-center ${step >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}
              onClick={() => step > 1 && goToStep(1)}
            >
              <span className={`w-8 h-8 rounded-full inline-flex items-center justify-center mr-2 ${
                step >= 1 ? 'bg-primary-600 dark:bg-primary-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                1
              </span>
              <span className="hidden md:inline">Shipping</span>
            </button>
            
            <div className="hidden md:block w-16 h-px bg-gray-300 dark:bg-gray-700"></div>
            
            <button 
              className={`flex items-center ${step >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}
              onClick={() => step > 2 && goToStep(2)}
            >
              <span className={`w-8 h-8 rounded-full inline-flex items-center justify-center mr-2 ${
                step >= 2 ? 'bg-primary-600 dark:bg-primary-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                2
              </span>
              <span className="hidden md:inline">Payment</span>
            </button>
            
            <div className="hidden md:block w-16 h-px bg-gray-300 dark:bg-gray-700"></div>
            
            <div className={`flex items-center ${step >= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full inline-flex items-center justify-center mr-2 ${
                step >= 3 ? 'bg-primary-600 dark:bg-primary-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                3
              </span>
              <span className="hidden md:inline">Review</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2" data-aos="fade-right">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <Truck size={20} className="mr-2" />
                      Shipping Information
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="input"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => goToStep(2)}
                      >
                        Continue to Payment
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <CreditCard size={20} className="mr-2" />
                      Payment Information
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Payment Method
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <label className={`
                            flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                            ${formData.paymentMethod === 'credit' 
                              ? 'border-primary-600 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                              : 'border-gray-300 dark:border-gray-700'}
                          `}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="credit"
                              checked={formData.paymentMethod === 'credit'}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            Credit / Debit Card
                          </label>
                          
                          <label className={`
                            flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                            ${formData.paymentMethod === 'paypal' 
                              ? 'border-primary-600 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20' 
                              : 'border-gray-300 dark:border-gray-700'}
                          `}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="paypal"
                              checked={formData.paymentMethod === 'paypal'}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            PayPal
                          </label>
                        </div>
                      </div>
                      
                      {formData.paymentMethod === 'credit' && (
                        <>
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              placeholder="0000 0000 0000 0000"
                              className="input"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleChange}
                              className="input"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className="input"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="123"
                                className="input"
                                required
                              />
                            </div>
                          </div>
                        </>
                      )}
                      
                      {formData.paymentMethod === 'paypal' && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <p className="text-blue-800 dark:text-blue-300">
                            You will be redirected to PayPal to complete your payment securely.
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center mt-4">
                        <ShieldCheck size={18} className="text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Your payment information is secure and encrypted
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => goToStep(1)}
                      >
                        Back to Shipping
                      </button>
                      
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => goToStep(3)}
                      >
                        Review Order
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Review Order */}
                {step === 3 && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Shipping Information</h3>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <p>
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p>{formData.address}</p>
                          <p>
                            {formData.city}, {formData.state} {formData.zipCode}
                          </p>
                          <p>{formData.country}</p>
                          <p className="mt-2">{formData.email}</p>
                        </div>
                        <button
                          type="button"
                          className="text-primary-600 dark:text-primary-400 hover:underline text-sm mt-2"
                          onClick={() => goToStep(1)}
                        >
                          Edit
                        </button>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          {formData.paymentMethod === 'credit' ? (
                            <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                          ) : (
                            <p>PayPal</p>
                          )}
                        </div>
                        <button
                          type="button"
                          className="text-primary-600 dark:text-primary-400 hover:underline text-sm mt-2"
                          onClick={() => goToStep(2)}
                        >
                          Edit
                        </button>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Order Items</h3>
                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                          {items.map(item => (
                            <div 
                              key={item.id} 
                              className="flex items-center p-4 border-b last:border-b-0 border-gray-200 dark:border-gray-800"
                            >
                              <img 
                                src={item.images[0]} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="ml-4 flex-grow">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                              <div className="font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => goToStep(2)}
                      >
                        Back to Payment
                      </button>
                      
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div data-aos="fade-left">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-3">
                  <span className="font-medium">Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                </div>
                
                {items.map(item => (
                  <div key={item.id} className="py-3 flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="py-3 flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="py-3 flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="py-3 flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="py-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mt-4">
                <div className="flex mt-1">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="input rounded-r-none"
                  />
                  <button className="btn-primary rounded-l-none whitespace-nowrap">Apply</button>
                </div>
              </div>
              
              {/* Security badges */}
              <div className="mt-6 flex items-center justify-center">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
                  <ShieldCheck size={24} className="mx-auto mb-2 text-green-600 dark:text-green-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Secure Checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;