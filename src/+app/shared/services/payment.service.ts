import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { PaymentRequest } from '../dtos/payment-request';

@Injectable()
export class PaymentService {
  constructor(private http: HttpService) { }

  public requestPayment(request: PaymentRequest, stripeToken: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}payments`, {payment_request: request, stripeToken: stripeToken})
  }
}
