import React from 'react';

interface MarkerProps {
  lat: number;
  lng: number;
  text?: string;
}

const Marker: React.FC<MarkerProps> = ({ text }) => {
  return (
    <div
      style={{
        color: 'white',
        background: 'red',
        padding: '10px',
        borderRadius: '50%',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {text || '📍'}
    </div>
  );
};

export default Marker;
