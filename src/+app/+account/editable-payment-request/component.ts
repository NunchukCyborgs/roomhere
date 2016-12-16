import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentService } from '../../shared/services/payment.service';
import { PaymentRequest, PaymentRequestBlob } from '../../shared/dtos/payment-request';

@Component({
  selector: 'editable-payment-request',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class EditablePaymentRequest {
  @Input() paymentRequest: PaymentRequest;
  @Output() paymentRequestChange: EventEmitter<any> = new EventEmitter();

  public errors: string[] = [];

  constructor(private paymentService: PaymentService) { }

  public save() {
    this.paymentService.updateRequest(this.paymentRequest)
      .do((i: PaymentRequestBlob) => this.errors = i.errors)
      .filter((i: PaymentRequestBlob) => !i.errors.length)
      .map((i: PaymentRequestBlob) => i.payment_request)
      .do((i: PaymentRequest) => this.paymentRequestChange.emit(i))
      .subscribe();
  }
}
