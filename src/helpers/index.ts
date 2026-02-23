import { clearToken, getToken, TOKEN } from "@/services/api/config";
import { Client } from "@stomp/stompjs";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  role?: string;
  completedProfile?: string;
  fullname?: string;
}

export const logout = () => {
  clearToken();
};

export const profile = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return token ? jwtDecode<CustomJwtPayload>(token) : null;
  } catch {
    return null;
  }
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

// HAVERSINE HELPER FUNCTION
export const distanceInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371000; // Earth radius (m)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const sendLocationUpdate = (
  stompClient: Client,
  lat: number,
  lng: number,
  rideId?: string,
) => {
  if (stompClient && stompClient.connected) {
    const payload = {
      lat: lat,
      lng: lng,
      activeRideId: rideId || null,
      token: getToken(),
    };

    stompClient.publish({
      destination: "/app/driver-location",
      body: JSON.stringify(payload),
    });
  }
};
