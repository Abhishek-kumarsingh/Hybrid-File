export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'espresso' | 'lattes' | 'coldBrew' | 'snacks';
  featured?: boolean;
}

export interface BaristaProfile {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  rating: number;
  specialty: string;
}

export interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  image: string;
  date: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'ambience' | 'coffee' | 'food' | 'events';
}