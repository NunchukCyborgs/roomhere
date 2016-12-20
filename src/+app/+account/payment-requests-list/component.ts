import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentService } from '../../shared/services/payment.service';
import { PaymentRequest, PaymentRequestBlob } from '../../shared/dtos/payment-request';

@Component({
  selector: 'payment-requests-list',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class PaymentRequestsList {
  @Input() paymentRequests: PaymentRequest[];
  @Output() updatePaymentRequest: EventEmitter<any> = new EventEmitter();
  @Output() deletePaymentRequest: EventEmitter<any> = new EventEmitter();

  public editingPayment: PaymentRequest;

  public updatePayment(paymentRequest: PaymentRequest): void {
    this.updatePaymentRequest.emit(paymentRequest);
    this.editingPayment = null;
  }

  public delete(paymentRequest: PaymentRequest): void {
    this.deletePaymentRequest.emit(paymentRequest);
  }

  public getPaidHeader(): string {
    return this.paymentRequests.find(i => Boolean(i.completed_at)) ? 'Paid at' : '';
  }
}
