import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property } from '../shared/dtos/property';
import { PropertyFacet } from '../shared/dtos/facets';

import { PropertyService } from '../shared/services/property.service';

@Injectable()
export class WelcomeResolve implements Resolve<any> {
  constructor(private propertyService: PropertyService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let query = String(route.params['query']);
    return this.propertyService.getFilteredProperties$(new PropertyFacet())
      .map(i => ({ properties: i, query: query }));
  }
}
