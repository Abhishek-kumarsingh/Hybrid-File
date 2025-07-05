import React, { useState } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

interface Specialty {
  name: string;
  value: number;
  color: string;
}

interface Trainer {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties: Specialty[];
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

const TrainerProfiles: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const trainers: Trainer[] = [
    {
      id: 1,
      name: 'Alex Rivera',
      title: 'Head Strength Coach',
      image: 'https://images.pexels.com/photos/6456300/pexels-photo-6456300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Alex has over 10 years of experience in strength training and athletic performance. Specializing in powerlifting and functional movement, he helps clients build strength while maintaining mobility.',
      specialties: [
        { name: 'Strength Training', value: 95, color: 'neon-blue' },
        { name: 'Powerlifting', value: 90, color: 'neon-red' },
        { name: 'Nutrition', value: 85, color: 'neon-green' },
        { name: 'Functional Movement', value: 92, color: 'neon-blue' }
      ],
      socials: {
        instagram: '#',
        twitter: '#',
        facebook: '#'
      }
    },
    {
      id: 2,
      name: 'Sofia Chen',
      title: 'HIIT & Conditioning Specialist',
      image: 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Sofia specializes in high-intensity interval training and cardiovascular conditioning. Her energetic approach makes challenging workouts fun and effective for clients of all fitness levels.',
      specialties: [
        { name: 'HIIT Training', value: 98, color: 'neon-red' },
        { name: 'Group Fitness', value: 95, color: 'neon-blue' },
        { name: 'Weight Loss', value: 90, color: 'neon-green' },
        { name: 'Circuit Training', value: 92, color: 'neon-red' }
      ],
      socials: {
        instagram: '#',
        facebook: '#'
      }
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      title: 'Mobility & Recovery Coach',
      image: 'https://images.pexels.com/photos/6456147/pexels-photo-6456147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Marcus focuses on improving mobility, flexibility, and recovery strategies. His background in physical therapy helps clients prevent injuries and enhance performance through proper movement patterns.',
      specialties: [
        { name: 'Mobility Training', value: 97, color: 'neon-green' },
        { name: 'Injury Prevention', value: 94, color: 'neon-blue' },
        { name: 'Recovery Techniques', value: 95, color: 'neon-red' },
        { name: 'Stretching', value: 98, color: 'neon-green' }
      ],
      socials: {
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 4,
      name: 'Jasmine Taylor',
      title: 'Nutrition & Transformation Specialist',
      image: 'https://images.pexels.com/photos/5559985/pexels-photo-5559985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Jasmine combines nutrition coaching with personalized training to help clients achieve total body transformations. Her holistic approach addresses both exercise and lifestyle factors.',
      specialties: [
        { name: 'Nutrition Planning', value: 96, color: 'neon-blue' },
        { name: 'Weight Management', value: 94, color: 'neon-red' },
        { name: 'Body Composition', value: 90, color: 'neon-green' },
        { name: 'Lifestyle Coaching', value: 93, color: 'neon-blue' }
      ],
      socials: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <section id="trainers" className="section bg-gradient-to-b from-background-light to-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            Our <span className="text-neon-blue">Expert</span> Trainers
          </h2>
          <p className="text-lg text-gray-300" data-aos="fade-up" data-aos-delay="100">
            Meet our team of certified fitness professionals who are dedicated to helping you
            achieve your health and fitness goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div 
              key={trainer.id}
              className="group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div 
                className="card-glass overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                onClick={() => setSelectedTrainer(trainer)}
              >
                <div className="relative h-[350px] overflow-hidden">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name}
                    className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold">{trainer.name}</h3>
                    <p className="text-neon-blue">{trainer.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trainer Modal */}
        {selectedTrainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80" onClick={() => setSelectedTrainer(null)}>
            <div 
              className="card-glass p-0 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="h-[300px] md:h-full">
                  <img 
                    src={selectedTrainer.image}
                    alt={selectedTrainer.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-1">{selectedTrainer.name}</h3>
                  <p className="text-neon-blue text-lg mb-4">{selectedTrainer.title}</p>
                  <p className="mb-6 text-gray-300">{selectedTrainer.bio}</p>
                  
                  <h4 className="text-lg font-semibold mb-4">Specialties</h4>
                  <div className="space-y-4 mb-6">
                    {selectedTrainer.specialties.map((specialty, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span>{specialty.name}</span>
                          <span className={`text-${specialty.color}`}>{specialty.value}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className={`progress-bar-fill-${specialty.color.split('-')[1]} transition-all duration-1000`}
                            style={{ width: `${specialty.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    {selectedTrainer.socials.instagram && (
                      <a href={selectedTrainer.socials.instagram} className="text-gray-300 hover:text-neon-blue transition-colors">
                        <Instagram size={20} />
                      </a>
                    )}
                    {selectedTrainer.socials.facebook && (
                      <a href={selectedTrainer.socials.facebook} className="text-gray-300 hover:text-neon-blue transition-colors">
                        <Facebook size={20} />
                      </a>
                    )}
                    {selectedTrainer.socials.twitter && (
                      <a href={selectedTrainer.socials.twitter} className="text-gray-300 hover:text-neon-blue transition-colors">
                        <Twitter size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainerProfiles;