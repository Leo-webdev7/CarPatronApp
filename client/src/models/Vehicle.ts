// import type { Expense } from './Expense';
import type { Service } from './Service';
export interface Vehicle {
  make: string | null;
  car_model: string;
  year: string | null;
  vin: string | null;
  mileage: number;
  services: Service[];
  // expenses: Expense[];
}