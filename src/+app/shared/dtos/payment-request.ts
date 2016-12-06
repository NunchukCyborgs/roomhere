export interface PaymentRequest {
  name: string;
  property_id: number;
  due_on: string;
  subtotal: number;
  unit: string;
}