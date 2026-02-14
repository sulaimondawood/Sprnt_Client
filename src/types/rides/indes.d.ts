interface Ride {
  id: string;

  pickupLocation: Location;
  dropoffLocation: Location;

  rideStatus: string;
  riderName: string;
  driverName: string;
  createdAt: string;

  estimatedFare: number;
  currency: "NGN" | string;

  estimatedArrivalTime: string;
  arrivalTime: string | null;
  dropOffTime: string | null;
  acceptedAt: string | null;

  estimatedDistance: number; // km
  estimatedDurationMins: number;
}

interface Location {
  address: string | null;
  lat: number | null;
  lng: number | null;
}
