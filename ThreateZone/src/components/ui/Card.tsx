import * as React from "react";
import { cn } from "../../lib/utils";
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
  const CardComponent = isAnimated ? motion.div : "div";

  const animationProps = isAnimated ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <CardComponent
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...animationProps}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </CardComponent>
  );
});

Card.displayName = "Card";

export { Card, cardVariants };