import React from 'react';
import { Award, TrendingUp, Sparkles, UserCheck } from 'lucide-react';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLeft?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, icon, isLeft = true }) => {
  return (
    <div className={`flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 mb-12`}>
      <div 
        className={`md:w-1/2 flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-center`}
        data-aos={isLeft ? "fade-right" : "fade-left"}
      >
        <div className={`w-full max-w-md ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
          <div className={`inline-flex items-center ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-center mb-2`}>
            <span className="text-neon-pink font-montserrat font-bold">{year}</span>
          </div>
          <h3 className="text-2xl font-montserrat font-bold mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
      
      <div className="relative flex items-center justify-center md:w-0">
        <div className="h-full w-px bg-gradient-to-b from-neon-pink via-neon-purple to-neon-teal absolute"></div>
        <div className="w-16 h-16 rounded-full bg-dark-800 border-2 border-neon-pink flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,0,255,0.7)]">
          {icon}
        </div>
      </div>
      
      <div className="md:w-1/2 hidden md:block"></div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4"
            data-aos="fade-up"
          >
            OUR <span className="text-neon-pink">JOURNEY</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-gray-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            From humble beginnings to redefining the fashion industry, 
            discover how we've been pushing boundaries since 2010.
          </p>
        </div>
        
        <div className="relative">
          <TimelineItem 
            year="2010" 
            title="The Beginning" 
            description="FAISION was founded with a vision to bridge the gap between streetwear culture and high fashion."
            icon={<Sparkles size={24} className="text-neon-pink" />}
          />
          
          <TimelineItem 
            year="2015" 
            title="Global Expansion" 
            description="We expanded to international markets, bringing our unique vision to fashion enthusiasts worldwide."
            icon={<TrendingUp size={24} className="text-neon-teal" />}
            isLeft={false}
          />
          
          <TimelineItem 
            year="2018" 
            title="Award Recognition" 
            description="Our dedication to quality and innovation earned us the prestigious Fashion Forward Award."
            icon={<Award size={24} className="text-neon-purple" />}
          />
          
          <TimelineItem 
            year="2023" 
            title="Community Focus" 
            description="We launched our community platform, connecting designers with fashion enthusiasts across the globe."
            icon={<UserCheck size={24} className="text-neon-pink" />}
            isLeft={false}
          />
        </div>
      </div>
    </section>
  );
};

export default About;