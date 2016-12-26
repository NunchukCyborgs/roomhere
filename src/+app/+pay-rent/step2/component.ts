import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { ValidationService } from '../../shared/services/validation.service';
import { PropertyService } from '../../shared/services/property.service';
import { PaymentService } from '../../shared/services/payment.service';
import { UserService } from '../../shared/services/user.service';
import { Property } from '../../shared/dtos/property';
import { PaymentRequest, PaymentRequestBlob } from '../../shared/dtos/payment-request';
import { loadScript } from '../../shared/services/util';

declare let Stripe: any;

interface StripeError {
  code: string;
  message: string;
  param: string;
  type: string;
}

@Component({
  selector: 'pay-rent-step2',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentStep2 {
  public paymentForm: FormGroup;
  public paymentRequest: PaymentRequest;
  public stripeError: StripeError;
  public paymentRequestErrors: string[];
  public success: boolean;

  public months = [
    { value: 1, text: 'January' },
    { value: 2, text: 'February' },
    { value: 3, text: 'March' },
    { value: 4, text: 'April' },
    { value: 5, text: 'May' },
    { value: 6, text: 'June' },
    { value: 7, text: 'July' },
    { value: 8, text: 'August' },
    { value: 9, text: 'September' },
    { value: 10, text: 'October' },
    { value: 11, text: 'November' },
    { value: 12, text: 'December' },
  ];

  public years: Array<{ value: number, text: string }> = [];

  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService,
    private paymentService: PaymentService, private userService: UserService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.setYears();

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
      .do(i => this.stripeError = i.response.error)
      .do(i => this.changeDetector.detectChanges())
      .filter(i => !this.stripeError)
      .flatMap(i => this.paymentService.sendStripeToken(this.paymentRequest.token, i.response.id))
      .do((i: PaymentRequestBlob) => this.paymentRequestErrors = i.errors)
      .do((i: PaymentRequestBlob) => this.paymentRequest = i.payment_request)
      .do((i: PaymentRequestBlob) => this.success = i.errors.length === 0)
      .do(() => this.changeDetector.detectChanges())
      .filter((i: PaymentRequestBlob) => i.errors.length === 0)
      .do(() => this.router.navigate(['/pay-rent/success']))
      .subscribe();
  }

  private initForm() {
    this.paymentForm = new FormGroup({
      card: new FormControl('', [Validators.required, ValidationService.creditCardValidator]),
      expMonth: new FormControl('', Validators.required),
      expYear: new FormControl('', Validators.required),
      cvc: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(3)]),
    })
  }

  private loadStripe(): void {
    loadScript('https://js.stripe.com/v2/', () => Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY))
  }

  private createStripeToken(): Observable<{ status: any, response: any }> {
    return Observable.create(observer => {
      console.log({
        exp_month: this.paymentForm.controls['expMonth'].value,
        exp_year: this.paymentForm.controls['expYear'].value,
      });

      Stripe.card.createToken({
        number: this.paymentForm.controls['card'].value,
        cvc: this.paymentForm.controls['cvc'].value,
        exp_month: this.paymentForm.controls['expMonth'].value,
        exp_year: this.paymentForm.controls['expYear'].value,
      }, (status, response) => observer.next({ status: status, response: response }));
    });
  }

  private setYears(): void {
    const year = new Date().getFullYear();
    for (let i = year; i < year + 21; i++) {
      this.years.push({ value: i, text: i.toString() });
    }
  }
}
