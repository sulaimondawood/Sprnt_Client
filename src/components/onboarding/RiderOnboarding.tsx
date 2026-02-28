import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profile } from "@/helpers";
import { TOKEN } from "@/services/api/config";
import { RiderAPI } from "@/services/api/rider";
import { UploadAPI } from "@/services/api/upload";
import { RiderCompleteOnboarding } from "@/types/riders";
import { useMutation } from "@tanstack/react-query";
import { Camera, Loader2, LoaderCircle, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RiderOnboardingProps {
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RiderOnboarding({ setShowOnboarding }: RiderOnboardingProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    profileImage: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { mutateAsync: upload, isPending } = useMutation({
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
      mutationFn: (payload: RiderCompleteOnboarding) =>
        RiderAPI.completeProfile(payload),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess(data: any) {
        setShowOnboarding(false);
        const token = data?.data?.token;
        localStorage.setItem(TOKEN, token);
        toast.success(
          data?.data?.message || "Rider onboarding was successfull",
        );
      },
    });

  const handleFileChange = async (key: string, file: File | null) => {
    if (!file) return;

    try {
      const result = await upload(file);
      const url = result?.secure_url;

      setFormData((prev) => {
        return { ...prev, [key]: url };
      });
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
  };

  const handleComplete = () => {
    completeOnboarding({
      displayName: formData.fullName,
      imageUrl: formData.profileImage,
    });
  };

  const canProceed = () => {
    return formData.fullName.length > 2 && formData.profileImage.length > 5;
  };

  return (
    <Card className="w-full max-w-full px-3 py-5 md:p-8">
      {/* Header */}
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Sprnt</h1>
        <p className="text-muted-foreground">
          Let's set up your rider profile in just a few steps
        </p>
      </div>

      {/* Step Content */}
      <div className="min-h-[320px]">
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-3 p-4 bg-rider/10 rounded-xl border border-rider/20">
            <User className="h-6 w-6 text-rider" />
            <div>
              <p className="font-semibold">Personal Information</p>
              <p className="text-sm text-muted-foreground">
                Tell us about yourself
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              {isPending ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                <>
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.profileImage} />
                    <AvatarFallback className="bg-rider text-rider-foreground text-2xl">
                      {profile()?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                  >
                    <label className="cursor-pointer">
                      <Camera className="size-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          handleFileChange(
                            "profileImage",
                            e.target.files?.[0] || null,
                          )
                        }
                      />
                    </label>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Display Name
                <span className="text-red-600">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Dawood Sprnt"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <Button
          onClick={handleComplete}
          disabled={!canProceed() || isCompletingOnboarding}
          className="w-full gradient-rider text-rider-foreground"
        >
          {isCompletingOnboarding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="flex gap-2 items-center">
              Start Riding
              <Sparkles className="h-4 w-4" />
            </div>
          )}
        </Button>
      </div>
    </Card>
  );
}
