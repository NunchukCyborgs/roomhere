import { Property } from './property';

export interface PaymentRequest {
  name: string;
  due_on: number;
  subtotal: number;
  unit: string;
  property_slug: string;
  property_id: number;
  created_at?: string;
  completed_at?: string;
  rejected_at?: string;
  payment_created_at?: string;
  total?: number;
  token?: string;

  property?: Property; // Inferred
}