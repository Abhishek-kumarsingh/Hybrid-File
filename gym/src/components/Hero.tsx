import React from 'react';
import { ChevronDown, Dumbbell, Zap, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-black to-background"
    >
      {/* Background overlay with grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-neon-blue font-medium mb-3">ELEVATE YOUR FITNESS JOURNEY</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                TRANSFORM <br />
                <span className="text-neon-blue animate-glow">YOUR BODY</span> <br />
                TRANSFORM <br />
                YOUR LIFE
              </h1>
              <p className="text-lg mb-8 max-w-lg text-gray-300">
                Join PULSE Fitness for a revolutionary approach to training. 
                Our state-of-the-art facility and expert trainers are ready to 
                guide you to your ultimate fitness potential.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#memberships" className="btn btn-primary text-black">
                  Explore Memberships
                </a>
                <a href="#about" className="btn btn-secondary">
                  Learn More
                </a>
              </div>
            </motion.div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { icon: <Dumbbell className="h-6 w-6 text-neon-blue" />, text: "Premium Equipment" },
                { icon: <Zap className="h-6 w-6 text-neon-green" />, text: "Expert Trainers" },
                { icon: <Timer className="h-6 w-6 text-neon-red" />, text: "24/7 Access" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  className="card-glass p-4 flex flex-col items-center text-center"
                >
                  {item.icon}
                  <p className="mt-2 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden neon-border"
            >
              <img 
                src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Athlete in training" 
                className="w-full h-[500px] object-cover object-center"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-5 -left-5 md:bottom-10 md:-left-10 card-glass neon-border-green p-4 max-w-[200px]"
            >
              <p className="text-3xl font-bold mb-1">10+</p>
              <p className="text-sm text-gray-300">Years Experience</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -top-5 -right-5 md:top-10 md:-right-10 card-glass neon-border-red p-4 max-w-[200px]"
            >
              <p className="text-3xl font-bold mb-1">1000+</p>
              <p className="text-sm text-gray-300">Success Stories</p>
            </motion.div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={30} className="text-neon-blue" />
      </a>
    </section>
  );
};

export default Hero;