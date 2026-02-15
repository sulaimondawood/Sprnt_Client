import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TripCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-44" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Locations */}
          <div className="space-y-3 pl-2">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="w-[2px] h-8 mt-1" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Skeleton className="w-3 h-3 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
          </div>

          {/* Rider / Driver */}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="md:w-48 flex md:flex-col gap-4 md:gap-2 md:text-right md:border-l md:border-border md:pl-6">
          <div>
            <Skeleton className="h-3 w-12 ml-auto" />
            <Skeleton className="h-7 w-24 ml-auto mt-1" />
          </div>

          <div>
            <Skeleton className="h-3 w-16 ml-auto" />
            <Skeleton className="h-4 w-20 ml-auto mt-1" />
          </div>

          <div>
            <Skeleton className="h-3 w-16 ml-auto" />
            <Skeleton className="h-6 w-20 rounded-full ml-auto mt-1" />
          </div>

          <Skeleton className="h-8 w-24 rounded-md md:mt-4 ml-auto" />
        </div>
      </div>
    </Card>
  );
}
