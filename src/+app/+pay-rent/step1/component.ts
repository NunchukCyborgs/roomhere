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
  public property: Property;
  public subtotal: number;
  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService, private paymentService: PaymentService, private userService: UserService) { }

  ngOnInit() {
    this.getProperty().subscribe();
  }

  private getProperty(): Observable<Property> {
    return this.route.params
      .do(i => this.subtotal = Number(i['subtotal']))
      .flatMap(i => this.propertyService.getPropertyBySlug$(i['slug']))
      .filter((property: Property) => property && !property.id ? this.router.navigate(['/pay-rent/']) && false : true)
      .do(i => this.property = i);
  }
}
