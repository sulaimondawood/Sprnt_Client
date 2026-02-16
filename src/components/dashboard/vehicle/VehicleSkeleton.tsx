import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VehicleCardSkeleton() {
  return (
    <Card className="p-6 space-y-6">
      {/* Header: Avatar + Name + Buttons */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Vehicle icon/avatar */}
          <Skeleton className="w-16 h-16 rounded-xl" />

          <div className="space-y-2">
            {/* Brand + model */}
            <Skeleton className="h-6 w-40" />
            {/* Plate number */}
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status badge */}
          <Skeleton className="h-5 w-16 rounded-full" />
          {/* Edit button */}
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>

      {/* Vehicle stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 bg-muted rounded-xl space-y-2">
            {/* Label */}
            <Skeleton className="h-3 w-16" />
            {/* Value */}
            <Skeleton className="h-5 w-20" />
          </div>
        ))}
      </div>
    </Card>
  );
}
