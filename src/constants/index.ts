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
export const riderNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MapPin, label: "Book a Ride", path: "/dashboard/book" },
  { icon: History, label: "Trip History", path: "/dashboard/trips" },
  { icon: Wallet, label: "Wallet", path: "/dashboard/wallet" },
  { icon: HelpCircle, label: "Support", path: "/dashboard/support" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export const driverNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MapPin, label: "Current Trip", path: "/dashboard/current-trip" },
  { icon: History, label: "Trip History", path: "/dashboard/trips" },
  { icon: Wallet, label: "Earnings", path: "/dashboard/earnings" },
  { icon: Car, label: "My Vehicle", path: "/dashboard/vehicle" },
  { icon: FileText, label: "Documents", path: "/dashboard/documents" },
  { icon: Star, label: "Ratings", path: "/dashboard/ratings" },
  { icon: HelpCircle, label: "Support", path: "/dashboard/support" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];
