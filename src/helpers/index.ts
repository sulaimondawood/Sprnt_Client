import { clearToken } from "@/services/api/config";

export const logout = () => {
  clearToken();
};
