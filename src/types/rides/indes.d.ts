import { Meta } from "..";

interface Rider {
  id: string;

  displayName: string;
  profileImage?: string;

  defaultPickupLocation?: Location;

  totalRides: number;

  referralCode?: string;

  status: string;

  rating: number;
  totalRatings: number;

  completedProfile: boolean;
}

interface Driver {
  id: string;

  displayName: string;
  profileImage?: string;

  licenseNumber: string;
  licenseExpiry: string;

  nin: string;

  status: DriverStatus;
  availabilityStatus: string;

  rating: number;
  totalRatings: number;
  totalCompletedTrips: number;

  kycStatus: string;

  completedProfile: boolean;
}

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

  riderInfo: DriverRiderInfo;

  driverInfo: DriverRiderInfo;

  rider: Rider;
  driver: Driver;
}

interface Location {
  address: string | null;
  lat: number | null;
  lng: number | null;
}

interface RideResponse {
  meta: Meta;
  data: Ride[];
}

interface RideOverview {
  totalTrips: number;
  totalCompleted: number;
  totalCancelled: number;
  totalOngoing: number;
}

interface DriverRiderInfo {
  id: string;
  fullname: string;
  email: string;
  status: string;
  role: string;
}
