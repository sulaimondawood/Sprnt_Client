import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "@/components/RoleBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { mockVehicle } from "@/data/mockData";
import { Car, Edit, Plus, Calendar, Palette, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DriverAPI } from "@/services/api/driver";
import { profile } from "@/helpers";

const VehiclePage = () => {
  const {
    data: allVehicles,
    isLoading: isLoadingallVehicles,
    isSuccess: isSuccessLoadingallVehicles,
  } = useQuery<Array<VehicleType>>({
    queryKey: ["vehicles", "all"],
    queryFn: DriverAPI.vehicles,
  });

  const profileData = profile();
  const role = profileData?.role;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">My Vehicle</h1>
            <RoleBadge role={role} />
          </div>
          <p className="text-muted-foreground">
            Manage your vehicle information
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl gradient-driver flex items-center justify-center">
              <Car className="h-8 w-8 text-driver-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {mockVehicle.brand} {mockVehicle.model}
              </h2>
              <p className="text-muted-foreground">{mockVehicle.plateNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={mockVehicle.status} type="document" />
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Car className="h-4 w-4" />
              <span className="text-sm">Type</span>
            </div>
            <p className="font-semibold">{mockVehicle.vehicleType}</p>
          </div>
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Year</span>
            </div>
            <p className="font-semibold">{mockVehicle.year}</p>
          </div>
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Palette className="h-4 w-4" />
              <span className="text-sm">Color</span>
            </div>
            <p className="font-semibold">{mockVehicle.color}</p>
          </div>
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">Capacity</span>
            </div>
            <p className="font-semibold">{mockVehicle.capacity} passengers</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VehiclePage;
