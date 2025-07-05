import React from 'react';
import MultiplicationLogo from './MultiplicationLogo';

// This component creates multiplication logos for different sections
const SectionMultiplicationLogo = ({ section, size = 'small' }) => {
  // Define fixed expressions for different sections
  const sectionExpressions = {
    dashboard: '223*345',
    email: '512*128',
    chat: '333*777',
    calendar: '365*24',
    kanban: '100*100',
    invoice: '4434*434',
    ai: '2048*1024',
    analytics: '360*180',
    ecommerce: '999*999',
    default: '123*456'
  };

  // Size presets
  const sizes = {
    tiny: { width: 60, height: 25 },
    small: { width: 80, height: 30 },
    medium: { width: 100, height: 35 },
    large: { width: 120, height: 40 }
  };

  // Get the expression for this section, or use a random one if not defined
  const expression = sectionExpressions[section] || sectionExpressions.default;
  
  // Get size dimensions
  const { width, height } = sizes[size] || sizes.small;

  return (
    <MultiplicationLogo 
      expression={expression} 
      width={width} 
      height={height} 
      className={`section-logo section-${section}`}
    />
  );
};

export default SectionMultiplicationLogo;