import { Component } from '@angular/core';
import { SeoService } from '../shared/services/seo.service';

import { PropertyService } from '../shared/services/property.service';
import { PropertyFacet } from '../shared/dtos/facets';

@Component({
  selector: 'faq',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class FAQ  {
  constructor(private seoService: SeoService, private propertyService: PropertyService) { }
  
  ngOnInit() {
    this.seoService.prependTitle('FAQ')
    console.log('faq oninit')

    this.propertyService.getFilteredProperties$(new PropertyFacet())
      .subscribe(i => {
      console.log(123, i.toString())
    });
  }
}
