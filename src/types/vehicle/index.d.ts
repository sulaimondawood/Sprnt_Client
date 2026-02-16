interface VehicleTypeDTO {
  plateNumber: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  capacity: number;
  type: VehicleType;
  vehicleDocument: VehicleDocument[];
}

interface VehicleDocument {
  documentType: string;
  documentUrl: string;
}

export type VehicleType = "SUV" | "BIKE" | "TRICYCLE" | "CAR";
