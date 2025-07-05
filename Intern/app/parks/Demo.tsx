"use client";

import Image from "next/image";
import { Park } from "@/types/types";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaParking, FaTree, FaTicketAlt, FaDoorOpen } from "react-icons/fa";

interface DemoProps {
    parkData: Park;
}

export function Demo({ parkData }: DemoProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border">
                {/* Hero section with image and overlay */}
                <div className="relative h-[300px] md:h-[400px]">
                    <Image
                        src="/images/parkimage.jpg"
                        alt={parkData.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Park title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/80 text-white text-xs font-medium mb-3">
                            {parkData.division || "Delhi Parks"}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{parkData.name}</h1>
                        <div className="flex items-center text-sm">
                            <FaMapMarkerAlt className="mr-2" />
                            <span>Delhi, India</span>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Main content */}
                        <div className="md:col-span-2">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <h2 className="text-2xl font-bold mb-4">About this Park</h2>
                                <p className="text-muted-foreground">
                                    {parkData.description || "No description available."}
                                </p>

                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                                <FaParking className="text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Parking</p>
                                                <p className="text-sm text-muted-foreground">{parkData.parking || "Available"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                                <FaClock className="text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Opening Hours</p>
                                                <p className="text-sm text-muted-foreground">5:00 AM - 8:00 PM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                                <FaTree className="text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Plant Nursery</p>
                                                <p className="text-sm text-muted-foreground">{parkData.plantcost ? "Available" : "Not available"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                                <FaDoorOpen className="text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Entry Gates</p>
                                                <p className="text-sm text-muted-foreground">{parkData.gates || "Multiple entrances"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-muted/30 rounded-lg p-6 border border-border">
                                <h3 className="text-xl font-semibold mb-4">Visit Information</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium mb-1">Entry Fee</p>
                                        <p className="text-lg font-bold text-primary">
                                            {parkData.bookingfees ? parkData.bookingfees : "Free Entry"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-1">Best Time to Visit</p>
                                        <p className="text-muted-foreground">Morning & Evening</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-1">Managed By</p>
                                        <p className="text-muted-foreground">Delhi Development Authority</p>
                                    </div>

                                    <div className="pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-primary text-white py-3 rounded-md font-medium flex items-center justify-center"
                                        >
                                            <FaTicketAlt className="mr-2" />
                                            Book a Visit
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
