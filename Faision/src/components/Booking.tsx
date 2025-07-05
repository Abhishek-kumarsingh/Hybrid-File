import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DropEvent {
  id: number;
  name: string;
  date: string;
  image: string;
}

const upcomingDrops: DropEvent[] = [
  {
    id: 1,
    name: 'Summer Collection',
    date: '2025-06-15T10:00:00',
    image: 'https://images.pexels.com/photos/6347546/pexels-photo-6347546.jpeg'
  },
  {
    id: 2,
    name: 'Limited Editon Sneakers',
    date: '2025-07-01T18:00:00',
    image: 'https://images.pexels.com/photos/6500157/pexels-photo-6500157.jpeg'
  },
  {
    id: 3,
    name: 'Fall Preview',
    date: '2025-08-20T12:00:00',
    image: 'https://images.pexels.com/photos/4937223/pexels-photo-4937223.jpeg'
  }
];

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Booking: React.FC = () => {
  const [selectedDrop, setSelectedDrop] = useState(upcomingDrops[0]);
  const [countdown, setCountdown] = useState<CountdownValues>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const dropDate = new Date(selectedDrop.date).getTime();
      const now = new Date().getTime();
      const difference = dropDate - now;
      
      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };
    
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [selectedDrop]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to a backend
    alert(`Thank you! You'll be notified about ${selectedDrop.name} at ${email}`);
    setEmail('');
  };

  return (
    <section id="shop" className="py-20 bg-dark-800 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4"
            data-aos="fade-up"
          >
            UPCOMING <span className="text-neon-teal">DROPS</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-gray-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Don't miss our exclusive product drops. Set a reminder to be the first to shop our limited-edition releases.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-2xl font-montserrat font-bold mb-6">Select a Drop</h3>
              
              <div className="space-y-4">
                {upcomingDrops.map((drop) => (
                  <div 
                    key={drop.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedDrop.id === drop.id 
                        ? 'bg-dark-700 border-l-4 border-neon-teal' 
                        : 'bg-dark-600/50 hover:bg-dark-700/70'
                    }`}
                    onClick={() => setSelectedDrop(drop)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src={drop.image} 
                          alt={drop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-montserrat font-bold">{drop.name}</h4>
                        <div className="flex items-center text-sm text-gray-300 mt-1">
                          <Calendar size={14} className="mr-1" />
                          <span>{new Date(drop.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                          <Clock size={14} className="ml-3 mr-1" />
                          <span>{new Date(drop.date).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="mt-8">
                <h4 className="font-montserrat font-bold mb-3">Get a Reminder</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 bg-dark-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-neon-teal"
                    required
                  />
                  <button 
                    type="submit"
                    className="neon-button rounded-r-md rounded-l-none"
                  >
                    NOTIFY ME
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="relative" data-aos="fade-left">
            <div 
              className="relative h-96 rounded-xl overflow-hidden"
              style={{
                backgroundImage: `url(${selectedDrop.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-3xl font-montserrat font-bold mb-2">{selectedDrop.name}</h3>
                <p className="text-neon-teal mb-8">Dropping Soon</p>
                
                <div className="grid grid-cols-4 gap-4 w-full max-w-md">
                  {[
                    { label: 'DAYS', value: countdown.days },
                    { label: 'HOURS', value: countdown.hours },
                    { label: 'MINS', value: countdown.minutes },
                    { label: 'SECS', value: countdown.seconds },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div className="w-full aspect-square bg-dark-800/80 backdrop-blur-sm rounded-md flex items-center justify-center border border-neon-teal/30">
                        <span className="text-2xl md:text-3xl font-montserrat font-bold">
                          {item.value < 10 ? `0${item.value}` : item.value}
                        </span>
                      </div>
                      <span className="text-xs mt-2">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;