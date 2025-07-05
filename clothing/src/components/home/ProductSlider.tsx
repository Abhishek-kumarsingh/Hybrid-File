import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products, ProductType } from '../../data/products';
import Swiper from 'swiper';
import 'swiper/css';

const ProductSlider: React.FC = () => {
  const swiperRef = useRef<null | Swiper>(null);
  const featuredProducts = products.filter(product => product.featured);

  useEffect(() => {
    if (swiperRef.current) return;

    swiperRef.current = new Swiper('.product-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      grabCursor: true,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
        swiperRef.current = null;
      }
    };
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div data-aos="fade-up">
            <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-3">Staff Picks</h2>
            <p className="text-dark-600">Our most coveted pieces, curated by our design team.</p>
          </div>
          <div className="flex space-x-2" data-aos="fade-left">
            <button
              onClick={handlePrev}
              className="bg-white border border-gray-200 rounded-full p-2 hover:bg-primary-50 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="bg-white border border-gray-200 rounded-full p-2 hover:bg-primary-50 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="product-swiper overflow-hidden" data-aos="fade-up">
          <div className="swiper-wrapper">
            {featuredProducts.map((product) => (
              <div key={product.id} className="swiper-slide">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden mb-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {product.discount && (
            <div className="absolute top-4 left-4 bg-accent-600 text-white text-xs py-1 px-2 uppercase tracking-wider">
              {product.discount}% Off
            </div>
          )}
          {product.newArrival && (
            <div className="absolute top-4 left-4 bg-dark-900 text-white text-xs py-1 px-2 uppercase tracking-wider">
              New Arrival
            </div>
          )}
          <div className="absolute inset-0 bg-dark-950 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
        </Link>
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between">
            <button className="text-dark-950 text-sm uppercase tracking-wider hover:text-primary-800 transition-colors">
              Quick View
            </button>
            <button className="text-dark-950 text-sm uppercase tracking-wider hover:text-primary-800 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-medium mb-1">
          <Link to={`/product/${product.id}`} className="hover:text-primary-800 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-dark-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductSlider;