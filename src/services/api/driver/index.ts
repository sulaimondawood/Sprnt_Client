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

export const DriverAPI = {
  async completeProfile(payload: DriverRegistrationType) {
    const res = await api.post("/driver/onboard", payload);
    return res.data;
  },
};
