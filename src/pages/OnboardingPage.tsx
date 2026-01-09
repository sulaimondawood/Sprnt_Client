import { useAuth } from '@/contexts/AuthContext';
import { RiderOnboarding } from '@/components/onboarding/RiderOnboarding';
import { DriverOnboarding } from '@/components/onboarding/DriverOnboarding';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/dashboard');
  };

  if (user?.role === 'DRIVER') {
    return <DriverOnboarding onComplete={handleComplete} />;
  }

  return <RiderOnboarding onComplete={handleComplete} />;
};

export default OnboardingPage;
