import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property, PropertyFacet } from '../property';
import { PropertyService } from '../../shared/services/property.service';

@Injectable()
export class PropertyViewResolve implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<Property> {
    let slug = String(route.params['slug']);
    return this.propertyService.getPropertyBySlug$(slug);
  }
}
