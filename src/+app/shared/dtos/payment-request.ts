import { Property } from './property';

export interface PaymentRequest {
  name: string;
  due_on: number;
  subtotal: number;
  unit: string;
  property_slug: string;
  created_at?: string;
  completed_at?: string;
  total?: number;
  token?: string;

  property?: Property; // Inferred
}