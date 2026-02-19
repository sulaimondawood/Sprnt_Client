import { useEffect, useState } from "react";
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
