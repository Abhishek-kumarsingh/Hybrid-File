import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Categories from './components/Categories';
import Designers from './components/Designers';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize AOS with a slight delay to ensure proper loading
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: false,
          mirror: true, // whether elements should animate out while scrolling past them
          offset: 100, // offset (in px) from the original trigger point
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <Hero />
      <About />
      <Categories />
      <Designers />
      <Gallery />
      <Testimonials />
      <Booking />
      <Footer />
    </div>
  );
}

export default App;