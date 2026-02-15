import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import { RoleBadge } from "@/components/RoleBadge";
import { mockRiderTrips, mockDriverTrips } from "@/data/mockData";
import {
  Car,
  MapPin,
  Calendar as CalendarIcon,
  Search,
  Filter,
  ChevronRight,
  Clock,
  Navigation,
  User,
} from "lucide-react";
import { addDays, format } from "date-fns";
import { profile } from "@/helpers";
import { DriverAPI } from "@/services/api/driver";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { RideResponse } from "@/types/rides/indes";
import { TripCardSkeleton } from "@/components/dashboard/trips/skeleton/TripSkeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { useDebounce } from "@/hooks/useDebounce";

const TripHistoryPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [searchQuery, setSearchQuery] = useState<string | null>();

  const debouncedValue = useDebounce(searchQuery);

  const profileData = profile();
  const role = profileData.role;

  const filter = {
    keyword: debouncedValue,
    status: activeTab === "all" ? null : activeTab,
    from: date?.from && date?.from.toISOString(),
    to: date?.to && date?.to.toISOString(),
  };

  const {
    data: allRides,
    isLoading: isLoadingallRides,
    isSuccess: isSuccessLoadingallRides,
  } = useQuery<RideResponse>({
    queryKey: ["rides", "all", filter],
    queryFn: () => DriverAPI.allRides(filter),
  });

  const { user } = useAuth();
  const isDriver = user?.role === "DRIVER";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Trip History</h1>
            <RoleBadge role={role} />
          </div>
          <p className="text-muted-foreground">
            {role === "DRIVER"
              ? "View all your completed and ongoing trips"
              : "Your ride history and trip details"}
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Trips</p>
          <p className="text-2xl font-bold">{"NULL"}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-success">NULL</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="text-2xl font-bold text-destructive">NULL</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Ongoing</p>
          <p className="text-2xl font-bold text-info">NULL</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by location or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ON_TRIP">Ongoing</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="DRIVER_CANCELLED">Cancelled</TabsTrigger>
          <TabsTrigger value="RIDER_CANCELLED">Rider Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {isLoadingallRides && (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <TripCardSkeleton key={i} />
              ))}
            </div>
          )}

          {isSuccessLoadingallRides && allRides?.data?.length === 0 && (
            <EmptyState
              className="col-span-2"
              title="No trips found"
              description={
                searchQuery
                  ? "Try adjusting your search"
                  : "You have no trips in this category"
              }
              icon={<Car className="h-6 w-6 text-muted-foreground" />}
              actionLabel="Book a ride"
            />
          )}

          {isSuccessLoadingallRides &&
            allRides?.data.length > 0 &&
            allRides?.data?.map((trip) => (
              <Card
                key={trip.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Trip Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            trip.rideStatus === "COMPLETED"
                              ? "bg-success/10 text-success"
                              : trip.rideStatus === "CANCELLED"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-info/10 text-info"
                          }`}
                        >
                          <Car className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">
                            Trip #{trip.id.slice(-4).toUpperCase()}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {trip.createdAt &&
                              format(
                                new Date(trip.createdAt),
                                "MMM d, yyyy • h:mm a",
                              )}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={trip.rideStatus} type="trip" />
                    </div>

                    {/* Locations */}
                    <div className="space-y-3 pl-2">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-success" />
                          <div className="w-[2px] h-8 bg-border" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Pickup
                          </p>
                          <p className="font-medium">
                            {trip.pickupLocation.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Drop-off
                          </p>
                          <p className="font-medium">
                            {trip.dropoffLocation.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Driver/Rider Info */}
                    {(role === "DRIVER" ? trip.riderName : trip.driverName) && (
                      <div className="flex items-center gap-3 pt-2 border-t border-border">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {role === "DRIVER" ? "Rider" : "Driver"}
                          </p>
                          <p className="font-medium">
                            {role === "DRIVER"
                              ? trip.riderName
                              : trip.driverName}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Trip Summary */}
                  <div className="md:w-48 flex md:flex-col gap-4 md:gap-2 md:text-right md:border-l md:border-border md:pl-6">
                    <div className="flex-1 md:flex-initial">
                      <p className="text-sm text-muted-foreground">Fare</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(trip.estimatedFare)}
                      </p>
                    </div>
                    <div className="flex-1 md:flex-initial">
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-medium">{trip.estimatedDistance} km</p>
                    </div>
                    <div className="flex-1 md:flex-initial">
                      <p className="text-sm text-muted-foreground">Payment</p>
                      <StatusBadge status={"pending"} type="payment" />
                      {/* <StatusBadge status={trip.paymentStatus} type="payment" /> */}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 md:mt-4">
                      Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripHistoryPage;
