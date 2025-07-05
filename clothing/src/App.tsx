import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import LookbookPage from './pages/LookbookPage';
import Layout from './components/layout/Layout';
import AOS from 'aos';

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });

    // Refresh AOS on route change
    window.addEventListener('load', () => {
      AOS.refresh();
    });
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/lookbook" element={<LookbookPage />} />
      </Routes>
    </Layout>
  );
}

export default App;