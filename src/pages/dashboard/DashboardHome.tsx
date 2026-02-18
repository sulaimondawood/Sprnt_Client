import { EmptyState } from "@/components/dashboard/EmptyState";
import { QuickActionsSkeleton } from "@/components/dashboard/home/QuickActionsSkeleton";
import { RecentTripsSkeleton } from "@/components/dashboard/home/RecentTripsSkeleton";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import {
  mockDriverStats,
  mockDriverWallet,
  mockRiderStats,
  mockRiderWallet,
} from "@/data/mockData";
import { formatCurrency, profile } from "@/helpers";
import { DriverAPI } from "@/services/api/driver";
import { RiderAPI } from "@/services/api/rider";
import { UserAPI } from "@/services/api/user";
import { Ride } from "@/types/rides/indes";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Car,
  CheckCircle,
  ChevronRight,
  Clock,
  MapPin,
  Navigation,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const profileData = profile();

  const role = profileData?.role;
  const isDriver = profileData?.role === "DRIVER";
  const isRider = profileData?.role === "RIDER";
  const navigate = useNavigate();

  const stats = isDriver ? mockDriverStats : mockRiderStats;
  const wallet = isDriver ? mockDriverWallet : mockRiderWallet;

  //Driver API*********************
  const { data: currentRide, isSuccess: isSuccessLoadingCurrentRide } =
    useQuery<Ride>({
      queryKey: ["rides", "current"],
      queryFn: DriverAPI.currentRide,
      enabled: isDriver,
    });

  const {
    data: recentRides,
    isLoading: isLoadingRecentRides,
    isSuccess: isSuccessLoadingRecentRides,
  } = useQuery<Ride[]>({
    queryKey: ["rides", "recent"],
    queryFn: DriverAPI.recentRides,
    enabled: isDriver,
  });
  //Driver API*********************

  // RIDER API****************
  const {
    data: recentRiderRides,
    isLoading: isLoadingRecentRiderRides,
    isSuccess: isSuccessLoadingRecentRiderRides,
  } = useQuery<Ride[]>({
    queryKey: ["rides", "rider", "recent"],
    queryFn: RiderAPI.recentRides,
    enabled: isRider,
  });

  const {
    data: riderCurrentRide,
    isSuccess: isSuccessLoadingRiderCurrentRide,
  } = useQuery<Ride>({
    queryKey: ["rides", "current", "rider"],
    queryFn: RiderAPI.currentRide,
    enabled: isRider,
  });
  // RIDER API****************

  const {
    data: userProfile,
    isLoading: isLoadingUserProfileData,
    isSuccess: isSuccessLoadingUserProfileData,
  } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: UserAPI.profile,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profileData?.fullname?.split(" ")[0]}!
          </h1>

          <p className="text-muted-foreground">
            {isDriver
              ? "Here's your driving performance overview"
              : "Ready to go somewhere? Book a ride now."}
          </p>
        </div>

        {!isDriver && (
          <Link to={ROUTES.dashboardBookRide}>
            <Button
              size="lg"
              className="gradient-rider text-rider-foreground gap-2"
            >
              <MapPin className="h-5 w-5" />
              Book a Ride
            </Button>
          </Link>
        )}
      </div>

      {/* Active Trip Banner (Driver) */}
      {isSuccessLoadingCurrentRide && currentRide && (
        <Card className="p-6 gradient-driver text-driver-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Navigation className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Active Trip</p>
                <p className="text-xl font-bold">{currentRide?.riderName}</p>
                <p className="text-sm opacity-80">
                  {currentRide?.dropoffLocation?.address}
                </p>
              </div>
            </div>
            <Link to={ROUTES.dashboardCurrentRide}>
              <Button variant="secondary" className="gap-2">
                View Trip
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      )}
      {/* Active Trip Banner (Rider) */}
      {isSuccessLoadingRiderCurrentRide && riderCurrentRide && (
        <Card className="p-6 gradient-driver text-driver-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Navigation className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Active Trip</p>
                <p className="text-xl font-bold">
                  {riderCurrentRide?.driverName}
                </p>
                <p className="text-sm opacity-80">
                  {riderCurrentRide?.dropoffLocation?.address}
                </p>
              </div>
            </div>
            <Link to={ROUTES.dashboardCurrentRide}>
              <Button variant="secondary" className="gap-2">
                View Trip
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isDriver ? (
          <>
            <StatCard
              title="Today's Earnings"
              value={"N/A"}
              subtitle={`N/A trips completed`}
              icon={Wallet}
              variant="driver"
            />
            <StatCard
              title="Weekly Earnings"
              value={"N/A"}
              subtitle={`N/A trips this week`}
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Rating"
              value={"N/A"}
              subtitle="Based on recent trips"
              icon={Star}
            />
            <StatCard
              title="Completion Rate"
              value={"N/A"}
              subtitle="Trip completion"
              icon={CheckCircle}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Total Rides"
              value={"N/A"}
              subtitle="Lifetime rides"
              icon={Car}
              variant="rider"
            />
            <StatCard
              title="This Week"
              value={"N/A"}
              subtitle="Rides taken"
              icon={Clock}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Rating"
              value={"N/A"}
              subtitle="Your rider rating"
              icon={Star}
            />
            <StatCard title="Wallet Balance" value={"N/A"} icon={Wallet} />
          </>
        )}
      </div>

      {/* Recent Trips & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* {DRIVER}*********/}
        {/* Recent Trips */}
        <>
          {isLoadingRecentRides && <RecentTripsSkeleton />}
          {isSuccessLoadingRecentRides && recentRides.length > 0 && (
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Trips</h2>
                <Link to={ROUTES.dashboardRides}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentRides.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        trip.rideStatus === "COMPLETED"
                          ? "bg-success/10 text-success"
                          : trip.rideStatus === "RIDER_CANCELLED" ||
                              trip.rideStatus === "DRIVER_CANCELLED"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-info/10 text-info"
                      }`}
                    >
                      <Car className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">
                          {role === "DRIVER"
                            ? trip.riderName
                            : trip.dropoffLocation.address}
                        </p>
                        <StatusBadge status={trip.rideStatus} type="trip" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {trip.createdAt &&
                          format(
                            new Date(trip.createdAt),
                            "MMM d, yyyy • h:mm a",
                          )}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(trip.estimatedFare)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {trip.estimatedDistance} km
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          {isSuccessLoadingRecentRides && recentRides.length === 0 && (
            <EmptyState
              className="col-span-2"
              title="No trips yet"
              description="Trips you complete or cancelled will show up here."
              icon={<Car className="h-6 w-6 text-muted-foreground" />}
            />
          )}
        </>
        {/* {DRIVER}*********/}

        {/* {RIDER**********************} */}
        <>
          {isLoadingRecentRiderRides && <RecentTripsSkeleton />}
          {isSuccessLoadingRecentRiderRides && recentRiderRides.length > 0 && (
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Trips</h2>
                <Link to={ROUTES.dashboardRides}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentRiderRides.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        trip.rideStatus === "COMPLETED"
                          ? "bg-success/10 text-success"
                          : trip.rideStatus === "RIDER_CANCELLED" ||
                              trip.rideStatus === "DRIVER_CANCELLED"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-info/10 text-info"
                      }`}
                    >
                      <Car className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">
                          {role === "DRIVER"
                            ? trip.riderName
                            : trip.dropoffLocation.address}
                        </p>
                        <StatusBadge status={trip.rideStatus} type="trip" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {trip.createdAt &&
                          format(
                            new Date(trip.createdAt),
                            "MMM d, yyyy • h:mm a",
                          )}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(trip.estimatedFare)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {trip.estimatedDistance} km
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          {isSuccessLoadingRecentRiderRides &&
            recentRiderRides.length === 0 && (
              <EmptyState
                className="col-span-2"
                title="No trips yet"
                description="Trips you complete or cancelled will show up here."
                icon={<Car className="h-6 w-6 text-muted-foreground" />}
                actionLabel="Book a ride"
                onAction={() => navigate(ROUTES.dashboardBookRide)}
              />
            )}
        </>
        {/* {RIDER**********************} */}

        {/* Quick Actions / Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            {role === "DRIVER" ? "Quick Stats" : "Quick Actions"}
          </h2>

          {role === "DRIVER" ? (
            <>
              {isLoadingUserProfileData && <QuickActionsSkeleton />}
              {isSuccessLoadingUserProfileData && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">
                        Total Completed Trips
                      </span>
                      <span className="font-bold text-2xl">
                        {userProfile?.driver?.totalCompletedTrips ?? 0}
                      </span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-driver rounded-full"
                        style={{
                          width: `${(userProfile?.driver?.totalCompletedTrips / 5000) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Next milestone: 5,000 trips
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">
                        Total Earnings
                      </span>
                      <span className="font-bold">{formatCurrency(0)}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-warning fill-warning" />
                      <span className="text-muted-foreground">
                        Driver Rating
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-3xl">
                        {userProfile?.driver?.rating}
                      </span>
                      <span className="text-muted-foreground">/ 5.0</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {isLoadingUserProfileData && <QuickActionsSkeleton />}
              {isSuccessLoadingUserProfileData && (
                <div className="space-y-3">
                  <Link to={ROUTES.dashboardBookRide} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-14"
                    >
                      <div className="w-10 h-10 rounded-lg gradient-rider flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-rider-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Book a Ride</p>
                        <p className="text-sm text-muted-foreground">
                          Get a ride now
                        </p>
                      </div>
                    </Button>
                  </Link>

                  <Link to={ROUTES.dashboardWallet} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-14"
                    >
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-warning" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Top Up Wallet</p>
                        <p className="text-sm text-muted-foreground">
                          Add funds
                        </p>
                      </div>
                    </Button>
                  </Link>

                  <Link to={ROUTES.dashboardRides} className="block">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-14"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Trip History</p>
                        <p className="text-sm text-muted-foreground">
                          View past rides
                        </p>
                      </div>
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
