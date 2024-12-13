export interface Service {
  vin: string;
  name: string | null;
  serviceType: 'SERVICE' | 'EXPENSE';
  date_performed: string | null;
  mileage_performed: number;
  cost: number;
  description: string;
  is_outdated: boolean;
}