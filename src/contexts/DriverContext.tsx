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
  isPendingAvailabiltyStatus: boolean;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: UserAPI.profile,
  });
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (userProfile?.driver) {
      const status = userProfile.driver.availabilityStatus;
      setIsOnline(status !== "OFFLINE");
    }
  }, [userProfile?.driver?.availabilityStatus, userProfile?.driver]);

  const {
    mutate: toggleAvailabilityStatus,
    isPending: isPendingAvailabiltyStatus,
  } = useMutation({
    mutationFn: () => DriverAPI.toggleAvailabilityStatus(),
    onMutate: async () => {
      setIsOnline((prev) => !prev);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      toast.success("Your availability status was updated");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Try again later",
      );
      setIsOnline((prev) => !prev); // rollback
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
    <DriverContext.Provider
      value={{ isOnline, toggleAvailabilityStatus, isPendingAvailabiltyStatus }}
    >
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
