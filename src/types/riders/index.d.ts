import { Location } from "../rides/indes";

interface CreateRideRequest {
  pickupLocation: Location;
  dropoffLocation: Location;
  rideType: string;
}

interface RideRequestSockType {
  driverId: string;
  rideId: string;
  expiresAt: string;
  estimatedFare: string;
  pickupLng: number;
  pickupLat: number;
}
