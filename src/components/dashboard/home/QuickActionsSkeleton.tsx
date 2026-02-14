import { Skeleton } from "@/components/ui/skeleton";

export function QuickActionsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Total Trips */}
      <div className="p-4 bg-muted rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <Skeleton className="h-full w-1/2 rounded-full" />
        </div>

        <Skeleton className="h-3 w-40 mt-2" />
      </div>

      {/* Total Earnings */}
      <div className="p-4 bg-muted rounded-xl">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Driver Rating */}
      <div className="p-4 bg-muted rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="flex items-baseline gap-2">
          <Skeleton className="h-8 w-14" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
}
