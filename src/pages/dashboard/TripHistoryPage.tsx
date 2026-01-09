import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/StatusBadge';
import { RoleBadge } from '@/components/RoleBadge';
import { mockRiderTrips, mockDriverTrips } from '@/data/mockData';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Search, 
  Filter,
  ChevronRight,
  Clock,
  Navigation,
  User
} from 'lucide-react';
import { format } from 'date-fns';

const TripHistoryPage = () => {
  const { user } = useAuth();
  const isDriver = user?.role === 'DRIVER';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const trips = isDriver ? mockDriverTrips : mockRiderTrips;

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = 
      trip.pickupLocation.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.dropoffLocation.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (isDriver ? trip.riderName?.toLowerCase().includes(searchQuery.toLowerCase()) : trip.driverName?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'completed') return matchesSearch && trip.status === 'COMPLETED';
    if (activeTab === 'cancelled') return matchesSearch && trip.status === 'CANCELLED';
    if (activeTab === 'ongoing') return matchesSearch && ['STARTED', 'ARRIVING', 'ACCEPTED'].includes(trip.status);
    
    return matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const tripStats = {
    total: trips.length,
    completed: trips.filter(t => t.status === 'COMPLETED').length,
    cancelled: trips.filter(t => t.status === 'CANCELLED').length,
    ongoing: trips.filter(t => ['STARTED', 'ARRIVING', 'ACCEPTED'].includes(t.status)).length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Trip History</h1>
            <RoleBadge role={user?.role || 'RIDER'} />
          </div>
          <p className="text-muted-foreground">
            {isDriver ? 'View all your completed and ongoing trips' : 'Your ride history and trip details'}
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Trips</p>
          <p className="text-2xl font-bold">{tripStats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-success">{tripStats.completed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="text-2xl font-bold text-destructive">{tripStats.cancelled}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Ongoing</p>
          <p className="text-2xl font-bold text-info">{tripStats.ongoing}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by location or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredTrips.length === 0 ? (
              <Card className="p-12 text-center">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No trips found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try adjusting your search' : 'You have no trips in this category'}
                </p>
              </Card>
            ) : (
              filteredTrips.map((trip) => (
                <Card key={trip.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Trip Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            trip.status === 'COMPLETED' 
                              ? 'bg-success/10 text-success' 
                              : trip.status === 'CANCELLED'
                                ? 'bg-destructive/10 text-destructive'
                                : 'bg-info/10 text-info'
                          }`}>
                            <Car className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold">
                              Trip #{trip.id.slice(-4).toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {trip.requestedAt && format(new Date(trip.requestedAt), 'MMM d, yyyy • h:mm a')}
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={trip.status} type="trip" />
                      </div>

                      {/* Locations */}
                      <div className="space-y-3 pl-2">
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-success" />
                            <div className="w-[2px] h-8 bg-border" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pickup</p>
                            <p className="font-medium">{trip.pickupLocation.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full bg-destructive" />
                          <div>
                            <p className="text-sm text-muted-foreground">Drop-off</p>
                            <p className="font-medium">{trip.dropoffLocation.address}</p>
                          </div>
                        </div>
                      </div>

                      {/* Driver/Rider Info */}
                      {(isDriver ? trip.riderName : trip.driverName) && (
                        <div className="flex items-center gap-3 pt-2 border-t border-border">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {isDriver ? 'Rider' : 'Driver'}
                            </p>
                            <p className="font-medium">
                              {isDriver ? trip.riderName : trip.driverName}
                            </p>
                          </div>
                          {!isDriver && trip.vehicleInfo && (
                            <div className="ml-auto text-right">
                              <p className="text-sm text-muted-foreground">Vehicle</p>
                              <p className="text-sm">{trip.vehicleInfo}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Trip Summary */}
                    <div className="md:w-48 flex md:flex-col gap-4 md:gap-2 md:text-right md:border-l md:border-border md:pl-6">
                      <div className="flex-1 md:flex-initial">
                        <p className="text-sm text-muted-foreground">Fare</p>
                        <p className="text-xl font-bold">
                          {trip.finalFare ? formatCurrency(trip.finalFare) : formatCurrency(trip.estimatedFare)}
                        </p>
                      </div>
                      <div className="flex-1 md:flex-initial">
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-medium">{(trip.distanceMeters / 1000).toFixed(1)} km</p>
                      </div>
                      <div className="flex-1 md:flex-initial">
                        <p className="text-sm text-muted-foreground">Payment</p>
                        <StatusBadge status={trip.paymentStatus} type="payment" />
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 md:mt-4">
                        Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripHistoryPage;