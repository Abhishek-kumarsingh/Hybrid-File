import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';
import { Park } from '@/types/types';
import dynamic from 'next/dynamic';

interface MapProps {
    parkData: Park;
}

const containerStyle = {
    width: '100%',
    height: '400px',
    position: 'relative' as 'relative' | 'absolute',
};

const apiKey = 'AIzaSyD_0_t3fHixnV2cRRSAKHCqjl8nzHCQ2b8';

const GoogleMapComponent = ({ parkData }: MapProps) => {
    const [center, setCenter] = useState({ lat: 28.6293164, lng: 77.2243861 });

    useEffect(() => {
        console.log(parkData);

        if (parkData) {
            try {
                const lat = parseFloat(parkData.latitude);
                const lng = parseFloat(parkData.longitude);
                if (!isNaN(lat) && !isNaN(lng)) {
                    setCenter({ lat, lng });
                    console.log("Parsed location:", { lat, lng });
                } else {
                    setCenter({ lat: 28.6293164, lng: 77.2243861 })
                    console.error("Invalid latitude or longitude values");
                }
            } catch (error) {
                console.error("Error parsing stored park location:", error);
            }
        }
    }, [parkData]);

    const MapComponent = () => {
        return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                mapTypeId="hybrid"
            >
                <Marker position={center} />

                <div className="nearby-locations absolute top-10 right-10 flex flex-col bg-white p-4 rounded-lg shadow-lg">
                    <div className="location-box atm mb-2 p-2 rounded-lg cursor-pointer">
                        <span className="icon text-xl">ATM</span>
                        <span className="name">ATM Bank</span>
                    </div>
                    <div className="location-box restaurant mb-2 p-2 rounded-lg cursor-pointer">
                        <span className="icon text-xl">🍔</span>
                        <span className="name">Restaurant</span>
                    </div>
                    <div className="location-box park mb-2 p-2 rounded-lg cursor-pointer">
                        <span className="icon text-xl">🌳</span>
                        <span className="name">Park</span>
                    </div>
                    <div className="location-box restroom mb-2 p-2 rounded-lg cursor-pointer">
                        <span className="icon text-xl">🚻</span>
                        <span className="name">Restroom</span>
                    </div>
                    <div className="location-box petrol-station mb-2 p-2 rounded-lg cursor-pointer">
                        <span className="icon text-xl">⛽</span>
                        <span className="name">Petrol Station</span>
                    </div>
                </div>
            </GoogleMap>
        );
    };

    if (typeof window === 'undefined' || !window.google) {
        return <div>Loading...</div>;
    }

    return <MapComponent />;
};

const MapWrapper = ({ parkData }: MapProps) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
    });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps</div>;

    return <GoogleMapComponent parkData={parkData} />;
};

const DynamicMap = dynamic(() => Promise.resolve(MapWrapper), {
    ssr: false,
});

export default DynamicMap;