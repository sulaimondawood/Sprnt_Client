import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "your email";
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length < 6) return;
    setIsVerifying(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsVerifying(false);
    setIsVerified(true);
    toast({
      title: "Email verified!",
      description: "Your account is now active.",
    });
  };

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsResending(false);
    toast({
      title: "Code resent",
      description: "A new verification code has been sent to your email.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {!isVerified ? (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Verify your email</h1>
                <p className="text-muted-foreground">
                  We've sent a 6-digit code to{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>

              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button
                    className="w-full h-12 text-lg gradient-primary"
                    disabled={otp.length < 6 || isVerifying}
                    onClick={handleVerify}
                  >
                    {isVerifying ? "Verifying..." : "Verify Email"}
                  </Button>

                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the code?
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={handleResend}
                      disabled={isResending}
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${isResending ? "animate-spin" : ""}`}
                      />
                      {isResending ? "Resending..." : "Resend code"}
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold">Email verified!</h1>
              <p className="text-muted-foreground">
                Your email has been successfully verified. You're all set to
                start using RideFlow.
              </p>
              <Button
                className="w-full h-12 text-lg gradient-primary"
                onClick={() => navigate("/auth")}
              >
                Continue to Sign In
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 gradient-hero">
        <div className="text-center text-primary-foreground space-y-6 max-w-md">
          <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white">Almost there!</h2>
          <p className="text-lg text-white/70">
            Just one more step to unlock your RideFlow experience. Verify your
            email to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
