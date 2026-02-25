import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/routes";
import { AuthAPI } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: Record<string, string>) =>
      AuthAPI.forgotPassword(payload),
    onSuccess(data) {
      toast("Reset link sent", {
        description: "Check your email for the password reset link.",
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    forgotPassword({ email });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {!isSuccess && (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Forgot password?</h1>
                <p className="text-muted-foreground">
                  No worries. Enter your email and we'll send you a reset link.
                </p>
              </div>

              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
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

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg gradient-primary"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </Card>
            </>
          )}

          {isSuccess && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold">Check your email</h1>
              <p className="text-muted-foreground max-w-sm mx-auto">
                We've sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <Card className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => forgotPassword({ email })}
                >
                  {isPending ? "Sending..." : "Resend reset link"}
                </Button>
              </Card>
            </div>
          )}

          <div className="text-center">
            <Link
              to={ROUTES.login}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 gradient-hero">
        <div className="text-center text-primary-foreground space-y-6 max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white">Reset your password</h2>
          <p className="text-lg text-white/70">
            We'll help you get back on the road. Enter your email and follow the
            instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
