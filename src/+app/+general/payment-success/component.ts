import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from '../../shared/services/payment.service';

@Component({
  selector: 'payment-success',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class PaymentSuccess  { 
  public payments$: Observable<any>;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.payments$ = this.paymentService.getMyPayments$();
  }
}
