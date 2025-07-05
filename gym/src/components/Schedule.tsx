import React, { useState } from 'react';
import { Calendar, Clock, Users, Dumbbell, Activity, Target } from 'lucide-react';

interface ClassType {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface ClassSession {
  id: number;
  name: string;
  type: string;
  day: string;
  startTime: string;
  endTime: string;
  trainer: string;
  capacity: number;
  enrolled: number;
}

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const daysOfWeek = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  const classTypes: ClassType[] = [
    { id: 'strength', name: 'Strength', icon: <Dumbbell size={18} />, color: 'neon-blue' },
    { id: 'hiit', name: 'HIIT', icon: <Activity size={18} />, color: 'neon-red' },
    { id: 'yoga', name: 'Yoga', icon: <Users size={18} />, color: 'neon-green' },
    { id: 'all', name: 'All Classes', icon: <Target size={18} />, color: 'white' }
  ];

  const classSessions: ClassSession[] = [
    { id: 1, name: 'Power Lifting', type: 'strength', day: 'monday', startTime: '06:00', endTime: '07:30', trainer: 'Alex Rivera', capacity: 12, enrolled: 8 },
    { id: 2, name: 'Morning HIIT', type: 'hiit', day: 'monday', startTime: '08:00', endTime: '09:00', trainer: 'Sofia Chen', capacity: 20, enrolled: 15 },
    { id: 3, name: 'Vinyasa Flow', type: 'yoga', day: 'monday', startTime: '10:00', endTime: '11:00', trainer: 'Marcus Johnson', capacity: 15, enrolled: 10 },
    { id: 4, name: 'Strength Circuits', type: 'strength', day: 'monday', startTime: '17:00', endTime: '18:30', trainer: 'Alex Rivera', capacity: 15, enrolled: 12 },
    { id: 5, name: 'Evening HIIT', type: 'hiit', day: 'monday', startTime: '19:00', endTime: '20:00', trainer: 'Sofia Chen', capacity: 20, enrolled: 18 },
    
    { id: 6, name: 'Functional Strength', type: 'strength', day: 'tuesday', startTime: '07:00', endTime: '08:30', trainer: 'Alex Rivera', capacity: 12, enrolled: 10 },
    { id: 7, name: 'HIIT & Core', type: 'hiit', day: 'tuesday', startTime: '09:00', endTime: '10:00', trainer: 'Sofia Chen', capacity: 20, enrolled: 12 },
    { id: 8, name: 'Restorative Yoga', type: 'yoga', day: 'tuesday', startTime: '12:00', endTime: '13:00', trainer: 'Marcus Johnson', capacity: 15, enrolled: 8 },
    { id: 9, name: 'Olympic Lifting', type: 'strength', day: 'tuesday', startTime: '18:00', endTime: '19:30', trainer: 'Alex Rivera', capacity: 10, enrolled: 9 },
    
    { id: 10, name: 'Morning Flow', type: 'yoga', day: 'wednesday', startTime: '06:30', endTime: '07:30', trainer: 'Marcus Johnson', capacity: 15, enrolled: 7 },
    { id: 11, name: 'Cardio Blast', type: 'hiit', day: 'wednesday', startTime: '08:00', endTime: '09:00', trainer: 'Sofia Chen', capacity: 20, enrolled: 15 },
    { id: 12, name: 'Strength & Power', type: 'strength', day: 'wednesday', startTime: '17:30', endTime: '19:00', trainer: 'Alex Rivera', capacity: 12, enrolled: 11 },
    { id: 13, name: 'Night Yoga', type: 'yoga', day: 'wednesday', startTime: '20:00', endTime: '21:00', trainer: 'Marcus Johnson', capacity: 15, enrolled: 5 },
    
    { id: 14, name: 'Functional HIIT', type: 'hiit', day: 'thursday', startTime: '07:00', endTime: '08:00', trainer: 'Sofia Chen', capacity: 20, enrolled: 14 },
    { id: 15, name: 'Strength Focus', type: 'strength', day: 'thursday', startTime: '09:00', endTime: '10:30', trainer: 'Alex Rivera', capacity: 12, enrolled: 8 },
    { id: 16, name: 'Lunchtime Yoga', type: 'yoga', day: 'thursday', startTime: '12:30', endTime: '13:30', trainer: 'Marcus Johnson', capacity: 15, enrolled: 10 },
    { id: 17, name: 'Evening HIIT', type: 'hiit', day: 'thursday', startTime: '18:00', endTime: '19:00', trainer: 'Sofia Chen', capacity: 20, enrolled: 19 },
    
    { id: 18, name: 'Power Hour', type: 'strength', day: 'friday', startTime: '06:00', endTime: '07:00', trainer: 'Alex Rivera', capacity: 15, enrolled: 12 },
    { id: 19, name: 'HIIT & Stretch', type: 'hiit', day: 'friday', startTime: '08:30', endTime: '09:30', trainer: 'Sofia Chen', capacity: 20, enrolled: 13 },
    { id: 20, name: 'Yoga Fundamentals', type: 'yoga', day: 'friday', startTime: '11:00', endTime: '12:00', trainer: 'Marcus Johnson', capacity: 15, enrolled: 9 },
    { id: 21, name: 'Friday Strength', type: 'strength', day: 'friday', startTime: '17:00', endTime: '18:30', trainer: 'Alex Rivera', capacity: 12, enrolled: 11 },
    
    { id: 22, name: 'Weekend Warrior', type: 'hiit', day: 'saturday', startTime: '08:00', endTime: '09:30', trainer: 'Sofia Chen', capacity: 25, enrolled: 22 },
    { id: 23, name: 'Open Gym', type: 'strength', day: 'saturday', startTime: '10:00', endTime: '13:00', trainer: 'Alex Rivera', capacity: 30, enrolled: 18 },
    { id: 24, name: 'Weekend Yoga', type: 'yoga', day: 'saturday', startTime: '14:00', endTime: '15:00', trainer: 'Marcus Johnson', capacity: 20, enrolled: 15 },
    
    { id: 25, name: 'Sunday Flow', type: 'yoga', day: 'sunday', startTime: '09:00', endTime: '10:00', trainer: 'Marcus Johnson', capacity: 20, enrolled: 12 },
    { id: 26, name: 'Open Gym', type: 'strength', day: 'sunday', startTime: '11:00', endTime: '14:00', trainer: 'Rotating Staff', capacity: 30, enrolled: 15 },
    { id: 27, name: 'Recovery Session', type: 'yoga', day: 'sunday', startTime: '15:00', endTime: '16:00', trainer: 'Marcus Johnson', capacity: 15, enrolled: 8 }
  ];

