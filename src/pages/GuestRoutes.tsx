import { ROUTES } from "@/constants/routes";
import { getToken } from "@/services/api/config";
import { Navigate, Outlet } from "react-router";

export const GuestRoute = () => {
  const isAuthenticated = getToken();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
};
