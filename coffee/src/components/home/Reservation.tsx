import React, { useEffect } from 'react';
import AOS from 'aos';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Clock, MapPin, Phone } from 'lucide-react';
import L from 'leaflet';

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Location coordinates
const position: [number, number] = [37.7749, -122.4194]; // San Francisco example

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

const Reservation: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // In a real app, you would send this data to a server
    alert('Reservation request submitted! We will contact you shortly.');
  };

  return (
    <section id="reservation" className="section">
      <div className="container-custom">
        <div className="section-title">
          <h2 data-aos="fade-up">Visit Us</h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-text/80 max-w-3xl mx-auto mt-4">
            Reserve a table or place an order for pickup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Left column - Form */}
          <div data-aos="fade-right">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="mb-6">Make a Reservation</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      className={`w-full p-3 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your name"
                      {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">This field is required</span>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      className={`w-full p-3 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your email"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">Please enter a valid email</span>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">Phone</label>
                    <input 
                      type="tel" 
                      id="phone"
                      className={`w-full p-3 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your phone"
                      {...register('phone', { required: true })}
                    />
                    {errors.phone && <span className="text-red-500 text-xs mt-1">This field is required</span>}
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-text mb-1">Guests</label>
                    <select 
                      id="guests"
                      className={`w-full p-3 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${errors.guests ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('guests', { required: true })}
                    >
                      <option value="">Select number of guests</option>
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5+">5+ people</option>
                    </select>
                    {errors.guests && <span className="text-red-500 text-xs mt-1">Please select an option</span>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-text mb-1">Date</label>
                    <input 
                      type="date" 
                      id="date"
                      className={`w-full p-3 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('date', { required: true })}
                    />
                    {errors.date && <span className="text-red-500 text-xs mt-1">This field is required</span>}
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-text mb-1">Time</label>
                    <input 
                      type="time" 
                      id="time"
                      className={`w-full p-3 border rounded-md focus:ring focus:ring-primary/20 focus:outline-none ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                      {...register('time', { required: true })}
                    />
                    {errors.time && <span className="text-red-500 text-xs mt-1">This field is required</span>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-1">Special Requests</label>
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-primary/20 focus:outline-none"
                    placeholder="Any special requests or notes for your reservation..."
                    {...register('message')}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                >
                  Reserve a Table
                </button>
              </form>
            </div>
          </div>

          {/* Right column - Map and Info */}
          <div data-aos="fade-left">
            <div className="mb-8">
              <h3 className="mb-6">Find Us</h3>
              <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
                <MapContainer center={position} zoom={15} className="h-full w-full">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>
                      Brewed Bliss Coffee <br /> 123 Coffee Lane, Brewsville
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6 shadow-md">
              <h3 className="mb-4">Contact & Hours</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Address</h4>
                    <p className="text-text/80">123 Coffee Lane, Brewsville, CA 94321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Phone</h4>
                    <p className="text-text/80">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Hours</h4>
                    <ul className="text-text/80 space-y-1">
                      <li className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>7:00 AM - 8:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday</span>
                        <span>8:00 AM - 9:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday</span>
                        <span>8:00 AM - 6:00 PM</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;