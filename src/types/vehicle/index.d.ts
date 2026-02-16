interface VehicleType {
  plateNumber: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  capacity: number;
  type: string;
  vehicleDocument: VehicleDocument[];
}

interface VehicleDocument {
  documentType: string;
  documentUrl: string;
}
