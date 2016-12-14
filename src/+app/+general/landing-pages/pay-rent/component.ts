import { Component, Renderer } from '@angular/core';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'pay-rent-landing',
  styleUrls: ['../styles.css'],
  templateUrl: 'template.html',
})
export class PayRentLanding {
  constructor(private seoService: SeoService, private renderer: Renderer) { }

  ngOnInit() {
    this.seoService.addTags(
      {
        description: `Don't write another check to your landlord. Pay your rent online with Roomhere! Use your debit or credit card and never write a check again!`,
        title: 'Pay Your Rent Online',
      }, this.renderer);
  }
}
