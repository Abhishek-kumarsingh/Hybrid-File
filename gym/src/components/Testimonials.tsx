import React, { useRef, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { register } from 'swiper/element/bundle';

// Register Swiper web components
register();

interface Testimonial {
  id: number;
  name: string;
  image: string;
  role: string;
  quote: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const swiperRef = useRef<HTMLElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'James Wilson',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Member for 2 years',
      quote: 'PULSE has completely changed my approach to fitness. The trainers are incredibly knowledgeable and the community is so supportive. I\'ve exceeded goals I never thought possible.',
      rating: 5
    },
    {
      id: 2,
      name: 'Lisa Ramirez',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Member for 1 year',
      quote: 'After trying several gyms, PULSE is the first one where I\'ve actually stuck with my routine. The variety of classes and personalized training plans keep me motivated and excited to work out.',
      rating: 5
    },
    {
      id: 3,
      name: 'Robert Chen',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Member for 3 years',
      quote: 'The facilities at PULSE are unmatched, but what really sets it apart is the attention to detail. From nutrition advice to recovery techniques, they cover every aspect of fitness.',
      rating: 4
    },
    {
      id: 4,
      name: 'Michelle Taylor',
      image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Member for 6 months',
      quote: 'As someone who was intimidated by gyms, PULSE created a welcoming environment where I feel comfortable pushing my limits. I\'ve lost 25 pounds and gained so much confidence.',
      rating: 5
    }
  ];

  useEffect(() => {
    // Set up Swiper parameters
    if (swiperRef.current) {
      Object.assign(swiperRef.current, {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
        on: {
          init() {
            // Swiper initialized
          },
        },
      });
      
      // Initialize Swiper
      swiperRef.current.initialize();
    }

    // Set up navigation buttons
    if (prevRef.current && nextRef.current && swiperRef.current) {
      prevRef.current.addEventListener('click', () => {
        swiperRef.current?.swiper.slidePrev();
      });
      
      nextRef.current.addEventListener('click', () => {
        swiperRef.current?.swiper.slideNext();
      });
    }
  }, []);

  return (
    <section id="testimonials" className="section bg-gradient-to-b from-background to-background-light">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            Success <span className="text-neon-blue">Stories</span>
          </h2>
          <p className="text-lg text-gray-300" data-aos="fade-up" data-aos-delay="100">
            Hear from our members who have transformed their lives through dedication and
            the support of our PULSE community.
          </p>
        </div>

        <div className="relative px-6" data-aos="fade-up">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button 
              ref={prevRef}
              className="p-3 rounded-full bg-dark-gray text-white hover:bg-light-gray transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button 
              ref={nextRef}
              className="p-3 rounded-full bg-dark-gray text-white hover:bg-light-gray transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <swiper-container ref={swiperRef} init="false" class="mySwiper">
            {testimonials.map((testimonial) => (
              <swiper-slide key={testimonial.id}>
                <div className="card-glass p-6 relative h-full">
                  <div className="absolute -top-6 left-6 p-2 rounded-full bg-dark-gray">
                    <Quote size={24} className="text-neon-blue" />
                  </div>
                  
                  <div className="flex justify-center mb-6 pt-3">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-neon-blue"
                    />
                  </div>
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-neon-blue text-sm">{testimonial.role}</p>
                    <div className="flex justify-center mt-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={index < testimonial.rating ? 'text-neon-blue fill-current' : 'text-gray-500'}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-center text-gray-300 italic">"{testimonial.quote}"</p>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>

        <div 
          className="mt-16 bg-dark-gray rounded-2xl p-8 text-center"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join hundreds of members who have transformed their lives with PULSE Fitness.
            Your journey to a stronger, healthier you starts here.
          </p>
          <a href="#schedule" className="btn btn-primary text-black">
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;