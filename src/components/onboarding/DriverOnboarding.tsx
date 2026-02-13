import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  FileText,
  Car,
  Upload,
  CheckCircle2,
  Camera,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Shield,
  Calendar,
} from "lucide-react";

interface DriverOnboardingProps {
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DriverOnboarding({ setShowOnboarding }: DriverOnboardingProps) {
  const { updateDriverProfile } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    profileImage: "",
    licenseNumber: "",
    licenseExpiry: "",
    nin: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    vehiclePlate: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    vehicleType: "",
    insuranceDoc: null as File | null,
    registrationDoc: null as File | null,
    roadWorthinessDoc: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
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
    updateDriverProfile({
      fullName: formData.fullName,
      licenseNumber: formData.licenseNumber,
      nin: formData.nin,
      isProfileComplete: true,
    });
    onComplete();
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.fullName.length > 2 && formData.phone.length > 8;
      case 2:
        return formData.licenseNumber.length > 5 && formData.nin.length > 5;
      case 3:
        return (
          formData.vehiclePlate.length > 3 &&
          formData.vehicleBrand.length > 1 &&
          formData.vehicleType
        );
      case 4:
        return true; // Documents are optional during onboarding
      case 5:
        return true;
      default:
        return true;
    }
  };

  const steps = [
    { icon: User, label: "Personal" },
    { icon: Shield, label: "Verification" },
    { icon: Car, label: "Vehicle" },
    { icon: FileText, label: "Documents" },
    { icon: CheckCircle2, label: "Complete" },
  ];

  const vehicleTypes = ["Sedan", "SUV", "Bike", "Tricycle", "Luxury"];
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
    <div className="min-h-screen bg-gradient-to-br from-driver/5 via-background to-driver/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
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
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 p-4 bg-driver/10 rounded-xl border border-driver/20">
                <User className="h-6 w-6 text-driver" />
                <div>
                  <p className="font-semibold">Personal Information</p>
                  <p className="text-sm text-muted-foreground">
                    Let's start with your basic details
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.profileImage} />
                    <AvatarFallback className="bg-driver text-driver-foreground text-2xl">
                      {formData.fullName?.charAt(0) || "D"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full legal name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+234 XXX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Verification Documents */}
          {step === 2 && (
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
                    Driver's License Number *
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
                    NIN (National Identification Number) *
                  </Label>
                  <Input
                    id="nin"
                    placeholder="Enter your 11-digit NIN"
                    value={formData.nin}
                    onChange={(e) => handleInputChange("nin", e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
                <p className="text-sm text-warning-foreground">
                  ⚠️ Please ensure all information matches your official
                  documents. False information may result in account suspension.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Vehicle Information */}
          {step === 3 && (
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
                    <Label htmlFor="vehiclePlate">Plate Number *</Label>
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
                    <Label>Vehicle Type *</Label>
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
                    <Label htmlFor="vehicleBrand">Brand *</Label>
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
                    <Label htmlFor="vehicleModel">Model</Label>
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
                    <Label htmlFor="vehicleYear">Year</Label>
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
                    <Label>Color</Label>
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
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Vehicle Documents */}
          {step === 4 && (
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
                {[
                  {
                    key: "insuranceDoc",
                    label: "Vehicle Insurance",
                    desc: "Valid insurance certificate",
                  },
                  {
                    key: "registrationDoc",
                    label: "Vehicle Registration",
                    desc: "Vehicle registration document",
                  },
                  {
                    key: "roadWorthinessDoc",
                    label: "Road Worthiness",
                    desc: "Road worthiness certificate",
                  },
                ].map((doc) => (
                  <div
                    key={doc.key}
                    className="border-2 border-dashed border-border rounded-xl p-4 hover:border-driver/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{doc.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.desc}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <label className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleFileChange(
                                doc.key,
                                e.target.files?.[0] || null,
                              )
                            }
                          />
                        </label>
                      </Button>
                    </div>
                    {formData[doc.key as keyof typeof formData] && (
                      <p className="text-sm text-success mt-2">
                        ✓{" "}
                        {
                          (formData[doc.key as keyof typeof formData] as File)
                            ?.name
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground">
                  💡 You can skip this step and upload documents later from your
                  profile. However, your account will be pending approval until
                  all documents are verified.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in text-center">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome Aboard!</h2>
                <p className="text-muted-foreground">
                  Your driver profile has been created. Start accepting rides
                  and earning money!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left p-4 bg-driver/5 rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">License</p>
                  <p className="font-medium">{formData.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle</p>
                  <p className="font-medium">
                    {formData.vehicleBrand} {formData.vehicleModel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-warning">
                    Pending Verification
                  </p>
                </div>
              </div>

              <div className="p-4 bg-info/10 border border-info/20 rounded-xl text-left">
                <p className="text-sm">
                  <strong>Next Steps:</strong> Our team will review your
                  documents within 24-48 hours. You'll receive a notification
                  once your account is approved.
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
              <>
                Start Driving
                <Sparkles className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
