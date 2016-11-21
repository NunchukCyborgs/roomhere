import { Component } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'privacy-policy',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PrivacyPolicy {
  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.prependTitle('Privacy Policy')
  }
}
