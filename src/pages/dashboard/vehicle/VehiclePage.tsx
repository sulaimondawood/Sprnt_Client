import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "@/components/RoleBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { mockVehicle } from "@/data/mockData";
import { Car, Edit, Plus, Calendar, Palette, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DriverAPI } from "@/services/api/driver";
import { profile } from "@/helpers";
import { VehicleCardSkeleton } from "@/components/dashboard/vehicle/VehicleSkeleton";
import { VehicleTypeDTO } from "@/types/vehicle";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

const VehiclePage = () => {
  const profileData = profile();
  const role = profileData?.role;

  const navigate = useNavigate();

  const {
    data: allVehicles,
    isLoading: isLoadingallVehicles,
    isSuccess: isSuccessLoadingallVehicles,
  } = useQuery<Array<VehicleTypeDTO>>({
    queryKey: ["vehicles", "all"],
    queryFn: DriverAPI.vehicles,
  });

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
        <Button
          className="gap-2"
          onClick={() => navigate(ROUTES.dashboardAddVehicle)}
        >
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {isLoadingallVehicles &&
        Array.from({ length: 4 }).map((_, idx) => {
          return <VehicleCardSkeleton key={idx} />;
        })}

      {isSuccessLoadingallVehicles &&
        allVehicles.map((vehicle, idx) => {
          return (
            <Card key={idx + vehicle?.year} className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl gradient-driver flex items-center justify-center">
                    <Car className="h-8 w-8 text-driver-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold capitalize">
                      {vehicle?.brand} {vehicle?.model}
                    </h2>
                    <p className="text-muted-foreground uppercase">
                      {vehicle?.plateNumber}
                    </p>
                  </div>
                </div>
                {/* 
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button> */}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Car className="h-4 w-4" />
                    <span className="text-sm">Type</span>
                  </div>
                  <p className="font-semibold uppercase">{vehicle?.type}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Year</span>
                  </div>
                  <p className="font-semibold">{vehicle?.year}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Palette className="h-4 w-4" />
                    <span className="text-sm capitalize">Color</span>
                  </div>
                  <p className="font-semibold">{vehicle?.color}</p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Capacity</span>
                  </div>
                  <p className="font-semibold">
                    {vehicle?.capacity} passengers
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default VehiclePage;
