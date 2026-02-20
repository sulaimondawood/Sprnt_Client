import { Location } from "../rides/indes";

interface CreateRideRequest {
  pickupLocation: Location;
  dropoffLocation: Location;
  rideType: string;
}

export interface RideOffer {
  driverId: string;
  rideId: string;
  riderName: string;
  pickup: string;
  dropoff: string;
  rating: number;
  expiresAt: string;
  estimatedFare: number;
  pickupLng: number;
  pickupLat: number;
}

export interface DriverSummary {
  message: string;
  driverName: string;
  vehicleName: string;
  vehiclePlate: string;
  totalTrips: number;
  rating: number;
}
