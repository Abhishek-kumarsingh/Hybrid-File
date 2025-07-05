import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Espresso
  {
    id: 1,
    name: 'Classic Espresso',
    description: 'Our signature blend with rich crema and balanced acidity.',
    price: '$3.50',
    image: 'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg',
    category: 'espresso',
    featured: true
  },
  {
    id: 2,
    name: 'Double Shot',
    description: 'Twice the intensity for coffee enthusiasts who need an extra kick.',
    price: '$4.25',
    image: 'https://images.pexels.com/photos/6802982/pexels-photo-6802982.jpeg',
    category: 'espresso'
  },
  {
    id: 3,
    name: 'Americano',
    description: 'Espresso diluted with hot water for a milder flavor profile.',
    price: '$3.75',
    image: 'https://images.pexels.com/photos/4078054/pexels-photo-4078054.jpeg',
    category: 'espresso'
  },
  
  // Lattes
  {
    id: 4,
    name: 'Classic Latte',
    description: 'Espresso with steamed milk and a light layer of foam.',
    price: '$4.50',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    category: 'lattes',
    featured: true
  },
  {
    id: 5,
    name: 'Vanilla Latte',
    description: 'Our classic latte infused with natural vanilla essence.',
    price: '$4.95',
    image: 'https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg',
    category: 'lattes'
  },
  {
    id: 6,
    name: 'Caramel Latte',
    description: 'Rich espresso with milk and homemade caramel sauce.',
    price: '$5.25',
    image: 'https://images.pexels.com/photos/8967020/pexels-photo-8967020.jpeg',
    category: 'lattes'
  },
  
  // Cold Brew
  {
    id: 7,
    name: 'Classic Cold Brew',
    description: '24-hour steeped coffee served over ice for a smooth experience.',
    price: '$4.75',
    image: 'https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg',
    category: 'coldBrew',
    featured: true
  },
  {
    id: 8,
    name: 'Nitro Cold Brew',
    description: 'Cold brew infused with nitrogen for a creamy, stout-like texture.',
    price: '$5.50',
    image: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg',
    category: 'coldBrew'
  },
  {
    id: 9,
    name: 'Vanilla Sweet Cream Cold Brew',
    description: 'Cold brew topped with house-made vanilla sweet cream.',
    price: '$5.25',
    image: 'https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg',
    category: 'coldBrew'
  },
  
  // Snacks
  {
    id: 10,
    name: 'Artisan Croissant',
    description: 'Buttery, flaky croissant baked fresh daily.',
    price: '$3.50',
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg',
    category: 'snacks',
    featured: true
  },
  {
    id: 11,
    name: 'Avocado Toast',
    description: 'Sourdough topped with smashed avocado, sea salt, and chili flakes.',
    price: '$8.95',
    image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg',
    category: 'snacks'
  },
  {
    id: 12,
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with fresh blueberries and lemon zest.',
    price: '$4.25',
    image: 'https://images.pexels.com/photos/3068826/pexels-photo-3068826.jpeg',
    category: 'snacks'
  }
];

export const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'espresso', name: 'Espresso' },
  { id: 'lattes', name: 'Lattes' },
  { id: 'coldBrew', name: 'Cold Brew' },
  { id: 'snacks', name: 'Snacks' }
];