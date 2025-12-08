import type {
  DashboardStats,
  DriverProfile,
  RiderProfile,
  SupportTicket,
  Trip,
  UserAccount,
  Vehicle,
  VehicleDocument,
  Wallet,
  WalletTransaction,
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

// Mock Vehicle
export const mockVehicle: Vehicle = {
  id: "v-001",
  driverId: "driver-001",
  plateNumber: "LG-123-ABC",
  brand: "Toyota",
  model: "Camry",
  year: 2022,
  color: "Black",
  capacity: 4,
  status: "ACTIVE",
  vehicleType: "Sedan",
};

// Mock Vehicle Documents
export const mockVehicleDocuments: VehicleDocument[] = [
  {
    id: "vd-001",
    vehicleId: "v-001",
    documentType: "INSURANCE",
    documentUrl: "/documents/insurance.pdf",
    issuedAt: new Date("2024-01-01"),
    expiresAt: new Date("2025-01-01"),
    status: "APPROVED",
  },
  {
    id: "vd-002",
    vehicleId: "v-001",
    documentType: "ROAD_WORTHINESS",
    documentUrl: "/documents/roadworthy.pdf",
    issuedAt: new Date("2024-03-15"),
    expiresAt: new Date("2025-03-15"),
    status: "APPROVED",
  },
  {
    id: "vd-003",
    vehicleId: "v-001",
    documentType: "REGISTRATION",
    documentUrl: "/documents/registration.pdf",
    issuedAt: new Date("2024-02-01"),
    expiresAt: new Date("2026-02-01"),
    status: "PENDING",
  },
];

// Mock Trips for Rider
export const mockRiderTrips: Trip[] = [
  {
    id: "trip-001",
    riderId: "rider-001",
    driverId: "driver-001",
    vehicleId: "v-001",
    pickupLocation: {
      latitude: 6.5244,
      longitude: 3.3792,
      address: "123 Victoria Island, Lagos",
    },
    dropoffLocation: {
      latitude: 6.4541,
      longitude: 3.3947,
      address: "45 Lekki Phase 1, Lagos",
    },
    distanceMeters: 12500,
    estimatedFare: 4500,
    finalFare: 4500,
    status: "COMPLETED",
    paymentStatus: "PAID",
    requestedAt: new Date("2024-12-07T09:30:00"),
    acceptedAt: new Date("2024-12-07T09:32:00"),
    startedAt: new Date("2024-12-07T09:40:00"),
    completedAt: new Date("2024-12-07T10:05:00"),
    driverName: "Emmanuel Okonkwo",
    vehicleInfo: "Toyota Camry • Black • LG-123-ABC",
  },
  {
    id: "trip-002",
    riderId: "rider-001",
    driverId: "driver-002",
    vehicleId: "v-002",
    pickupLocation: {
      latitude: 6.4541,
      longitude: 3.3947,
      address: "45 Lekki Phase 1, Lagos",
    },
    dropoffLocation: {
      latitude: 6.5095,
      longitude: 3.3711,
      address: "Palms Shopping Mall, Lekki",
    },
    distanceMeters: 8200,
    estimatedFare: 3200,
    finalFare: 3500,
    status: "COMPLETED",
    paymentStatus: "PAID",
    requestedAt: new Date("2024-12-06T14:00:00"),
    acceptedAt: new Date("2024-12-06T14:03:00"),
    startedAt: new Date("2024-12-06T14:10:00"),
    completedAt: new Date("2024-12-06T14:35:00"),
    driverName: "Chinedu Obi",
    vehicleInfo: "Honda Accord • Silver • LG-456-DEF",
  },
  {
    id: "trip-003",
    riderId: "rider-001",
    status: "CANCELLED",
    pickupLocation: {
      latitude: 6.5244,
      longitude: 3.3792,
      address: "123 Victoria Island, Lagos",
    },
    dropoffLocation: {
      latitude: 6.4281,
      longitude: 3.4219,
      address: "Ajah, Lagos",
    },
    distanceMeters: 18000,
    estimatedFare: 6500,
    paymentStatus: "PENDING",
    requestedAt: new Date("2024-12-05T18:30:00"),
    cancelledAt: new Date("2024-12-05T18:35:00"),
  },
];

// Mock Trips for Driver
export const mockDriverTrips: Trip[] = [
  {
    id: "trip-d-001",
    riderId: "rider-001",
    driverId: "driver-001",
    vehicleId: "v-001",
    pickupLocation: {
      latitude: 6.5244,
      longitude: 3.3792,
      address: "123 Victoria Island, Lagos",
    },
    dropoffLocation: {
      latitude: 6.4541,
      longitude: 3.3947,
      address: "45 Lekki Phase 1, Lagos",
    },
    distanceMeters: 12500,
    estimatedFare: 4500,
    finalFare: 4500,
    status: "COMPLETED",
    paymentStatus: "PAID",
    requestedAt: new Date("2024-12-08T09:30:00"),
    acceptedAt: new Date("2024-12-08T09:32:00"),
    startedAt: new Date("2024-12-08T09:40:00"),
    completedAt: new Date("2024-12-08T10:05:00"),
    riderName: "John Adeyemi",
  },
  {
    id: "trip-d-002",
    riderId: "rider-002",
    driverId: "driver-001",
    vehicleId: "v-001",
    pickupLocation: {
      latitude: 6.4281,
      longitude: 3.4219,
      address: "Ajah, Lagos",
    },
    dropoffLocation: {
      latitude: 6.5095,
      longitude: 3.3711,
      address: "Palms Shopping Mall, Lekki",
    },
    distanceMeters: 15300,
    estimatedFare: 5200,
    finalFare: 5200,
    status: "COMPLETED",
    paymentStatus: "PAID",
    requestedAt: new Date("2024-12-08T11:00:00"),
    acceptedAt: new Date("2024-12-08T11:02:00"),
    startedAt: new Date("2024-12-08T11:15:00"),
    completedAt: new Date("2024-12-08T11:50:00"),
    riderName: "Amaka Eze",
  },
  {
    id: "trip-d-003",
    riderId: "rider-003",
    driverId: "driver-001",
    vehicleId: "v-001",
    pickupLocation: {
      latitude: 6.5095,
      longitude: 3.3711,
      address: "Palms Shopping Mall, Lekki",
    },
    dropoffLocation: {
      latitude: 6.5244,
      longitude: 3.3792,
      address: "123 Victoria Island, Lagos",
    },
    distanceMeters: 9800,
    estimatedFare: 3800,
    status: "STARTED",
    paymentStatus: "PENDING",
    requestedAt: new Date("2024-12-08T14:00:00"),
    acceptedAt: new Date("2024-12-08T14:02:00"),
    startedAt: new Date("2024-12-08T14:10:00"),
    riderName: "Bola Tinubu",
  },
];

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

// Mock Dashboard Stats for Rider
export const mockRiderStats: DashboardStats = {
  totalTrips: 127,
  totalEarnings: 0,
  rating: 4.8,
  completionRate: 95,
  todayTrips: 2,
  todayEarnings: 0,
  weeklyTrips: 12,
  weeklyEarnings: 0,
};

// Mock Dashboard Stats for Driver
export const mockDriverStats: DashboardStats = {
  totalTrips: 1542,
  totalEarnings: 2850000,
  rating: 4.9,
  completionRate: 98,
  todayTrips: 8,
  todayEarnings: 32500,
  weeklyTrips: 45,
  weeklyEarnings: 187500,
};