  const filteredClasses = classSessions.filter(session => {
    if (session.day !== selectedDay) return false;
    if (selectedType && selectedType !== 'all' && session.type !== selectedType) return false;
    return true;
  });

  return (
    <section id="schedule" className="section">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            Class <span className="text-neon-blue">Schedule</span>
          </h2>
          <p className="text-lg text-gray-300" data-aos="fade-up" data-aos-delay="100">
            Find the perfect class to fit your schedule and fitness goals. Our diverse range of classes
            caters to all fitness levels and interests.
          </p>
        </div>

        <div className="bg-dark-gray rounded-2xl p-6 md:p-8" data-aos="fade-up">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
            <div className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
              {daysOfWeek.map(day => (
                <button
                  key={day.id}
                  className={`px-4 py-2 whitespace-nowrap rounded-lg transition-colors mr-2 ${
                    selectedDay === day.id ? 'bg-neon-blue text-black' : 'bg-medium-gray text-white'
                  }`}
                  onClick={() => setSelectedDay(day.id)}
                >
                  {day.label}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {classTypes.map(type => (
                <button
                  key={type.id}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    selectedType === type.id || (type.id === 'all' && !selectedType)
                      ? `bg-${type.id === 'all' ? 'medium-gray' : type.color} ${type.id === 'all' ? 'text-white' : 'text-black'}`
                      : 'bg-background-light text-white'
                  }`}
                  onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
                >
                  {type.icon}
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {filteredClasses.length > 0 ? (
              filteredClasses.map(session => (
                <div 
                  key={session.id}
                  className={`card-glass p-4 border-l-4 border-${session.type === 'strength' ? 'neon-blue' : session.type === 'hiit' ? 'neon-red' : 'neon-green'} flex flex-wrap md:flex-nowrap items-center justify-between gap-4`}
                >
                  <div className="w-full md:w-1/4">
                    <h3 className="text-lg font-semibold">{session.name}</h3>
                    <p className="text-sm text-gray-300">with {session.trainer}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full md:w-1/2">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm">{session.startTime} - {session.endTime}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-sm">{session.enrolled}/{session.capacity}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {session.type === 'strength' && <Dumbbell size={16} className="text-neon-blue" />}
                      {session.type === 'hiit' && <Activity size={16} className="text-neon-red" />}
                      {session.type === 'yoga' && <Users size={16} className="text-neon-green" />}
                      <span className="text-sm capitalize">{session.type}</span>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/4 flex justify-end">
                    <button 
                      className={`px-4 py-2 rounded-lg ${
                        session.enrolled >= session.capacity 
                          ? 'bg-medium-gray text-gray-400 cursor-not-allowed' 
                          : 'bg-neon-blue text-black hover:bg-opacity-90 transition-colors'
                      }`}
                      disabled={session.enrolled >= session.capacity}
                    >
                      {session.enrolled >= session.capacity ? 'Full' : 'Book Class'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-semibold mb-2">No Classes Found</h3>
                <p className="text-gray-400">
                  There are no classes scheduled for this day with the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>

        <div 
          className="mt-16 card-glass p-8" 
          data-aos="fade-up"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Join PULSE Today</h3>
              <p className="text-gray-300 mb-6">
                Ready to transform your life? Fill out the form and one of our membership advisors will
                contact you to help you choose the perfect membership plan.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                  <p>Personalized fitness assessment</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                  <p>Custom training program</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-red"></div>
                  <p>Nutrition guidance</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
                  <p>Supportive community</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="goals" className="block text-sm font-medium mb-1">Fitness Goals</label>
                  <textarea
                    id="goals"
                    rows={3}
                    className="w-full px-4 py-3 bg-medium-gray border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    placeholder="Tell us about your fitness goals"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary text-black w-full">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;