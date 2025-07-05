// ui/Geo.tsx

import React, { useState } from "react";

const Geo: React.FC = () => {
  // State for location data and error
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to get the user's location
  const getLocation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Prevent page refresh

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={getLocation} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get My Location
      </button>
      {location && (
        <div className="ml-4 text-white">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {error && (
        <div className="ml-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default Geo;
