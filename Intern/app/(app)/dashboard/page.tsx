"use client";

import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Footer from "@/components/Footer";
import UserDashboard from "@/components/UserDashboard";
import { useEffect, useState } from "react";
import { Park } from "@/types/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [parkData, setParkData] = useState<Park[] | null>(null);
  const [favoriteParks, setFavoriteParks] = useState<Park[] | null>(null);
  const [recentlyVisited, setRecentlyVisited] = useState<Park[] | null>(null);

  const handleLocationClick = () => {
    console.log("Location clicked!");
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin?callbackUrl=/dashboard");
    }
  }, [status]);

  useEffect(() => {
    const fetchParkData = async () => {
      try {
        const res = await fetch(`/api/parks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Error fetching park data");
        }

        const data = await res.json();
        setParkData(data);

        // Simulate favorite parks (first 2 parks)
        setFavoriteParks(data.slice(0, 2));

        // Simulate recently visited parks (last 3 parks)
        setRecentlyVisited(data.slice(-3));
      } catch (error) {
        console.error("Error fetching park data:", error);
      }
    };

    fetchParkData();
  }, []);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto min-h-screen">
        <div className="container-section flex flex-col items-center justify-center py-20">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-32 bg-muted rounded-lg w-full"></div>
            <div className="h-64 bg-muted rounded-lg w-full"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-background text-foreground flex justify-center items-center flex-col overflow-hidden mx-auto">
      {/* Fixed navigation */}
      <FloatingNav navItems={navItems} onLocationClick={handleLocationClick} />

      {/* Page header */}
      <div className="w-full bg-green-500/5 dark:bg-gray-800/30 py-16 mt-16">
        <div className="container-section">
          <h1 className="text-3xl md:text-4xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your park visits, favorites, and upcoming events
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full py-8">
        <UserDashboard
          userData={
            session?.user
              ? {
                  name: session.user.name || "User",
                  email: session.user.email || "",
                  avatar: session.user.image || undefined,
                }
              : undefined
          }
          favoriteParks={favoriteParks || []}
          recentlyVisited={recentlyVisited || []}
        />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Dashboard;
