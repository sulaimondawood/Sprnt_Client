import { LocationSearch } from "@/components/AddressAutocompletete";
import Map from "@/components/Map";
import { RoleBadge } from "@/components/RoleBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Car,
  ChevronRight,
  Clock,
  MessageSquare,
  Navigation,
  Phone,
  Search,
  Star,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type BookingStep =
  | "location"
  | "vehicle"
  | "searching"
  | "matched"
  | "arriving"
  | "inProgress";

const BookRidePage = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupCoords, setPickupCoords] = useState<
    [number, number] | undefined
  >();
  const [dropoffCoords, setDropoffCoords] = useState<
    [number, number] | undefined
  >();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<BookingStep>("location");
  const [driverCoords, setDriverCoords] = useState<
    [number, number] | undefined
  >();
  const [eta, setEta] = useState(5);
  const { toast } = useToast();

  const vehicleTypes = [
    {
      id: "economy",
      name: "Economy",
      icon: Car,
      price: "₦1,500",
      time: "3 min",
      capacity: 4,
    },
    {
      id: "comfort",
      name: "Comfort",
      icon: Car,
      price: "₦2,200",
      time: "5 min",
      capacity: 4,
    },
    {
      id: "premium",
      name: "Premium",
      icon: Car,
      price: "₦3,500",
      time: "7 min",
      capacity: 4,
    },
    {
      id: "suv",
      name: "SUV",
      icon: Car,
      price: "₦4,000",
      time: "8 min",
      capacity: 6,
    },
  ];

  const savedLocations = [
    {
      id: "1",
      name: "Home",
      address: "123 Victoria Island, Lagos",
      icon: "🏠",
      coords: [3.4226, 6.4281] as [number, number],
    },
    {
      id: "2",
      name: "Work",
      address: "45 Ikoyi, Lagos",
      icon: "🏢",
      coords: [3.4346, 6.4474] as [number, number],
    },
    {
      id: "3",
      name: "Gym",
      address: "Fitness First, Lekki",
      icon: "🏋️",
      coords: [3.4792, 6.4326] as [number, number],
    },
  ];

  const mockDriver = {
    name: "Adebayo Johnson",
    rating: 4.9,
    trips: 1247,
    vehicle: "Toyota Camry",
    plate: "LG-234-KJA",
    phone: "+234 801 234 5678",
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

        // Simulate driver movement
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

  const handleBookRide = () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Missing Information",
        description: "Please enter both pickup and drop-off locations.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedVehicle) {
      toast({
        title: "Select Vehicle",
        description: "Please select a vehicle type to continue.",
        variant: "destructive",
      });
      return;
    }

    setBookingStep("searching");

    // Simulate finding a driver
    setTimeout(() => {
      setBookingStep("matched");
    }, 3000);
  };

  const handleConfirmDriver = () => {
    setBookingStep("arriving");
    setDriverCoords([3.36, 6.54]); // Initial driver position
    setEta(5);
    toast({
      title: "Driver Confirmed!",
      description: `${mockDriver.name} is on the way in ${mockDriver.vehicle}.`,
    });
  };

  const handleCancelRide = () => {
    setBookingStep("location");
    setDriverCoords(undefined);
    toast({
      title: "Ride Cancelled",
      description: "Your ride has been cancelled.",
    });
  };

  const handlePickupSelect = (coords: [number, number], address: string) => {
    setPickupCoords(coords);
    setPickup(address);
  };

  const handleSavedLocationSelect = (location: (typeof savedLocations)[0]) => {
    setDropoff(location.address);
    setDropoffCoords(location.coords);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Book a Ride</h1>
            <RoleBadge role="RIDER" />
          </div>
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
        {/* Left: Map & Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <Map
            pickupCoords={pickupCoords}
            dropoffCoords={dropoffCoords}
            driverCoords={driverCoords}
            showRoute={!!pickupCoords && !!dropoffCoords}
            onPickupSelect={handlePickupSelect}
            className="h-[350px]"
          />

          {/* Location Input Card - Only show when in location step */}
          {bookingStep === "location" && (
            <>
              <Card className="p-6">
                <div className="space-y-4">
                  {/* Pickup */}
                  <div className="space-y-2">
                    <Label htmlFor="pickup" className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      Pickup Location
                    </Label>
                    <div className="relative">
                      <LocationSearch
                        placeholder="Enter your pickup location"
                        onLocationSelect={(val) =>
                          console.log("Selected destination:", val)
                        }
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((pos) => {
                              const coords: [number, number] = [
                                pos.coords.longitude,
                                pos.coords.latitude,
                              ];
                              setPickupCoords(coords);
                              setPickup("Current Location");
                            });
                          }
                        }}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Current
                      </Button>
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className="flex items-center gap-4 pl-[6px]">
                    <div className="w-[2px] h-8 bg-border" />
                  </div>

                  {/* Dropoff */}
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
                      onLocationSelect={(val) =>
                        console.log("Selected destination:", val)
                      }
                    />
                  </div>
                </div>
              </Card>

              {/* Vehicle Selection */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Select Vehicle Type
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {vehicleTypes.map((vehicle) => (
                    <button
                      key={vehicle.id}
                      onClick={() => setSelectedVehicle(vehicle.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedVehicle === vehicle.id
                          ? "border-rider bg-rider/5"
                          : "border-border hover:border-rider/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              selectedVehicle === vehicle.id
                                ? "gradient-rider"
                                : "bg-muted"
                            }`}
                          >
                            <vehicle.icon
                              className={`h-6 w-6 ${
                                selectedVehicle === vehicle.id
                                  ? "text-rider-foreground"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{vehicle.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {vehicle.capacity} seats
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{vehicle.price}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {vehicle.time}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Book Button */}
              <Button
                size="lg"
                className="w-full h-14 text-lg gradient-rider text-rider-foreground"
                onClick={handleBookRide}
              >
                Book Ride
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}

          {/* Searching State */}
          {bookingStep === "searching" && (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 border-4 border-rider/30 border-t-rider rounded-full animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Finding Your Driver</h2>
              <p className="text-muted-foreground">
                We're matching you with the best available driver nearby...
              </p>
            </Card>
          )}

          {/* Matched State */}
          {bookingStep === "matched" && (
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-driver flex items-center justify-center">
                  <User className="h-8 w-8 text-driver-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{mockDriver.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span>{mockDriver.rating}</span>
                    <span>•</span>
                    <span>{mockDriver.trips} trips</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-semibold">{mockDriver.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Plate</p>
                    <p className="font-semibold">{mockDriver.plate}</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gradient-rider text-rider-foreground"
                onClick={handleConfirmDriver}
              >
                Confirm Driver
              </Button>
            </Card>
          )}

          {/* Arriving / In Progress State */}
          {(bookingStep === "arriving" || bookingStep === "inProgress") && (
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-driver flex items-center justify-center">
                  <User className="h-8 w-8 text-driver-foreground" />
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
                    <p className="font-medium">{pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive mt-1.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Drop-off</p>
                    <p className="font-medium">{dropoff}</p>
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

        {/* Right: Saved & Recent Locations */}
        {bookingStep === "location" && (
          <div className="space-y-6">
            {/* Saved Locations */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Saved Places</h2>
              <div className="space-y-2">
                {savedLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleSavedLocationSelect(location)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <span className="text-2xl">{location.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {location.address}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
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

            {/* Ride Info Card */}
            {selectedVehicle && pickup && dropoff && (
              <Card className="p-6 gradient-rider text-rider-foreground">
                <h3 className="font-semibold mb-4">Ride Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-80">Vehicle</span>
                    <span className="font-medium capitalize">
                      {selectedVehicle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Est. Fare</span>
                    <span className="font-medium">
                      {
                        vehicleTypes.find((v) => v.id === selectedVehicle)
                          ?.price
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Est. Time</span>
                    <span className="font-medium">15-20 min</span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRidePage;
