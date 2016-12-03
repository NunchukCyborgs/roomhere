import { Component, Renderer } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'renter-landing',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class RenterLanding {
  constructor(private seoService: SeoService, private renderer: Renderer) { }

  ngOnInit() {
    this.seoService.addTags(
      {
        description: 'Looking to rent in Cape Girardeau? Roomhere is here to help! Roomhere provides the most complete and accurate rental property listing in Southeast Missouri. ',
        title: 'Rentals',
      }, this.renderer);
  }
}
