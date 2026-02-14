import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { profile } from "@/helpers";
import { TOKEN } from "@/services/api/config";
import { DriverAPI, DriverRegistrationType } from "@/services/api/driver";
import { UploadAPI } from "@/services/api/upload";
import { useMutation } from "@tanstack/react-query";
import {
  Calendar,
  Camera,
  Car,
  ChevronLeft,
  ChevronRight,
  FileText,
  LoaderCircle,
  Shield,
  Sparkles,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DriverOnboardingProps {
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DriverOnboarding({ setShowOnboarding }: DriverOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const [formData, setFormData] = useState({
    profileImage: "",
    licenseNumber: "",
    licenseExpiry: "",
    nin: "",
    vehiclePlate: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleColor: "",
    vehicleYear: "",
    vehicleCapacity: "",
    vehicleType: "",
    documents: [
      {
        documentType: "INSURANCE_CERTIFICATE",
        documentUrl: "",
        label: "Vehicle Insurance",
        desc: "Valid insurance certificate",
      },
      {
        documentType: "ROAD_WORTHINESS",
        documentUrl: "",
        label: "Road Worthiness",
        desc: "Road worthiness certificate",
      },
      {
        documentType: "VEHICLE_LICENSE",
        documentUrl: "",
        label: "Vehicle License",
        desc: "Vehicle license document",
      },
    ],
  });
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const { mutateAsync: upload } = useMutation({
    mutationFn: async (file: File) => {
      const res = await UploadAPI.getUploadSignature();
      const signatureData = res;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData?.apiKey);
      formData.append("timestamp", signatureData?.timestamp);
      formData.append("signature", signatureData?.signature);
      formData.append("folder", "sprnt");

      return await UploadAPI.uploadFile(formData);
    },
  });
  const { mutate: completeOnboarding, isPending: isCompletingOnboarding } =
    useMutation({
      mutationFn: (payload: DriverRegistrationType) =>
        DriverAPI.completeProfile(payload),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess(data: any) {
        setShowOnboarding(false);
        const token = data?.data?.token;
        localStorage.setItem(TOKEN, token);
        toast.success(
          data?.data?.message || "Driver onboarding was successfull",
        );
      },
    });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (
    key: string,
    file: File | null,
    isDocumentArray: boolean = false,
    docType?: string,
    label?: string,
    desc?: string,
  ) => {
    if (!file) return;

    const currentKey = isDocumentArray ? `${key}-${docType}` : key;

    try {
      setUploadingKey(currentKey);
      const result = await upload(file);
      const url = result?.secure_url;

      setFormData((prev) => {
        if (isDocumentArray && docType) {
          // Handle the array of VehicleDocumentDTO
          const otherDocs =
            prev.documents?.filter((d) => d.documentType !== docType) || [];
          return {
            ...prev,
            documents: [
              ...otherDocs,
              { documentType: docType, documentUrl: url, label, desc },
            ],
          };
        }

        return { ...prev, [key]: url };
      });
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploadingKey(null);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    completeOnboarding({
      licenseExpiry: formData.licenseExpiry,
      licenseNumber: formData.licenseNumber,
      nin: formData.nin,
      profileImage: formData.profileImage,
      vehicle: {
        brand: formData.vehicleBrand,
        capacity: Number(formData.vehicleCapacity),
        color: formData.vehicleColor,
        model: formData.vehicleModel,
        plateNumber: formData.vehiclePlate,
        type: formData.vehicleType,
        year: formData.vehicleYear,
        vehicleDocument: formData.documents,
      },
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return (
          formData.licenseNumber.length > 5 &&
          formData.nin.length === 11 &&
          formData.licenseExpiry.length > 0
        );
      case 2:
        return (
          formData.vehiclePlate.length > 3 &&
          formData.vehicleBrand.length > 1 &&
          formData.vehicleType &&
          formData.vehicleModel &&
          formData.vehicleYear &&
          formData.vehicleColor &&
          formData.vehicleCapacity
        );
      case 3:
        return (
          formData.documents[0].documentUrl &&
          formData.documents[1].documentUrl &&
          formData.documents[2].documentUrl
        );
      case 4:
        return formData.profileImage.length > 2;

      default:
        return true;
    }
  };

  const steps = [
    { icon: Shield, label: "Verification" },
    { icon: Car, label: "Vehicle" },
    { icon: FileText, label: "Documents" },
    { icon: User, label: "Personal" },
  ];

  const vehicleTypes = ["SUV", "BIKE", "TRICYCLE", "CAR"];
  const vehicleColors = [
    "Black",
    "White",
    "Silver",
    "Blue",
    "Red",
    "Grey",
    "Other",
  ];

  return (
    <Card className="w-full max-w-full p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 gradient-driver rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Car className="h-8 w-8 text-driver-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Become a Driver</h1>
        <p className="text-muted-foreground">
          Complete your profile to start earning
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-1 mb-6 overflow-x-auto pb-2">
        {steps.map((s, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
                index + 1 <= step
                  ? "gradient-driver text-driver-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <s.icon className="h-4 w-4" />
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-6 h-1 mx-0.5 rounded ${
                  index + 1 < step ? "bg-driver" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Progress value={progress} className="h-2 mb-8" />

      {/* Step Content */}
      <div className="min-h-[380px]">
        {/* Step 1: Verification Documents */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 p-4 bg-driver/10 rounded-xl border border-driver/20">
              <Shield className="h-6 w-6 text-driver" />
              <div>
                <p className="font-semibold">Identity Verification</p>
                <p className="text-sm text-muted-foreground">
                  We need to verify your identity
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">
                  Driver's License Number{" "}
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="licenseNumber"
                  placeholder="Enter your license number"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    handleInputChange("licenseNumber", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="licenseExpiry"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" /> License Expiry Date
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="licenseExpiry"
                  type="date"
                  value={formData.licenseExpiry}
                  onChange={(e) =>
                    handleInputChange("licenseExpiry", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nin">
                  NIN (National Identification Number)
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="nin"
                  placeholder="Enter your 11-digit NIN"
                  type="text"
                  inputMode="numeric"
                  value={formData.nin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 11) {
                      handleInputChange("nin", value);
                    }
                  }}
                />
              </div>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
              <p className="text-sm text-warning-foreground">
                Please ensure all information matches your official documents.
                False information may result in account suspension.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Vehicle Information */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 p-4 bg-driver/10 rounded-xl border border-driver/20">
              <Car className="h-6 w-6 text-driver" />
              <div>
                <p className="font-semibold">Vehicle Information</p>
                <p className="text-sm text-muted-foreground">
                  Tell us about your vehicle
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehiclePlate">
                    Plate Number
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="vehiclePlate"
                    placeholder="e.g., LG-123-ABC"
                    value={formData.vehiclePlate}
                    onChange={(e) =>
                      handleInputChange("vehiclePlate", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Vehicle Type
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.vehicleType}
                    onValueChange={(value) =>
                      handleInputChange("vehicleType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleBrand">
                    Brand
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="vehicleBrand"
                    placeholder="e.g., Toyota"
                    value={formData.vehicleBrand}
                    onChange={(e) =>
                      handleInputChange("vehicleBrand", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">
                    Model
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="vehicleModel"
                    placeholder="e.g., Camry"
                    value={formData.vehicleModel}
                    onChange={(e) =>
                      handleInputChange("vehicleModel", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleYear">
                    Year
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="vehicleYear"
                    placeholder="e.g., 2020"
                    value={formData.vehicleYear}
                    onChange={(e) =>
                      handleInputChange("vehicleYear", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Color
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.vehicleColor}
                    onValueChange={(value) =>
                      handleInputChange("vehicleColor", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleColors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleCapacity">
                    Capacity
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="vehicleCapacity"
                    placeholder="e.g.,5"
                    type="number"
                    value={formData.vehicleCapacity}
                    onChange={(e) =>
                      handleInputChange("vehicleCapacity", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Vehicle Documents */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 p-4 bg-driver/10 rounded-xl border border-driver/20">
              <FileText className="h-6 w-6 text-driver" />
              <div>
                <p className="font-semibold">Vehicle Documents</p>
                <p className="text-sm text-muted-foreground">
                  Upload your vehicle documents (can be done later)
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {formData.documents.map((doc) => (
                <div
                  key={doc.documentType}
                  className="border-2 border-dashed border-border rounded-xl p-4 hover:border-driver/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{doc.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.desc}
                      </p>
                    </div>

                    <Button
                      disabled={
                        uploadingKey === `documents-${doc.documentType}`
                      }
                      variant="outline"
                      size="sm"
                      asChild
                      className="disabled:cursor-not-allowed"
                    >
                      {uploadingKey === `documents-${doc.documentType}` ? (
                        <p className="text-black">Uploading...</p>
                      ) : (
                        <label className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleFileChange(
                                "documents",
                                e.target.files?.[0] || null,
                                true,
                                doc.documentType,
                                doc.label,
                                doc.desc,
                              )
                            }
                          />
                        </label>
                      )}
                    </Button>
                  </div>
                  {doc.documentUrl && (
                    <img
                      src={doc.documentUrl}
                      alt={doc.documentType}
                      className="h-48 object-cover w-full mt-5"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground">
                You can skip this step and upload documents later from your
                profile. However, your account will be pending approval until
                all documents are verified.
              </p>
            </div>
          </div>
        )}

        {/* Step 1: Personal Information */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 p-4 bg-driver/10 rounded-xl border border-driver/20">
              <User className="h-6 w-6 text-driver" />
              <div>
                <p className="font-semibold">Personal Information</p>
                <p className="text-sm text-muted-foreground">
                  Let's start with your profile picture
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                {uploadingKey === "profileImage" ? (
                  <LoaderCircle className="size-5 animate-spin" />
                ) : (
                  <>
                    <Avatar className="size-56">
                      <AvatarImage src={formData?.profileImage || ""} />
                      <AvatarFallback className="bg-driver text-driver-foreground text-2xl">
                        {profile()?.fullname?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-6 -right-2 rounded-full size-12"
                    >
                      <label className="cursor-pointer">
                        <Camera className="size-10" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            handleFileChange(
                              "profileImage",
                              e.target.files?.[0] || null,
                              false,
                            )
                          }
                        />
                      </label>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="p-4 bg-info/10 border border-info/20 rounded-xl text-left">
              <p className="text-sm">
                <strong>Submit:</strong> Our team will review your documents
                within 24-48 hours. You'll receive a notification once your
                account is approved.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        ) : (
          <div />
        )}
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="min-w-[140px] gradient-driver text-driver-foreground"
        >
          {step === totalSteps ? (
            <div>
              {isCompletingOnboarding ? (
                <p>Please wait...</p>
              ) : (
                <div className="flex gap-2 items-center">
                  Submit & Start Driving
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
            </div>
          ) : (
            <>
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
