import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { ValidationService } from '../../../shared/services/validation.service';
import { PropertyService } from '../../../shared/services/property.service';
import { PaymentService } from '../../../shared/services/payment.service';
import { Property } from '../../../shared/dtos/property';
import { PaymentRequest } from '../../../shared/dtos/payment-request';
import { loadScript } from '../../../shared/services/util';

declare let Stripe: any;

@Component({
  selector: 'pay-rent-payment',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentPayment {
  public property: Property;
  public paymentForm: FormGroup;
  public minDate: string;
  public maxDate: string;

  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService, private paymentService: PaymentService) { }

  ngOnInit() {
    this.route.params // Also accept price from url?
      .flatMap(i => this.propertyService.getPropertyBySlug$(i['slug']))
      .filter((property: Property) => property && !property.id ? this.router.navigate(['/account/pay-rent/']) && false : true)
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
      .do(i => console.log(i))
      .filter(i => !i.response.error)
      .flatMap(i => this.paymentService.requestPayment(this.getPaymentOptions(), i.response.id))
      .subscribe(i => console.log('success plz?: ', i));
  }

  private initForm(property: Property) {
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    let minDate = new Date();
    minDate.setHours(now.getHours() + 8);
    minDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, minDate.getDate());

    let maxDate = new Date();
    maxDate.setMonth(now.getMonth() + 1);
    maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, maxDate.getDate());

    this.minDate = this.formatDate(minDate);
    this.maxDate = this.formatDate(maxDate);

    this.paymentForm = new FormGroup({
      name: new FormControl('', [Validators.required, ValidationService.nameValidator]),
      dueOn: new FormControl(this.formatDate(lastDayOfMonth), [Validators.required, ValidationService.dateValidator.bind(this, minDate, maxDate)]),
      subtotal: new FormControl(0, [Validators.required]), // minimum price? 25?
      phone: new FormControl('', [Validators.required, ValidationService.phoneNumberValidator]),
      unit: new FormControl(''),
      card: new FormControl('', [Validators.required, ValidationService.creditCardValidator]),
      expMonth: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      expYear: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      cvc: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(3)]),
    })
  }

  private formatDate(date: Date): string {
    console.log('formatting: ', date, `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  private loadStripe(): void {
    loadScript('https://js.stripe.com/v2/', () => Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY))
  }

  private getPaymentOptions(): PaymentRequest {
    return {
      name: this.paymentForm.controls['name'].value,
      property_id: this.property.id,
      due_on: this.paymentForm.controls['dueOn'].value,
      subtotal: this.paymentForm.controls['subtotal'].value,
      unit: this.paymentForm.controls['unit'].value,
    };
  }
}


// "name" : "Stephen Myers",
// "property_id" : 1,
// "due_on" : Date (no time required),
// "subtotal" : 1100 (what the person says their place costs),
// "unit" : 1 (the apartment unit)