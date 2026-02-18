import { clearToken, getToken } from "@/services/api/config";
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
