import { Location } from "../rides/indes";

interface CreateRideRequest {
  pickupLocation: Location;
  dropoffLocation: Location;
  rideType: string;
}
