// import type { Service } from './Service';
export interface Vehicle {
  make: string | null;
  model: string | null;
  year: string | null;
  vin: string | null;
  mileage: number;
  // services: Service[];
}