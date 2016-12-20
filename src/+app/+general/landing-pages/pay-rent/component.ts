import { Component, Renderer } from '@angular/core';
import { SeoService } from '../../../shared/services/seo.service';
import { Property } from '../../../shared/dtos/property';

@Component({
  selector: 'pay-rent-landing',
  styleUrls: ['../styles.css', './styles.css'],
  templateUrl: 'template.html',
})
export class PayRentLanding {
  public property: Property;

  constructor(private seoService: SeoService, private renderer: Renderer) { }

  ngOnInit() {
    this.seoService.addTags(
      {
        description: `Don't write another check to your landlord. Pay your rent online with Roomhere! Use your debit or credit card and pay from anywhere. `,
        title: 'Pay Your Rent Online',
      }, this.renderer);
  }
}
