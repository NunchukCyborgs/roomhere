import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property, PropertyFacet } from '../properties/property.service';
import { PropertyPreview } from '../properties/property-preview.component';
import { PropertyMap } from './property-map.component'
import { FacetsService, Location, Amenity } from '../services/facets.service';
@Component({
  moduleId: __filename,
  selector: 'property-filters',
  directives: [NgClass],
  providers: [FacetsService],
  styles: [`
    .dropdown-pane {
      visibility: visible;
    }
    .button-group a.button.selected {
      opacity: .5;
    }
  `],
  templateUrl: './property-filters.component.html'
})
export class PropertyFilters {
  public showFilters: boolean = false;
  public locations$: Observable<Location[]>;
  public amenities$: Observable<Amenity[]>;
  @Input() facet: PropertyFacet;
  @Output() apply: EventEmitter<any> = new EventEmitter();

  constructor(private facetsService: FacetsService) {

  }

  ngOnInit() {
    this.locations$ = this.facetsService.locations$;
    this.amenities$ = this.facetsService.amenities$;
  }

  public toggleType(type: string) {
    this.toggleString('types', type);
  }

  public toggleLocation(location: string) {
    this.toggleString('locations', location);
  }

  public toggleAmenity(amenity: string) {
    this.toggleString('amenities', amenity);
  }

  private toggleString(property: string, s: string) {
    const index = this.facet[property].indexOf(s);
     
    if (index === -1) {
      this.facet[property].push(s);
    } else {
      this.facet[property].splice(index, 1);
    }
  }

  public test() {
    console.log('testing');
  }
}
