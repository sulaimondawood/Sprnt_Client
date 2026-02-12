import {
  mockDriverProfile,
  mockDriverUser,
  mockIncompleteDriverProfile,
  mockIncompleteRiderProfile,
  mockRiderProfile,
  mockRiderUser,
} from "@/data/mockData";
import { DriverProfile, RiderProfile, UserAccount } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  user: UserAccount | null;
  riderProfile: RiderProfile | null;
  driverProfile: DriverProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    role: "RIDER" | "DRIVER",
  ) => Promise<void>;
  logout: () => void;
  updateRiderProfile: (profile: Partial<RiderProfile>) => void;
  updateDriverProfile: (profile: Partial<DriverProfile>) => void;
  simulateIncompleteProfile: boolean;
  setSimulateIncompleteProfile: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [riderProfile, setRiderProfile] = useState<RiderProfile | null>(null);
  const [driverProfile, setDriverProfile] = useState<DriverProfile | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [simulateIncompleteProfile, setSimulateIncompleteProfile] =
    useState(false);

  const login = async (
    email: string,
    password: string,
    role: "RIDER" | "DRIVER",
  ) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (role === "RIDER") {
      setUser(mockRiderUser);
      setRiderProfile(
        simulateIncompleteProfile
          ? mockIncompleteRiderProfile
          : mockRiderProfile,
      );
      setDriverProfile(null);
    } else {
      setUser(mockDriverUser);
      setDriverProfile(
        simulateIncompleteProfile
          ? mockIncompleteDriverProfile
          : mockDriverProfile,
      );
      setRiderProfile(null);
    }

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setRiderProfile(null);
    setDriverProfile(null);
  };

  const updateRiderProfile = (profile: Partial<RiderProfile>) => {
    if (riderProfile) {
      setRiderProfile({ ...riderProfile, ...profile, isProfileComplete: true });
    }
  };

  const updateDriverProfile = (profile: Partial<DriverProfile>) => {
    if (driverProfile) {
      setDriverProfile({
        ...driverProfile,
        ...profile,
        isProfileComplete: true,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        riderProfile,
        driverProfile,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateRiderProfile,
        updateDriverProfile,
        simulateIncompleteProfile,
        setSimulateIncompleteProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
