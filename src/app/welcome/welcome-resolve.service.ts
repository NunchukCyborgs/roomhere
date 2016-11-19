import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property } from '../shared/dtos/property';
import { PropertyFacet } from '../shared/dtos/facets';

import { PropertyService } from '../shared/services/property.service';
import { FacetsService } from '../shared/services/facets.service';

@Injectable()
export class WelcomeResolve implements Resolve<any> {
  constructor(private propertyService: PropertyService, private facetsService: FacetsService) { }

  public resolve(route: ActivatedRouteSnapshot) {
    // let query = route.params['q'] || '';
    // let facet: PropertyFacet = new PropertyFaceßt();

    // return this.facetsService.loadFacets()
    //   .flatMap(() => this.facetsService.minPrice$)
    //   .do(i => facet.min_price = i)
    //   .flatMap(() => this.facetsService.maxPrice$)
    //   .do(i => facet.max_price = i)
    //   .flatMap(() => this.propertyService.getFilteredProperties$(facet, query))
    //   .map(i => ({ properties: i, query: query }))
    //   .do(i => console.log('I resolved!'));
    return false;
  }
}
