import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Menu from './components/home/Menu';
import Gallery from './components/home/Gallery';
import Baristas from './components/home/Baristas';
import Testimonials from './components/home/Testimonials';
import Reservation from './components/home/Reservation';

function App() {
  // Create a coffee icon for the favicon (could also use an actual favicon file)
  useEffect(() => {
    const createFavicon = () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5A2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
          <line x1="6" y1="2" x2="6" y2="4"></line>
          <line x1="10" y1="2" x2="10" y2="4"></line>
          <line x1="14" y1="2" x2="14" y2="4"></line>
        </svg>
      `;
      const blob = new Blob([svg], {type: 'image/svg+xml'});
      const url = URL.createObjectURL(blob);
      const link = document.querySelector("link[rel='icon']");
      if (link) {
        link.setAttribute('href', url);
      }
    };
    
    createFavicon();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Baristas />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </div>
  );
}

export default App;