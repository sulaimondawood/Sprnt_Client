import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  type?: 'trip' | 'payment' | 'driver' | 'document' | 'ticket';
  className?: string;
}

export function StatusBadge({ status, type = 'trip', className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    const statusLower = status.toLowerCase();
    
    // Trip statuses
    if (type === 'trip') {
      switch (status) {
        case 'COMPLETED':
          return 'bg-success/10 text-success border-success/20';
        case 'STARTED':
        case 'ARRIVING':
          return 'bg-info/10 text-info border-info/20';
        case 'ACCEPTED':
        case 'REQUESTED':
          return 'bg-warning/10 text-warning border-warning/20';
        case 'CANCELLED':
          return 'bg-destructive/10 text-destructive border-destructive/20';
        default:
          return 'bg-muted text-muted-foreground';
      }
    }
    
    // Payment statuses
    if (type === 'payment') {
      switch (status) {
        case 'PAID':
        case 'SUCCESS':
          return 'bg-success/10 text-success border-success/20';
        case 'PENDING':
          return 'bg-warning/10 text-warning border-warning/20';
        case 'FAILED':
          return 'bg-destructive/10 text-destructive border-destructive/20';
        default:
          return 'bg-muted text-muted-foreground';
      }
    }
    
    // Driver statuses
    if (type === 'driver') {
      switch (status) {
        case 'ONLINE':
          return 'bg-success/10 text-success border-success/20';
        case 'OFFLINE':
          return 'bg-muted text-muted-foreground';
        case 'BUSY':
          return 'bg-warning/10 text-warning border-warning/20';
        case 'BANNED':
          return 'bg-destructive/10 text-destructive border-destructive/20';
        default:
          return 'bg-muted text-muted-foreground';
      }
    }
    
    // Document statuses
    if (type === 'document') {
      switch (status) {
        case 'APPROVED':
          return 'bg-success/10 text-success border-success/20';
        case 'PENDING':
          return 'bg-warning/10 text-warning border-warning/20';
        case 'REJECTED':
          return 'bg-destructive/10 text-destructive border-destructive/20';
        default:
          return 'bg-muted text-muted-foreground';
      }
    }
    
    // Ticket statuses
    if (type === 'ticket') {
      switch (status) {
        case 'RESOLVED':
          return 'bg-success/10 text-success border-success/20';
        case 'IN_PROGRESS':
          return 'bg-info/10 text-info border-info/20';
        case 'OPEN':
          return 'bg-warning/10 text-warning border-warning/20';
        default:
          return 'bg-muted text-muted-foreground';
      }
    }
    
    return 'bg-muted text-muted-foreground';
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium border',
        getStatusStyles(),
        className
      )}
    >
      {formatStatus(status)}
    </Badge>
  );
}