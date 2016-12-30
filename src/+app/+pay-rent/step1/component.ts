import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { ValidationService } from '../../shared/services/validation.service';
import { PropertyService } from '../../shared/services/property.service';
import { PaymentService } from '../../shared/services/payment.service';
import { UserService } from '../../shared/services/user.service';
import { jQueryService } from '../../shared/services/jquery.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { Property } from '../../shared/dtos/property';
import { User } from '../../shared/dtos/user';
import { PaymentRequest } from '../../shared/dtos/payment-request';
import { loadScript } from '../../shared/services/util';

declare let Stripe: any;

@Component({
  selector: 'pay-rent-step1',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentStep1 {
  public paymentToken: string;
  public serverErrors: string[] = [];
  public paymentErrors: string[] = [];
  public success: boolean = false;
  public hasAuth: boolean;

  public property: Property;
  public paymentForm: FormGroup;
  public dueOn: number = 30;
  public subtotal: number;

  private hasPostedInteraction: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService, private paymentService: PaymentService,
    private userService: UserService, private analytics: AnalyticsService, private jquery: jQueryService) { }

  ngOnInit() {
    Observable.combineLatest(this.userService.hasAuth$, this.getProperty())
      .filter((i: [boolean, Property]) => i[0] !== undefined && i[1] !== undefined)
      .do((i: [boolean, Property]) => this.hasAuth = i[0])
      .do((i: [boolean, Property]) => this.initForm(i[0], i[1]))
      .subscribe();


    this.userService.hasAuth$
      .do(i => this.hasAuth = i)
      .subscribe(i => this.initForm(i, this.property));
  }

  public submit() {
    this.createPaymentToken()
      .filter(i => Boolean(i))
      .do(i => this.paymentToken = i)
      .flatMap(i => this.createUser(i))
      .do(i => this.success = i)
      .do(i => i && this.analytics.recordAction('Pay Rent | Complete Step 1'))
      .filter(i => this.hasAuth)
      .do(() => this.router.navigate([`/pay-rent/step-2/${this.paymentToken}`]))
      .subscribe();
  }

  public getConfirmPasswordMatchMessage() {
    const password = this.paymentForm.controls['password'];
    const confirm = this.paymentForm.controls['confirmPassword'];
    return password.value !== confirm.value && password.touched && confirm.touched ? 'Passwords do not match. ' : '';
  }

  public interactWithForm() {
    if (!this.hasPostedInteraction) {
      this.hasPostedInteraction = true;
      this.analytics.recordAction('Pay Rent | Start Step 1');
    }
  }

  private getProperty(): Observable<Property> {
    return this.route.params
      .do(i => this.subtotal = Number(i['subtotal']))
      .flatMap(i => this.propertyService.getPropertyBySlug$(i['slug']))
      .do((i: Property & { status: string }) => i.status === 'Not Found' && this.router.navigate(['/p/pay-rent-online']))
      .do(i => this.property = i);
  }

  private createStripeToken(): Observable<{ status: any, response: any } & any> {
    return this.jquery.loadJQuery()
      .flatMap(jquery => {
        return Observable.create(observer => {
          Stripe.card.createToken(jquery('#PaymentForm'), (status, response) => observer.next({ status: status, response: response }));
        });
      })
  }

  private initForm(hasAuth: boolean, property: Property) {
    let controls: any = {
      name: new FormControl('', [Validators.required, ValidationService.nameValidator]),
      subtotal: new FormControl(this.subtotal, [Validators.required, ValidationService.minValidator.bind(this, 25), ValidationService.maxValidator.bind(this, 999999.99)]),
      phone: new FormControl('', [Validators.required, ValidationService.phoneNumberValidator]),
      unit: new FormControl(''),
    }

    if (!hasAuth) {
      controls.email = new FormControl('', [Validators.required, ValidationService.emailValidator]);
      controls.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
      controls.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
    }

    this.paymentForm = new FormGroup(controls);
  }

  private getPaymentOptions(): PaymentRequest {
    return {
      property_id: this.property.id,
      property_slug: this.property.slug,
      due_on: this.dueOn,
      name: this.paymentForm.controls['name'].value,
      subtotal: this.paymentForm.controls['subtotal'].value,
      unit: this.paymentForm.controls['unit'].value,
      phone: this.paymentForm.controls['phone'].value,
    };
  }

  private createPaymentToken(): Observable<string> {
    if (this.paymentToken) {
      return Observable.of(this.paymentToken);
    }
    return this.paymentService.requestPayment(this.getPaymentOptions())
      .do(i => this.paymentErrors = i.errors)
      .filter(i => !i.errors.length)
      .map(i => i.payment_request.token);
  }

  private createUser(paymentToken: string): Observable<boolean> {
    if (this.hasAuth) {
      return Observable.of(true);
    }

    const user = new User({
      email: this.paymentForm.controls['email'].value,
      password: this.paymentForm.controls['password'].value,
      password_confirmation: this.paymentForm.controls['confirmPassword'].value,
    });

    return this.userService.register(user, { token: paymentToken }, `pay-rent/step-2/${this.paymentToken}`)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .map((res: Response) => res.ok)
      .do(i => i && this.analytics.recordAction('Pay Rent | Register New User'));
  }
}
