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
    .wrapper {
      position: relative;
    }
    .button-group a.button.selected {
      opacity: .5;
    }
    .filter-buttons {
      padding: 1px;
    }
    .dropdown-pane {
      visibility: visible;
      overflow-y: scroll!important;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
    }
  `],
  templateUrl: './property-filters.component.html'
})
export class PropertyFilters {
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();
  @Input() showFilters: boolean;
  @Output() showFiltersChange: EventEmitter<any> = new EventEmitter();

  public locations$: Observable<Location[]>;
  public amenities$: Observable<Amenity[]>;

  constructor(private facetsService: FacetsService) { }

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

  public toggleShowFilters() {
    this.showFilters = !this.showFilters;
    this.showFiltersChange.emit(this.showFilters);
  }
}
