export interface Expense {
  name: string | null;
  date: string | null;
  mileage_performed: number;
  cost: number;
  is_outdated: boolean;
}