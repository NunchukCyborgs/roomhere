import { Component } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'privacy-policy',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PrivacyPolicy {
  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.prependTitle('Privacy Policy')
  }
}
