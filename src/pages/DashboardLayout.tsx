import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RoleBadge } from '@/components/RoleBadge';
import { RiderOnboarding } from '@/components/onboarding/RiderOnboarding';
import { DriverOnboarding } from '@/components/onboarding/DriverOnboarding';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { 
  Car, 
  LayoutDashboard, 
  MapPin, 
  History, 
  Wallet, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Bell,
  FileText,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardLayout = () => {
  const { user, riderProfile, driverProfile, logout, isAuthenticated, updateRiderProfile, updateDriverProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isOnline, setIsOnline] = useState(driverProfile?.status === 'ONLINE');

  const isDriver = user?.role === 'DRIVER';
  const profile = isDriver ? driverProfile : riderProfile;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Show onboarding modal if profile is incomplete
    if (profile && !profile.isProfileComplete) {
      setShowOnboarding(true);
    }
  }, [profile]);

  const handleOnboardingComplete = () => {
    if (isDriver) {
      updateDriverProfile({ isProfileComplete: true });
    } else {
      updateRiderProfile({ isProfileComplete: true });
    }
    setShowOnboarding(false);
  };

  const riderNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: MapPin, label: 'Book a Ride', path: '/dashboard/book' },
    { icon: History, label: 'Trip History', path: '/dashboard/trips' },
    { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
    { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const driverNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: MapPin, label: 'Current Trip', path: '/dashboard/current-trip' },
    { icon: History, label: 'Trip History', path: '/dashboard/trips' },
    { icon: Wallet, label: 'Earnings', path: '/dashboard/earnings' },
    { icon: Car, label: 'My Vehicle', path: '/dashboard/vehicle' },
    { icon: FileText, label: 'Documents', path: '/dashboard/documents' },
    { icon: Star, label: 'Ratings', path: '/dashboard/ratings' },
    { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const navItems = isDriver ? driverNavItems : riderNavItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding Modal */}
      <Dialog open={showOnboarding} onOpenChange={() => {}}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 [&>button]:hidden">
          {isDriver ? (
            <DriverOnboarding onComplete={handleOnboardingComplete} />
          ) : (
            <RiderOnboarding onComplete={handleOnboardingComplete} />
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
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                isDriver ? "gradient-driver" : "gradient-rider"
              )}>
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold hidden sm:block">RideFlow</span>
            </Link>

            <RoleBadge role={user?.role || 'RIDER'} size="sm" />
          </div>

          <div className="flex items-center gap-4">
            {/* Driver Online/Offline Toggle */}
            {isDriver && (
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-muted rounded-full">
                <span className={cn(
                  "text-sm font-medium",
                  isOnline ? "text-success" : "text-muted-foreground"
                )}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                  className="data-[state=checked]:bg-success"
                />
              </div>
            )}

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.profileImage} />
                    <AvatarFallback className={isDriver ? "bg-driver text-driver-foreground" : "bg-rider text-rider-foreground"}>
                      {profile?.fullName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium">
                    {profile?.fullName || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{profile?.fullName || 'User'}</span>
                    <span className="text-sm font-normal text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-40 transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
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
                    ? isDriver 
                      ? "gradient-driver text-driver-foreground" 
                      : "gradient-rider text-rider-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Driver status card at bottom */}
        {isDriver && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className={cn(
              "p-4 rounded-xl",
              isOnline ? "bg-success/10 border border-success/20" : "bg-muted"
            )}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Status</span>
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  isOnline ? "bg-success animate-pulse-soft" : "bg-muted-foreground"
                )} />
              </div>
              <p className={cn(
                "text-lg font-bold",
                isOnline ? "text-success" : "text-muted-foreground"
              )}>
                {isOnline ? 'Accepting Rides' : 'Not Available'}
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