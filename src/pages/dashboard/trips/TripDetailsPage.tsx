import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { mockRiderTrips, mockDriverTrips } from "@/data/mockData";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Route,
  DollarSign,
  User,
  Car,
  Star,
  Phone,
  MessageSquare,
  Receipt,
  Navigation,
  Calendar,
  CreditCard,
  CheckCircle,
  XCircle,
  IconNode,
} from "lucide-react";
import { format } from "date-fns";
import { Ride } from "@/types/rides/indes";
import { useQuery } from "@tanstack/react-query";
import { RideAPI } from "@/services/api/rides";
import { EmptyState } from "@/components/dashboard/EmptyState";
import {
  TripRouteSkeleton,
  TripSingleStatSkeleton,
} from "@/components/dashboard/trips/skeleton/TripSkeleton";
import { formatCurrency } from "@/helpers";
import { ElementType } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const TripDetailsPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isDriver = user?.role === "DRIVER";
  const trips = isDriver ? mockDriverTrips : mockRiderTrips;
  const trip = trips.find((t) => t.id === tripId);

  const {
    data: rideDetails,
    isLoading: isLoadingRideDetails,
    isSuccess: isSuccessLoadingRideDetails,
    isError,
  } = useQuery<Ride>({
    queryKey: ["rides", "details", tripId],
    queryFn: () => RideAPI.tripDetails(tripId),
    enabled: !!tripId,
  });

  if (isError || !rideDetails) {
    return (
      <EmptyState
        title="Trip Not Found"
        description=" This trip doesn't exist or has been removed."
        icon={
          <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        }
        actionLabel="Back"
        onAction={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-display">
            Trip #{rideDetails?.id}
          </h1>
          <p className="text-sm text-muted-foreground">
            {rideDetails?.createdAt &&
              format(new Date(rideDetails?.createdAt), "EEEE, MMMM d, yyyy")}
          </p>
        </div>
        <StatusBadge status={rideDetails?.rideStatus} type="trip" />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route Card */}
          {isLoadingRideDetails && <TripRouteSkeleton />}
          {isSuccessLoadingRideDetails && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" /> Trip Route
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-300 shadow-sm" />
                    <div className="w-[2px] h-16 bg-gradient-to-b from-emerald-500 to-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Pickup
                    </p>
                    <p className="font-semibold text-lg">
                      {rideDetails?.pickupLocation?.address}
                    </p>
                    {rideDetails?.arrivalTime && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <Clock className="inline h-3 w-3 mr-1" />
                        Picked up at{" "}
                        {format(new Date(rideDetails.arrivalTime), "h:mm a")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-destructive border-2 border-red-300 shadow-sm" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Drop-off
                    </p>
                    <p className="font-semibold text-lg">
                      {rideDetails?.dropoffLocation?.address}
                    </p>
                    {rideDetails?.dropOffTime && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <Clock className="inline h-3 w-3 mr-1" />
                        Arrived at{" "}
                        {format(new Date(rideDetails.dropOffTime), "h:mm a")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
          {/* Trip Stats */}
          {isLoadingRideDetails && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <TripSingleStatSkeleton />
              <TripSingleStatSkeleton />
              <TripSingleStatSkeleton />
            </div>
          )}

          {isSuccessLoadingRideDetails && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <Route className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">
                  {rideDetails?.estimatedDistance} km
                </p>
                <p className="text-xs text-muted-foreground">Distance</p>
              </Card>
              <Card className="p-4 text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">
                  {rideDetails?.estimatedDurationMins
                    ? `${rideDetails?.estimatedDurationMins} min`
                    : "—"}
                </p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </Card>
              <Card className="p-4 text-center">
                <DollarSign className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">
                  {formatCurrency(rideDetails?.estimatedFare)}
                </p>
                <p className="text-xs text-muted-foreground">Est. Fare</p>
              </Card>
              <Card className="p-4 text-center">
                <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">
                  {rideDetails?.createdAt &&
                    format(new Date(rideDetails?.createdAt), "h:mm a")}
                </p>
                <p className="text-xs text-muted-foreground">Requested</p>
              </Card>
            </div>
          )}

          {isLoadingRideDetails && (
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}

          {isSuccessLoadingRideDetails && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Trip Timeline
              </h3>
              <div className="space-y-4">
                <TimelineComponent
                  icon={MapPin}
                  text="Request"
                  time={rideDetails?.createdAt}
                />
                <TimelineComponent
                  icon={CheckCircle}
                  text="Accepted"
                  time={rideDetails?.acceptedAt}
                />
                <TimelineComponent
                  icon={Navigation}
                  text="Trip Started"
                  time={rideDetails?.arrivalTime}
                />
                <TimelineComponent
                  icon={CheckCircle}
                  text="Completed"
                  time={rideDetails?.dropOffTime}
                />
              </div>
            </Card>
          )}
        </div>
        {/* Right column */}
        <div className="space-y-6">
          {/* Person Info */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">
              {isDriver ? "Rider Info" : "Driver Info"}
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <User className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold text-lg">
                  {isDriver
                    ? trip.riderName || "Unknown Rider"
                    : trip.driverName || "Unknown Driver"}
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-primary text-primary" /> 4.8
                </div>
              </div>
            </div>
            {trip.status !== "CANCELLED" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Phone className="h-3.5 w-3.5" /> Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <MessageSquare className="h-3.5 w-3.5" /> Chat
                </Button>
              </div>
            )}
          </Card>
          {/* Vehicle Info (rider view) */}
          {!isDriver && trip.vehicleInfo && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" /> Vehicle
              </h3>
              <p className="font-medium">{trip.vehicleInfo}</p>
            </Card>
          )}
          {/* Payment Summary */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary" /> Payment
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base fare</span>
                <span>{formatCurrency(trip.estimatedFare * 0.6)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Distance</span>
                <span>{formatCurrency(trip.estimatedFare * 0.3)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service fee</span>
                <span>{formatCurrency(trip.estimatedFare * 0.1)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  {formatCurrency(trip.finalFare || trip.estimatedFare)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" /> Wallet
                </div>
                <StatusBadge status={trip.paymentStatus} type="payment" />
              </div>
            </div>
          </Card>
          {/* Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full gap-2">
              <Receipt className="h-4 w-4" /> Download Receipt
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => navigate("/dashboard/support")}
            >
              Report an Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TripDetailsPage;

const TimelineComponent = ({
  icon: Icon,
  text,
  time,
}: {
  icon: ElementType;
  text: string;
  time: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{text}</p>
      </div>
      <p className="text-sm text-muted-foreground">
        {time && format(new Date(time), "h:mm:ss a")}
      </p>
    </div>
  );
};
