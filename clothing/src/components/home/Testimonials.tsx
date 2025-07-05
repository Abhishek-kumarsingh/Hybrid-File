import React, { useRef, useEffect } from 'react';
import { testimonials } from '../../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Swiper from 'swiper';
import 'swiper/css';

const Testimonials: React.FC = () => {
  const swiperRef = useRef<null | Swiper>(null);

  useEffect(() => {
    if (swiperRef.current) return;

    swiperRef.current = new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      loop: false, // Disabled loop mode due to insufficient slides
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
          // We have exactly 3 testimonials, so this is the maximum we can show
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div data-aos="fade-up">
            <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-3">What They Say</h2>
            <p className="text-dark-600">From fashion influencers and style enthusiasts.</p>
          </div>
          <div className="flex space-x-2" data-aos="fade-left">
            <button
              onClick={handlePrev}
              className="bg-white border border-gray-200 rounded-full p-2 hover:bg-primary-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="bg-white border border-gray-200 rounded-full p-2 hover:bg-primary-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="testimonials-swiper overflow-hidden" data-aos="fade-up">
          <div className="swiper-wrapper">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="swiper-slide">
                <div className="bg-beige-50 p-6 md:p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.33333 21.3333C8.22222 21.3333 7.27778 20.9444 6.5 20.1667C5.72222 19.3889 5.33333 18.4444 5.33333 17.3333C5.33333 16.2222 5.72222 15.2778 6.5 14.5C7.27778 13.7222 8.22222 13.3333 9.33333 13.3333C9.77778 13.3333 10.1667 13.3889 10.5 13.5C10.8333 13.6111 11.1111 13.7778 11.3333 14C11.1111 12.4444 10.5 11.1111 9.5 10C8.5 8.88889 7.22222 8.33333 5.66667 8.33333V5.33333C8.22222 5.33333 10.3333 6.22222 12 8C13.6667 9.77778 14.5 12.2222 14.5 15.3333C14.5 17.1111 14 18.6111 13 19.8333C12 21.0556 10.7778 21.6667 9.33333 21.3333ZM22.6667 21.3333C21.5556 21.3333 20.6111 20.9444 19.8333 20.1667C19.0556 19.3889 18.6667 18.4444 18.6667 17.3333C18.6667 16.2222 19.0556 15.2778 19.8333 14.5C20.6111 13.7222 21.5556 13.3333 22.6667 13.3333C23.1111 13.3333 23.5 13.3889 23.8333 13.5C24.1667 13.6111 24.4444 13.7778 24.6667 14C24.4444 12.4444 23.8333 11.1111 22.8333 10C21.8333 8.88889 20.5556 8.33333 19 8.33333V5.33333C21.5556 5.33333 23.6667 6.22222 25.3333 8C27 9.77778 27.8333 12.2222 27.8333 15.3333C27.8333 17.1111 27.3333 18.6111 26.3333 19.8333C25.3333 21.0556 24.1111 21.6667 22.6667 21.3333Z" fill="#B08971"/>
                    </svg>
                  </div>
                  <p className="text-dark-800 italic mb-6 leading-relaxed flex-grow">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-dark-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;