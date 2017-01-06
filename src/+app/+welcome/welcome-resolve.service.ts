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
    let query = route.params['q'] || '';
    return this.propertyService.getFilteredProperties$(new PropertyFacet(), query, 1, 7)
      .map(i => ({ properties: i, query: query }));
  }
}
