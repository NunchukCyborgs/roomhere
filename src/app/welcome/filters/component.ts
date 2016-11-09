import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PropertyFacet } from '../../shared/dtos/facets';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'welcome-filters',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class WelcomeFilters {
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();
  @Input() showFilters: boolean;
  @Output() showFiltersChange: EventEmitter<any> = new EventEmitter();
  @Input() resultsCount: number;

  public bedrooms: number[] = [];
  public bathrooms: number[] = [];
  public title: string = '';

  ngOnInit() {
    for(let i = 1; i <= 7; i++) {
      this.bedrooms.push(i);
    }

    for(let i = 1; i <= 4; i+=.5) {
      this.bathrooms.push(i);
    }

    this.title = this.seoService.TITLE;
  }

  constructor(private seoService: SeoService) { }
}
