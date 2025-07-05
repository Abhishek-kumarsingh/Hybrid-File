"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ModernText from "./ModernText";

interface AccordionItem {
  id: string | number;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  category?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultExpanded?: (string | number)[];
  variant?: "default" | "bordered" | "separated" | "minimal";
  iconPosition?: "left" | "right";
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  className,
  allowMultiple = false,
  defaultExpanded = [],
  variant = "default",
  iconPosition = "right",
}) => {
  const [expandedItems, setExpandedItems] = useState<(string | number)[]>(defaultExpanded);
  
  // Toggle item expansion
  const toggleItem = (id: string | number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      if (allowMultiple) {
        setExpandedItems([...expandedItems, id]);
      } else {
        setExpandedItems([id]);
      }
    }
  };
  
  // Determine container classes based on variant
  const containerClasses = cn(
    "w-full",
    {
      "space-y-2": variant === "separated",
      "border rounded-lg overflow-hidden": variant === "bordered",
      "divide-y": variant === "default",
    },
    className
  );

  return (
    <div className={containerClasses} data-aos="fade-up">
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isExpanded={expandedItems.includes(item.id)}
          toggleItem={toggleItem}
          variant={variant}
          iconPosition={iconPosition}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

interface AccordionItemComponentProps {
  item: AccordionItem;
  isExpanded: boolean;
  toggleItem: (id: string | number) => void;
  variant: "default" | "bordered" | "separated" | "minimal";
  iconPosition: "left" | "right";
  isLast: boolean;
}

const AccordionItemComponent: React.FC<AccordionItemComponentProps> = ({
  item,
  isExpanded,
  toggleItem,
  variant,
  iconPosition,
  isLast,
}) => {
  // Determine item classes based on variant
  const itemClasses = cn(
    "overflow-hidden transition-all",
    {
      "border border-gray-200 dark:border-gray-700 rounded-lg": variant === "separated",
      "border-b border-gray-200 dark:border-gray-700 last:border-0": variant === "default" && !isLast,
      "bg-white dark:bg-gray-800": variant !== "minimal",
    }
  );
  
  // Determine button classes
  const buttonClasses = cn(
    "flex items-center justify-between w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg",
    {
      "hover:bg-gray-50 dark:hover:bg-gray-700": variant !== "minimal",
      "bg-gray-50 dark:bg-gray-700": isExpanded && variant !== "minimal",
    }
  );
  
  // Determine content classes
  const contentClasses = cn(
    "p-4",
    {
      "pt-0": variant !== "separated",
      "border-t border-gray-200 dark:border-gray-700": variant !== "minimal" && isExpanded,
    }
  );
  
  return (
    <div className={itemClasses}>
      <button
        className={buttonClasses}
        onClick={() => toggleItem(item.id)}
        aria-expanded={isExpanded}
      >
        <div className={cn("flex items-center", iconPosition === "left" ? "flex-row" : "flex-row-reverse justify-end")}>
          {item.icon && (
            <span className={cn("flex-shrink-0", iconPosition === "left" ? "mr-3" : "ml-3")}>
              {item.icon}
            </span>
          )}
          <ModernText as="span" size="lg" weight="medium">
            {item.title}
          </ModernText>
          {item.category && (
            <span className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
              {item.category}
            </span>
          )}
        </div>
        <span className={cn("flex-shrink-0 transition-transform duration-300", isExpanded ? "rotate-180" : "")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={contentClasses}>
              {typeof item.content === "string" ? (
                <ModernText as="p" color="muted">
                  {item.content}
                </ModernText>
              ) : (
                item.content
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
