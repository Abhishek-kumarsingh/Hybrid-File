import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  trend?: {
    value: number;
    isUpward: boolean;
  };
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  variant = 'default',
  trend,
  className = ''
}) => {
  const variantStyles = {
    default: {
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    success: {
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    warning: {
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    danger: {
      iconBg: 'bg-danger/10',
      iconColor: 'text-danger',
    },
    info: {
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
  };

  const { iconBg, iconColor } = variantStyles[variant];

  return (
    <Card className={cn("overflow-hidden", className)} isAnimated>
      <div className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <motion.p
            className="mt-2 text-3xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {value}
          </motion.p>

          {trend && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  "text-sm font-medium flex items-center",
                  trend.isUpward
                    ? trend.value > 0
                      ? 'text-success'
                      : 'text-muted-foreground'
                    : trend.value > 0
                    ? 'text-danger'
                    : 'text-muted-foreground'
                )}
              >
                {trend.value > 0 ? (
                  <>
                    {trend.isUpward ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {trend.value}%
                  </>
                ) : (
                  'No change'
                )}
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-full", iconBg)}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
