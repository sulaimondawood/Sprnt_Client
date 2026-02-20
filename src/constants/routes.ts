import {
  Car,
  FileText,
  HelpCircle,
  History,
  LayoutDashboard,
  MapPin,
  Settings,
  Star,
  Wallet,
} from "lucide-react";

export const ROUTES = {
  login: "/auth/login",
  register: "/auth/register",

  dashboard: "/dashboard",
  dashboardRides: "/dashboard/trips",

  dashboardVehicle: "/dashboard/vehicle",
  dashboardAddVehicle: "/dashboard/vehicle/add",

  dashboardDocument: "/dashboard/documents",
  dashboardBookRide: "/dashboard/book-ride",
  dashboardWallet: "/dashboard/wallet",
  dashboardCurrentRide: "/dashboard/current-trip",
};

export const riderNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: ROUTES.dashboard },
  { icon: MapPin, label: "Book a Ride", path: ROUTES.dashboardBookRide },
  { icon: History, label: "Trip History", path: ROUTES.dashboardRides },
  { icon: Wallet, label: "Wallet", path: ROUTES.dashboardWallet },
  { icon: HelpCircle, label: "Support", path: "/dashboard/support" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export const driverNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: ROUTES.dashboard },
  { icon: MapPin, label: "Current Trip", path: "/dashboard/current-trip" },
  { icon: History, label: "Trip History", path: ROUTES.dashboardRides },
  { icon: Wallet, label: "Earnings", path: "/dashboard/earnings" },
  { icon: Car, label: "My Vehicle", path: ROUTES.dashboardVehicle },
  { icon: FileText, label: "Documents", path: ROUTES.dashboardDocument },
  { icon: Star, label: "Ratings", path: "/dashboard/ratings" },
  { icon: HelpCircle, label: "Support", path: "/dashboard/support" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];
