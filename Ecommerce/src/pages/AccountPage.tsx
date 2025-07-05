import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Package, Heart, CreditCard, LogOut, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Account subpages
const Profile = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Profile</h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value="demo@example.com"
            readOnly
            className="input bg-gray-50 dark:bg-gray-900"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              defaultValue="Demo"
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              defaultValue="User"
              className="input"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue=""
            placeholder="Enter your phone number"
            className="input"
          />
        </div>
        <div className="pt-4">
          <button className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
    
    <h2 className="text-2xl font-semibold mb-6 mt-10">Change Password</h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Current Password
          </label>
          <input
            type="password"
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <input
            type="password"
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            className="input"
          />
        </div>
        <div className="pt-4">
          <button className="btn-primary">
            Update Password
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Orders = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {[
          {
            id: 'ORD-12345',
            date: 'June 12, 2025',
            status: 'Delivered',
            total: 129.99,
            items: 2
          },
          {
            id: 'ORD-12344',
            date: 'May 28, 2025',
            status: 'Shipped',
            total: 79.99,
            items: 1
          },
          {
            id: 'ORD-12343',
            date: 'May 11, 2025',
            status: 'Delivered',
            total: 199.98,
            items: 3
          }
        ].map(order => (
          <div key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <div className="flex items-center">
                  <span className="font-medium">{order.id}</span>
                  <span className={`ml-2 badge ${
                    order.status === 'Delivered' ? 'badge-secondary' : 
                    order.status === 'Shipped' ? 'badge-primary' : 
                    'badge-accent'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}
                </p>
              </div>
              <div className="mt-3 md:mt-0 flex items-center">
                <span className="font-semibold mr-4">
                  ${order.total.toFixed(2)}
                </span>
                <Link 
                  to={`/account/orders/${order.id}`} 
                  className="btn-outline text-sm py-1 px-3"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Wishlist = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          id: '1',
          name: 'Premium Leather Backpack',
          price: 129.99,
          image: 'https://images.pexels.com/photos/1170261/pexels-photo-1170261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          id: '5',
          name: 'Handcrafted Ceramic Mug Set',
          price: 49.99,
          image: 'https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
          id: '4',
          name: 'Wireless Noise-Cancelling Earbuds',
          price: 149.99,
          image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
      ].map(item => (
        <div key={item.id} className="card">
          <div className="relative overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium truncate">{item.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold">${item.price.toFixed(2)}</span>
              <div className="flex space-x-2">
                <button className="btn-outline text-sm py-1 px-3 flex items-center">
                  <Heart size={16} className="mr-1" />
                  Remove
                </button>
                <button className="btn-primary text-sm py-1 px-3">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PaymentMethods = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h3 className="font-medium mb-3">Saved Payment Methods</h3>
        <div className="space-y-3">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-14 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center mr-4">
                <span className="text-blue-600 dark:text-blue-400 font-medium">Visa</span>
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expires 05/27</p>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-700 transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Add a New Payment Method</h3>
        <button className="btn-outline w-full">
          <CreditCard size={16} className="mr-2" />
          Add Payment Method
        </button>
      </div>
    </div>
  </div>
);

const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  if (!user) {
    // Redirect to login if not authenticated
    navigate('/login', { state: { from: location } });
    return null;
  }
  
  const isActive = (path: string) => {
    return location.pathname === `/account${path}` || 
           (location.pathname === '/account' && path === '');
  };

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex items-center mb-8" data-aos="fade-up">
          <Link to="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Home size={18} />
          </Link>
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          <span>My Account</span>
        </div>
        
        <h1 className="text-3xl font-display font-semibold mb-8" data-aos="fade-up">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1" data-aos="fade-right">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 lg:sticky lg:top-24">
              <div className="text-center mb-6 p-2">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-3">
                  <User size={32} className="text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user.email}</p>
              </div>
              
              <nav className="space-y-1">
                <Link
                  to="/account"
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive('') 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Profile
                </Link>
                
                <Link
                  to="/account/orders"
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive('/orders') 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  Orders
                </Link>
                
                <Link
                  to="/account/wishlist"
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive('/wishlist') 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </Link>
                
                <Link
                  to="/account/payment-methods"
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive('/payment-methods') 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </Link>
                
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-3 rounded-lg transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>
          
          {/* Content */}
          <div className="lg:col-span-3" data-aos="fade-left">
            <div>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/payment-methods" element={<PaymentMethods />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;