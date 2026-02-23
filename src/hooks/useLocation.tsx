import { distanceInMeters, sendLocationUpdate } from "@/helpers";
import { useWebSocket } from "@/services/providers/stomp-provider";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useLocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const navigation = navigator.geolocation;

  useEffect(() => {
    if (navigation) {
      navigation.getCurrentPosition(
        (postition) => {
          setCoords({
            lat: postition.coords.latitude,
            lon: postition.coords.longitude,
          });
        },
        (error) => {
          toast.error("Location access denied, falling back to default bias.");
          console.warn(
            "Location access denied, falling back to default bias.",
            error,
          );
          // Optional: set a default fallback like Lagos center
          setCoords({ lat: 9.082, lon: 8.6753 });
        },
      );
    }
  }, []);

  return coords;
};

export const useLocationTracker = ({
  isOnline,
  role,
  activeRideId,
}: {
  isOnline: boolean;
  role: string;
  activeRideId: string;
}) => {
  const watchIdRef = useRef<number | null>(null);

  const THROTTLE_MS = 15000;
  const MIN_DISTANCE_METERS = 20;

  const lastSentAtRef = useRef(0);
  const lastLocationRef = useRef<{ lat: number; lng: number } | null>(null);

  const shouldSendLocation = (lat: number, lng: number) => {
    const now = Date.now();

    // Time gate
    if (now - lastSentAtRef.current < THROTTLE_MS) return false;

    // Distance gate
    if (lastLocationRef.current) {
      const { lat: lastLat, lng: lastLng } = lastLocationRef.current;
      const distance = distanceInMeters(lastLat, lastLng, lat, lng);

      if (distance < MIN_DISTANCE_METERS) return false;
    }

    lastSentAtRef.current = now;
    lastLocationRef.current = { lat, lng };
    return true;
  };

  const navigation = navigator.geolocation;

  const { stompClient } = useWebSocket();

  useEffect(() => {
    const clearExisting = () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };

    if (!isOnline && role !== "DRIVER" && !activeRideId) {
      clearExisting();
      return;
    }

    if (!navigation) {
      toast.error("Geolocation is not supported by this browser");
      return;
    }

    watchIdRef.current = navigation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!shouldSendLocation(latitude, longitude)) return;

        sendLocationUpdate(stompClient, latitude, longitude, activeRideId);
      },
      (err) => {
        toast.error("Location access denied, falling back to default bias.");
        console.warn(
          "Location access denied, falling back to default bias.",
          err,
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000, // Accept a location up to 30 seconds old
        timeout: 27000,
      },
    );

    // Cleanup on unmount
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isOnline, role, stompClient, activeRideId]);
};
