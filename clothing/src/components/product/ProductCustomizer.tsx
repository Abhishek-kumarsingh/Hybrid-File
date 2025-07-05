import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw, Share2, Download } from 'lucide-react';

interface ProductCustomizerProps {
  productName: string;
  baseImage: string;
  colorOptions: {
    name: string;
    color: string;
    image: string;
  }[];
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ 
  productName, 
  baseImage, 
  colorOptions 
}) => {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Simulate loading when changing colors
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedColor]);

  // Handle color selection
  const handleColorSelect = (color: typeof colorOptions[0]) => {
    setSelectedColor(color);
  };

  // Handle share
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  // Handle save/download
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-elegant overflow-hidden">
      <div className="p-6 border-b border-neutral-200">
        <h3 className="font-playfair text-2xl font-medium mb-2">Customize Your {productName}</h3>
        <p className="text-dark-600">
          Explore different color options and find your perfect style.
        </p>
      </div>

      {/* Product Viewer */}
      <div className="relative aspect-square bg-neutral-50">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <RefreshCw size={32} className="text-dark-400 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key={`image-${selectedColor.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              <img 
                src={selectedColor.image} 
                alt={`${productName} in ${selectedColor.name}`}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Color name overlay */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-glass">
          {selectedColor.name}
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-glass"
          >
            <Share2 size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-glass"
          >
            {isSaved ? <Check size={18} className="text-green-500" /> : <Download size={18} />}
          </motion.button>
        </div>

        {/* Share options popup */}
        <AnimatePresence>
          {showShareOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-14 right-4 bg-white rounded-lg shadow-elegant p-3 z-10"
            >
              <div className="flex space-x-3">
                <button className="p-2 bg-[#3b5998] text-white rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                  </svg>
                </button>
                <button className="p-2 bg-[#1da1f2] text-white rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                  </svg>
                </button>
                <button className="p-2 bg-[#e60023] text-white rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </button>
                <button className="p-2 bg-[#25D366] text-white rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Color Options */}
      <div className="p-6">
        <h4 className="font-medium mb-4">Available Colors</h4>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((color) => (
            <motion.button
              key={color.name}
              onClick={() => handleColorSelect(color)}
              className={`w-12 h-12 rounded-full relative ${
                selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-dark-900' : ''
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: color.color }}
            >
              {selectedColor.name === color.name && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check size={16} className="text-white drop-shadow-md" />
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="p-6 bg-neutral-50 border-t border-neutral-200">
        <button className="w-full py-3 bg-dark-900 text-white text-sm uppercase tracking-wider font-medium hover:bg-dark-800 transition-colors duration-300">
          Add Customized Product to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCustomizer;
