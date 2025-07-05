import React from 'react';

interface SpecTableProps {
  specs: {
    [key: string]: string | number;
  };
}

// Function to format spec keys for display
const formatSpecKey = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2'); // Add space between letters and numbers
};

const SpecTable: React.FC<SpecTableProps> = ({ specs }) => {
  const specEntries = Object.entries(specs);
  
  // Split specs into two columns
  const midpoint = Math.ceil(specEntries.length / 2);
  const leftColumnSpecs = specEntries.slice(0, midpoint);
  const rightColumnSpecs = specEntries.slice(midpoint);
  
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="space-y-4">
        {leftColumnSpecs.map(([key, value]) => (
          <div key={key} className="glass-card p-4 flex justify-between items-center">
            <span className="text-gray-300">{formatSpecKey(key)}</span>
            <span className="font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        {rightColumnSpecs.map(([key, value]) => (
          <div key={key} className="glass-card p-4 flex justify-between items-center">
            <span className="text-gray-300">{formatSpecKey(key)}</span>
            <span className="font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecTable;