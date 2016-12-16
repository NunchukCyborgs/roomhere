import { Property } from './property';

export class PaymentRequest {
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

  constructor(paymentRequest?: PaymentRequest) {
     if (paymentRequest) {
      for (let propertyName in paymentRequest) {
        if (paymentRequest.hasOwnProperty(propertyName)) {
          this[propertyName] = paymentRequest[propertyName];
        }
      }
    }
  }
}

export class PaymentRequestBlob {
  errors: string[];
  payment_request: PaymentRequest;

  constructor(paymentRequestBlob?: PaymentRequestBlob) {
     if (paymentRequestBlob) {
      for (let propertyName in paymentRequestBlob) {
        if (paymentRequestBlob.hasOwnProperty(propertyName)) {
          this[propertyName] = paymentRequestBlob[propertyName];
        }
      }

      if (paymentRequestBlob.payment_request) {
        this.payment_request = new PaymentRequest(paymentRequestBlob.payment_request)
      }
    }
  }
}
