import { Component, Renderer } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'privacy-policy',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PrivacyPolicy {
  constructor(private seoService: SeoService, private renderer: Renderer) { }

  ngOnInit() {
    this.seoService.addTags({ description: 'Your data is important to us. Read how we take care of your information. ', title: 'Privacy Policy' }, this.renderer);
  }
}
