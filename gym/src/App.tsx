import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MembershipPlans from './components/MembershipPlans';
import TrainerProfiles from './components/TrainerProfiles';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      mirror: false,
      offset: 100,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <MembershipPlans />
        <TrainerProfiles />
        <Gallery />
        <Testimonials />
        <Schedule />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;