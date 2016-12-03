import { Component, Renderer } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'landlord-landing',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class LandlordLanding {
  constructor(private seoService: SeoService, private renderer: Renderer) { }

  ngOnInit() {
    // todo: add description
    this.seoService.addTags({ title: 'Cape Girardeau Landlords' }, this.renderer);
  }
}
