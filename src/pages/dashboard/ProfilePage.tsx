import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RoleBadge } from '@/components/RoleBadge';
import { Camera, Mail, Phone, MapPin, Star } from 'lucide-react';

const ProfilePage = () => {
  const { user, riderProfile, driverProfile } = useAuth();
  const isDriver = user?.role === 'DRIVER';
  const profile = isDriver ? driverProfile : riderProfile;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <RoleBadge role={user?.role || 'RIDER'} />
        </div>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.profileImage} />
              <AvatarFallback className={`text-2xl ${isDriver ? 'bg-driver text-driver-foreground' : 'bg-rider text-rider-foreground'}`}>
                {profile?.fullName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile?.fullName}</h2>
            <div className="flex items-center gap-1 justify-center sm:justify-start text-muted-foreground">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <span>{profile?.rating} rating</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={profile?.fullName} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={user?.phone} />
          </div>
          {isDriver && driverProfile && (
            <>
              <div className="space-y-2">
                <Label>License Number</Label>
                <Input defaultValue={driverProfile.licenseNumber} />
              </div>
              <div className="space-y-2">
                <Label>NIN</Label>
                <Input defaultValue={driverProfile.nin} />
              </div>
            </>
          )}
        </div>
        
        <Button className="mt-6">Save Changes</Button>
      </Card>
    </div>
  );
};

export default ProfilePage;