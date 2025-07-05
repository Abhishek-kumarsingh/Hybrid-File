import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Ruler, User, ChevronDown, Check } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  productType: 'tops' | 'bottoms' | 'dresses';
}

const InteractiveSizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose, productType }) => {
  const [activeTab, setActiveTab] = useState<'table' | 'calculator'>('table');
  const [gender, setGender] = useState<'women' | 'men'>('women');
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: '',
  });
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [measurementUnit, setMeasurementUnit] = useState<'cm' | 'in'>('in');

  // Size chart data
  const sizeCharts = {
    women: {
      tops: [
        { size: 'XS', bust: '32-33', waist: '24-25', hips: '34-35' },
        { size: 'S', bust: '34-35', waist: '26-27', hips: '36-37' },
        { size: 'M', bust: '36-37', waist: '28-29', hips: '38-39' },
        { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42' },
        { size: 'XL', bust: '41-43', waist: '33-35', hips: '43-45' },
      ],
      bottoms: [
        { size: 'XS', waist: '24-25', hips: '34-35', inseam: '30' },
        { size: 'S', waist: '26-27', hips: '36-37', inseam: '30' },
        { size: 'M', waist: '28-29', hips: '38-39', inseam: '30' },
        { size: 'L', waist: '30-32', hips: '40-42', inseam: '30' },
        { size: 'XL', waist: '33-35', hips: '43-45', inseam: '30' },
      ],
      dresses: [
        { size: 'XS', bust: '32-33', waist: '24-25', hips: '34-35' },
        { size: 'S', bust: '34-35', waist: '26-27', hips: '36-37' },
        { size: 'M', bust: '36-37', waist: '28-29', hips: '38-39' },
        { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42' },
        { size: 'XL', bust: '41-43', waist: '33-35', hips: '43-45' },
      ],
    },
    men: {
      tops: [
        { size: 'XS', chest: '34-36', waist: '28-30', hips: '34-36' },
        { size: 'S', chest: '36-38', waist: '30-32', hips: '36-38' },
        { size: 'M', chest: '38-40', waist: '32-34', hips: '38-40' },
        { size: 'L', chest: '40-42', waist: '34-36', hips: '40-42' },
        { size: 'XL', chest: '42-44', waist: '36-38', hips: '42-44' },
      ],
      bottoms: [
        { size: 'XS', waist: '28-30', hips: '34-36', inseam: '32' },
        { size: 'S', waist: '30-32', hips: '36-38', inseam: '32' },
        { size: 'M', waist: '32-34', hips: '38-40', inseam: '32' },
        { size: 'L', waist: '34-36', hips: '40-42', inseam: '32' },
        { size: 'XL', waist: '36-38', hips: '42-44', inseam: '32' },
      ],
      dresses: [], // Men don't typically have dresses in this example
    },
  };

  // Get current size chart based on gender and product type
  const currentSizeChart = gender === 'women' 
    ? sizeCharts.women[productType] 
    : sizeCharts.men[productType];

  // Handle measurement input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({ ...prev, [name]: value }));
  };

  // Calculate recommended size
  const calculateSize = () => {
    // Simple algorithm - in a real app this would be more sophisticated
    const bust = parseFloat(measurements.bust);
    const waist = parseFloat(measurements.waist);
    const hips = parseFloat(measurements.hips);
    
    if (isNaN(bust) || isNaN(waist) || isNaN(hips)) {
      return null;
    }
    
    // Convert if needed
    const bustInInches = measurementUnit === 'cm' ? bust / 2.54 : bust;
    const waistInInches = measurementUnit === 'cm' ? waist / 2.54 : waist;
    const hipsInInches = measurementUnit === 'cm' ? hips / 2.54 : hips;
    
    // Find best match
    let bestMatch = null;
    let smallestDifference = Number.MAX_VALUE;
    
    for (const sizeInfo of currentSizeChart) {
      const bustRange = sizeInfo.bust?.split('-').map(Number) || [0, 0];
      const waistRange = sizeInfo.waist?.split('-').map(Number) || [0, 0];
      const hipsRange = sizeInfo.hips?.split('-').map(Number) || [0, 0];
      
      const bustDiff = Math.min(
        Math.abs(bustInInches - bustRange[0]), 
        Math.abs(bustInInches - bustRange[1])
      );
      
      const waistDiff = Math.min(
        Math.abs(waistInInches - waistRange[0]), 
        Math.abs(waistInInches - waistRange[1])
      );
      
      const hipsDiff = Math.min(
        Math.abs(hipsInInches - hipsRange[0]), 
        Math.abs(hipsInInches - hipsRange[1])
      );
      
      const totalDiff = bustDiff + waistDiff + hipsDiff;
      
      if (totalDiff < smallestDifference) {
        smallestDifference = totalDiff;
        bestMatch = sizeInfo.size;
      }
    }
    
    return bestMatch;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const size = calculateSize();
    setRecommendedSize(size);
    setShowResult(true);
  };

  // Toggle measurement unit
  const toggleUnit = () => {
    setMeasurementUnit(prev => prev === 'in' ? 'cm' : 'in');
    // Clear form when changing units
    setMeasurements({
      bust: '',
      waist: '',
      hips: '',
      height: '',
    });
    setShowResult(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-elegant max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-200">
              <h3 className="font-playfair text-2xl font-medium">Find Your Perfect Size</h3>
              <button
                onClick={onClose}
                className="text-dark-600 hover:text-dark-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-200">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'table' 
                    ? 'text-dark-900 border-b-2 border-dark-900' 
                    : 'text-dark-600 hover:text-dark-800'
                }`}
                onClick={() => setActiveTab('table')}
              >
                <Ruler size={18} className="inline-block mr-2" />
                Size Chart
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'calculator' 
                    ? 'text-dark-900 border-b-2 border-dark-900' 
                    : 'text-dark-600 hover:text-dark-800'
                }`}
                onClick={() => setActiveTab('calculator')}
              >
                <User size={18} className="inline-block mr-2" />
                Size Calculator
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Gender Toggle */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-full bg-neutral-100 p-1">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      gender === 'women' ? 'bg-white shadow-sm' : 'text-dark-600'
                    }`}
                    onClick={() => setGender('women')}
                  >
                    Women
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      gender === 'men' ? 'bg-white shadow-sm' : 'text-dark-600'
                    }`}
                    onClick={() => setGender('men')}
                  >
                    Men
                  </button>
                </div>
              </div>

              {activeTab === 'table' ? (
                <>
                  {/* Size Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-200">
                          <th className="py-3 px-4 text-left font-medium">Size</th>
                          {productType !== 'bottoms' && (
                            <th className="py-3 px-4 text-left font-medium">
                              {gender === 'women' ? 'Bust' : 'Chest'} ({measurementUnit})
                            </th>
                          )}
                          <th className="py-3 px-4 text-left font-medium">Waist ({measurementUnit})</th>
                          <th className="py-3 px-4 text-left font-medium">Hips ({measurementUnit})</th>
                          {productType === 'bottoms' && (
                            <th className="py-3 px-4 text-left font-medium">Inseam ({measurementUnit})</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {currentSizeChart.map((sizeInfo, index) => (
                          <tr key={index} className="border-b border-neutral-200 hover:bg-neutral-50">
                            <td className="py-3 px-4 font-medium">{sizeInfo.size}</td>
                            {productType !== 'bottoms' && (
                              <td className="py-3 px-4">{sizeInfo.bust || sizeInfo.chest}</td>
                            )}
                            <td className="py-3 px-4">{sizeInfo.waist}</td>
                            <td className="py-3 px-4">{sizeInfo.hips}</td>
                            {productType === 'bottoms' && (
                              <td className="py-3 px-4">{sizeInfo.inseam}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Unit Toggle */}
                  <div className="mt-6 text-right">
                    <button
                      onClick={toggleUnit}
                      className="text-sm text-dark-600 hover:text-dark-900 transition-colors"
                    >
                      Switch to {measurementUnit === 'in' ? 'cm' : 'inches'}
                    </button>
                  </div>

                  {/* Measurement Guide */}
                  <div className="mt-8 bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Info size={16} className="mr-2" />
                      How to Measure
                    </h4>
                    <p className="text-dark-600 text-sm mb-4">
                      For the best fit, take measurements directly on your body wearing minimal clothing. 
                      Keep the tape measure comfortably loose.
                    </p>
                    <ul className="text-sm text-dark-600 space-y-2">
                      {productType !== 'bottoms' && (
                        <li>
                          <span className="font-medium">{gender === 'women' ? 'Bust' : 'Chest'}:</span> Measure around the fullest part of your {gender === 'women' ? 'bust' : 'chest'}, keeping the tape horizontal.
                        </li>
                      )}
                      <li>
                        <span className="font-medium">Waist:</span> Measure around your natural waistline, the narrowest part of your torso.
                      </li>
                      <li>
                        <span className="font-medium">Hips:</span> Measure around the fullest part of your hips, keeping the tape horizontal.
                      </li>
                      {productType === 'bottoms' && (
                        <li>
                          <span className="font-medium">Inseam:</span> Measure from the crotch to the bottom of the leg.
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {/* Size Calculator */}
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {productType !== 'bottoms' && (
                        <div>
                          <label className="block text-dark-600 mb-2">
                            {gender === 'women' ? 'Bust' : 'Chest'} ({measurementUnit})
                          </label>
                          <input
                            type="number"
                            name="bust"
                            value={measurements.bust}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                            step="0.1"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-dark-600 mb-2">
                          Waist ({measurementUnit})
                        </label>
                        <input
                          type="number"
                          name="waist"
                          value={measurements.waist}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label className="block text-dark-600 mb-2">
                          Hips ({measurementUnit})
                        </label>
                        <input
                          type="number"
                          name="hips"
                          value={measurements.hips}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label className="block text-dark-600 mb-2">
                          Height ({measurementUnit}) (optional)
                        </label>
                        <input
                          type="number"
                          name="height"
                          value={measurements.height}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          step="0.1"
                        />
                      </div>
                    </div>

                    {/* Unit Toggle */}
                    <div className="mt-4 text-right">
                      <button
                        type="button"
                        onClick={toggleUnit}
                        className="text-sm text-dark-600 hover:text-dark-900 transition-colors"
                      >
                        Switch to {measurementUnit === 'in' ? 'cm' : 'inches'}
                      </button>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full py-3 bg-dark-900 text-white text-sm uppercase tracking-wider font-medium hover:bg-dark-800 transition-colors duration-300"
                      >
                        Calculate My Size
                      </button>
                    </div>
                  </form>

                  {/* Results */}
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8 p-6 bg-neutral-50 rounded-lg text-center"
                      >
                        <h4 className="text-xl font-medium mb-2">Your Recommended Size</h4>
                        {recommendedSize ? (
                          <>
                            <div className="text-4xl font-playfair mb-4">{recommendedSize}</div>
                            <p className="text-dark-600">
                              Based on your measurements, we recommend size {recommendedSize} for this {productType.slice(0, -1)}.
                            </p>
                          </>
                        ) : (
                          <p className="text-dark-600">
                            We couldn't determine your size based on the provided measurements. 
                            Please check your inputs or refer to our size chart.
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InteractiveSizeGuide;
