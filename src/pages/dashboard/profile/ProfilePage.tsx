import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { profile } from "@/helpers";
import { DriverAPI } from "@/services/api/driver";
import { UploadAPI } from "@/services/api/upload";
import { UserAPI } from "@/services/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const [fullname, setFullname] = useState("");

  const profileData = profile();
  const role = profileData?.role;

  const queryClient = useQueryClient();

  const {
    data: userProfile,
    isLoading: isLoadingUserProfile,
    isSuccess: isSuccessLoadingUserProfile,
  } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: UserAPI.profile,
  });

  const { mutate: upload, isPending } = useMutation({
    mutationFn: async (file: File) => {
      const res = await UploadAPI.getUploadSignature();
      const signatureData = res;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData?.apiKey);
      formData.append("timestamp", signatureData?.timestamp);
      formData.append("signature", signatureData?.signature);
      formData.append("folder", "sprnt");

      const uploadRes = await UploadAPI.uploadFile(formData);

      await DriverAPI.uploadProfileImage({
        imageUrl: uploadRes.secure_url,
      });

      return uploadRes;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user", "profile"],
      });
      toast.success("Profile photo updated");
    },
    onError: () => {
      toast.error("Failed to upload profile image");
    },
  });

  const { mutate: updateData, isPending: isUpdatingData } = useMutation({
    mutationFn: () => DriverAPI.updateProfileData({ fullname }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user", "profile"],
      });
      toast.success("Profile data updated");
    },
    onError: () => {
      toast.error("Failed to update profile data");
    },
  });

  const handleSaveProfileData = () => {
    if (fullname === userProfile?.fullname) {
      toast("You've not modified any info.");
      return;
    }

    if (!fullname) return;

    updateData();
  };

  useEffect(() => {
    if (userProfile?.fullname) {
      setFullname(userProfile?.fullname);
    }
  }, [userProfile?.fullname]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      {isLoadingUserProfile && (
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>

            <div className="text-center sm:text-left space-y-2">
              <Skeleton className="h-7 w-48 mx-auto sm:mx-0" />
              <Skeleton className="h-4 w-32 mx-auto sm:mx-0" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          <Skeleton className="h-10 w-36 mt-6 rounded-md" />
        </Card>
      )}
      {isSuccessLoadingUserProfile && (
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={
                    userProfile?.driver?.profileImage ||
                    userProfile?.rider?.profileImage
                  }
                  className={isPending ? "opacity-50" : ""}
                />
                <AvatarFallback
                  className={`text-2xl ${role === "DRIVER" ? "bg-driver text-driver-foreground" : "bg-rider text-rider-foreground"}`}
                >
                  {userProfile?.fullname?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                asChild
              >
                <label className="cursor-pointer">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) upload(file);
                    }}
                  />
                </label>
              </Button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">{userProfile?.fullname}</h2>
              <div className="flex items-center gap-1 justify-center sm:justify-start text-muted-foreground">
                <p className="flex items-center">
                  {userProfile?.driver?.rating || userProfile?.rider?.rating}{" "}
                  <Star className="h-4 w-4 text-warning fill-warning" />
                </p>
                <span>rating</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={fullname || userProfile?.fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={userProfile?.email} disabled readOnly />
            </div>

            {role === "DRIVER" && (
              <>
                <div className="space-y-2">
                  <Label>License Number</Label>
                  <Input
                    defaultValue={userProfile?.driver?.licenseNumber}
                    disabled
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label>NIN</Label>
                  <Input
                    defaultValue={userProfile?.driver?.nin}
                    disabled
                    readOnly
                  />
                </div>
              </>
            )}
          </div>

          <Button
            disabled={fullname === userProfile?.fullname || isUpdatingData}
            onClick={handleSaveProfileData}
            className="mt-6 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUpdatingData && <Loader2 className="h-4 w-4 animate-spin" />}
            {isUpdatingData ? "Saving..." : "Save Changes"}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
