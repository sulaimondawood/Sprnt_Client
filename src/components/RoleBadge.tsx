import { Badge } from '@/components/ui/badge';
import { Car, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function RoleBadge({ role, size = 'md', showIcon = true, className }: RoleBadgeProps) {
  const isDriver = role === 'DRIVER';
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <Badge
      className={cn(
        'font-medium gap-1.5',
        sizeClasses[size],
        isDriver 
          ? 'bg-driver text-driver-foreground hover:bg-driver/90' 
          : 'bg-rider text-rider-foreground hover:bg-rider/90',
        className
      )}
    >
      {showIcon && (
        isDriver 
          ? <Car className={iconSizes[size]} /> 
          : <User className={iconSizes[size]} />
      )}
      {isDriver ? 'Driver' : 'Rider'}
    </Badge>
  );
}