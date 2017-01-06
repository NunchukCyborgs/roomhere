import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from '../../../shared/services/payment.service';
import { PaymentRequest, PaymentRequestBlob } from '../../../shared/dtos/payment-request';

@Component({
  selector: 'super-user-payment-requests',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class SuperUserPaymentRequests {
  public payments$: Observable<PaymentRequest[]>;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.payments$ = this.paymentService.getAllPayments();
  }
}
