import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from '../../../shared/dtos/property';
import { PropertyService } from '../../../shared/services/property.service';

@Component({
  selector: 'pay-rent-payment',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentPayment {
  public property: Property;

  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit() {
    this.route.params
      .flatMap(i => this.propertyService.getPropertyBySlug$(i['slug']))
      .do(i => i && !i.id && this.router.navigate(['/account/pay-rent/']))
      .subscribe(i => this.property = i);
  }
}
