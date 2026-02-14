import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentTripsSkeleton() {
  return (
    <Card className="lg:col-span-2 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      {/* List */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/40"
          >
            {/* Icon */}
            <Skeleton className="w-10 h-10 rounded-lg" />

            {/* Middle content */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
              <Skeleton className="h-3 w-40" />
            </div>

            {/* Right content */}
            <div className="text-right space-y-2">
              <Skeleton className="h-4 w-20 ml-auto" />
              <Skeleton className="h-3 w-12 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
