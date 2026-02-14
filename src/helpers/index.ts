import { clearToken, token } from "@/services/api/config";
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
  if (!token) return null;
  try {
    return token ? jwtDecode<CustomJwtPayload>(token) : null;
  } catch {
    return null;
  }
};
