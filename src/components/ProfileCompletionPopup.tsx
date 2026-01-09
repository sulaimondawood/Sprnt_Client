import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, User, Car, FileText, CheckCircle2 } from 'lucide-react';

interface ProfileCompletionPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileCompletionPopup({ open, onOpenChange }: ProfileCompletionPopupProps) {
  const { user, riderProfile, driverProfile, updateRiderProfile, updateDriverProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    licenseNumber: '',
    nin: '',
    vehiclePlate: '',
    vehicleBrand: '',
    vehicleModel: '',
  });

  const isDriver = user?.role === 'DRIVER';
  const totalSteps = isDriver ? 3 : 2;
  const progress = (step / totalSteps) * 100;

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

  const handleComplete = () => {
    if (isDriver) {
      updateDriverProfile({
        fullName: formData.fullName,
        licenseNumber: formData.licenseNumber,
        nin: formData.nin,
        isProfileComplete: true,
      });
    } else {
      updateRiderProfile({
        fullName: formData.fullName,
        isProfileComplete: true,
      });
    }
    onOpenChange(false);
  };

  const canProceed = () => {
    if (step === 1) return formData.fullName.length > 2;
    if (step === 2 && isDriver) return formData.licenseNumber.length > 5 && formData.nin.length > 5;
    if (step === 2 && !isDriver) return true;
    if (step === 3) return formData.vehiclePlate.length > 3 && formData.vehicleBrand.length > 1;
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-warning mb-2">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Profile Incomplete</span>
          </div>
          <DialogTitle className="text-2xl">Complete Your Profile</DialogTitle>
          <DialogDescription>
            {isDriver 
              ? 'Complete your driver profile to start accepting rides and earning money.'
              : 'Complete your profile to book rides and enjoy a seamless experience.'}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mt-6 space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Personal Information</p>
                  <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+234 XXX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2 for Driver: License Info */}
          {step === 2 && isDriver && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Driver Documents</p>
                  <p className="text-sm text-muted-foreground">Verification documents</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Driver's License Number</Label>
                <Input 
                  id="licenseNumber" 
                  placeholder="Enter license number"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nin">NIN (National ID Number)</Label>
                <Input 
                  id="nin" 
                  placeholder="Enter your NIN"
                  value={formData.nin}
                  onChange={(e) => handleInputChange('nin', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2 for Rider: Preferences */}
          {step === 2 && !isDriver && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium">You're All Set!</p>
                  <p className="text-sm text-muted-foreground">Your profile is ready</p>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                Your basic profile is complete. You can now book rides and enjoy our service.
                You can always update your preferences later in settings.
              </p>
            </div>
          )}

          {/* Step 3 for Driver: Vehicle Info */}
          {step === 3 && isDriver && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Car className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Vehicle Information</p>
                  <p className="text-sm text-muted-foreground">Add your vehicle details</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehiclePlate">Plate Number</Label>
                <Input 
                  id="vehiclePlate" 
                  placeholder="e.g., LG-123-ABC"
                  value={formData.vehiclePlate}
                  onChange={(e) => handleInputChange('vehiclePlate', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleBrand">Brand</Label>
                  <Input 
                    id="vehicleBrand" 
                    placeholder="e.g., Toyota"
                    value={formData.vehicleBrand}
                    onChange={(e) => handleInputChange('vehicleBrand', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Model</Label>
                  <Input 
                    id="vehicleModel" 
                    placeholder="e.g., Camry"
                    value={formData.vehicleModel}
                    onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button 
            onClick={handleNext} 
            disabled={!canProceed()}
            className="min-w-[120px]"
          >
            {step === totalSteps ? 'Complete' : 'Continue'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}