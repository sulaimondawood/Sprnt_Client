import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AlertCircle, X, User, Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface OnboardingStatus {
  isComplete: boolean;
  currentStep: number;
  totalSteps: number;
  userType: "rider" | "driver" | null;
}

interface OnboardingBannerProps {
  userType?: "rider" | "driver";
}

const OnboardingBanner = ({ userType = "driver" }: OnboardingBannerProps) => {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);
  const [status, setStatus] = useState<OnboardingStatus>({
    isComplete: false,
    currentStep: 0,
    totalSteps: userType === "driver" ? 5 : 3,
    userType,
  });

  // Mock check for onboarding status - in production this would check backend
  useEffect(() => {
    const onboardingComplete = localStorage.getItem(
      `${userType}_onboarding_complete`
    );
    const currentStep = localStorage.getItem(`${userType}_onboarding_step`);

    setStatus({
      isComplete: onboardingComplete === "true",
      currentStep: currentStep ? parseInt(currentStep) : 0,
      totalSteps: userType === "driver" ? 5 : 3,
      userType,
    });
  }, [userType]);

  if (status.isComplete || dismissed) {
    return null;
  }

  const progress = (status.currentStep / status.totalSteps) * 100;

  const handleContinue = () => {
    navigate(`/onboarding/${userType}`);
  };

  return (
    <div className="mb-6 rounded-xl border border-warning/20 bg-warning/5 p-4 animate-slide-up">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
            {userType === "driver" ? (
              <Car className="h-5 w-5 text-warning" />
            ) : (
              <User className="h-5 w-5 text-warning" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-4 w-4 text-warning" />
              <h4 className="font-semibold text-foreground">
                Complete Your {userType === "driver" ? "Driver" : "Rider"}{" "}
                Profile
              </h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {userType === "driver"
                ? "Finish setting up your driver profile to start accepting rides and earning money."
                : "Complete your profile to start booking rides with ease."}
            </p>

            {status.currentStep > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>
                    {status.currentStep} of {status.totalSteps} steps completed
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <Button size="sm" onClick={handleContinue} className="gap-2">
              {status.currentStep > 0 ? "Continue Setup" : "Start Setup"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingBanner;
