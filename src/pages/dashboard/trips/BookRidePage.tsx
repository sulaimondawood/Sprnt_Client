/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LocationSearch,
  LocationValue,
} from "@/components/AddressAutocompletete";
import Map from "@/components/Map";
import {
  DriverResponseModal,
  RiderCancelledModal,
  RideRequestModal,
  SearchingDriverModal,
} from "@/components/RideModals";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profile } from "@/helpers";
import { useSubscription } from "@/hooks/useStompSubscription";
import { RiderAPI } from "@/services/api/rider";
import { CreateRideRequest } from "@/types/riders";
import { useMutation } from "@tanstack/react-query";
import {
  Car,
  ChevronRight,
  Loader2,
  MessageSquare,
  Phone,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type BookingStep =
  | "location"
  | "vehicle"
  | "searching"
  | "matched"
  | "arriving"
  | "inProgress";

const vehicleTypes = [
  { id: "standard", name: "STANDARD", icon: Car, capacity: 4 },
  { id: "premium", name: "PREMIUM", icon: Car, capacity: 4 },
  { id: "suv", name: "SUV", icon: Car, capacity: 6 },
];

const BookRidePage = () => {
  const [pickup, setPickup] = useState<LocationValue | null>();
  const [dropoff, setDropoff] = useState<LocationValue | null>();
  const [selectedRideType, setSelectedRideType] = useState<string | null>();
  // Modal states
  const [showSearchingModal, setShowSearchingModal] = useState(false);
  const [driverResponseType, setDriverResponseType] = useState<
    "accepted" | "rejected" | "cancelled" | null
  >(null);
  const [showRideRequest, setShowRideRequest] = useState(false);
  const [showRiderCancelled, setShowRiderCancelled] = useState(false);
  const [requestCountdown, setRequestCountdown] = useState(15);

  const [pickupCoords, setPickupCoords] = useState<
    [number, number] | undefined
  >();
  const [dropoffCoords, setDropoffCoords] = useState<
    [number, number] | undefined
  >();
  const [bookingStep, setBookingStep] = useState<BookingStep>("location");
  const [driverCoords, setDriverCoords] = useState<
    [number, number] | undefined
  >();
  const [eta, setEta] = useState(5);

  const mockDriver = {
    name: "Adebayo Johnson",
    rating: 4.9,
    trips: 1247,
    vehicle: "Toyota Camry",
    plate: "LG-234-KJA",
    phone: "+234 801 234 5678",
  };

  const mockRider = {
    name: "Chioma Adeyemi",
    rating: 4.7,
    pickup: pickup || "Victoria Island, Lagos",
    dropoff: dropoff || "Lekki Phase 1, Lagos",
  };

  // Simulate driver approaching
  useEffect(() => {
    if (bookingStep === "arriving" && pickupCoords) {
      const interval = setInterval(() => {
        setEta((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setBookingStep("inProgress");
            return 0;
          }
          return prev - 1;
        });
        setDriverCoords((prev) => {
          if (!prev || !pickupCoords) return [3.38, 6.52];
          const newLng = prev[0] + (pickupCoords[0] - prev[0]) * 0.2;
          const newLat = prev[1] + (pickupCoords[1] - prev[1]) * 0.2;
          return [newLng, newLat];
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [bookingStep, pickupCoords]);

  // Ride request countdown for driver-side modal
  useEffect(() => {
    if (!showRideRequest) return;
    setRequestCountdown(15);
    const interval = setInterval(() => {
      setRequestCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowRideRequest(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showRideRequest]);

  // const handleBookRide = () => {
  //   // Simulate: driver accepts after 4s
  //   setTimeout(() => {
  //     setShowSearchingModal(false);
  //     setDriverResponseType("accepted");
  //   }, 4000);
  // };

  const handleDriverAcceptConfirm = () => {
    setDriverResponseType(null);
    setBookingStep("arriving");
    setDriverCoords([3.36, 6.54]);
    setEta(5);
    toast({
      title: "Driver Confirmed!",
      description: `${mockDriver.name} is on the way in ${mockDriver.vehicle}.`,
    });
  };

  const handleDriverResponseClose = () => {
    if (driverResponseType === "rejected") {
      // Search again
      setDriverResponseType(null);
      setShowSearchingModal(true);
      setTimeout(() => {
        setShowSearchingModal(false);
        setDriverResponseType("accepted");
      }, 3000);
    } else if (driverResponseType === "cancelled") {
      setDriverResponseType(null);
      setBookingStep("location");
      setDriverCoords(undefined);
    } else {
      setDriverResponseType(null);
      setBookingStep("location");
    }
  };

  const handleCancelRide = () => {
    setShowSearchingModal(false);
    setDriverResponseType(null);
    setBookingStep("location");
    setDriverCoords(undefined);
    toast("Ride Cancelled", {
      description: "Your ride has been cancelled.",
    });
  };

  // const handlePickupSelect = (coords: [number, number], address: string) => {
  //   setPickupCoords(coords);
  //   setPickup(address);
  // };

  // Demo triggers for driver-side modals
  const handleSimulateRideRequest = () => setShowRideRequest(true);
  const handleSimulateRiderCancel = () => setShowRiderCancelled(true);

  useSubscription(` "/user/queue/no-driver-found`, (updatedRide) => {
    console.log("Ride status changed:", updatedRide.status);
    console.log("Ride status changed:", updatedRide);
    // Update your local state or invalidate TanStack Query
  });

  const { mutate: sendRideRequest, isPending: isPendingSendRideRequest } =
    useMutation({
      mutationFn: (payload: CreateRideRequest) => {
        if (!pickup || !dropoff) {
          toast("Missing Information", {
            description: "Please enter both pickup and drop-off locations.",
          });
          return;
        }
        if (!selectedRideType) {
          toast("Select Vehicle", {
            description: "Please select a vehicle type to continue.",
          });
          return;
        }
        return RiderAPI.createRideRequest(payload);
      },
      onMutate() {
        setBookingStep("searching");
        setShowSearchingModal(true);
      },
      onError(error: any) {
        setBookingStep("location");
        setShowSearchingModal(false);
        toast.error(
          error?.response?.data?.message || "Unable to send ride request",
        );
      },
      onSuccess(data, variables, onMutateResult, context) {},
    });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Book a Ride</h1>
          <p className="text-muted-foreground">
            {bookingStep === "location" && "Where would you like to go?"}
            {bookingStep === "searching" && "Finding you a driver..."}
            {bookingStep === "matched" && "Driver found!"}
            {bookingStep === "arriving" && `Driver arriving in ${eta} min`}
            {bookingStep === "inProgress" && "Trip in progress"}
          </p>
        </div>
        {(bookingStep === "searching" ||
          bookingStep === "matched" ||
          bookingStep === "arriving") && (
          <Button variant="outline" onClick={handleCancelRide}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Map
            pickupCoords={pickupCoords}
            dropoffCoords={dropoffCoords}
            driverCoords={driverCoords}
            showRoute={!!pickupCoords && !!dropoffCoords}
            // onPickupSelect={handlePickupSelect}
            className="h-[70vh]"
          />

          {bookingStep === "location" && (
            <>
              <Card className="p-6">
                <div className="space-y-4">
                  {/* Pickup with autocomplete */}
                  <div className="space-y-2">
                    <Label htmlFor="pickup" className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      Pickup Location
                    </Label>
                    <LocationSearch
                      placeholder="Where are you going?"
                      onLocationSelect={(val) => {
                        setPickup(val);
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-4 pl-[6px]">
                    <div className="w-[2px] h-8 bg-border" />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="dropoff"
                      className="flex items-center gap-2"
                    >
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      Drop-off Location
                    </Label>
                    <LocationSearch
                      placeholder="Where are you going?"
                      onLocationSelect={(val) => setDropoff(val)}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Select Ride Type</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicleTypes.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => setSelectedRideType(vehicle.name)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedRideType === vehicle.name
                          ? "border-rider bg-rider/5"
                          : "border-border hover:border-rider/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            selectedRideType === vehicle.name
                              ? "gradient-rider"
                              : "bg-muted"
                          }`}
                        >
                          <vehicle.icon
                            className={`h-6 w-6 ${
                              selectedRideType === vehicle.name
                                ? "text-rider-foreground"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{vehicle.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            {vehicle.capacity} seats
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Button
                size="lg"
                className="w-full h-14 text-lg gradient-rider text-rider-foreground"
                disabled={isPendingSendRideRequest}
                onClick={() =>
                  sendRideRequest({
                    pickupLocation: pickup,
                    dropoffLocation: dropoff,
                    rideType: selectedRideType,
                  })
                }
              >
                {isPendingSendRideRequest ? (
                  <div className="flex items-center gap-2">
                    <p>Requesting yout ride</p>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p>Book Ride</p>
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>
            </>
          )}

          {/* Arriving / In Progress State */}
          {(bookingStep === "arriving" || bookingStep === "inProgress") && (
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{mockDriver.name}</h2>
                  <p className="text-muted-foreground">
                    {bookingStep === "arriving"
                      ? `Arriving in ${eta} minutes`
                      : "Trip in progress"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-success mt-1.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium">{pickup.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive mt-1.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Drop-off</p>
                    <p className="font-medium">{"N/A"}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-semibold">{mockDriver.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Plate</p>
                    <p className="font-bold text-lg">{mockDriver.plate}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        {bookingStep === "location" && (
          <div className="space-y-6">
            {/* Default Location */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Default Location</h2>
              <button
                onClick={() => {
                  // setPickup("123 Victoria Island, Lagos");
                  setPickupCoords([3.4226, 6.4281]);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <span className="text-2xl">🏠</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Home</p>
                  <p className="text-sm text-muted-foreground truncate">
                    123 Victoria Island, Lagos
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <Tabs defaultValue="wallet">
                <TabsList className="w-full">
                  <TabsTrigger value="wallet" className="flex-1">
                    Wallet
                  </TabsTrigger>
                  <TabsTrigger value="card" className="flex-1">
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="cash" className="flex-1">
                    Cash
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="wallet" className="mt-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span>Wallet Balance</span>
                    </div>
                    <span className="font-bold">₦25,000</span>
                  </div>
                </TabsContent>
                <TabsContent value="card" className="mt-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded" />
                      <span>•••• 4242</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Visa</span>
                  </div>
                </TabsContent>
                <TabsContent value="cash" className="mt-4">
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                    Pay with cash when you arrive at your destination.
                  </p>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Demo: Driver-Side Modal Triggers */}
            <Card className="p-6 border-dashed">
              <h2 className="text-sm font-semibold mb-3 text-muted-foreground">
                Demo: Driver-Side Modals
              </h2>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleSimulateRideRequest}
                >
                  Simulate Ride Request
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleSimulateRiderCancel}
                >
                  Simulate Rider Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* === MODALS === */}
      <SearchingDriverModal
        open={showSearchingModal}
        onCancel={handleCancelRide}
      />

      <DriverResponseModal
        open={!!driverResponseType}
        type={driverResponseType || "accepted"}
        driver={mockDriver}
        onConfirm={handleDriverAcceptConfirm}
        onClose={handleDriverResponseClose}
      />

      <RideRequestModal
        open={showRideRequest}
        // rider={mockRider}
        timeLeft={requestCountdown}
        onAccept={() => {
          setShowRideRequest(false);
          toast("Ride Accepted", {
            description: "You accepted the ride request.",
          });
        }}
        onReject={() => {
          setShowRideRequest(false);
          toast("Ride Declined", {
            description: "You declined the ride request.",
          });
        }}
      />

      <RiderCancelledModal
        open={showRiderCancelled}
        riderName="Chioma Adeyemi"
        onClose={() => setShowRiderCancelled(false)}
      />
    </div>
  );
};

export default BookRidePage;
