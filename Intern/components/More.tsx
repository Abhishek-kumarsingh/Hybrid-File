import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { PinContainer } from "./ui/Pin";
import Image from "next/legacy/image";
import { Park } from "@/types/types";

interface MoreProps {
    parks: Park[];
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

const More = ({ parks }: MoreProps) => {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(3);

    useEffect(() => {
        const checkLocation = () => {
            const storedLocation = sessionStorage.getItem('location');
            if (storedLocation) {
                setUserLocation(JSON.parse(storedLocation));
                setIsLoading(false);
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const newLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        sessionStorage.setItem('location', JSON.stringify(newLocation));
                        setUserLocation(newLocation);
                        setIsLoading(false);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        setIsLoading(false);
                    }
                );
            }
        };

        checkLocation();

        const intervalId = setInterval(checkLocation, 5000);

        return () => clearInterval(intervalId);
    }, []);

    if (isLoading) {
        return <p>Loading......</p>;
    }

    if (!userLocation) {
        return <p>Please enable location services to see nearby parks.</p>;
    }

    const { lat, lng } = userLocation;

    const parksWithDistance = parks.map(park => {
        const distance = haversineDistance(lat, lng, parseFloat(park.latitude), parseFloat(park.longitude));
        return { ...park, distance };
    });

    const sortedParks = parksWithDistance.sort((a, b) => a.distance - b.distance);
    const displayedParks = sortedParks.slice(0, displayCount);

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 3);
    };

    return (
        <div className="py-20">
            <h1 className="heading">
                More Nearby <span className="heading-primary">Parks</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center p-2 gap-10 mt-5">
                {displayedParks.map(item => (
                    <div
                        className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
                        key={item._id}
                    >
                        <PinContainer title={item.name} href={`/parks/${item.url}`}>
                            <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                                <div
                                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                                    style={{ backgroundColor: "#13162D" }}
                                >
                                    <Image
                                        src="/images/parkimage.jpg"
                                        alt={item.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                            <h1 className="font-bold lg:text-xl md:text-lg text-base line-clamp-1">
                                {item.name}
                            </h1>
                            <p
                                className="lg:text-base lg:font-normal font-light text-sm line-clamp-2"
                                style={{ color: "#BEC1DD", margin: "1vh 0" }}
                            >
                                {item.description}
                            </p>
                            <p className="lg:text-base lg:font-normal font-light text-sm" style={{ color: "#BEC1DD" }}>
                                {item.distance.toFixed(2)} km away
                            </p>
                            <div className="flex items-center justify-between mt-7 mb-3">
                                <div className="flex items-center">
                                    <Image
                                        src="/map-pin.svg"
                                        alt="Map Pin"
                                        width={40}
                                        height={40}
                                        className="border border-white/[.2] rounded-full bg-black flex justify-center items-center p-2"
                                        style={{ marginRight: "8px" }}
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center p-2"
                                        style={{ marginRight: "8px" }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 14l9-5-9-5-9 5z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex justify-center items-center">
                                    <p className="flex lg:text-xl md:text-xs text-sm text-blue-500">
                                        Check Live Site
                                    </p>
                                    <FaLocationArrow className="ms-3" color="#0072BC" />
                                </div>
                            </div>
                        </PinContainer>
                    </div>
                ))}
                {displayCount < sortedParks.length && (
                    <div
                        className="lg:min-h-[15.5rem] h-[12rem] flex items-center justify-center sm:w-96 w-[80vw]"
                        key="show-more"
                        onClick={handleShowMore}
                    >
                        <PinContainer title="Show More" href="#">
                            <div className="relative flex flex-col items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[15vh] lg:h-[20vh] mb-10">
                                <h1 className="flex font-bold lg:text-xl md:text-lg text-base justify-center items-center text-center">
                                    Show More
                                </h1>
                                <p
                                    className="flex lg:text-base lg:font-normal font-light text-sm text-center mt-2"
                                    style={{ color: "#BEC1DD", margin: "1vh 0" }}
                                >
                                    Click here to view more nearby parks.
                                </p>
                                <div className="flex items-center justify-center mt-7">
                                    <FaLocationArrow color="#0072BC" />
                                </div>
                            </div>
                        </PinContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default More;