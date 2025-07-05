import { VehicleModel } from '../types';

export const vehicleModels: VehicleModel[] = [
  {
    id: 'xr-phantom',
    name: 'XR Phantom',
    tagline: 'Unleash the Future of Driving',
    description: 'The XR Phantom combines cutting-edge technology with unparalleled performance. Its sleek design and powerful engine make it the perfect vehicle for those who demand the very best.',
    price: '$87,000',
    colors: [
      { id: 'electric-blue', name: 'Electric Blue', color: '#0077FF', gradient: 'linear-gradient(135deg, #0077FF, #66b0ff)' },
      { id: 'phantom-black', name: 'Phantom Black', color: '#121212', gradient: 'linear-gradient(135deg, #121212, #333333)' },
      { id: 'neon-green', name: 'Neon Pulse', color: '#39FF14', gradient: 'linear-gradient(135deg, #39FF14, #2ed60f)' },
      { id: 'crimson-red', name: 'Crimson Rush', color: '#DC143C', gradient: 'linear-gradient(135deg, #DC143C, #FF4D6A)' },
      { id: 'titanium', name: 'Titanium Silver', color: '#C0C0C0', gradient: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)' },
    ],
    features: [
      {
        id: 'engine',
        title: 'Quantum Drive Engine',
        description: 'Revolutionary propulsion system delivering unprecedented power efficiency and acceleration capabilities.',
        icon: 'engine',
        value: '580 HP',
      },
      {
        id: 'acceleration',
        title: 'Lightning Acceleration',
        description: 'Experience the thrill of 0-60 mph in seconds with our precision-engineered performance system.',
        icon: 'gauge',
        value: '3.2s',
      },
      {
        id: 'range',
        title: 'Extended Range',
        description: 'Go further with our advanced battery technology, giving you the freedom to explore without limits.',
        icon: 'battery',
        value: '420 miles',
      },
      {
        id: 'technology',
        title: 'Neural Interface',
        description: 'Our AI-powered system learns your preferences and adapts for the ultimate personalized driving experience.',
        icon: 'cpu',
      },
      {
        id: 'safety',
        title: 'Guardian Shield',
        description: 'State-of-the-art safety systems including predictive collision avoidance and reinforced structure.',
        icon: 'shield',
      },
      {
        id: 'comfort',
        title: 'Atmospheric Comfort',
        description: 'Climate-adaptive seating with biometric monitoring ensures perfect comfort in any condition.',
        icon: 'thermometer',
      }
    ],
    parts: [
      {
        id: 'wheels',
        name: 'Quantum Alloy Wheels',
        description: 'Precision-engineered lightweight alloy wheels with carbon fiber accents for optimal performance.',
        image: 'https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        id: 'brakes',
        name: 'Pulse Braking System',
        description: 'Regenerative carbon-ceramic brakes providing unmatched stopping power and energy recovery.',
        image: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        id: 'seats',
        name: 'Contour Adaptive Seats',
        description: 'Memory foam seating with dynamic support and climate control for ultimate comfort.',
        image: 'https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        id: 'dashboard',
        name: 'Neural Command Center',
        description: 'Holographic display with gesture control and voice-activated AI assistant.',
        image: 'https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=800',
      }
    ],
    specs: {
      power: '580 HP',
      torque: '650 Nm',
      acceleration: '3.2s (0-60 mph)',
      topSpeed: '175 mph',
      range: '420 miles',
      batteryCapacity: '95 kWh',
      chargingTime: '35 min (10-80%)',
      weight: '4,680 lbs',
      seating: '5',
      groundClearance: '6.6 inches',
      wheelbase: '116.7 inches',
      length: '195.7 inches',
      width: '78.2 inches',
      height: '56.5 inches',
    }
  }
];

export const getModelById = (id: string): VehicleModel | undefined => {
  return vehicleModels.find(model => model.id === id);
};

export default vehicleModels;