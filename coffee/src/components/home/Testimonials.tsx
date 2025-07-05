import React, { useEffect } from 'react';
import AOS from 'aos';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star } from 'lucide-react';
import { testimonials } from '../../data/testimonialsData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="section bg-primary text-white py-20">
      <div className="container-custom">
        <div className="section-title">
          <h2 data-aos="fade-up" className="text-white">What Our Customers Say</h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-white/80 max-w-3xl mx-auto mt-4">
            The experiences of our valued coffee community
          </p>
        </div>

        <div className="mt-12" data-aos="fade-up">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="testimonial-swiper pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-lg p-6 shadow-lg text-text relative">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-medium">{testimonial.name}</h4>
                      <p className="text-xs text-text/70">{testimonial.date}</p>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        className={i < testimonial.rating ? "text-primary-light fill-primary-light" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="quote-marks relative px-2 text-text/80">
                    {testimonial.content}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;