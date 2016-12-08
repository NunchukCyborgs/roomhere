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
  selector: 'pay-rent-payment',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentPayment {
  public property: Property;
  public paymentForm: FormGroup;
  public dueOn: number = 30;
  public subtotal: number;

  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService, private paymentService: PaymentService, private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .do(i => this.subtotal = Number(i['subtotal']) || 0)
      .flatMap(i => this.propertyService.getPropertyBySlug$(i['slug']))
      .filter((property: Property) => property && !property.id ? this.router.navigate(['/pay-rent/']) && false : true)
      .do(i => this.property = i)
      .do(i => this.initForm(i))
      .do(() => isBrowser && this.loadStripe())
      .subscribe();
  }

  public createStripeToken(): Observable<{ status: any, response: any }> {
    return Observable.create(observer => {
      Stripe.card.createToken($('#PaymentForm'), (status, response) => observer.next({ status: status, response: response }));
    });
  }

  public submit() {
    this.createStripeToken()
      .filter(i => !i.response.error)
      .flatMap(i => this.paymentService.requestPayment(this.getPaymentOptions(), i.response.id))
      .subscribe();
  }

  private initForm(property: Property) {
    this.paymentForm = new FormGroup({
      name: new FormControl('', [Validators.required, ValidationService.nameValidator]),
      subtotal: new FormControl(this.subtotal, [Validators.required]), // minimum price? 25?
      phone: new FormControl('', [Validators.required, ValidationService.phoneNumberValidator]),
      unit: new FormControl(''),
      card: new FormControl('', [Validators.required, ValidationService.creditCardValidator]),
      expMonth: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      expYear: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      cvc: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(3)]),
    })
  }

  private loadStripe(): void {
    loadScript('https://js.stripe.com/v2/', () => Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY))
  }

  private getPaymentOptions(): PaymentRequest {
    return {
      property_id: this.property.id,
      due_on: this.dueOn,
      name: this.paymentForm.controls['name'].value,
      subtotal: this.paymentForm.controls['subtotal'].value,
      unit: this.paymentForm.controls['unit'].value,
    };
  }
}
