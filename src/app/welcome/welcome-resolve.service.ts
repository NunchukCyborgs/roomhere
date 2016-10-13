import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property, PropertyFacet } from '../properties/property';
import { PropertyService } from '../shared/services/property.service';

@Injectable()
export class WelcomeResolve implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService, private router: Router) { }

  public resolve(): Observable<Property[]> {
    return this.propertyService.getFilteredProperties$(new PropertyFacet());
  }
}
