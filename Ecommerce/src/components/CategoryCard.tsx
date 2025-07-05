import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCategory } from '../types/product';

interface CategoryCardProps {
  category: ProductCategory;
  delay?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, delay = 0 }) => {
  return (
    <Link 
      to={`/shop?category=${category.id}`} 
      className="block group"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="card card-hover">
        <div className="card-image card-image-hover aspect-w-1 aspect-h-1">
          <img 
            src={category.image} 
            alt={category.name} 
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
            <div className="p-6 w-full">
              <h3 className="text-white font-display text-xl font-semibold">{category.name}</h3>
              <p className="text-white/90 mt-1">{category.productCount} products</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard