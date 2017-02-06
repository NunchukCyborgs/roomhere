import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property } from '../shared/dtos/property';
import { PropertyFacet } from '../shared/dtos/facets';
import { PropertyService } from '../shared/services/property.service';

@Injectable()
export class PropertyViewResolve implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<Property> {
    const slug = String(route.params['slug']);
    return this.propertyService.getPropertyBySlug$(slug)
      .do((i: Property & { status: string }) => i.status === 'Not Found' && this.router.navigate(['/']));

  }
}
