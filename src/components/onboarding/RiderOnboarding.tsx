import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Camera,
  Home,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

interface RiderOnboardingProps {
  onComplete: () => void;
}

export function RiderOnboarding({ onComplete }: RiderOnboardingProps) {
  const { updateRiderProfile } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    profileImage: '',
    homeAddress: '',
    workAddress: '',
    emergencyContact: '',
    emergencyPhone: '',
    preferredPayment: 'wallet',
    referralCode: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    updateRiderProfile({
      fullName: formData.fullName,
      isProfileComplete: true,
    });
    onComplete();
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.fullName.length > 2 && formData.phone.length > 8;
      case 2:
        return true; // Optional step
      case 3:
        return true; // Optional step
      case 4:
        return true;
      default:
        return true;
    }
  };

  const steps = [
    { icon: User, label: 'Personal Info' },
    { icon: MapPin, label: 'Saved Places' },
    { icon: CreditCard, label: 'Payment' },
    { icon: CheckCircle2, label: 'Complete' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rider/5 via-background to-rider/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-rider rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-rider-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to RideFlow</h1>
          <p className="text-muted-foreground">Let's set up your rider profile in just a few steps</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((s, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                index + 1 <= step 
                  ? 'gradient-rider text-rider-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <s.icon className="h-5 w-5" />
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-1 mx-1 rounded ${
                  index + 1 < step ? 'bg-rider' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Progress value={progress} className="h-2 mb-8" />

        {/* Step Content */}
        <div className="min-h-[320px]">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 p-4 bg-rider/10 rounded-xl border border-rider/20">
                <User className="h-6 w-6 text-rider" />
                <div>
                  <p className="font-semibold">Personal Information</p>
                  <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.profileImage} />
                    <AvatarFallback className="bg-rider text-rider-foreground text-2xl">
                      {formData.fullName?.charAt(0) || 'R'}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+234 XXX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Saved Places */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 p-4 bg-rider/10 rounded-xl border border-rider/20">
                <MapPin className="h-6 w-6 text-rider" />
                <div>
                  <p className="font-semibold">Saved Places</p>
                  <p className="text-sm text-muted-foreground">Add your frequent locations (optional)</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeAddress" className="flex items-center gap-2">
                    <Home className="h-4 w-4" /> Home Address
                  </Label>
                  <Input
                    id="homeAddress"
                    placeholder="Enter your home address"
                    value={formData.homeAddress}
                    onChange={(e) => handleInputChange('homeAddress', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workAddress" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Work Address
                  </Label>
                  <Input
                    id="workAddress"
                    placeholder="Enter your work address"
                    value={formData.workAddress}
                    onChange={(e) => handleInputChange('workAddress', e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground">
                  💡 Tip: Adding saved places makes booking rides faster. You can always add or edit these later.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Payment & Emergency */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 p-4 bg-rider/10 rounded-xl border border-rider/20">
                <CreditCard className="h-6 w-6 text-rider" />
                <div>
                  <p className="font-semibold">Payment & Safety</p>
                  <p className="text-sm text-muted-foreground">Set up payment and emergency contact</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-3">
                  <Label>Preferred Payment Method</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['wallet', 'card', 'cash'].map((method) => (
                      <button
                        key={method}
                        onClick={() => handleInputChange('preferredPayment', method)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          formData.preferredPayment === method
                            ? 'border-rider bg-rider/5'
                            : 'border-border hover:border-rider/50'
                        }`}
                      >
                        <p className="font-medium capitalize">{method}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-3">Emergency Contact (Optional)</p>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Contact name"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    />
                    <Input
                      placeholder="Contact phone"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in text-center">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
                <p className="text-muted-foreground">
                  Your rider profile is complete. You can now book rides and enjoy seamless transportation.
                </p>
              </div>

              <div className="p-4 bg-muted rounded-xl text-left">
                <p className="font-medium mb-2">Have a referral code?</p>
                <Input
                  placeholder="Enter referral code (optional)"
                  value={formData.referralCode}
                  onChange={(e) => handleInputChange('referralCode', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-left p-4 bg-rider/5 rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <p className="font-medium capitalize">{formData.preferredPayment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-success">Ready to ride!</p>
                </div>
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
            className="min-w-[140px] gradient-rider text-rider-foreground"
          >
            {step === totalSteps ? (
              <>
                Start Riding
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
