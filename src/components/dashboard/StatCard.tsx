import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "rider" | "driver";
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) {
  const variantStyles = {
    default: "bg-card",
    primary: "gradient-primary text-primary-foreground",
    rider: "gradient-rider text-rider-foreground",
    driver: "gradient-driver text-driver-foreground",
  };

  const isColored = variant !== "default";

  return (
    <Card
      className={cn(
        "p-6 relative overflow-hidden transition-all hover:shadow-lg",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p
            className={cn(
              "text-sm font-medium",
              isColored ? "opacity-90" : "text-muted-foreground"
            )}
          >
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p
              className={cn(
                "text-sm",
                isColored ? "opacity-80" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm",
                trend.isPositive
                  ? isColored
                    ? "text-current"
                    : "text-success"
                  : "text-destructive"
              )}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}% from last week</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-xl",
            isColored ? "bg-white/20" : "bg-primary/10"
          )}
        >
          <Icon
            className={cn(
              "h-6 w-6",
              isColored ? "text-current" : "text-primary"
            )}
          />
        </div>
      </div>

      {/* Decorative element */}
      <div
        className={cn(
          "absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10",
          isColored ? "bg-white" : "bg-primary"
        )}
      />
    </Card>
  );
}
