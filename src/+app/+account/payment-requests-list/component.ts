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

  public toggleEditing(paymentRequest: PaymentRequest): void {

  }

  public delete(paymentRequest: PaymentRequest): void {

  }

  public getPaidHeader(): string {
    return this.paymentRequests.find(i => Boolean(i.completed_at)) ? 'Paid at' : '';
  }
}
