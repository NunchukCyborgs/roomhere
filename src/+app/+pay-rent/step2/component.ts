import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { ValidationService } from '../../shared/services/validation.service';
import { PropertyService } from '../../shared/services/property.service';
import { PaymentService } from '../../shared/services/payment.service';
import { UserService } from '../../shared/services/user.service';
import { Property } from '../../shared/dtos/property';
import { PaymentRequest } from '../../shared/dtos/payment-request';
import { loadScript } from '../../shared/services/util';

declare let Stripe: any;

@Component({
  selector: 'pay-rent-step2',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentStep2 {
  public paymentForm: FormGroup;
  public paymentRequest: PaymentRequest;

  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService, private paymentService: PaymentService, private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .flatMap(i => this.paymentService.getRequestByToken(i['token']))
      .do(i => this.paymentRequest = i)
      .filter(() => this.paymentRequest ? true : this.router.navigate(['/p/pay-rent-online']) && false)
      .filter(() => !this.paymentRequest.payment_created_at ? true : this.router.navigate(['/account/dashboard/']) && false)
      .do(i => this.initForm())
      .do(() => isBrowser && this.loadStripe())
      .subscribe();
  }

  public submit() {
    this.createStripeToken()
      .filter(i => !i.response.error) // handle errors?
      .flatMap(i => this.paymentService.sendStripeToken(this.paymentRequest.token, i.response.id))
      .subscribe();
  }

  private initForm() {
    this.paymentForm = new FormGroup({
      card: new FormControl('', [Validators.required, ValidationService.creditCardValidator]),
      expMonth: new FormControl('', [
        Validators.required, Validators.maxLength(2), Validators.minLength(2), // not sure the min/max lengths work on number types
        ValidationService.minValidator.bind(this, 1), ValidationService.maxValidator.bind(this, 12)
      ]),
      expYear: new FormControl('', [
        Validators.required, Validators.maxLength(2), Validators.minLength(2),
        ValidationService.minValidator.bind(this, new Date().getFullYear().toString().substr(2)), ValidationService.maxValidator.bind(this, 99)
      ]),
      cvc: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(3)]),
    })
  }

  private loadStripe(): void {
    loadScript('https://js.stripe.com/v2/', () => Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY))
  }

  private createStripeToken(): Observable<{ status: any, response: any }> {
    return Observable.create(observer => {
      Stripe.card.createToken($('#PaymentForm'), (status, response) => observer.next({ status: status, response: response }));
    });
  }
}
