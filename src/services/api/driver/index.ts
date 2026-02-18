import { Vehicle } from "@/types/vehicle";
import { api } from "../config";

// DTO Interfaces
export interface VehicleDocumentDTO {
  documentType: string;
  documentUrl: string;
}

export interface VehicleDTO {
  plateNumber: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  capacity: number;
  type: string;
  vehicleDocument: VehicleDocumentDTO[];
}

export interface DriverRegistrationType {
  profileImage: string;
  licenseNumber: string;
  licenseExpiry: string; // Used as string for the input/JSON, parsed as LocalDate in Java
  nin: string;
  vehicle: VehicleDTO;
}

interface TripParams {
  status?: string;
  keyword?: string;
  from?: string;
  to?: string;
}

export const DriverAPI = {
  async completeProfile(payload: DriverRegistrationType) {
    const res = await api.post("/driver/onboard", payload);
    return res.data;
  },

  async recentRides() {
    const res = await api.get("/driver/rides/recent");
    return res.data.data;
  },

  async allRides(params: TripParams) {
    const res = await api.get("/driver/rides", {
      params,
    });
    return res.data.data;
  },

  async ridesOverview() {
    const res = await api.get("/driver/rides/overview");
    return res.data.data;
  },

  async currentRide() {
    const res = await api.get("/driver/rides/current");
    return res.data.data;
  },

  async vehicles() {
    const res = await api.get("/driver/vehicles");
    return res.data.data;
  },

  async vehicle() {
    const res = await api.get("/driver/vehicle");
    return res.data.data;
  },

  async editVehicle(payload: Vehicle, id: string) {
    const res = await api.patch("/driver/vehicle/" + id, payload);
    return res.data?.data;
  },

  async ratings() {
    const res = await api.get("/ratings/driver");
    return res.data.data;
  },

  async uploadProfileImage(payload: Record<string, string>) {
    const res = await api.patch("/driver/me/profile-image", payload);
    return res.data.data;
  },

  async updateProfileData(payload: Record<string, string>) {
    const res = await api.patch("/driver/me", payload);
    return res.data.data;
  },

  async heartBeat() {
    const res = await api.get("/driver/me/heartbeat");
    return res.data.data;
  },

  async toggleAvailabilityStatus() {
    const res = await api.patch("/driver/me/availibilty-status");
    return res.data.message;
  },
};
