import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { PaymentRequest } from '../dtos/payment-request';

@Injectable()
export class PaymentService {
  constructor(private router: Router, private http: HttpService, private userService: UserService, private propertyService: PropertyService) { }

  public requestPayment(request: PaymentRequest, stripeToken: string): Observable<any> {
    return Observable.combineLatest(
      this.userService.hasAuth$,
      this.http.post(`${BASE_API_URL}/payments`, { payment_request: request, stripeToken: stripeToken })
    )
      .map((i: [boolean, Response]) => [i[0], i[1]])
      .filter((i: [boolean, any]) => i[0] ? true : this.router.navigate([`/pay-rent/sign-up/${i[1].token}`]) && false)
      .map((i: [boolean, any]) => i[1].token);
  }

  public getMyPayments$(): Observable<any[]> {
    return this.userService.hasAuth$
      .filter(i => i)
      .flatMap(() => this.http.get(`${BASE_API_URL}/payments`))
      .flatMap(i => this.mergePropertiesBySlugs(i));
  }

  private mergePropertiesBySlugs(payments: any[]): Observable<any[]> {
    return Observable.forkJoin(payments.map(payment =>
      this.propertyService.getPropertyBySlug$(payment.property.slug)
        .map(property => Object.assign(payment, { property: property }))
    ));
  }
}
