import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { menuItems, categories } from '../../data/menuData';
import { MenuItem } from '../../types';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section id="menu" className="section">
      <div className="container-custom">
        <div className="section-title">
          <h2 data-aos="fade-up">Our Menu</h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-text/80 max-w-3xl mx-auto mt-4">
            Discover our handcrafted selection of beverages and delicious treats
          </p>
        </div>

        {/* Featured Items */}
        <div className="mb-16">
          <h3 className="text-center mb-8" data-aos="fade-up">Featured Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems
              .filter(item => item.featured)
              .map((item, index) => (
                <div
                  key={item.id}
                  className="card group overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs py-1 px-2 rounded-full">
                      Featured
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg">{item.name}</h4>
                      <span className="text-primary font-bold">{item.price}</span>
                    </div>
                    <p className="text-text/80 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-8" data-aos="fade-up">
          {categories.map(category => (
            <button
              key={category.id}
              className={`menu-tab px-4 py-2 rounded-md transition-colors ${
                activeCategory === category.id ? 'active text-primary font-medium' : 'text-text/70 hover:text-primary'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index % 3 * 100}
            >
              <div className="w-1/3 h-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-lg">{item.name}</h4>
                  <span className="text-primary font-bold">{item.price}</span>
                </div>
                <p className="text-text/80 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12" data-aos="fade-up">
          <a href="#reservation" className="btn btn-primary">Order Now</a>
        </div>
      </div>
    </section>
  );
};

export default Menu;