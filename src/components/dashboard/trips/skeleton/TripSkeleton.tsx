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

export function TripStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-4 space-y-2">
          {/* Label skeleton */}
          <Skeleton className="h-4 w-20" />

          {/* Value skeleton */}
          <Skeleton className="h-7 w-16" />
        </Card>
      ))}
    </div>
  );
}

export function TripMapSkeleton() {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Map Skeleton */}
      <Skeleton className="h-[400px] w-full rounded-md" />

      {/* Trip Stats Skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 text-center space-y-2">
            {/* Icon skeleton */}
            <Skeleton className="h-6 w-6 mx-auto rounded-full" />

            {/* Value skeleton */}
            <Skeleton className="h-7 w-16 mx-auto" />

            {/* Label skeleton */}
            <Skeleton className="h-4 w-20 mx-auto" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export function RiderCardSkeleton() {
  return (
    <Card className="p-6 space-y-6">
      {/* Rider info */}
      <div className="flex items-center gap-4">
        {/* Avatar skeleton */}
        <Skeleton className="w-16 h-16 rounded-full" />

        <div className="flex-1 space-y-2">
          {/* Name skeleton */}
          <Skeleton className="h-6 w-32" />

          {/* Role skeleton */}
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Buttons skeleton */}
      <div className="flex gap-2">
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="flex-1 h-10 rounded-md" />
      </div>
    </Card>
  );
}

export function TripRouteSkeleton() {
  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="space-y-4">
        {/* Pickup skeleton */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-[2px] h-16 mt-1" />
          </div>

          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-16" /> {/* label */}
            <Skeleton className="h-6 w-3/4" /> {/* address */}
            <Skeleton className="h-4 w-40" /> {/* time */}
          </div>
        </div>

        {/* Drop-off skeleton */}
        <div className="flex items-start gap-3">
          <Skeleton className="w-4 h-4 rounded-full mt-1" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-20" /> {/* label */}
            <Skeleton className="h-6 w-3/4" /> {/* address */}
            <Skeleton className="h-4 w-36" /> {/* time */}
          </div>
        </div>
      </div>
    </Card>
  );
}
