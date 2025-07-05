import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

const cardVariants = cva(
  "rounded-lg shadow-sm overflow-hidden border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive/50",
        success: "border-success/50",
        warning: "border-warning/50",
        info: "border-primary/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> &
  {
    title?: string;
    isAnimated?: boolean;
  }
>(({ className, variant, title, isAnimated = false, children, ...props }, ref) => {
  if (isAnimated) {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...(props as any)}
      >
        {title && (
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
        )}
        <div className="p-6">{children}</div>
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
});

Card.displayName = "Card";

export { Card, cardVariants };
