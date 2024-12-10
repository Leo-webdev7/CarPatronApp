import type { Vehicle } from './Vehicle';
export interface User {
  username: string | null;
  email: string | null;
  phonenumber: string | null;
  password: string | null;
  vehicles: Vehicle[];
}