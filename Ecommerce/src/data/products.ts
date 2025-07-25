import { Product, ProductCategory } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Leather Backpack',
    price: 129.99,
    originalPrice: 159.99,
    description: 'A premium leather backpack with multiple compartments and a sleek design. Perfect for work, travel, or everyday use.',
    images: [
      'https://images.pexels.com/photos/1170261/pexels-photo-1170261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'bags',
    tags: ['leather', 'backpack', 'premium'],
    colors: ['black', 'brown', 'tan'],
    sizes: [],
    stock: 15,
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    bestSeller: true,
  },
  {
    id: '2',
    name: 'Minimal Analog Watch',
    price: 249.99,
    originalPrice: 299.99,
    description: 'A minimalist analog watch with a genuine leather strap. Features Swiss movement and water resistance up to 30 meters.',
    images: [
      'https://images.pexels.com/photos/9978720/pexels-photo-9978720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9978715/pexels-photo-9978715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'watches',
    tags: ['watch', 'analog', 'minimal'],
    colors: ['silver', 'gold', 'rose gold'],
    sizes: [],
    stock: 8,
    rating: 4.9,
    reviewCount: 87,
    featured: true,
  },
  {
    id: '3',
    name: 'Wool Blend Coat',
    price: 199.99,
    originalPrice: 249.99,
    description: 'A stylish wool blend coat for the colder months. Features a classic design with modern detailing and exceptional warmth.',
    images: [
      'https://images.pexels.com/photos/7691089/pexels-photo-7691089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/17504860/pexels-photo-17504860/free-photo-of-young-woman-in-brown-coat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'clothing',
    tags: ['coat', 'wool', 'winter'],
    colors: ['camel', 'navy', 'black', 'gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 12,
    rating: 4.7,
    reviewCount: 56,
    bestSeller: true,
  },
  {
    id: '4',
    name: 'Wireless Noise-Cancelling Earbuds',
    price: 149.99,
    originalPrice: 179.99,
    description: 'High-fidelity wireless earbuds with active noise-cancellation, touch controls, and up to 8 hours of battery life.',
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4112852/pexels-photo-4112852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'electronics',
    tags: ['earbuds', 'wireless', 'audio'],
    colors: ['white', 'black'],
    sizes: [],
    stock: 20,
    rating: 4.6,
    reviewCount: 213,
    newArrival: true,
  },
  {
    id: '5',
    name: 'Handcrafted Ceramic Mug Set',
    price: 49.99,
    description: 'A set of four handcrafted ceramic mugs. Each mug is uniquely designed and glazed by artisans.',
    images: [
      'https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7371910/pexels-photo-7371910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'home',
    tags: ['mug', 'ceramic', 'handcrafted'],
    colors: ['assorted'],
    sizes: [],
    stock: 18,
    rating: 4.5,
    reviewCount: 42,
    newArrival: true,
  },
  {
    id: '6',
    name: 'Premium Yoga Mat',
    price: 79.99,
    originalPrice: 99.99,
    description: 'An eco-friendly, non-slip yoga mat made from natural rubber. Provides excellent grip and cushioning for your practice.',
    images: [
      'https://images.pexels.com/photos/5766645/pexels-photo-5766645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'fitness',
    tags: ['yoga', 'mat', 'fitness'],
    colors: ['purple', 'blue', 'gray'],
    sizes: [],
    stock: 25,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: '7',
    name: 'Leather Wallet',
    price: 59.99,
    description: 'A premium full-grain leather wallet with multiple card slots and RFID protection. Slim profile fits comfortably in your pocket.',
    images: [
      'https://images.pexels.com/photos/842835/pexels-photo-842835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/230298/pexels-photo-230298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'accessories',
    tags: ['wallet', 'leather', 'accessories'],
    colors: ['black', 'brown'],
    sizes: [],
    stock: 30,
    rating: 4.6,
    reviewCount: 115,
  },
  {
    id: '8',
    name: 'Stainless Steel Water Bottle',
    price: 34.99,
    description: 'A vacuum-insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof and durable.',
    images: [
      'https://images.pexels.com/photos/5818629/pexels-photo-5818629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'accessories',
    tags: ['bottle', 'stainless steel', 'hydration'],
    colors: ['silver', 'black', 'blue', 'green'],
    sizes: [],
    stock: 40,
    rating: 4.8,
    reviewCount: 157,
    bestSeller: true,
  },
];

export const categories: ProductCategory[] = [
  {
    id: 'clothing',
    name: 'Clothing',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 42,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 38,
  },
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 24,
  },
  {
    id: 'bags',
    name: 'Bags',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 18,
  },
  {
    id: 'watches',
    name: 'Watches',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 15,
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: 'https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 31,
  },
  {
    id: 'fitness',
    name: 'Fitness',
    image: 'https://images.pexels.com/photos/4662356/pexels-photo-4662356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    productCount: 22,
  },
];