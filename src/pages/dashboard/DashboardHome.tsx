import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/StatCard';
import { RoleBadge } from '@/components/RoleBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  mockRiderStats, 
  mockDriverStats, 
  mockRiderTrips, 
  mockDriverTrips,
  mockDriverWallet,
  mockRiderWallet 
} from '@/data/mockData';
import { 
  Car, 
  MapPin, 
  TrendingUp, 
  Star, 
  Clock, 
  Wallet,
  ChevronRight,
  Navigation,
  CheckCircle,
  AlertCircle,
  User,
  FileText,
  CreditCard,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

const DashboardHome = () => {
  const { user, riderProfile, driverProfile } = useAuth();
  const isDriver = user?.role === 'DRIVER';
  const profile = isDriver ? driverProfile : riderProfile;
  const stats = isDriver ? mockDriverStats : mockRiderStats;
  const trips = isDriver ? mockDriverTrips : mockRiderTrips;
  const wallet = isDriver ? mockDriverWallet : mockRiderWallet;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const recentTrips = trips.slice(0, 3);
  const activeTrip = isDriver ? trips.find(t => t.status === 'STARTED') : null;

  const isProfileComplete = profile?.isProfileComplete ?? false;

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (isDriver && driverProfile) {
      const fields = [
        driverProfile.fullName,
        driverProfile.profileImage,
        driverProfile.licenseNumber,
        driverProfile.licenseExpiry,
        driverProfile.nin,
      ];
      const filledFields = fields.filter(Boolean).length;
      return Math.round((filledFields / fields.length) * 100);
    } else if (riderProfile) {
      const fields = [
        riderProfile.fullName,
        riderProfile.profileImage,
        riderProfile.defaultPickupLocation,
        riderProfile.paymentMethodIds?.length,
      ];
      const filledFields = fields.filter(Boolean).length;
      return Math.round((filledFields / fields.length) * 100);
    }
    return 0;
  };

  const profileCompletion = calculateProfileCompletion();

  const getCompletionItems = () => {
    if (isDriver) {
      return [
        { label: 'Personal Info', icon: User, complete: !!driverProfile?.fullName },
        { label: 'Profile Photo', icon: User, complete: !!driverProfile?.profileImage },
        { label: 'License Details', icon: FileText, complete: !!driverProfile?.licenseNumber },
        { label: 'NIN Verification', icon: Shield, complete: !!driverProfile?.nin },
      ];
    }
    return [
      { label: 'Personal Info', icon: User, complete: !!riderProfile?.fullName },
      { label: 'Profile Photo', icon: User, complete: !!riderProfile?.profileImage },
      { label: 'Default Location', icon: MapPin, complete: !!riderProfile?.defaultPickupLocation },
      { label: 'Payment Method', icon: CreditCard, complete: !!riderProfile?.paymentMethodIds?.length },
    ];
  };

  const completionItems = getCompletionItems();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Completion Card */}
      {!isProfileComplete && (
        <Card className="p-6 border-warning/50 bg-gradient-to-r from-warning/5 to-warning/10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground">Unlock all features by completing your profile</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{profileCompletion}% Complete</span>
                  <span className="text-xs text-muted-foreground">{completionItems.filter(i => i.complete).length}/{completionItems.length} steps</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {completionItems.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                      item.complete 
                        ? 'bg-success/10 text-success' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {item.complete ? (
                      <CheckCircle className="h-4 w-4 shrink-0" />
                    ) : (
                      <item.icon className="h-4 w-4 shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/dashboard/profile">
              <Button className={`gap-2 ${isDriver ? 'gradient-driver' : 'gradient-rider'} text-white`}>
                Complete Now
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      )}
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Welcome back, {profile?.fullName?.split(' ')[0]}!</h1>
            <RoleBadge role={user?.role || 'RIDER'} />
          </div>
          <p className="text-muted-foreground">
            {isDriver 
              ? "Here's your driving performance overview" 
              : "Ready to go somewhere? Book a ride now."}
          </p>
        </div>
        
        {!isDriver && (
          <Link to="/dashboard/book">
            <Button size="lg" className="gradient-rider text-rider-foreground gap-2">
              <MapPin className="h-5 w-5" />
              Book a Ride
            </Button>
          </Link>
        )}
      </div>

      {/* Active Trip Banner (Driver) */}
      {activeTrip && (
        <Card className="p-6 gradient-driver text-driver-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Navigation className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Active Trip</p>
                <p className="text-xl font-bold">{activeTrip.riderName}</p>
                <p className="text-sm opacity-80">{activeTrip.dropoffLocation.address}</p>
              </div>
            </div>
            <Link to="/dashboard/current-trip">
              <Button variant="secondary" className="gap-2">
                View Trip
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isDriver ? (
          <>
            <StatCard
              title="Today's Earnings"
              value={formatCurrency(stats.todayEarnings)}
              subtitle={`${stats.todayTrips} trips completed`}
              icon={Wallet}
              variant="driver"
            />
            <StatCard
              title="Weekly Earnings"
              value={formatCurrency(stats.weeklyEarnings)}
              subtitle={`${stats.weeklyTrips} trips this week`}
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Rating"
              value={stats.rating.toFixed(1)}
              subtitle="Based on recent trips"
              icon={Star}
            />
            <StatCard
              title="Completion Rate"
              value={`${stats.completionRate}%`}
              subtitle="Trip completion"
              icon={CheckCircle}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Total Rides"
              value={stats.totalTrips}
              subtitle="Lifetime rides"
              icon={Car}
              variant="rider"
            />
            <StatCard
              title="This Week"
              value={stats.weeklyTrips}
              subtitle="Rides taken"
              icon={Clock}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Rating"
              value={stats.rating.toFixed(1)}
              subtitle="Your rider rating"
              icon={Star}
            />
            <StatCard
              title="Wallet Balance"
              value={formatCurrency(wallet.balance)}
              subtitle="Available balance"
              icon={Wallet}
            />
          </>
        )}
      </div>

      {/* Recent Trips & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Trips */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Trips</h2>
            <Link to="/dashboard/trips">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentTrips.map((trip) => (
              <div 
                key={trip.id} 
                className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  trip.status === 'COMPLETED' 
                    ? 'bg-success/10 text-success' 
                    : trip.status === 'CANCELLED' 
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-info/10 text-info'
                }`}>
                  <Car className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">
                      {isDriver ? trip.riderName : trip.dropoffLocation.address}
                    </p>
                    <StatusBadge status={trip.status} type="trip" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {trip.requestedAt && format(new Date(trip.requestedAt), 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">
                    {trip.finalFare ? formatCurrency(trip.finalFare) : formatCurrency(trip.estimatedFare)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(trip.distanceMeters / 1000).toFixed(1)} km
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions / Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            {isDriver ? 'Quick Stats' : 'Quick Actions'}
          </h2>
          
          {isDriver ? (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Total Trips</span>
                  <span className="font-bold text-2xl">{stats.totalTrips}</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-driver rounded-full" 
                    style={{ width: `${Math.min((stats.totalTrips / 2000) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Next milestone: 2,000 trips</p>
              </div>

              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Total Earnings</span>
                  <span className="font-bold">{formatCurrency(stats.totalEarnings)}</span>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-warning fill-warning" />
                  <span className="text-muted-foreground">Driver Rating</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-3xl">{stats.rating}</span>
                  <span className="text-muted-foreground">/ 5.0</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/dashboard/book" className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-14">
                  <div className="w-10 h-10 rounded-lg gradient-rider flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-rider-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Book a Ride</p>
                    <p className="text-sm text-muted-foreground">Get a ride now</p>
                  </div>
                </Button>
              </Link>
              
              <Link to="/dashboard/wallet" className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-14">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-warning" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Top Up Wallet</p>
                    <p className="text-sm text-muted-foreground">Add funds</p>
                  </div>
                </Button>
              </Link>
              
              <Link to="/dashboard/trips" className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-14">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Trip History</p>
                    <p className="text-sm text-muted-foreground">View past rides</p>
                  </div>
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;