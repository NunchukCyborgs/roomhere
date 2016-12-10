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
  public success: boolean = false;
  public hasAuth: boolean;

  public property: Property;
  public paymentForm: FormGroup;
  public dueOn: number = 30;
  public subtotal: number;

  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService, private paymentService: PaymentService, private userService: UserService) { }

  ngOnInit() {
    Observable.combineLatest(this.userService.hasAuth$, this.getProperty())
      .filter((i: [boolean, Property]) => i[0] !== undefined && i[1] !== undefined)
      .do((i: [boolean, Property]) => this.hasAuth = i[0])
      .do((i: [boolean, Property]) => this.initForm(i[0], i[1]))
      .subscribe();
  }

  public submit() {
    this.createPaymentToken()
      .flatMap(i => this.createUser(i))
      .do(i => this.success = i)
      .filter(i => this.hasAuth)
      .do(() => this.router.navigate([`/pay-rent/step-2/${this.paymentToken}`]))
      .subscribe();
  }

  public getConfirmPasswordMatchMessage() {
    const password = this.paymentForm.controls['password'];
    const confirm = this.paymentForm.controls['confirmPassword'];
    return password.value !== confirm.value && password.touched && confirm.touched ? 'Passwords do not match. ' : '';
  }

  private getProperty(): Observable<Property> {
    return this.route.params
      .do(i => this.subtotal = Number(i['subtotal']))
      .flatMap(i => this.propertyService.getPropertyBySlug$(i['slug']))
      .filter((property: Property) => property && !property.id ? this.router.navigate(['/pay-rent/']) && false : true)
      .do(i => this.property = i);
  }

  private createStripeToken(): Observable<{ status: any, response: any }> {
    return Observable.create(observer => {
      Stripe.card.createToken($('#PaymentForm'), (status, response) => observer.next({ status: status, response: response }));
    });
  }

  private initForm(hasAuth: boolean, property: Property) {
    let controls: any = {
      name: new FormControl('', [Validators.required, ValidationService.nameValidator]),
      subtotal: new FormControl(this.subtotal, [Validators.required, ValidationService.minValidator.bind(this, 25), ValidationService.maxValidator.bind(this, 999999.99)]), // minimum price? 25?
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
      property_slug: this.property.slug,
      due_on: this.dueOn,
      name: this.paymentForm.controls['name'].value,
      subtotal: this.paymentForm.controls['subtotal'].value,
      unit: this.paymentForm.controls['unit'].value,
    };
  }

  private createPaymentToken(): Observable<string> {
    return this.paymentToken ? Observable.of(this.paymentToken) : this.paymentService.requestPayment(this.getPaymentOptions()); 
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
      .map((res: Response) => res.ok);
  }
}
