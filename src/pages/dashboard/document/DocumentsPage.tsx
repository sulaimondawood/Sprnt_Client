import { DocumentCardSkeleton } from "@/components/dashboard/document/skeleton/DocumentSkeleton";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { mockVehicleDocuments } from "@/data/mockData";
import { DriverAPI } from "@/services/api/driver";
import { VehicleTypeDTO } from "@/types/vehicle";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  Upload,
  XCircle,
} from "lucide-react";

const documentLabels: Record<string, string> = {
  INSURANCE: "Vehicle Insurance",
  ROAD_WORTHINESS: "Road Worthiness Certificate",
  REGISTRATION: "Vehicle Registration",
};

const DocumentsPage = () => {
  const approvedDocs = mockVehicleDocuments.filter(
    (d) => d.status === "APPROVED",
  ).length;
  const pendingDocs = mockVehicleDocuments.filter(
    (d) => d.status === "PENDING",
  ).length;
  const rejectedDocs = mockVehicleDocuments.filter(
    (d) => d.status === "REJECTED",
  ).length;
  const totalDocs = mockVehicleDocuments.length;
  const docsProgress = Math.round((approvedDocs / totalDocs) * 100);

  const getExpiryInfo = (expiresAt: Date) => {
    const daysLeft = differenceInDays(new Date(expiresAt), new Date());
    if (daysLeft < 0) return { label: "Expired", color: "text-destructive" };
    if (daysLeft < 30)
      return { label: `${daysLeft} days left`, color: "text-warning" };
    return { label: `${daysLeft} days left`, color: "text-muted-foreground" };
  };

  const {
    data: vehicleData,
    isPending: isLoadingVehicle,
    isSuccess: isSuccessLoadingVehicle,
  } = useQuery<VehicleTypeDTO>({
    queryKey: ["vehicle", "details"],
    queryFn: DriverAPI.vehicle,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Documents</h1>
          <p className="text-muted-foreground">
            Manage your verification documents for {vehicleData?.brand}{" "}
            {vehicleData?.model}
          </p>
        </div>
        {/* <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button> */}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {isLoadingVehicle &&
          Array.from({ length: 4 }).map((_, i) => {
            return (
              <Card className="p-5 space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                </div>
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-3 w-20" />
              </Card>
            );
          })}
        {isSuccessLoadingVehicle &&
          [
            {
              label: "Total Documents",
              value: vehicleData?.vehicleDocument?.length || 0,
              icon: FileText,
              iconColor: "text-primary",
            },
            {
              label: "Approved",
              value: vehicleData?.vehicleDocument?.length || 0,
              icon: CheckCircle2,
              iconColor: "text-success",
            },
            {
              label: "Pending Review",
              value: 0,
              icon: Clock,
              iconColor: "text-warning",
            },
            {
              label: "Rejected",
              value: 0,
              icon: XCircle,
              iconColor: "text-destructive",
            },
          ].map(({ label, value, icon: Icon, iconColor }) => (
            <Card key={label} className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </Card>
          ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {isLoadingVehicle &&
            Array.from({ length: 4 }).map((_, idx) => {
              return <DocumentCardSkeleton key={idx} />;
            })}
          {isSuccessLoadingVehicle &&
            vehicleData?.vehicleDocument?.map((doc, idx) => {
              return (
                <Card
                  key={idx + doc?.documentType}
                  className="p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-success/10">
                        <Shield className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {doc.documentType.replace(/_/g, " ")}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {doc?.documentType === "INSURANCE_CERTIFICATE"
                            ? "Third-party or comprehensive vehicle insurance coverage required for all commercial vehicles."
                            : doc?.documentType === "ROAD_WORTHINESS"
                              ? "Certificate confirming your vehicle meets all safety and emission standards."
                              : "Official vehicle registration document from the licensing authority."}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={"APPROVED"} type="document" />
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <a
                      href={doc?.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        View Document
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      disabled={true}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Re-upload
                    </Button>
                  </div>
                </Card>
              );
            })}
        </div>

        {/* Right Column - Compliance Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Compliance Status
            </h3>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Documents Verified
              </p>
            </div>
            <Progress value={100} className="h-2 mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approved</span>
                <span className="font-medium text-success">
                  {vehicleData?.vehicleDocument?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium text-warning">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rejected</span>
                <span className="font-medium text-destructive">0</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Linked Vehicle</h3>
            <div className="space-y-3 text-sm">
              {[
                {
                  label: "Vehicle",
                  value: `${vehicleData?.brand} ${vehicleData?.model}`,
                },
                {
                  label: "Plate Number",
                  value: vehicleData?.plateNumber || "-",
                },
                { label: "Type", value: vehicleData?.type || "-" },
                { label: "Year", value: vehicleData?.year.toString() || "-" },
                { label: "Color", value: vehicleData?.color || "-" },
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

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Requirements
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span>All documents must be clearly legible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span>Documents must not be expired</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span>File formats accepted: PDF, JPG, PNG</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span>Maximum file size: 5MB per document</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
