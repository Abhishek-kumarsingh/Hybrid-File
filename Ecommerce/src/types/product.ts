export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  colors?: string[];
  sizes?: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
}

export type ProductCategory = {
  id: string;
  name: string;
  image: string;
  productCount: number;
};