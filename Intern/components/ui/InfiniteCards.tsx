"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "100s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[85vw] max-w-[500px] relative rounded-2xl border border-b-0
             flex-shrink-0 border-slate-800/30 dark:border-slate-700/30 p-5 md:p-8"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            }}
            key={idx}
          >
            <blockquote className="h-full flex flex-col">
              {/* Quote text */}
              <span className="relative z-20 text-sm md:text-base leading-relaxed text-foreground dark:text-white font-normal flex-grow">
                "{item.quote}"
              </span>

              {/* Author info with improved layout */}
              <div className="relative z-20 mt-6 flex flex-row items-center border-t border-slate-200/20 dark:border-slate-700/20 pt-4">
                <div className="me-3 bg-primary/10 dark:bg-primary/20 rounded-full p-2">
                  <Image
                    src="/profile.svg"
                    alt="Event icon"
                    width={30}
                    height={30}
                    className="opacity-80"
                  />
                </div>
                <span className="flex flex-col gap-0.5">
                  <span className="text-base font-semibold leading-snug text-foreground dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground dark:text-gray-300 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
