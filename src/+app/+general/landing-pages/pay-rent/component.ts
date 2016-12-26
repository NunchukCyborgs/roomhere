import { Component, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';
import { AnalyticsService } from '../../../shared/services/analytics.service';
import { Property } from '../../../shared/dtos/property';

@Component({
  selector: 'pay-rent-landing',
  styleUrls: ['../styles.css', './styles.css'],
  templateUrl: 'template.html',
})
export class PayRentLanding {
  public property: Property;

  constructor(private analyticsService: AnalyticsService, private seoService: SeoService, private renderer: Renderer, private router: Router) { }

  ngOnInit() {
    this.analyticsService.recordAction('Pay Rent | Land on Pay Rent Landing Page');

    this.seoService.addTags(
      {
        description: `Don't write another check to your landlord. Pay your rent online with Roomhere! Use your debit or credit card and pay from anywhere. `,
        title: 'Pay Your Rent Online',
      }, this.renderer);
  }

  public selectProperty(property: Property): void {
    this.analyticsService.recordAction('Pay Rent | Select Property', { property: property });
    this.property = property;
  }

  public submitProperty(): void {
    if (this.property) {
      this.analyticsService.recordAction('Pay Rent | Navigate to Form');
      this.router.navigate(['/pay-rent/' + this.property.slug]);
    }
  }
}
