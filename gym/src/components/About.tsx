import React from 'react';
import { Award, Target, Users, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const milestones = [
    {
      year: '2013',
      title: 'Grand Opening',
      description: 'PULSE Fitness opened its doors with state-of-the-art equipment and expert trainers.',
      icon: <Award className="h-6 w-6 text-neon-blue" />
    },
    {
      year: '2016',
      title: 'Expansion',
      description: 'Expanded facilities to include specialized training zones and recovery areas.',
      icon: <TrendingUp className="h-6 w-6 text-neon-green" />
    },
    {
      year: '2019',
      title: 'Community Growth',
      description: 'Reached 5,000 active members and launched our community outreach programs.',
      icon: <Users className="h-6 w-6 text-neon-red" />
    },
    {
      year: '2023',
      title: 'Innovation Hub',
      description: 'Introduced cutting-edge training technology and personalized fitness tracking.',
      icon: <Target className="h-6 w-6 text-neon-blue" />
    }
  ];

  return (
    <section id="about" className="section bg-gradient-to-b from-background to-background-light">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            About <span className="text-neon-blue">PULSE</span> Fitness
          </h2>
          <p className="text-lg text-gray-300" data-aos="fade-up" data-aos-delay="100">
            Founded in 2013, PULSE has evolved from a simple gym to a comprehensive fitness ecosystem 
            designed to transform lives through innovative training methodologies and unwavering support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div 
              className="rounded-2xl overflow-hidden" 
              data-aos="fade-right"
            >
              <img 
                src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="PULSE Fitness facility"
                className="w-full h-[400px] object-cover object-center"
              />
            </div>
          </div>

          <div>
            <h3 
              className="text-2xl font-bold mb-6" 
              data-aos="fade-left"
            >
              Our Evolution
            </h3>
            
            <div className="relative pl-8 border-l-2 border-light-gray">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="mb-10 relative"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute -left-[41px] p-2 rounded-full bg-background-light border-2 border-light-gray">
                    {milestone.icon}
                  </div>
                  <h4 className="text-neon-blue text-lg font-bold mb-1">{milestone.year}</h4>
                  <h5 className="text-xl font-semibold mb-2">{milestone.title}</h5>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-dark-gray rounded-2xl p-8" data-aos="fade-up">
          <h3 className="text-2xl font-bold mb-6 text-center">Our Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Guidance",
                description: "Our certified trainers bring years of experience to create personalized fitness journeys.",
                icon: <Award className="h-10 w-10 text-neon-blue mb-4" />
              },
              {
                title: "Community Support",
                description: "Join a community that celebrates every victory and supports you through challenges.",
                icon: <Users className="h-10 w-10 text-neon-green mb-4" />
              },
              {
                title: "Results-Driven",
                description: "We're committed to helping you achieve measurable, sustainable fitness results.",
                icon: <Target className="h-10 w-10 text-neon-red mb-4" />
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center p-6 card-glass"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;