import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PropertyService } from '../shared/services/property.service';
import { PaymentService } from '../shared/services/payment.service';
import { UserService } from '../shared/services/user.service';
import { Property } from '../shared/dtos/property';
import { PaymentRequest } from '../shared/dtos/payment-request';

@Component({
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRent {
  public property: Property;
  public paymentRequest: PaymentRequest;
  public subtotal: number;
  public fees: { value: number, message: string };

  private slug: string;
  private token: string;

  constructor(private route: ActivatedRoute, private router: Router, private propertyService: PropertyService, 
  private paymentService: PaymentService, private userService: UserService) { }

  ngOnInit() {
    this.userService.loadMe()
      .filter(i => i.licenses && i.licenses.length > 0)
      .subscribe(() => this.router.navigate(['/account/dashboard']));

    this.route.firstChild.params
      .do(i => this.slug = i['slug'])
      .do(i => this.token = i['token'])
      .flatMap(() => this.slug ? this.propertyService.getPropertyBySlug$(this.slug) : Observable.of(null))
      .do((i: Property) => this.property = i)
      .filter((i: Property) => !Boolean(i && i.id))

      .flatMap(() => this.token ? this.paymentService.getRequestByToken(this.token) : Observable.of(null))
      .filter(i => Boolean(i))
      .do((i: PaymentRequest) => this.paymentRequest = i)
      .do((i: PaymentRequest) => this.subtotal = i.subtotal)
      .map((i: PaymentRequest) => i.property)
      .do((i: Property) => this.property = i)

      .flatMap(() => this.paymentService.getFees(this.paymentRequest))
      .do((i: { value: number, message: string }) => this.fees = i)
      .subscribe();
  }
}
