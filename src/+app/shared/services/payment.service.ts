import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService, HttpOptions } from './http.service';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { CacheService } from './cache.service';
import { PaymentRequest, PaymentRequestBlob } from '../dtos/payment-request';

@Injectable()
export class PaymentService {
  constructor(private router: Router, private http: HttpService, private userService: UserService, private propertyService: PropertyService, private cacheService: CacheService) { }

  public requestPayment(request: PaymentRequest): Observable<PaymentRequestBlob> {
    return this.http.post(`${BASE_API_URL}/payments/requests`, { payment_request: request })
      .map(i => new PaymentRequestBlob(i))
      .do(() => this.clearCache());
  }

  public sendStripeToken(paymentRequestToken: string, stripeToken: string): Observable<PaymentRequestBlob> {
    return this.http.post(`${BASE_API_URL}/payments`, { token: paymentRequestToken, stripe_token: stripeToken })
      .map(i => new PaymentRequestBlob(i))
      .do(() => this.clearCache());
  }

  public getRequestByToken(token: string): Observable<PaymentRequest> {
    return this.getMyPayments()
      .map(payments => payments.find(i => i.token === token));
  }

  public updateRequest(request: PaymentRequest): Observable<PaymentRequestBlob> {
    return this.http.patch(`${BASE_API_URL}/payments/requests/${request.token}`, { payment_request: request })
      .map(i => new PaymentRequestBlob(i))
      .do(() => this.clearCache());
  }

  public getFees(request: PaymentRequest): Observable<{ value: number, message: string }> {
    return this.http.get(`${BASE_API_URL}/payments/fees?subtotal=${request.subtotal}&property_slug=${request.property_slug}`);
  }

  public getMyPayments(httpOptions?: HttpOptions): Observable<PaymentRequest[]> {
    return this.userService.hasAuth$
      .filter(i => i)
      .flatMap(() => this.http.get(`${BASE_API_URL}/payments`, httpOptions))
      .flatMap(i => i.length ? this.mergePropertiesBySlugs(i) : Observable.of(i));
  }

  public deletePaymentRequest(token: string): Observable<Response> {
    return this.http.delete(`${BASE_API_URL}/payments/${token}`, { rawResponse: true })
      .do(() => this.clearCache());
  }

  public getAllPayments(): Observable<PaymentRequest[]> {
    return this.http.get(`${BASE_API_URL}/payments`);
  }

  private mergePropertiesBySlugs(payments: PaymentRequest[]): Observable<PaymentRequest[]> {
    return Observable.combineLatest(payments.map((payment: PaymentRequest) =>
      this.propertyService.getPropertyBySlug$(payment.property_slug)
        .map(property => Object.assign(payment, { property: property }))
    ))
      .filter(payments => payments.every(i => i && i.property && i.property.id));
  }

  private clearCache(): void {
    this.cacheService.delete(`${BASE_API_URL}/payments`);
  }
}
