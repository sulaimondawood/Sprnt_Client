import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Car,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordChecks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    {
      label: "Passwords match",
      met: password.length > 0 && password === confirmPassword,
    },
  ];

  const allChecksMet = passwordChecks.every((c) => c.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allChecksMet) return;
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "Password updated!",
      description: "Your password has been reset successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Car className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">RideFlow</span>
            </Link>
          </div>

          {!isSuccess ? (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Set new password</h1>
                <p className="text-muted-foreground">
                  Your new password must be different from your previous one.
                </p>
              </div>

              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirm"
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirm ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password strength indicators */}
                  <div className="space-y-2">
                    {passwordChecks.map((check, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2
                          className={`h-4 w-4 ${check.met ? "text-success" : "text-muted-foreground/40"}`}
                        />
                        <span
                          className={
                            check.met
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg gradient-primary"
                    disabled={isSubmitting || !allChecksMet}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </Button>
                </form>
              </Card>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <ShieldCheck className="h-10 w-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold">Password reset!</h1>
              <p className="text-muted-foreground">
                Your password has been successfully updated. You can now sign in
                with your new password.
              </p>
              <Button
                className="w-full h-12 text-lg gradient-primary"
                onClick={() => navigate("/auth")}
              >
                Back to Sign In
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 gradient-hero">
        <div className="text-center text-primary-foreground space-y-6 max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white">Secure your account</h2>
          <p className="text-lg text-white/70">
            Choose a strong password to keep your account safe and your rides
            worry-free.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
