import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property, PropertyFacet } from '../properties/property';
import { PropertyService } from '../shared/services/property.service';

@Injectable()
export class WelcomeResolve implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService) { }

  public resolve(): Observable<Property[]> {
    return this.propertyService.getFilteredProperties$(new PropertyFacet());
  }
}
