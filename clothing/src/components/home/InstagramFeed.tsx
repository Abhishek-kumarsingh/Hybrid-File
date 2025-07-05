import React from 'react';
import { Link } from 'react-router-dom';
import { instagramPosts } from '../../data/products';
import { Instagram } from 'lucide-react';

const InstagramFeed: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-3">
            @elysian_style
          </h2>
          <p className="text-dark-600 max-w-xl mx-auto">
            Follow us on Instagram for daily inspiration and styling ideas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <Link
              to={`/product/${post.productId}`}
              key={post.id}
              className="group relative overflow-hidden block aspect-square"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark-950 opacity-0 group-hover:opacity-40 flex items-center justify-center transition-opacity duration-300">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white bg-opacity-90 rounded-full p-2">
                  <Instagram size={20} className="text-dark-950" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10" data-aos="fade-up">
          <a
            href="#"
            className="inline-block border-b border-dark-950 text-dark-950 pb-1 hover:border-primary-800 hover:text-primary-800 transition-colors text-sm uppercase tracking-wider"
          >
            View More On Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;