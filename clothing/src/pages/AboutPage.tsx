import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OurStory from '../components/about/OurStory';

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  // Timeline data
  const timelineEvents = [
    {
      year: '2010',
      title: 'The Beginning',
      description: 'ELYSIAN was founded with a vision to create timeless, sustainable fashion that transcends trends and seasons.',
      image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2014',
      title: 'Sustainable Practices',
      description: 'We implemented fully sustainable production practices, ensuring ethical manufacturing and eco-friendly materials.',
      image: 'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2017',
      title: 'Global Expansion',
      description: 'ELYSIAN expanded to international markets, bringing our vision of sustainable luxury to fashion enthusiasts worldwide.',
      image: 'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'We embraced the digital era, enhancing our online presence and creating immersive shopping experiences.',
      image: 'https://images.pexels.com/photos/5704847/pexels-photo-5704847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      year: '2023',
      title: 'The Future',
      description: 'Today, we continue to innovate and push boundaries, staying true to our core values of quality, sustainability, and timeless design.',
      image: 'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  // Team members data
  const teamMembers = [
    {
      name: 'Sophia Reynolds',
      role: 'Founder & Creative Director',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'With over 15 years of experience in luxury fashion, Sophia brings her visionary approach to every ELYSIAN collection.'
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Marcus combines traditional craftsmanship with innovative techniques to create pieces that are both timeless and contemporary.'
    },
    {
      name: 'Olivia Patel',
      role: 'Sustainability Officer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Olivia ensures that every aspect of our production meets the highest standards of sustainability and ethical practices.'
    },
    {
      name: 'James Wilson',
      role: 'Operations Director',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'James oversees our global operations, ensuring that quality and craftsmanship are maintained across all our collections.'
    }
  ];

  // Values data
  const values = [
    {
      title: 'Sustainability',
      description: 'We are committed to sustainable practices throughout our supply chain, from sourcing materials to manufacturing and distribution.',
      icon: '🌱'
    },
    {
      title: 'Craftsmanship',
      description: 'Every piece is meticulously crafted with attention to detail, honoring traditional techniques while embracing innovation.',
      icon: '✂️'
    },
    {
      title: 'Timelessness',
      description: 'We create enduring designs that transcend trends, focusing on quality and style that stands the test of time.',
      icon: '⏱️'
    },
    {
      title: 'Inclusivity',
      description: 'We celebrate diversity and create fashion that empowers individuals to express their unique identity and style.',
      icon: '🤝'
    }
  ];

  return (
    <div ref={containerRef} className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
          <div className="absolute inset-0 bg-dark-950/50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.span
                className="inline-block text-white/80 text-sm uppercase tracking-widest mb-4 font-inter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our Story
              </motion.span>

              <motion.h1
                className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Crafting Timeless <br />
                <span className="italic">Elegance</span>
              </motion.h1>

              <motion.p
                className="text-white/90 text-lg mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Since our founding, we've been dedicated to creating premium clothing that combines exceptional craftsmanship, sustainable practices, and timeless design.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Our Story Section with Background Image */}
      <OurStory />

      {/* Our Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-dark-600 text-sm uppercase tracking-widest mb-4 font-inter block">Our Mission</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-6">Redefining Luxury Through Sustainability</h2>
              <p className="text-dark-600 text-lg mb-6 leading-relaxed">
                At ELYSIAN, we believe that true luxury lies in the perfect balance of exceptional quality, timeless design, and responsible production. Our mission is to create clothing that not only looks and feels exquisite but also respects our planet and the people who make it.
              </p>
              <p className="text-dark-600 text-lg mb-8 leading-relaxed">
                We are committed to pushing the boundaries of sustainable fashion, proving that ethical practices and luxury can coexist beautifully. Every piece in our collection tells a story of craftsmanship, innovation, and conscious creation.
              </p>
              <Link
                to="/collections"
                className="btn btn-primary group"
              >
                Explore Our Collections
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div
              className="relative h-[500px] overflow-hidden rounded-lg shadow-elegant"
              style={{ y: y1 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Sustainable fashion production"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-beige-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span
              className="text-dark-600 text-sm uppercase tracking-widest mb-4 font-inter block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Journey
            </motion.span>
            <motion.h2
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The ELYSIAN Timeline
            </motion.h2>
            <motion.p
              className="text-dark-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From our humble beginnings to our global presence today, explore the key milestones that have shaped our brand.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-dark-300"></div>

            {/* Timeline Events */}
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                className={`relative mb-24 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-dark-900 border-4 border-beige-50 z-10"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                    <span className="inline-block text-dark-900 text-3xl font-playfair font-medium mb-4">{event.year}</span>
                    <h3 className="text-2xl font-medium mb-4">{event.title}</h3>
                    <p className="text-dark-600">{event.description}</p>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 0 ? 'md:order-first' : ''}`}>
                    <div className="h-64 overflow-hidden rounded-lg shadow-elegant">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="font-playfair text-3xl md:text-4xl font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Core Values
            </motion.h2>
            <motion.p
              className="text-dark-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              These principles guide everything we do, from design to production to customer experience.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-dark-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="font-playfair text-3xl md:text-4xl font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              className="text-dark-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The passionate individuals behind ELYSIAN who bring our vision to life.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="overflow-hidden rounded-lg mb-4 aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-dark-600 text-sm mb-3">{member.role}</p>
                <p className="text-dark-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
