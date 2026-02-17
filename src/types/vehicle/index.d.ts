interface VehicleTypeDTO {
  id: string;
  plateNumber: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  capacity: number;
  type: VehicleType;
  vehicleDocument: VehicleDocument[];
}

interface Vehicle {
  id: string;
  plateNumber: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  capacity: number;
  type: string;
}

interface VehicleDocument {
  documentType: string;
  documentUrl: string;
}

export type VehicleType = "SUV" | "BIKE" | "TRICYCLE" | "CAR";
