"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardHoverEffectProps {
  items: {
    id: string | number;
    title: string;
    description: string;
    link: string;
    image?: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  cardClassName?: string;
}

export const CardHoverEffect: React.FC<CardHoverEffectProps> = ({
  items,
  className,
  cardClassName,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10",
        className
      )}
      data-aos="fade-up"
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.id}
          className={cn(
            "relative group block p-2 h-full w-full",
            cardClassName
          )}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          data-aos="fade-up"
          data-aos-delay={idx * 100}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200/70 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardIcon>{item.icon}</CardIcon>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative z-10 group-hover:border-slate-300 dark:group-hover:border-slate-700 transition duration-300",
        className
      )}
    >
      <div className="relative z-10">
        <div className="p-4">{children}</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/30 dark:from-slate-900/5 dark:to-slate-900/30 opacity-0 group-hover:opacity-100 transition duration-300"></div>
    </div>
  );
};

export const CardIcon = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("text-4xl mb-4", className)}>
      {children || (
        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-green-600 dark:text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3
      className={cn(
        "text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition duration-300",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-sm text-slate-600 dark:text-slate-400 leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
};

export default CardHoverEffect;
