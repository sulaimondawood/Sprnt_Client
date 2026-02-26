import {
  UserAccount,
  RiderProfile,
  DriverProfile,
  Vehicle,
  VehicleDocument,
  Trip,
  Wallet,
  WalletTransaction,
  SupportTicket,
  DashboardStats,
} from "@/types";

// Mock User Accounts
export const mockRiderUser: UserAccount = {
  id: "rider-001",
  email: "rider@example.com",
  phone: "+234 801 234 5678",
  role: "RIDER",
  status: "ACTIVE",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-12-01"),
  lastLoginAt: new Date(),
  preferredLanguage: "en",
  preferredCurrency: "NGN",
};

export const mockDriverUser: UserAccount = {
  id: "driver-001",
  email: "driver@example.com",
  phone: "+234 802 345 6789",
  role: "DRIVER",
  status: "ACTIVE",
  createdAt: new Date("2024-02-20"),
  updatedAt: new Date("2024-12-01"),
  lastLoginAt: new Date(),
  preferredLanguage: "en",
  preferredCurrency: "NGN",
};

// Mock Rider Profile
export const mockRiderProfile: RiderProfile = {
  id: "rp-001",
  userId: "rider-001",
  fullName: "John Adeyemi",
  profileImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  defaultPickupLocation: {
    latitude: 6.5244,
    longitude: 3.3792,
    address: "123 Victoria Island, Lagos",
  },
  rating: 4.8,
  totalRides: 127,
  referralCode: "JOHN2024",
  isProfileComplete: true,
};

// Mock incomplete rider profile
export const mockIncompleteRiderProfile: RiderProfile = {
  id: "rp-002",
  userId: "rider-002",
  fullName: "",
  rating: 0,
  totalRides: 0,
  isProfileComplete: false,
};

// Mock Driver Profile
export const mockDriverProfile: DriverProfile = {
  id: "dp-001",
  userId: "driver-001",
  fullName: "Emmanuel Okonkwo",
  profileImage:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  licenseNumber: "LG-DL-2024-123456",
  licenseExpiry: new Date("2026-05-15"),
  nin: "12345678901",
  rating: 4.9,
  status: "ONLINE",
  totalCompletedTrips: 1542,
  isProfileComplete: true,
};

// Mock incomplete driver profile
export const mockIncompleteDriverProfile: DriverProfile = {
  id: "dp-002",
  userId: "driver-002",
  fullName: "New Driver",
  profileImage: undefined,
  licenseNumber: "",
  licenseExpiry: new Date(),
  nin: "",
  rating: 0,
  status: "OFFLINE",
  totalCompletedTrips: 0,
  isProfileComplete: false,
};

// Mock Wallet for Rider
export const mockRiderWallet: Wallet = {
  id: "w-rider-001",
  userId: "rider-001",
  balance: 25000,
  currency: "NGN",
  updatedAt: new Date(),
};

// Mock Wallet for Driver
export const mockDriverWallet: Wallet = {
  id: "w-driver-001",
  userId: "driver-001",
  balance: 156750,
  currency: "NGN",
  updatedAt: new Date(),
};

// Mock Wallet Transactions
export const mockWalletTransactions: WalletTransaction[] = [
  {
    id: "wt-001",
    walletId: "w-driver-001",
    amount: 4500,
    type: "CREDIT",
    reason: "TRIP_PAYMENT",
    previousBalance: 152250,
    newBalance: 156750,
    createdAt: new Date("2024-12-08T10:05:00"),
    description: "Trip #trip-d-001 payment",
  },
  {
    id: "wt-002",
    walletId: "w-driver-001",
    amount: 5200,
    type: "CREDIT",
    reason: "TRIP_PAYMENT",
    previousBalance: 147050,
    newBalance: 152250,
    createdAt: new Date("2024-12-08T11:50:00"),
    description: "Trip #trip-d-002 payment",
  },
  {
    id: "wt-003",
    walletId: "w-driver-001",
    amount: 50000,
    type: "DEBIT",
    reason: "WITHDRAWAL",
    previousBalance: 197050,
    newBalance: 147050,
    createdAt: new Date("2024-12-07T16:00:00"),
    description: "Withdrawal to bank account",
  },
  {
    id: "wt-004",
    walletId: "w-driver-001",
    amount: 5000,
    type: "CREDIT",
    reason: "BONUS",
    previousBalance: 192050,
    newBalance: 197050,
    createdAt: new Date("2024-12-07T12:00:00"),
    description: "Weekly performance bonus",
  },
];

// Mock Support Tickets
export const mockSupportTickets: SupportTicket[] = [
  {
    id: "st-001",
    userId: "rider-001",
    tripId: "trip-002",
    title: "Driver took a longer route",
    description:
      "The driver took a longer route than necessary which increased my fare.",
    status: "IN_PROGRESS",
    createdAt: new Date("2024-12-06T15:00:00"),
    updatedAt: new Date("2024-12-07T10:00:00"),
  },
  {
    id: "st-002",
    userId: "rider-001",
    title: "Unable to add payment method",
    description:
      "I am trying to add my debit card but the app keeps showing an error.",
    status: "RESOLVED",
    createdAt: new Date("2024-12-01T09:00:00"),
    updatedAt: new Date("2024-12-02T14:00:00"),
  },
];
