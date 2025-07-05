import React, { useState } from 'react';
import MultiplicationLogo from '../../helper/MultiplicationLogo';

// This component displays a grid of multiplication logos
const MultiplicationLogoDisplay = ({ 
  count = 6, 
  columns = 3, 
  size = 'medium',
  randomize = true,
  className = ''
}) => {
  // Predefined expressions
  const predefinedExpressions = [
    '223*345', '512*128', '333*777', '365*24', 
    '100*100', '4434*434', '2048*1024', '360*180', 
    '999*999', '123*456', '789*321', '555*111'
  ];

  // Size presets
  const sizes = {
    small: { width: 80, height: 30 },
    medium: { width: 100, height: 35 },
    large: { width: 120, height: 40 }
  };

  // Get size dimensions
  const { width, height } = sizes[size] || sizes.medium;

  // Generate expressions array
  const [expressions] = useState(() => {
    if (!randomize) {
      return predefinedExpressions.slice(0, count);
    }
    
    // Generate random expressions
    return Array.from({ length: count }, () => {
      const num1 = Math.floor(Math.random() * 999) + 100;
      const num2 = Math.floor(Math.random() * 999) + 100;
      return `${num1}*${num2}`;
    });
  });

  return (
    <div className={`multiplication-logo-grid ${className}`} style={{ 
      display: 'grid', 
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '15px',
      margin: '15px 0'
    }}>
      {expressions.map((expr, index) => (
        <div key={index} className="multiplication-logo-item" style={{ textAlign: 'center' }}>
          <MultiplicationLogo 
            expression={expr} 
            width={width} 
            height={height} 
          />
          <div className="logo-label" style={{ 
            marginTop: '5px', 
            fontSize: '12px', 
            color: 'var(--text-secondary-light)'
          }}>
            {expr.replace('*', ' × ')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiplicationLogoDisplay;