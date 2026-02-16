import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Car,
  Upload,
  FileText,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Palette,
  Users,
  Calendar,
  Hash,
} from "lucide-react";
import { VehicleType } from "@/types";

type Step = "details" | "documents" | "review";

interface VehicleForm {
  brand: string;
  model: string;
  year: string;
  color: string;
  plateNumber: string;
  capacity: string;
  vehicleType: VehicleType | "";
}

interface DocumentUpload {
  name: string;
  type: string;
  file: File | null;
  preview: string;
}

const VEHICLE_TYPES: VehicleType[] = [
  "Sedan",
  "SUV",
  "Bike",
  "Tricycle",
  "Luxury",
];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 25 }, (_, i) => String(CURRENT_YEAR - i));

const AddVehiclePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<VehicleForm>({
    brand: "",
    model: "",
    year: "",
    color: "",
    plateNumber: "",
    capacity: "",
    vehicleType: "",
  });

  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { name: "Vehicle Insurance", type: "INSURANCE", file: null, preview: "" },
    {
      name: "Road Worthiness Certificate",
      type: "ROAD_WORTHINESS",
      file: null,
      preview: "",
    },
    {
      name: "Vehicle Registration",
      type: "REGISTRATION",
      file: null,
      preview: "",
    },
  ]);

  const updateForm = (key: keyof VehicleForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileSelect = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.jpeg,.png";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setDocuments((prev) =>
          prev.map((doc, i) =>
            i === index ? { ...doc, file, preview: file.name } : doc,
          ),
        );
      }
    };
    input.click();
  };

  const isDetailsValid =
    form.brand &&
    form.model &&
    form.year &&
    form.color &&
    form.plateNumber &&
    form.capacity &&
    form.vehicleType;

  const isDocumentsValid = documents.every((d) => d.file);

  const handleSubmit = () => {
    toast({
      title: "Vehicle Added Successfully",
      description: `${form.brand} ${form.model} has been submitted for review.`,
    });
    navigate("/dashboard/vehicle");
  };

  const steps: { key: Step; label: string; number: number }[] = [
    { key: "details", label: "Vehicle Details", number: 1 },
    { key: "documents", label: "Documents", number: 2 },
    { key: "review", label: "Review & Submit", number: 3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard/vehicle")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-display">Add New Vehicle</h1>
          <p className="text-sm text-muted-foreground">
            Complete all steps to register your vehicle
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                  i <= currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStepIndex ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  s.number
                )}
              </div>
              <span className="text-sm font-medium hidden sm:block">
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-[2px] w-8 mx-2 ${i < currentStepIndex ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step: Vehicle Details */}
      {step === "details" && (
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <Car className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Vehicle Information</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <Select
                value={form.vehicleType}
                onValueChange={(v) => updateForm("vehicleType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Brand / Make</Label>
              <Input
                placeholder="e.g. Toyota"
                value={form.brand}
                onChange={(e) => updateForm("brand", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Model</Label>
              <Input
                placeholder="e.g. Camry"
                value={form.model}
                onChange={(e) => updateForm("model", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              <Select
                value={form.year}
                onValueChange={(v) => updateForm("year", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Palette className="h-3.5 w-3.5" /> Color
              </Label>
              <Input
                placeholder="e.g. Black"
                value={form.color}
                onChange={(e) => updateForm("color", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Hash className="h-3.5 w-3.5" /> Plate Number
              </Label>
              <Input
                placeholder="e.g. LG-123-ABC"
                value={form.plateNumber}
                onChange={(e) => updateForm("plateNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> Passenger Capacity
              </Label>
              <Select
                value={form.capacity}
                onValueChange={(v) => updateForm("capacity", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select capacity" />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5", "6", "7"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c} {c === "1" ? "passenger" : "passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => setStep("documents")}
              disabled={!isDetailsValid}
              className="gap-2"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step: Documents */}
      {step === "documents" && (
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Required Documents</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Upload clear photos or PDF copies of each document. All documents
            must be valid and not expired.
          </p>

          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div
                key={doc.type}
                className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      doc.file ? "bg-emerald-500/10" : "bg-muted"
                    }`}
                  >
                    {doc.file ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    {doc.preview ? (
                      <p className="text-xs text-emerald-600">{doc.preview}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, or PNG
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => handleFileSelect(index)}
                >
                  <Upload className="h-3.5 w-3.5" />
                  {doc.file ? "Replace" : "Upload"}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={() => setStep("details")}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={() => setStep("review")}
              disabled={!isDocumentsValid}
              className="gap-2"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step: Review */}
      {step === "review" && (
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Review & Submit</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Vehicle
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "Type", value: form.vehicleType },
                  { label: "Brand", value: form.brand },
                  { label: "Model", value: form.model },
                  { label: "Year", value: form.year },
                  { label: "Color", value: form.color },
                  { label: "Plate Number", value: form.plateNumber },
                  { label: "Capacity", value: `${form.capacity} passengers` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between p-3 bg-muted rounded-lg"
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Documents
              </p>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.type}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium">{doc.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {doc.preview}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={() => setStep("documents")}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              <CheckCircle className="h-4 w-4" /> Submit Vehicle
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AddVehiclePage;
