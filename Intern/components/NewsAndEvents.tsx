import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import { motion } from "framer-motion";

// Real news and events data
const newsAndEvents = [
  {
    quote: "Explore the new trail opening in Central Park, offering stunning views and new outdoor experiences.",
    name: "New Trail Opening in Central Park",
    title: "Central Park",
  },
  {
    quote: "Enjoy live music in the park with our summer concert series every Friday night.",
    name: "Golden Gate Park Summer Concert Series",
    title: "Golden Gate Park",
  },
  {
    quote: "Join us for the annual Hyde Park Eco-Festival celebrating sustainability and community.",
    name: "Hyde Park Eco-Festival",
    title: "Hyde Park",
  },
  {
    quote: "Participate in the tree planting drive at Nehru Park to help increase Delhi's green cover.",
    name: "Tree Planting Initiative",
    title: "Nehru Park",
  },
  {
    quote: "Join our guided nature walk to discover the diverse flora and fauna of Deer Park.",
    name: "Guided Nature Walk",
    title: "Deer Park",
  },
];

const NewsAndEvents = () => {
  return (
    <section id="testimonials" className="py-12 relative overflow-hidden">
      {/* Improved background with gradient overlay instead of mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80 dark:from-background/40 dark:to-background/90"></div>

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500">
            News and Events
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest happenings and upcoming events at parks across Delhi.
          </p>
        </motion.div>

        <div className="flex flex-col items-center max-lg:mt-6">
          <div className="w-full h-[22rem] md:h-[22rem] rounded-xl flex flex-col antialiased items-center justify-center relative overflow-hidden shadow-lg">
            <InfiniteMovingCards items={newsAndEvents} direction="right" speed="slow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAndEvents;
