import { Component } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'pay-rent',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PayRent {
  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.prependTitle('Pay Rent')
  }
}
