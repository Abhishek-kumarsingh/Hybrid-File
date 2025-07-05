
import React from "react";
import { Park } from "@/types/types";
import ScrollReveal from "./ui/ScrollReveal";
import ParkCarousel from "./ui/design-system/ParkCarousel";
import ParkFeatureCard from "./ui/design-system/ParkFeatureCard";
import { motion } from "framer-motion";

interface RecommendedProps {
  parks: Park[];
}

const RecommendedParks = ({ parks }: RecommendedProps) => {
  // Slice the parks to display only the first 3
  const displayedParks = parks.slice(0, 3);

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Improved background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/50 dark:from-background/10 dark:to-background/70"></div>

      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="heading mb-3 text-center font-bold">
              Featured <span className="heading-primary">Parks</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of Delhi's most beautiful parks.
            </p>
          </motion.div>

          {displayedParks.length === 0 ? (
            <div className="animate-pulse">
              <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-60 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                <div className="h-60 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Parks Carousel */}
              <div>
                <ParkCarousel parks={displayedParks} />
              </div>

              {/* Featured Parks Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Top Picks For You</h3>
                  <motion.a
                    href="/parks"
                    whileHover={{ x: 5 }}
                    className="text-primary hover:text-primary/80 font-medium flex items-center text-sm"
                  >
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedParks.slice(0, 2).map((park, index) => (
                    <ParkFeatureCard
                      key={park._id || index}
                      park={park}
                      index={index}
                      variant="horizontal"
                    />
                  ))}
                </div>
              </div>

              {/* Explore More Section */}
              <div className="relative overflow-hidden rounded-xl p-8 text-center bg-card/50 backdrop-blur-sm border border-border shadow-sm">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">Explore More Green Spaces</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-sm">
                    Delhi has over 18,000 parks and gardens to explore. Discover hidden gems and historical gardens.
                  </p>
                  <motion.a
                    href="/parks"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary inline-flex items-center px-5 py-2 text-sm font-medium"
                  >
                    Browse All Parks
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RecommendedParks;
