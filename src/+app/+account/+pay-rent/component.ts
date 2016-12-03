import { Component } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'pay-rent',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRent {
  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.prependTitle('Pay Rent')
  }
}
