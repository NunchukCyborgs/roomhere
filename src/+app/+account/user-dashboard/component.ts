import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from '../../shared/services/payment.service';
import { PaymentRequest } from '../../shared/dtos/payment-request';

@Component({
  selector: 'user-dashboard',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class UserDashboard {
  public payments$: Observable<any>;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.payments$ = this.paymentService.getMyPayments();
  }

  public updatePaymentRequests(): Observable<PaymentRequest[]> {
    return this.paymentService.getMyPayments({skipCache: true});
  }

  public deletePaymentRequests(paymentRequest: PaymentRequest): void {
    this.paymentService.deletePaymentRequest(paymentRequest.token)
      .flatMap(i => this.updatePaymentRequests())
      .subscribe();
  }
}
