"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaHistory,
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaLeaf,
} from "react-icons/fa";
import { Park } from "@/types/types";
import ScrollReveal from "./ui/ScrollReveal";

interface UserDashboardProps {
  userData?: {
    name: string;
    email: string;
    avatar?: string;
  };
  favoriteParks?: Park[];
  recentlyVisited?: Park[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  userData = {
    name: "Guest User",
    email: "guest@example.com",
  },
  favoriteParks = [],
  recentlyVisited = [],
}) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaLeaf /> },
    { id: "favorites", label: "Favorites", icon: <FaHeart /> },
    { id: "history", label: "History", icon: <FaHistory /> },
    { id: "upcoming", label: "Upcoming", icon: <FaCalendarAlt /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaHeart className="text-orange-500 mr-2" /> Favorite Parks
              </h3>
              {favoriteParks.length > 0 ? (
                <div className="space-y-4">
                  {favoriteParks.slice(0, 3).map((park) => (
                    <ParkItem key={park._id} park={park} />
                  ))}
                  {favoriteParks.length > 3 && (
                    <Link href="/dashboard/favorites">
                      <button className="text-sm text-blue-500 hover:underline">
                        View all favorites
                      </button>
                    </Link>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  You haven't added any parks to your favorites yet.
                </p>
              )}
            </div>

            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaHistory className="text-blue-500 mr-2" /> Recently Visited
              </h3>
              {recentlyVisited.length > 0 ? (
                <div className="space-y-4">
                  {recentlyVisited.slice(0, 3).map((park) => (
                    <ParkItem key={park._id} park={park} />
                  ))}
                  {recentlyVisited.length > 3 && (
                    <Link href="/dashboard/history">
                      <button className="text-sm text-blue-500 hover:underline">
                        View full history
                      </button>
                    </Link>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  You haven't visited any parks recently.
                </p>
              )}
            </div>

            <div className="card-modern p-6 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaMapMarkerAlt className="text-green-500 mr-2" /> Nearby Events
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-500/5 transition-colors duration-200">
                  <div className="bg-green-500/10 rounded-lg p-3 text-green-500">
                    <FaCalendarAlt size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium">Tree Plantation Drive</h4>
                    <p className="text-sm text-muted-foreground">
                      Lodhi Garden • June 5, 2024 • 9:00 AM
                    </p>
                    <Link href="/events/tree-plantation">
                      <button className="mt-2 text-sm text-blue-500 hover:underline">
                        Learn more
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-500/5 transition-colors duration-200">
                  <div className="bg-orange-500/10 rounded-lg p-3 text-orange-500">
                    <FaCalendarAlt size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium">Summer Concert Series</h4>
                    <p className="text-sm text-muted-foreground">
                      Central Park • Every Saturday • 6:00 PM
                    </p>
                    <Link href="/events/summer-concerts">
                      <button className="mt-2 text-sm text-blue-500 hover:underline">
                        Learn more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "favorites":
        return (
          <div className="card-modern p-6">
            <h3 className="text-lg font-semibold mb-4">Your Favorite Parks</h3>
            {favoriteParks.length > 0 ? (
              <div className="space-y-4">
                {favoriteParks.map((park) => (
                  <ParkItem key={park._id} park={park} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaHeart className="text-orange-500/30 text-5xl mx-auto mb-4" />
                <p className="text-muted-foreground">
                  You haven't added any parks to your favorites yet.
                </p>
                <Link href="/">
                  <button className="btn-primary mt-4">Explore Parks</button>
                </Link>
              </div>
            )}
          </div>
        );
      case "history":
        return (
          <div className="card-modern p-6">
            <h3 className="text-lg font-semibold mb-4">
              Recently Visited Parks
            </h3>
            {recentlyVisited.length > 0 ? (
              <div className="space-y-4">
                {recentlyVisited.map((park) => (
                  <ParkItem key={park._id} park={park} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaHistory className="text-blue-500/30 text-5xl mx-auto mb-4" />
                <p className="text-muted-foreground">
                  You haven't visited any parks recently.
                </p>
                <Link href="/">
                  <button className="btn-primary mt-4">Explore Parks</button>
                </Link>
              </div>
            )}
          </div>
        );
      case "upcoming":
        return (
          <div className="card-modern p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-500/5 transition-colors duration-200">
                <div className="bg-green-500/10 rounded-lg p-3 text-green-500">
                  <FaCalendarAlt size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Tree Plantation Drive</h4>
                  <p className="text-sm text-muted-foreground">
                    Lodhi Garden • June 5, 2024 • 9:00 AM
                  </p>
                  <p className="text-sm mt-2">
                    Join us for a community tree plantation drive to enhance the
                    green cover of Delhi.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="btn-primary text-xs px-3 py-1">
                      Register
                    </button>
                    <button className="btn-outline text-xs px-3 py-1">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-500/5 transition-colors duration-200">
                <div className="bg-orange-500/10 rounded-lg p-3 text-orange-500">
                  <FaCalendarAlt size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Summer Concert Series</h4>
                  <p className="text-sm text-muted-foreground">
                    Central Park • Every Saturday • 6:00 PM
                  </p>
                  <p className="text-sm mt-2">
                    Enjoy live music performances in the park every Saturday
                    evening throughout summer.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="btn-primary text-xs px-3 py-1">
                      Register
                    </button>
                    <button className="btn-outline text-xs px-3 py-1">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="container-section">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-32 bg-muted rounded-lg w-full"></div>
            <div className="h-64 bg-muted rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollReveal>
      <div className="container-section">
        <div className="card-modern overflow-hidden">
          {/* User header */}
          <div className="relative h-32 bg-gradient-to-r from-green-500 to-blue-500">
            <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-6">
              <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-500/10 text-green-500 text-2xl font-bold">
                    {userData.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-16 pb-6 px-6">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-muted-foreground">{userData.email}</p>
          </div>

          {/* Tabs */}
          <div className="border-t border-border">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-green-500 border-b-2 border-green-500"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </ScrollReveal>
  );
};

// Park item component for reuse
const ParkItem = ({ park }: { park: Park }) => (
  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-green-500/5 transition-colors duration-200">
    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
      <Image
        src="/images/parkimage.jpg"
        alt={park.name}
        fill
        className="object-cover"
      />
    </div>
    <div>
      <h4 className="font-medium">{park.name}</h4>
      <div className="flex items-center gap-1 text-yellow-500 text-sm">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar className="text-gray-300" />
        <span className="text-muted-foreground ml-1">(4.0)</span>
      </div>
      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
        <FaMapMarkerAlt className="text-green-500" />
        {"Delhi, India"}
      </p>
    </div>
  </div>
);

export default UserDashboard;
