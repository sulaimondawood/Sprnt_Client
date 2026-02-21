import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Car,
  User,
  X,
  CheckCircle,
  XCircle,
  Loader2,
  MapPin,
  Phone,
  Star,
  Navigation,
} from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

// === RIDER-SIDE MODALS ===

interface SearchingDriverModalProps {
  open: boolean;
  onCancel: () => void;
}

export const SearchingDriverModal = ({
  open,
  onCancel,
}: SearchingDriverModalProps) => (
  <Dialog open={open}>
    <DialogContent
      className="sm:max-w-md"
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center py-6 gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <Car className="absolute inset-0 m-auto h-8 w-8 text-primary" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Finding Your Driver</DialogTitle>
          <DialogDescription>
            Searching for available drivers near your pickup location...
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <Button variant="outline" onClick={onCancel} className="mt-4">
          <X className="h-4 w-4 mr-2" />
          Cancel Search
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

interface DriverResponseModalProps {
  open: boolean;
  type: "accepted" | "rejected" | "cancelled";
  driver?: {
    name: string;
    rating: number;
    vehicle: string;
    plate: string;
    phone: string;
    trips: number;
  };
  onConfirm?: () => void;
  onClose: () => void;
}

export const DriverResponseModal = ({
  open,
  type,
  driver,
  onConfirm,
  onClose,
}: DriverResponseModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md">
      {type === "accepted" && driver && (
        <>
          <div className="flex flex-col items-center py-4 gap-3">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl">Driver Found!</DialogTitle>
              <DialogDescription>
                A driver has accepted your ride request
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">{driver.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                  <span>{driver.rating}</span>
                  <span>•</span>
                  <span>{driver.trips} trips</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Vehicle</p>
                <p className="font-medium text-sm">{driver.vehicle}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Plate</p>
                <p className="font-bold text-sm">{driver.plate}</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button className="w-full" onClick={onConfirm}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Ride
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Decline
            </Button>
          </DialogFooter>
        </>
      )}

      {type === "cancelled" && (
        <div className="flex flex-col items-center py-6 gap-4">
          <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
            <X className="h-10 w-10 text-warning" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl">Ride Cancelled</DialogTitle>
            <DialogDescription>
              The driver has cancelled the trip. You can book a new ride.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onClose} className="mt-2">
            Book New Ride
          </Button>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

// === DRIVER-SIDE MODALS ===

interface RideRequestModalProps {
  open: boolean;
  rider?: {
    name: string;
    rating: number;
    pickup: string;
    dropoff: string;
  };
  onAccept: () => void;
  onReject: () => void;
  timeLeft?: string;
  isAccepting: boolean;
  isRejecting: boolean;
  isProceeding: boolean;
  hasProceeded: boolean;
  hasAccepted: boolean;
  onProceed: () => void;
}

export const RideRequestModal = ({
  open,
  rider,
  onAccept,
  onReject,
  timeLeft,
  isAccepting,
  isRejecting,
  isProceeding,
  hasAccepted,
  onProceed,
  hasProceeded,
}: RideRequestModalProps) => (
  <Dialog open={open}>
    <DialogContent
      className="sm:max-w-md"
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center py-2 gap-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <Car className="h-7 w-7 text-primary" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">New Ride Request!</DialogTitle>
          <DialogDescription>A rider is requesting a ride</DialogDescription>
        </DialogHeader>
      </div>

      {rider && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <User className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="font-semibold">{rider.name}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                <span>{rider.rating}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-success mt-1" />
              <div>
                <p className="text-xs text-muted-foreground">Pickup</p>
                <p className="text-sm font-medium">{rider.pickup}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-destructive mt-1" />
              <div>
                <p className="text-xs text-muted-foreground">Drop-off</p>
                <p className="text-sm font-medium">{rider.dropoff}</p>
              </div>
            </div>
          </div>

          {timeLeft && (
            <div className="text-center">
              <span className="text-sm text-muted-foreground">Expires in </span>
              <span className="font-bold text-primary">{timeLeft}s</span>
            </div>
          )}
        </div>
      )}

      <DialogFooter className="flex flex-col gap-2 mt-4">
        {!hasAccepted ? (
          <>
            <Button
              className="w-full"
              onClick={onAccept}
              disabled={isAccepting}
            >
              {isAccepting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <p>Accept Ride</p>
                </div>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full text-destructive"
              disabled={isRejecting}
              onClick={onReject}
            >
              {isRejecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 mr-2" />
                  <p>Decline</p>
                </div>
              )}
            </Button>
          </>
        ) : (
          <Button
            className="w-full gradient-success"
            onClick={onProceed}
            disabled={isProceeding || hasProceeded}
          >
            {isProceeding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 mr-2" />
                <p>Proceed to Location</p>
              </div>
            )}
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

interface RiderCancelledModalProps {
  open: boolean;
  riderName?: string;
  onClose: () => void;
}

export const RiderCancelledModal = ({
  open,
  riderName,
  onClose,
}: RiderCancelledModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-sm">
      <div className="flex flex-col items-center py-6 gap-4">
        <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
          <X className="h-10 w-10 text-warning" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Ride Cancelled</DialogTitle>
          <DialogDescription>
            {riderName || "The rider"} has cancelled the ride request.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onClose}>Got it</Button>
      </div>
    </DialogContent>
  </Dialog>
);

// === NO DRIVER FOUND MODAL ===

interface NoDriverFoundModalProps {
  open: boolean;
  onRetry?: () => void;
  onClose: () => void;
}

export const NoDriverFoundModal = ({
  open,
  onRetry,
  onClose,
}: NoDriverFoundModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md">
      <div className="flex flex-col items-center py-6 gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Car className="h-10 w-10 text-muted-foreground" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">No Drivers Available</DialogTitle>
          <DialogDescription>
            We couldn't find any drivers near your pickup location right now.
            Please try again in a moment.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full">
          {onRetry && (
            <Button className="w-full" onClick={onRetry}>
              <Loader2 className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button variant="outline" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export const ProceedToRiderDriverModal = ({
  open,
  onArrived,
  isArriving,
}: {
  open: boolean;
  isArriving: boolean;
  onArrived: () => void;
}) => (
  <Dialog open={open}>
    <DialogContent
      className="sm:max-w-md"
      onPointerDownOutside={(e) => e.preventDefault()}
      hideClose
    >
      <div className="flex flex-col items-center py-6 gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/10 animate-pulse flex items-center justify-center">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">
            Proceed to Rider's location
          </DialogTitle>
          <DialogDescription>
            Navigate to the pickup point. Once you arrive, click the button
            below to notify the rider.
          </DialogDescription>
        </DialogHeader>

        <Button
          className="w-full mt-4 gradient-driver"
          onClick={onArrived}
          disabled={isArriving}
        >
          {isArriving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <p>I Have Arrived</p>
            </div>
          )}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export const DriverArrivedModal = ({
  open,
  onClose,
  driverName,
  carDetails,
}: {
  open: boolean;
  onClose: () => void;
  driverName?: string;
  carDetails?: string;
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md text-center">
      <div className="flex flex-col items-center py-6 gap-4">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center animate-bounce">
          <Car className="h-10 w-10 text-success" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-success">
            Driver is Here!
          </DialogTitle>
          <DialogDescription className="text-base">
            {driverName || "Your driver"} has arrived in a
          </DialogDescription>
        </DialogHeader>
      </div>
    </DialogContent>
  </Dialog>
);

interface RideCompletedModalProps {
  open: boolean;
  trip?: {
    driverName: string;
    pickup: string;
    dropoff: string;
    distance: number;
    duration: number;
    fare: number;
  };
  onRateDriver: () => void;
  onClose: () => void;
}

export const RideCompletedModal = ({
  open,
  trip,
  onRateDriver,
  onClose,
}: RideCompletedModalProps) => {
  useEffect(() => {
    if (open) {
      const duration = 2000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center py-6 gap-4">
          {/* Animated check icon */}
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>

          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">
              Ride Complete! 🎉
            </DialogTitle>
            <DialogDescription className="text-base">
              You've arrived safely at your destination.
            </DialogDescription>
          </DialogHeader>

          {trip && (
            <div className="w-full space-y-3 mt-2">
              {/* Fare highlight */}
              <div className="text-center py-4 bg-primary/5 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Total Fare
                </p>
                <p className="text-3xl font-bold text-primary mt-1">
                  ₦{trip.fare}
                </p>
              </div>

              {/* Compact stats */}
              <div className="flex justify-center gap-6 text-center text-sm">
                <div>
                  <p className="font-semibold">{trip.distance}km</p>
                  <p className="text-xs text-muted-foreground">Distance</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="font-semibold">{trip.duration}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div className="w-px bg-border" />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button className="w-full" onClick={onRateDriver}>
            <Star className="h-4 w-4 mr-2" />
            Rate Your Driver
          </Button>
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface RateModalProps {
  open: boolean;
  driverOrRiderName?: string;
  onSubmit: (rating: number, feedback: string) => void;
  onClose: () => void;
}

export const RateModal = ({
  open,
  driverOrRiderName,
  onSubmit,
  onClose,
}: RateModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState("");

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center pt-4 pb-2 gap-3">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
            <User className="h-8 w-8 text-accent-foreground" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl">
              Rate {driverOrRiderName}
            </DialogTitle>
            <DialogDescription>How was your experience?</DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5">
          {/* Star Rating */}
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-transform hover:scale-125 focus:outline-none"
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-10 w-10 transition-colors ${
                      star <= (hoveredStar || rating)
                        ? "text-warning fill-warning"
                        : "text-muted-foreground/20"
                    }`}
                  />
                </button>
              ))}
            </div>
            {(hoveredStar || rating) > 0 && (
              <p className="text-sm font-medium text-muted-foreground">
                {ratingLabels[hoveredStar || rating]}
              </p>
            )}
          </div>

          {/* Feedback & Tip */}
          {rating > 0 && (
            <>
              <textarea
                className="w-full p-3 text-sm rounded-lg border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                maxLength={500}
                placeholder="Tell us about your ride experience (optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </>
          )}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            className="w-full"
            disabled={rating === 0}
            onClick={() => onSubmit(rating, feedback.trim())}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Submit
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Skip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
