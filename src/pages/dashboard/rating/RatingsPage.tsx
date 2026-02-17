import { EmptyState } from "@/components/dashboard/EmptyState";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DriverAPI } from "@/services/api/driver";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { Star } from "lucide-react";

const RatingsPage = () => {
  const {
    data: ratingData,
    isPending: isLoadingRatingData,
    isSuccess: isSuccessLoadingRatingData,
  } = useQuery({
    queryKey: ["ratings", "driver"],
    queryFn: DriverAPI.ratings,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Ratings & Reviews</h1>
        <p className="text-muted-foreground">See what riders say about you</p>
      </div>

      {isLoadingRatingData && (
        <>
          <Card className="p-8 text-center gradient-driver text-driver-foreground space-y-4">
            <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full" />

            <Skeleton className="h-14 w-28 mx-auto" />

            <Skeleton className="h-5 w-40 mx-auto" />

            <Skeleton className="h-4 w-32 mx-auto mt-2" />
          </Card>

          <Card className="p-6 mt-6">
            <Skeleton className="h-6 w-48 mb-4" />

            <div className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="p-4 bg-muted rounded-xl space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4 rounded-full" />
                      ))}
                    </div>
                  </div>

                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />

                  <Skeleton className="h-3 w-24 mt-2" />
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
      <Card className="p-8 gradient-driver text-driver-foreground text-center">
        <p className="text-6xl font-bold mb-2 flex items-center justify-center gap-2">
          <span>{ratingData?.averageRating}</span>
          <span>
            <Star className="h-12 w-12 mx-auto fill-current" />
          </span>
        </p>
        <p className="text-lg opacity-90">Average Rating</p>
        <p className="text-sm opacity-75 mt-2">
          Based on {ratingData?.totalCompletedTrips} trips
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {isSuccessLoadingRatingData &&
            ratingData?.ratings.length > 0 &&
            ratingData?.ratings?.map((review) => (
              <div key={review?.id} className="p-4 bg-muted rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review?.user}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review?.rating
                            ? "text-warning fill-warning"
                            : "text-muted-foreground fill-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review?.comment}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {review?.createdAt && formatDate(review?.createdAt, "PPP")}
                </p>
              </div>
            ))}

          {ratingData?.ratings?.length < 1 && (
            <EmptyState title="No reviews yet" />
          )}
        </div>
      </Card>
    </div>
  );
};

export default RatingsPage;
