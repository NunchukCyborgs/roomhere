import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { PaymentRequest } from '../dtos/payment-request';

@Injectable()
export class PaymentService {
  constructor(private router: Router, private http: HttpService, private userService: UserService) { }

  public requestPayment(request: PaymentRequest, stripeToken: string): Observable<any> {
    return Observable.combineLatest(
      this.userService.hasAuth$,
      this.http.post(`${BASE_API_URL}/payments`, { payment_request: request, stripeToken: stripeToken })
    )
      .map((i: [boolean, Response]) => [i[0], i[1].json()])
      .do(i => console.log('>>> hey', i))
      .filter((i: [boolean, any]) => i[0] ? true : this.router.navigate([`/pay-rent/sign-up/${i[1].stripeToken}`]) && false)
      .map((i: [boolean, any]) => i[1].stripeToken);
  }
}
