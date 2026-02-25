import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { AuthAPI } from "@/services/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, ShieldCheck, XCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const { isFetching, isSuccess, isError } = useQuery({
    queryKey: ["validate", "email"],
    queryFn: () => AuthAPI.validateEmail(token),
    enabled: !!token,
  });

  const { mutate: resendActivationEmail, isPending: isResendingEmail } =
    useMutation({
      mutationFn: () => AuthAPI.resendActivationEmail({ token }),
      onSuccess(data) {
        toast(
          "A verification email has been sent to your inbox. Check your spam if not found",
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(error: any) {
        toast.error(error?.response?.data?.message);
      },
    });

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-8">
          {isFetching && (
            <Card className="p-4 sm:p-10">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Verifying your email</h1>
                  <p className="text-muted-foreground text-sm">
                    Please wait while we validate your email address...
                  </p>
                </div>
              </div>
            </Card>
          )}

          {isSuccess && (
            <Card className="p-4 sm:p-10">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
                  <ShieldCheck className="h-10 w-10 text-success" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Email verified!</h1>
                  <p className="text-muted-foreground text-sm">
                    Your email has been successfully verified. You're all set to
                    start using RideFlow.
                  </p>
                </div>
                <Button
                  className="w-full h-12 gradient-primary text-sm"
                  onClick={() => navigate(ROUTES.login)}
                >
                  Continue to Sign In
                </Button>
              </div>
            </Card>
          )}

          {isError && (
            <Card className="p-4 sm:p-10">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Verification failed</h1>
                  <p className="text-muted-foreground text-sm">
                    {!token
                      ? "No verification token found. Please check your email for the correct link."
                      : "The verification link is invalid or has expired. Please request a new one."}
                  </p>
                </div>
                <div className="space-y-3">
                  <Button
                    className="w-full h-12 gradient-primary text-sm"
                    onClick={() => navigate(ROUTES.login)}
                  >
                    Back to Sign In
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-sm"
                    disabled={isResendingEmail}
                    onClick={() => resendActivationEmail()}
                  >
                    Resend verification email
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 gradient-hero">
        <div className="text-center text-primary-foreground space-y-6 max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Securing your account
          </h2>
          <p className="text-lg text-white/70">
            Email verification keeps your RideFlow account safe and ensures you
            never miss important ride updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
