export interface PaymentRequest {
  name: string;
  property_id: number;
  due_on: number;
  subtotal: number;
  unit: string;
}