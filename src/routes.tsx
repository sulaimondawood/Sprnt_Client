import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import { MainLayout } from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/(public)/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        // path: "/login",
        element: <Login />,
      },
    ],
  },
]);
