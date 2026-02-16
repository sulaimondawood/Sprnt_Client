"use client";
import {
  RiderCardSkeleton,
  TripMapSkeleton,
} from "@/components/dashboard/trips/skeleton/TripSkeleton";
import Map from "@/components/Map";
import { RoleBadge } from "@/components/RoleBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { profile } from "@/helpers";
import { DriverAPI } from "@/services/api/driver";
import { Ride } from "@/types/rides/indes";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  MessageSquare,
  Navigation,
  Phone,
  Route,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CurrentTripPage = () => {
  const [driverCoords, setDriverCoords] = useState<[number, number]>([
    3.3792, 6.5244,
  ]);

  const handleReportIssue = () => {
    toast("Report Submitted", {
      description: "Our support team will review your report.",
    });
  };

  const profileData = profile();
  const role = profileData.role;

  const {
    data: currentRide,
    isLoading: isLoadingCurrentRide,
    isSuccess: isSuccessLoadingCurrentRide,
    isError,
  } = useQuery<Ride>({
    queryKey: ["rides", "current"],
    queryFn: DriverAPI.currentRide,
  });

  if (isError) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Current Trip</h1>
            <RoleBadge role={role} />
          </div>
        </div>
        <Map className="h-[400px]" />
        <Card className="p-12 text-center">
          <Navigation className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Active Trip</h2>
          <p className="text-muted-foreground mb-4">
            Go online to start receiving ride requests.
          </p>
          <Button className="gradient-driver text-driver-foreground">
            Go Online
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Current Trip</h1>
            <RoleBadge role={role} />
          </div>
          <StatusBadge status={currentRide?.rideStatus || ""} type="trip" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReportIssue}>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Map */}
        {isLoadingCurrentRide && <TripMapSkeleton />}

        {isSuccessLoadingCurrentRide && (
          <div className="lg:col-span-2 space-y-6">
            <Map
              pickupCoords={[
                currentRide?.pickupLocation?.lng,
                currentRide?.pickupLocation?.lat,
              ]}
              dropoffCoords={[
                currentRide?.dropoffLocation?.lng,
                currentRide?.dropoffLocation?.lat,
              ]}
              driverCoords={driverCoords}
              showRoute={true}
              className="h-[400px]"
            />

            {/* Trip Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <Clock className="h-6 w-6 text-driver mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {currentRide?.estimatedDurationMins}mins
                </p>
                <p className="text-sm text-muted-foreground">Duration</p>
              </Card>
              <Card className="p-4 text-center">
                <Route className="h-6 w-6 text-driver mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {currentRide?.estimatedDistance} km
                </p>
                <p className="text-sm text-muted-foreground">Distance</p>
              </Card>
              <Card className="p-4 text-center">
                <DollarSign className="h-6 w-6 text-driver mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  ₦{currentRide?.estimatedFare}
                </p>
                <p className="text-sm text-muted-foreground">Est. Fare</p>
              </Card>
            </div>
          </div>
        )}

        {/* Right: Trip Details */}
        <div className="space-y-6">
          {/* Rider Info */}
          {isLoadingCurrentRide && <RiderCardSkeleton />}
          {isSuccessLoadingCurrentRide && (
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-rider flex items-center justify-center">
                  <User className="h-8 w-8 text-rider-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    {currentRide?.riderName}
                  </h2>
                  <p className="text-muted-foreground">Rider</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call(NULL)
                </Button>

                <a
                  href={`mailto:${currentRide.riderInfo.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </a>
              </div>
            </Card>
          )}

          {/* Trip Route */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Trip Route</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 ${
                    currentRide?.rideStatus === "DRIVER_EN_ROUTE"
                      ? "bg-success animate-pulse"
                      : "bg-success"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Pickup</p>
                  <p className="font-medium">
                    {currentRide?.pickupLocation?.address}
                  </p>
                  {currentRide?.rideStatus === "DRIVER_EN_ROUTE" && (
                    <p className="text-xs text-driver mt-1">
                      • Navigating here
                    </p>
                  )}
                </div>
              </div>

              <div className="ml-[6px] w-[2px] h-8 bg-border" />

              <div className="flex items-start gap-3">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 ${
                    currentRide?.rideStatus === "ON_TRIP" ||
                    currentRide?.rideStatus === "DRIVER_ARRIVED"
                      ? "bg-destructive animate-pulse"
                      : "bg-destructive/50"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Drop-off</p>
                  <p className="font-medium">
                    {currentRide?.dropoffLocation?.address}
                  </p>
                  {(currentRide?.rideStatus === "ON_TRIP" ||
                    currentRide?.rideStatus === "DRIVER_ARRIVED") && (
                    <p className="text-xs text-driver mt-1">
                      • Navigating here
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isSuccessLoadingCurrentRide && (
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${
                      currentRide?.rideStatus === "DRIVER_EN_ROUTE"
                        ? `${currentRide?.pickupLocation?.lat},${currentRide?.pickupLocation?.lng}`
                        : `${currentRide?.dropoffLocation?.lat},${currentRide?.dropoffLocation?.lng}`
                    }`,
                    "_blank",
                  )
                }
              >
                <Navigation className="h-4 w-4" />
                Open in Google Maps
              </Button>
            )}

            {currentRide?.rideStatus === "DRIVER_EN_ROUTE" && (
              <Button
                className="w-full gap-2 gradient-driver text-driver-foreground"
                // onClick={handleStartTrip}
              >
                <CheckCircle className="h-4 w-4" />
                Rider Picked Up - Start Trip
              </Button>
            )}

            {(currentRide?.rideStatus === "ON_TRIP" ||
              currentRide?.rideStatus === "DRIVER_ARRIVED") && (
              <Button
                className="w-full gap-2 gradient-driver text-driver-foreground"
                // onClick={handleCompleteTrip}
              >
                <CheckCircle className="h-4 w-4" />
                Complete Trip
              </Button>
            )}

            {currentRide?.rideStatus === "COMPLETED" && (
              <Card className="p-6 bg-success/10 border-success/20">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-success">
                    Trip Completed!
                  </h3>
                  <p className="text-2xl font-bold mt-2">
                    ₦{currentRide?.estimatedFare}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Earnings added to wallet
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentTripPage;
