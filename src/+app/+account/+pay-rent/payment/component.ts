import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';
import { Property } from '../../../shared/dtos/property';
import { PropertyService } from '../../../shared/services/property.service';

@Component({
  selector: 'pay-rent-payment',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentPayment {
  public property: Property;
  public paymentForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit() {
    this.route.params // Also accept price from url?
      .flatMap(i => this.propertyService.getPropertyBySlug$(i['slug']))
      .filter((property: Property) => property && !property.id ? this.router.navigate(['/account/pay-rent/']) && false : true)
      .do(i => this.property = i)
      .do(i => this.initForm(i))
      .subscribe();
  }

  private initForm(property: Property) {
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.paymentForm = new FormGroup({
      name: new FormControl('', [Validators.required, ValidationService.nameValidator]),
      dueOn: new FormControl(lastDayOfMonth, [Validators.required, ValidationService.dateValidator.bind(this, new Date(), new Date())]),
      subtotal: new FormControl(0, [Validators.required]), // minimum price? 25?
      phone: new FormControl('', [Validators.required, ValidationService.phoneNumberValidator]),
      unit: new FormControl(''),
      card: new FormControl('', [Validators.required, ValidationService.creditCardValidator]),
      expMonth: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      expYear: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      cvc: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
    })   
  }
}


// "name" : "Stephen Myers",
// "property_id" : 1,
// "due_on" : Date (no time required),
// "subtotal" : 1100 (what the person says their place costs),
// "unit" : 1 (the apartment unit)