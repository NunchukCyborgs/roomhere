import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { PaymentRequest } from '../dtos/payment-request';

interface paymentRequestBlob {
  errors: string[];
  payment_request: PaymentRequest;
}

@Injectable()
export class PaymentService {
  constructor(private router: Router, private http: HttpService, private userService: UserService, private propertyService: PropertyService) { }

  public requestPayment(request: PaymentRequest): Observable<paymentRequestBlob> {
    return this.http.post(`${BASE_API_URL}/payments/requests`, { payment_request: request });
  }

  public sendStripeToken(paymentRequestToken: string, stripeToken: string): Observable<paymentRequestBlob> {
    return this.http.post(`${BASE_API_URL}/payments`, {token: paymentRequestToken, stripe_token: stripeToken});
  }

  public getRequestByToken(token: string) {
    return this.getMyPayments()
      .map(payments => payments.find(i => i.token === token));
  }

  public updateRequest(request: PaymentRequest): Observable<paymentRequestBlob> {
    return this.http.patch(`${BASE_API_URL}/payments/requests/${request.token}`, request);
  }

  public getFees(request: PaymentRequest): Observable<{value: number, message: string}> {
    return this.http.get(`${BASE_API_URL}/payments/fees?subtotal=${request.subtotal}&property_slug=${request.property_slug}`);
  }

  public getMyPayments(): Observable<PaymentRequest[]> {
    return this.userService.hasAuth$
      .filter(i => i)
      .flatMap(() => this.http.get(`${BASE_API_URL}/payments`))
      .flatMap(i => this.mergePropertiesBySlugs(i));
  }

  private mergePropertiesBySlugs(payments: any[]): Observable<any[]> {
    return Observable.combineLatest(payments.map((payment: PaymentRequest) =>
      this.propertyService.getPropertyBySlug$(payment.property_slug)
        .map(property => Object.assign(payment, { property: property }))
    ))
      .filter(payments => payments.every(i => i !== undefined));
  }
}
