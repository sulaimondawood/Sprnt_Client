import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "@/components/RoleBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { mockVehicleDocuments, mockVehicle } from "@/data/mockData";
import {
  FileText,
  Upload,
  Calendar,
  AlertCircle,
  Shield,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";

const documentLabels: Record<string, string> = {
  INSURANCE: "Vehicle Insurance",
  ROAD_WORTHINESS: "Road Worthiness Certificate",
  REGISTRATION: "Vehicle Registration",
};

const documentDescriptions: Record<string, string> = {
  INSURANCE:
    "Third-party or comprehensive vehicle insurance coverage required for all commercial vehicles.",
  ROAD_WORTHINESS:
    "Certificate confirming your vehicle meets all safety and emission standards.",
  REGISTRATION:
    "Official vehicle registration document from the licensing authority.",
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Documents</h1>

          <p className="text-muted-foreground">
            Manage your verification documents for {mockVehicle.brand}{" "}
            {mockVehicle.model}
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Documents",
            value: totalDocs,
            icon: FileText,
            iconColor: "text-primary",
          },
          {
            label: "Approved",
            value: approvedDocs,
            icon: CheckCircle2,
            iconColor: "text-success",
          },
          {
            label: "Pending Review",
            value: pendingDocs,
            icon: Clock,
            iconColor: "text-warning",
          },
          {
            label: "Rejected",
            value: rejectedDocs,
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
        {/* Left Column - Document List */}
        <div className="lg:col-span-2 space-y-4">
          {mockVehicleDocuments.map((doc) => {
            const expiry = getExpiryInfo(doc.expiresAt);
            return (
              <Card
                key={doc.id}
                className="p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        doc.status === "APPROVED"
                          ? "bg-success/10"
                          : doc.status === "PENDING"
                            ? "bg-warning/10"
                            : "bg-destructive/10"
                      }`}
                    >
                      <Shield
                        className={`h-6 w-6 ${
                          doc.status === "APPROVED"
                            ? "text-success"
                            : doc.status === "PENDING"
                              ? "text-warning"
                              : "text-destructive"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {documentLabels[doc.documentType] ||
                          doc.documentType.replace(/_/g, " ")}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {documentDescriptions[doc.documentType]}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={doc.status} type="document" />
                </div>

                <Separator className="my-4" />

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-xs">Issued</p>
                      <p className="font-medium">
                        {format(new Date(doc.issuedAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-xs">Expires</p>
                      <p className="font-medium">
                        {format(new Date(doc.expiresAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className={`h-4 w-4 shrink-0 ${expiry.color}`} />
                    <div>
                      <p className="text-muted-foreground text-xs">Validity</p>
                      <p className={`font-medium ${expiry.color}`}>
                        {expiry.label}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    View Document
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
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
          {/* Compliance Progress */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Compliance Status
            </h3>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold">{docsProgress}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Documents Verified
              </p>
            </div>
            <Progress value={docsProgress} className="h-2 mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approved</span>
                <span className="font-medium text-success">{approvedDocs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium text-warning">{pendingDocs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rejected</span>
                <span className="font-medium text-destructive">
                  {rejectedDocs}
                </span>
              </div>
            </div>
          </Card>

          {/* Vehicle Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Linked Vehicle</h3>
            <div className="space-y-3 text-sm">
              {[
                {
                  label: "Vehicle",
                  value: `${mockVehicle.brand} ${mockVehicle.model}`,
                },
                { label: "Plate Number", value: mockVehicle.plateNumber },
                { label: "Type", value: mockVehicle.vehicleType },
                { label: "Year", value: mockVehicle.year.toString() },
                { label: "Color", value: mockVehicle.color },
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

          {/* Requirements */}
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
