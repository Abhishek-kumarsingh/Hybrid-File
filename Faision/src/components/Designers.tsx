import React from 'react';

interface Designer {
  name: string;
  image: string;
  role: string;
  skills: {
    name: string;
    value: number;
  }[];
}

const designers: Designer[] = [
  {
    name: 'Alex Morgan',
    image: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg',
    role: 'Creative Director',
    skills: [
      { name: 'Haute Couture', value: 95 },
      { name: 'Streetwear', value: 85 },
      { name: 'Sustainable Fashion', value: 90 },
    ]
  },
  {
    name: 'Jordan Chen',
    image: 'https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg',
    role: 'Head Designer',
    skills: [
      { name: 'Streetwear', value: 98 },
      { name: 'Urban Couture', value: 92 },
      { name: 'Accessory Design', value: 85 },
    ]
  },
  {
    name: 'Zara Williams',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    role: 'Fashion Stylist',
    skills: [
      { name: 'Editorial Styling', value: 90 },
      { name: 'Celebrity Styling', value: 94 },
      { name: 'Trend Forecasting', value: 88 },
    ]
  },
  {
    name: 'Marcus Rivera',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    role: 'Accessories Designer',
    skills: [
      { name: 'Jewelry Design', value: 92 },
      { name: 'Leather Goods', value: 96 },
      { name: 'Digital Wearables', value: 89 },
    ]
  }
];

const Designers: React.FC = () => {
  return (
    <section id="designers" className="py-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4"
            data-aos="fade-up"
          >
            OUR <span className="text-neon-purple">DESIGNERS</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-gray-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Meet the visionary minds behind our collections, pushing the boundaries of fashion and setting new trends.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {designers.map((designer, index) => (
            <div 
              key={designer.name}
              className="glass-card rounded-xl overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-80 overflow-hidden">
                <img 
                  src={designer.image} 
                  alt={designer.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-montserrat font-bold">{designer.name}</h3>
                <p className="text-neon-pink mb-4">{designer.role}</p>
                
                <div className="space-y-3">
                  {designer.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-dark-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-neon-pink to-neon-purple rounded-full"
                          style={{ width: `${skill.value}%`, transition: 'width 1.5s ease-in-out' }}
                          data-aos="slide-right"
                          data-aos-anchor-placement="center-bottom"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Designers;