import React, { useEffect, useRef, useState } from 'react';

const MultiplicationLogo = ({ expression, width = 120, height = 40, className = '' }) => {
  const canvasRef = useRef(null);
  const [randomExpression, setRandomExpression] = useState(expression || generateRandomExpression());

  // Generate a random multiplication expression if none is provided
  function generateRandomExpression() {
    const num1 = Math.floor(Math.random() * 999) + 100; // 3-digit number
    const num2 = Math.floor(Math.random() * 999) + 100; // 3-digit number
    return `${num1}*${num2}`;
  }

  // Change expression every 10 seconds if none was provided
  useEffect(() => {
    if (!expression) {
      const interval = setInterval(() => {
        setRandomExpression(generateRandomExpression());
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [expression]);

  // Draw the logo on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parse the expression
    const [num1, num2] = randomExpression.split('*');

    // Set up colors based on theme
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const primaryColor = isDarkTheme ? '#00c9c0' : '#00c9c0';
    const secondaryColor = isDarkTheme ? '#ff5a3d' : '#ff5a3d';
    const textColor = isDarkTheme ? '#ffffff' : '#37474f';

    // Draw background with rounded corners
    ctx.fillStyle = primaryColor;
    roundedRect(ctx, 0, 0, canvas.width, canvas.height, 6);

    // Draw the multiplication symbol
    ctx.fillStyle = secondaryColor;
    ctx.font = 'bold 18px Arial, sans-serif';
    const multSymbol = '×';
    const multWidth = ctx.measureText(multSymbol).width;
    ctx.fillText(multSymbol, canvas.width / 2 - multWidth / 2, canvas.height / 2 + 6);

    // Draw the numbers
    ctx.fillStyle = textColor;
    ctx.font = 'bold 16px Arial, sans-serif';
    
    // First number (left side)
    const num1Width = ctx.measureText(num1).width;
    ctx.fillText(num1, canvas.width / 2 - multWidth / 2 - num1Width - 5, canvas.height / 2 + 6);
    
    // Second number (right side)
    ctx.fillText(num2, canvas.width / 2 + multWidth / 2 + 5, canvas.height / 2 + 6);

    // Add a subtle glow effect
    ctx.shadowColor = secondaryColor;
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw a small decorative element
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(canvas.width - 10, 10, 3, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

  }, [randomExpression]);

  // Helper function for drawing rounded rectangles
  function roundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
  }

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className={`multiplication-logo ${className}`}
      title={`${randomExpression.replace('*', '×')}`}
    />
  );
};

export default MultiplicationLogo;