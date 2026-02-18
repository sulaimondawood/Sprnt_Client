import { DriverAPI } from "@/services/api/driver";
import { UserAPI } from "@/services/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface DriverContextType {
  isOnline: boolean;
  toggleAvailabilityStatus: () => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: UserAPI.profile,
  });
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (userProfile?.driver) {
      const status = userProfile.driver.availabilityStatus;
      setIsOnline(status === "ONLINE" ? true : false);
    }
  }, [userProfile?.driver?.availabilityStatus, userProfile?.driver]);

  const { mutate: toggleAvailabilityStatus } = useMutation({
    mutationFn: () => DriverAPI.toggleAvailabilityStatus(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      toast.success("Your availability status was updated");
    },
    onError() {
      toast.error("Something went wrong. Try again later");
    },
  });

  useQuery({
    queryKey: ["driver", "heartbeat"],
    queryFn: DriverAPI.heartBeat,
    enabled: isOnline,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <DriverContext.Provider value={{ isOnline, toggleAvailabilityStatus }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => {
  const ctx = useContext(DriverContext);

  if (!ctx) {
    throw new Error("useDriver must be used inside DriverProvider");
  }

  return ctx;
};
