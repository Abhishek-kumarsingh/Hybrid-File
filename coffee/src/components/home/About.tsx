import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Coffee, Award, Leaf, Users } from 'lucide-react';

const About: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const timelineEvents = [
    {
      year: '2015',
      title: 'The Beginning',
      description: 'Brewed Bliss was born from a passion for exceptional coffee and a vision to create a welcoming space for the community.',
      icon: <Coffee size={24} />,
    },
    {
      year: '2017',
      title: 'Award Winning',
      description: 'Our dedication to quality was recognized with our first "Best Local Roaster" award, a testament to our careful bean selection process.',
      icon: <Award size={24} />,
    },
    {
      year: '2020',
      title: 'Sustainability Focus',
      description: 'We committed to 100% ethical sourcing and introduced compostable packaging across all our products.',
      icon: <Leaf size={24} />,
    },
    {
      year: '2023',
      title: 'Community Growth',
      description: 'Expanded to three locations while maintaining our core values of quality, community, and sustainability.',
      icon: <Users size={24} />,
    },
  ];

  return (
    <section id="about" className="section bg-secondary">
      <div className="container-custom">
        <div className="section-title">
          <h2 data-aos="fade-up">Our Story</h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-text/80 max-w-3xl mx-auto mt-4">
            From bean to cup, we&apos;re dedicated to crafting the perfect coffee experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Left column - Story */}
          <div data-aos="fade-right">
            <h3 className="mb-6">Crafted with Passion</h3>
            <p className="mb-4 text-text/90">
              At Brewed Bliss, we believe that coffee is more than just a beverage—it&apos;s an art form, a culture, 
              and a moment of joy in your day. Our journey began with a simple idea: to create a space where 
              quality coffee and genuine connections could thrive.
            </p>
            <p className="mb-6 text-text/90">
              Every bean we source tells a story of sustainable farming, ethical trade, and meticulous attention 
              to detail. Our baristas are trained not just in the technical aspects of brewing, but in the art of 
              hospitality that makes every visit special.
            </p>
            <img 
              src="https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg" 
              alt="Coffee being crafted by a barista" 
              className="rounded-lg shadow-md h-72 w-full object-cover"
            />
          </div>

          {/* Right column - Timeline */}
          <div className="relative flex flex-col space-y-8 ml-4">
            {/* Timeline line */}
            <div className="absolute top-0 left-6 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2"></div>

            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <div 
                key={event.year} 
                className="relative flex"
                data-aos="fade-left" 
                data-aos-delay={index * 100}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white transform -translate-x-1/2 z-10">
                  {event.icon}
                </div>
                
                {/* Content */}
                <div className="ml-10 bg-white p-5 rounded-lg shadow-md flex-1">
                  <div className="text-primary-light font-bold mb-1">{event.year}</div>
                  <h4 className="text-xl mb-2">{event.title}</h4>
                  <p className="text-text/80">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {[
            {
              icon: <Coffee size={32} className="text-primary" />,
              title: 'Quality First',
              description: 'We source only the finest beans from trusted farms around the world.'
            },
            {
              icon: <Leaf size={32} className="text-accent" />,
              title: 'Sustainability',
              description: 'Ethical sourcing and eco-friendly practices are at the heart of our business.'
            },
            {
              icon: <Award size={32} className="text-primary-light" />,
              title: 'Expertise',
              description: 'Our baristas are certified professionals, constantly refining their craft.'
            },
            {
              icon: <Users size={32} className="text-accent-light" />,
              title: 'Community',
              description: 'We&apos;re more than a coffee shop—we&apos;re a gathering place for our neighborhood.'
            }
          ].map((value, index) => (
            <div 
              key={value.title} 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary">
                {value.icon}
              </div>
              <h3 className="text-xl mb-2">{value.title}</h3>
              <p className="text-text/80">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;