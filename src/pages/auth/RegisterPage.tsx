/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SideBox } from "@/components/auth/SideBox";
import { ROUTES } from "@/constants/routes";
import { AuthAPI, RegisterPayload } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const defaultRole =
    (searchParams.get("role") as "rider" | "driver") || "rider";

  const [role, setRole] = useState<"rider" | "driver">(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const navigate = useNavigate();

  const { mutate: registerRider, isPending } = useMutation({
    mutationFn: (payload: RegisterPayload) => AuthAPI.registerRider(payload),
    onSuccess(data) {
      toast("Account created!");
      navigate(ROUTES.login);
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  const { mutate: registerDriver, isPending: isPendingDriver } = useMutation({
    mutationFn: (payload: RegisterPayload) => AuthAPI.registerDriver(payload),
    onSuccess(data) {
      toast("Account created!");
      navigate(ROUTES.login);
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "rider") {
      registerRider({
        email,
        fullname,
        password,
      });
    } else if (role === "driver") {
      registerDriver({
        email,
        fullname,
        password,
      });
    } else {
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Car className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">Sprnt</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Create account</h1>
            <p className="text-muted-foreground">
              Sign up to start your journey
            </p>
          </div>

          {/* Role Selection */}
          <Tabs
            value={role}
            onValueChange={(v) => setRole(v as "rider" | "driver")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 h-14">
              <TabsTrigger
                value="rider"
                className="gap-2 data-[state=active]:gradient-rider data-[state=active]:text-rider-foreground"
              >
                <User className="h-5 w-5" />
                Rider
              </TabsTrigger>
              <TabsTrigger
                value="driver"
                className="gap-2 data-[state=active]:gradient-driver data-[state=active]:text-driver-foreground"
              >
                <Car className="h-5 w-5" />
                Driver
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullname">Fullname</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Dawood Adekunle"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full h-12 text-lg ${role === "rider" ? "gradient-rider" : "gradient-driver"}`}
                disabled={role === "rider" ? isPending : isPendingDriver}
              >
                {isPending || isPendingDriver
                  ? "Please wait..."
                  : "Create Account"}
              </Button>
            </form>
          </Card>

          <p className="text-center text-muted-foreground">
            Already have an account?
            <button
              onClick={() => navigate("/auth/login")}
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      <SideBox role={role} />
    </div>
  );
};

export default RegisterPage;
