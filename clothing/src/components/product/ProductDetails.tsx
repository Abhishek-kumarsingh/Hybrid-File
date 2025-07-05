import React, { useState } from 'react';
import { Truck, RefreshCw, Shield, Award, Plus, Minus } from 'lucide-react';

interface ProductDetailsProps {
  materials: string[];
  care: string[];
  shipping: string[];
  returns: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  materials,
  care,
  shipping,
  returns,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      {/* Product Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="group flex items-center space-x-4 p-6 bg-sand-50 transition-all duration-300 hover:bg-primary-50">
          <Truck className="w-6 h-6 text-primary-800 transition-transform duration-300 group-hover:scale-110" />
          <div>
            <h4 className="font-medium mb-1">Free Shipping</h4>
            <p className="text-sm text-dark-600">On orders over $200</p>
          </div>
        </div>
        <div className="group flex items-center space-x-4 p-6 bg-sand-50 transition-all duration-300 hover:bg-primary-50">
          <RefreshCw className="w-6 h-6 text-primary-800 transition-transform duration-300 group-hover:scale-110" />
          <div>
            <h4 className="font-medium mb-1">Easy Returns</h4>
            <p className="text-sm text-dark-600">30-day return policy</p>
          </div>
        </div>
        <div className="group flex items-center space-x-4 p-6 bg-sand-50 transition-all duration-300 hover:bg-primary-50">
          <Shield className="w-6 h-6 text-primary-800 transition-transform duration-300 group-hover:scale-110" />
          <div>
            <h4 className="font-medium mb-1">Secure Payment</h4>
            <p className="text-sm text-dark-600">SSL encrypted checkout</p>
          </div>
        </div>
        <div className="group flex items-center space-x-4 p-6 bg-sand-50 transition-all duration-300 hover:bg-primary-50">
          <Award className="w-6 h-6 text-primary-800 transition-transform duration-300 group-hover:scale-110" />
          <div>
            <h4 className="font-medium mb-1">Quality Promise</h4>
            <p className="text-sm text-dark-600">Satisfaction guaranteed</p>
          </div>
        </div>
      </div>

      {/* Accordion Details */}
      <div className="space-y-4">
        {[
          { title: 'Materials & Construction', content: materials, id: 'materials' },
          { title: 'Care Instructions', content: care, id: 'care' },
          { title: 'Shipping Information', content: shipping, id: 'shipping' },
          { title: 'Returns & Exchanges', content: returns, id: 'returns' },
        ].map((section) => (
          <div
            key={section.id}
            className="border-b border-gray-200 last:border-b-0"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full py-4 flex items-center justify-between text-left transition-colors hover:text-primary-800"
            >
              <span className="font-medium">{section.title}</span>
              {activeSection === section.id ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeSection === section.id ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="pb-6 text-dark-600">
                <ul className="space-y-2">
                  {section.content.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;