import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { PropertyPreview, PropertyService, Property, PropertyFacet, PropertyMap } from '../properties/index';
import { FacetsService, Location, Amenity } from '../services/facets.service';
@Component({
  moduleId: __filename,
  selector: 'property-filters',
  directives: [NgClass],
  providers: [FacetsService],
  styles: [`
.button-group a.button.selected {
      opacity: .5;
    }
.dropdown-pane.large {
    width: 900px !important;
}
.dropdown-pane {
      visibility: visible;
    }
@media screen and (min-width: 40em) and (max-width: 63.9375em) {
.dropdown-pane.large {
    position:static;
    overflow-y:scroll!important;
}
}
@media screen and (max-width: 39.9375em) {
.dropdown-pane.large {
    width: 95% !important;
    position:static;
    overflow-y:scroll!important;
}
}

  `],
  templateUrl: './property-filters.component.html'
})
export class PropertyFilters {
  public showFilters: boolean = false;
  public locations$: Observable<Location[]>;
  public amenities$: Observable<Amenity[]>;
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();

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

  public apply() {
    this.applyFacet.emit(this.facet);
  }
}
