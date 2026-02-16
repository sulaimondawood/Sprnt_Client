import { VehicleCardSkeleton } from "@/components/dashboard/vehicle/VehicleSkeleton";
import { RoleBadge } from "@/components/RoleBadge";
import { Card } from "@/components/ui/card";
import { profile } from "@/helpers";
import { DriverAPI } from "@/services/api/driver";
import { VehicleType, VehicleTypeDTO } from "@/types/vehicle";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Car,
  Check,
  Edit,
  FileText,
  Palette,
  Shield,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import vehicleHero from "@/assets/vehicle-hero.jpg";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Separator } from "@/components/ui/separator";

interface Vehicle {
  plateNumber: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  capacity: number;
  vehicleType: string;
}

const vehicleTypes: VehicleType[] = ["SUV", "BIKE", "TRICYCLE", "CAR"];

const VehiclePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  // const [vehicle, setVehicle] = useState<Vehicle>();
  const [editForm, setEditForm] = useState<Vehicle | null>();

  const profileData = profile();
  const role = profileData?.role;

  const navigate = useNavigate();

  const handleEdit = () => {
    // setEditForm({ ...vehicle });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditForm(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    // setVehicle({ ...editForm });
    setIsEditing(false);
    toast("Vehicle updated", {
      description: "Your vehicle details have been saved successfully.",
    });
  };

  const handleDelete = () => {
    toast("Vehicle deleted", {
      // description: `${vehicle.brand} ${vehicle.model} has been removed.`,
    });
    navigate("/dashboard");
  };

  const updateField = (field: keyof Vehicle, value: string | number) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const {
    data: vehicleData,
    isLoading: isLoadingVehicles,
    isSuccess: isSuccessLoadingVehicles,
  } = useQuery<VehicleTypeDTO>({
    queryKey: ["vehicle", "details"],
    queryFn: DriverAPI.vehicle,
  });

  useEffect(() => {
    if (isSuccessLoadingVehicles) {
      setEditForm({
        brand: vehicleData?.brand,
        capacity: vehicleData?.capacity,
        color: vehicleData?.color,
        model: vehicleData?.model,
        plateNumber: vehicleData?.plateNumber,
        vehicleType: vehicleData?.type || "",
        year: vehicleData?.year,
      });
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold">My Vehicle</h1>
            <RoleBadge role="DRIVER" />
          </div>
          <p className="text-muted-foreground">
            Manage your registered vehicle
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button size="sm" className="gap-1" onClick={handleSave}>
                <Check className="h-4 w-4" /> Save
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-1">
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete{" "}
                      <strong>
                        {vehicleData?.brand} {vehicleData?.model}
                      </strong>{" "}
                      ({vehicleData?.plateNumber})? This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      {/* Hero Card with Vehicle Image */}
      <Card className="overflow-hidden">
        <div className="relative h-48 sm:h-56 lg:h-64">
          <img
            src={vehicleHero}
            alt={`${vehicleData?.brand} ${vehicleData?.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
            <div>
              {isEditing ? (
                <div className="flex gap-2 mb-1">
                  <Input
                    value={editForm.brand}
                    onChange={(e) => updateField("brand", e.target.value)}
                    placeholder="Brand"
                    className="h-9 w-32 bg-background/80 backdrop-blur-sm"
                  />
                  <Input
                    value={editForm.model}
                    onChange={(e) => updateField("model", e.target.value)}
                    placeholder="Model"
                    className="h-9 w-32 bg-background/80 backdrop-blur-sm"
                  />
                </div>
              ) : (
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {vehicleData?.brand} {vehicleData?.model}
                </h2>
              )}
              {isEditing ? (
                <Input
                  value={editForm.plateNumber}
                  onChange={(e) => updateField("plateNumber", e.target.value)}
                  placeholder="Plate Number"
                  className="h-8 w-40 mt-1 text-sm bg-background/80 backdrop-blur-sm"
                />
              ) : (
                <p className="text-muted-foreground font-medium tracking-wide">
                  {vehicleData?.plateNumber}
                </p>
              )}
            </div>
            <StatusBadge status={"APPROVED"} type="document" />
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Specs & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Specifications */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Specifications
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Car,
                  label: "Type",
                  editContent: (
                    <Select
                      value={editForm.vehicleType}
                      onValueChange={(v) => updateField("vehicleType", v)}
                    >
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ),
                  value: vehicleData?.type,
                },
                {
                  icon: Calendar,
                  label: "Year",
                  editContent: (
                    <Input
                      type="number"
                      value={editForm.year}
                      onChange={(e) =>
                        updateField("year", parseInt(e.target.value) || 0)
                      }
                      className="h-8 mt-1"
                    />
                  ),
                  value: vehicleData?.year,
                },
                {
                  icon: Palette,
                  label: "Color",
                  editContent: (
                    <Input
                      value={editForm.color}
                      onChange={(e) => updateField("color", e.target.value)}
                      className="h-8 mt-1"
                    />
                  ),
                  value: vehicleData?.color,
                },
                {
                  icon: Users,
                  label: "Capacity",
                  editContent: (
                    <Input
                      type="number"
                      value={editForm.capacity}
                      onChange={(e) =>
                        updateField("capacity", parseInt(e.target.value) || 0)
                      }
                      className="h-8 mt-1"
                      min={1}
                      max={10}
                    />
                  ),
                  value: `${vehicleData?.capacity} passengers`,
                },
              ].map(({ icon: Icon, label, editContent, value }) => (
                <div key={label} className="p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </div>
                  {isEditing ? (
                    editContent
                  ) : (
                    <p className="font-semibold">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Documents & Quick Info */}
        <div className="space-y-6">
          {/* Documents Card */}
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Documents
            </h3>

            <div className="space-y-3">
              {vehicleData?.vehicleDocument?.map((doc) => (
                <div
                  key={doc.documentType}
                  className="flex items-center justify-between p-3 bg-muted rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10`}
                    >
                      <Shield className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{doc.documentType}</p>
                    </div>
                  </div>
                  <StatusBadge status={"APPROVED"} type="document" />
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => navigate("/dashboard/documents")}
            >
              <FileText className="h-4 w-4" />
              Manage Documents
            </Button>
          </Card>

          {/* Quick Info Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "Registered Since", value: "Feb 2024" },
                { label: "Insurance Status", value: "Valid" },
                { label: "Last Inspection", value: "Mar 2024" },
                { label: "Mileage", value: "45,200 km" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VehiclePage;
