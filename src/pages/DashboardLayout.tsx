/* eslint-disable @typescript-eslint/no-explicit-any */
import { DriverOnboarding } from "@/components/onboarding/DriverOnboarding";
import { RiderOnboarding } from "@/components/onboarding/RiderOnboarding";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { TOKEN } from "@/services/api/config";
import { Bell, LogOut, Menu, Settings, User, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { RiderCancelledModal, RideRequestModal } from "@/components/RideModals";
import { driverNavItems, riderNavItems, ROUTES } from "@/constants/routes";
import { useDriver } from "@/contexts/DriverContext";
import { logout } from "@/helpers";
import { useSubscription } from "@/hooks/useStompSubscription";
import { DriverAPI } from "@/services/api/driver";
import { RideOffer } from "@/types/riders";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "sonner";

export interface CustomJwtPayload extends JwtPayload {
  role?: string;
  completedProfile?: string;
  fullname?: string;
}

const handleLogout = () => {
  logout();
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const [showRideRequest, setShowRideRequest] = useState(false);
  const [showRiderCancelled, setShowRiderCancelled] = useState(false);

  const [rideRequestData, setRideRequestData] = useState<RideOffer | null>();

  const { isOnline, toggleAvailabilityStatus, isPendingAvailabiltyStatus } =
    useDriver();

  const profile = useMemo(() => {
    const activeToken = localStorage.getItem(TOKEN);
    if (!activeToken) return null;
    try {
      return jwtDecode<CustomJwtPayload>(activeToken);
    } catch {
      return null;
    }
  }, [location.pathname]);

  const role = profile?.role;

  const navItems = role === "RIDER" ? riderNavItems : driverNavItems;

  useEffect(() => {
    if (!profile) {
      navigate(ROUTES.login);
    }
  }, [navigate, profile]);

  useEffect(() => {
    if (profile?.completedProfile === "false") {
      setShowOnboarding(true);
    }
  }, [navigate, location, profile]);

  useSubscription(
    "/user/queue/ride-request",
    (updatedRide: RideOffer) => {
      setShowRideRequest(true);
      setRideRequestData(updatedRide);
      // Update your local state or invalidate TanStack Query
    },
    role === "DRIVER",
  );

  const { mutate: acceptRideRequest, isPending: isPendingAcceptRideRequest } =
    useMutation({
      mutationFn: (payload: string) => DriverAPI.acceptRide(payload),
      onError(error: any) {
        toast.error(
          error?.response?.data?.message || "Unable to accept ride request",
        );
      },
      onSuccess() {
        // setDriverResponseType("accepted");
        setShowRideRequest(false);
        toast("Ride Accepted", {
          description: "You accepted the ride request.",
        });
      },
    });

  const { mutate: rejectRideRequest, isPending: isPendingRejectRideRequest } =
    useMutation({
      mutationFn: (payload: string) => DriverAPI.rejectRide(payload),
      onError(error: any) {
        toast.error(
          error?.response?.data?.message || "Unable to reject ride request",
        );
      },
      onSuccess() {
        toast("Ride Declined", {
          description: "You declined the ride request.",
        });
        // setDriverResponseType("rejected");
        setShowRideRequest(false);
      },
    });

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ride request modal for Driver */}
      <RideRequestModal
        open={showRideRequest}
        rider={{
          name: rideRequestData?.riderName,
          rating: rideRequestData?.rating,
          dropoff: rideRequestData?.dropoff,
          pickup: rideRequestData?.pickup,
        }}
        timeLeft={
          rideRequestData?.expiresAt
            ? format(rideRequestData.expiresAt, "s")
            : "-"
        }
        onAccept={() => acceptRideRequest(rideRequestData?.rideId)}
        onReject={() => rejectRideRequest(rideRequestData.rideId)}
        isAccepting={isPendingAcceptRideRequest}
        isRejecting={isPendingRejectRideRequest}
      />

      <RiderCancelledModal
        open={showRiderCancelled}
        riderName=""
        onClose={() => setShowRiderCancelled(false)}
      />

      {/* Onboarding Modal */}
      <Dialog open={showOnboarding} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 [&>button]:hidden">
          {role === "RIDER" ? (
            <RiderOnboarding setShowOnboarding={setShowOnboarding} />
          ) : (
            <DriverOnboarding setShowOnboarding={setShowOnboarding} />
          )}
        </DialogContent>
      </Dialog>

      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold hidden sm:block">Sprnt</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {role === "DRIVER" && (
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-muted rounded-full">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isOnline ? "text-success" : "text-muted-foreground",
                  )}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
                <Switch
                  checked={isOnline}
                  disabled={isPendingAvailabiltyStatus}
                  onCheckedChange={toggleAvailabilityStatus}
                  className="data-[state=checked]:bg-success"
                />
              </div>
            )}

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={""} />
                    <AvatarFallback
                      className={
                        role === "DRIVER"
                          ? "bg-driver text-driver-foreground"
                          : "bg-rider text-rider-foreground"
                      }
                    >
                      {profile?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium">
                    {profile?.fullname || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{profile?.fullname || "User"}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {profile?.sub}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-40 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  isActive
                    ? role === "DRIVER"
                      ? "gradient-driver text-driver-foreground"
                      : "gradient-rider text-rider-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Driver status card at bottom */}
        {role === "DRIVER" && (
          <div className="absolute bottom-4 left-4 right-4">
            <div
              className={cn(
                "p-4 rounded-xl",
                isOnline
                  ? "bg-success/10 border border-success/20"
                  : "bg-muted",
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    isOnline
                      ? "bg-success animate-pulse-soft"
                      : "bg-muted-foreground",
                  )}
                />
              </div>
              <p
                className={cn(
                  "text-lg font-bold",
                  isOnline ? "text-success" : "text-muted-foreground",
                )}
              >
                {isOnline ? "Accepting Rides" : "Not Available"}
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
