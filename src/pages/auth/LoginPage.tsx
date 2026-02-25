/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SideBox } from "@/components/auth/SideBox";
import { ROUTES } from "@/constants/routes";
import { AuthAPI, LoginPayload } from "@/services/api/auth";
import { TOKEN } from "@/services/api/config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const defaultRole =
    (searchParams.get("role") as "rider" | "driver") || "rider";

  const [role, setRole] = useState<"rider" | "driver">(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (payload: LoginPayload) => AuthAPI.login(payload),
    onSuccess(data) {
      toast(data?.message || "Redirecting to dashboard");
      const token = data?.data?.token;
      localStorage.setItem(TOKEN, token);
      navigate(ROUTES.dashboard);
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-8 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-8 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => navigate("/auth/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className={`w-full h-12 text-lg`}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Card>

          <p className="text-center text-muted-foreground text-sm">
            Don't have an account?
            <button
              onClick={() => navigate(ROUTES.register)}
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
      <SideBox role={role} />
    </div>
  );
};

export default LoginPage;
