// User roles and status types
export type UserRole = string;
export type UserStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
export type DriverStatus = "ONLINE" | "OFFLINE" | "BUSY" | "BANNED";
export type VehicleStatus = "ACTIVE" | "INACTIVE" | "PENDING_APPROVAL";
export type VehicleType = "Sedan" | "SUV" | "Bike" | "Tricycle" | "Luxury";
export type DocumentType = "INSURANCE" | "ROAD_WORTHINESS" | "REGISTRATION";
export type DocumentStatus = "PENDING" | "APPROVED" | "REJECTED";
export type TripStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "ARRIVING"
  | "STARTED"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";
export type TransactionType = "CREDIT" | "DEBIT";
export type TransactionReason =
  | "TRIP_PAYMENT"
  | "BONUS"
  | "WITHDRAWAL"
  | "TOP_UP";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

// User Account
export interface UserAccount {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  preferredLanguage?: string;
  preferredCurrency?: string;
}

// Rider Profile
export interface RiderProfile {
  id: string;
  userId: string;
  fullName: string;
  profileImage?: string;
  defaultPickupLocation?: Location;
  rating: number;
  totalRides: number;
  paymentMethodIds?: string[];
  referralCode?: string;
  isProfileComplete: boolean;
}

// Driver Profile
export interface DriverProfile {
  id: string;
  userId: string;
  fullName: string;
  profileImage?: string;
  licenseNumber: string;
  licenseExpiry: Date;
  nin: string;
  rating: number;
  status: DriverStatus;
  totalCompletedTrips: number;
  isProfileComplete: boolean;
}

// Vehicle
export interface Vehicle {
  id: string;
  driverId: string;
  plateNumber: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  capacity: number;
  status: VehicleStatus;
  vehicleType: VehicleType;
}

// Vehicle Document
export interface VehicleDocument {
  id: string;
  vehicleId: string;
  documentType: DocumentType;
  documentUrl: string;
  issuedAt: Date;
  expiresAt: Date;
  status: DocumentStatus;
}

// Location
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

// Driver Location
export interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
  lastUpdated: Date;
  isAvailable: boolean;
  heading: number;
  speed: number;
}

// Trip
export interface Trip {
  id: string;
  riderId: string;
  driverId?: string;
  vehicleId?: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  distanceMeters: number;
  estimatedFare: number;
  finalFare?: number;
  status: TripStatus;
  paymentStatus: PaymentStatus;
  requestedAt: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  driverName?: string;
  riderName?: string;
  vehicleInfo?: string;
}

// Payment Transaction
export interface PaymentTransaction {
  id: string;
  tripId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentProvider: string;
  providerReference: string;
  status: PaymentStatus;
  createdAt: Date;
  processedAt?: Date;
}

// Wallet
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  updatedAt: Date;
}

// Wallet Transaction
export interface WalletTransaction {
  id: string;
  walletId: string;
  amount: number;
  type: TransactionType;
  reason: TransactionReason;
  previousBalance: number;
  newBalance: number;
  createdAt: Date;
  description?: string;
}

// Fare Config
export interface FareConfig {
  id: string;
  vehicleType: VehicleType;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  surgeMultiplier: number;
  city: string;
  active: boolean;
}

// Support Ticket
export interface SupportTicket {
  id: string;
  userId: string;
  tripId?: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalTrips: number;
  totalEarnings: number;
  rating: number;
  completionRate: number;
  todayTrips: number;
  todayEarnings: number;
  weeklyTrips: number;
  weeklyEarnings: number;
}

export interface Meta {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  pageSize: number;
  totalPages: number;
}
