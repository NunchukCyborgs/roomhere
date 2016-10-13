import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { PropertyFacet } from '../../../properties/property';
import { FacetsService, Location, Amenity } from '../../services/facets.service';

@Component({
  selector: 'property-filters',
  styles:[require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class PropertyFilters {
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();
  @Input() showFilters: boolean;
  @Output() showFiltersChange: EventEmitter<any> = new EventEmitter();

  public locations$: Observable<Location[]>;
  public amenities$: Observable<string[]>;
  public types$: Observable<string[]>;

  constructor(private facetsService: FacetsService) { }

  ngOnInit() {
    this.locations$ = this.facetsService.locations$;
    this.amenities$ = this.facetsService.amenities$;
    this.types$ = this.facetsService.types$;
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
    this.toggleShowFilters();
  }

  public toggleShowFilters() {
    this.showFilters = !this.showFilters;
    this.showFiltersChange.emit(this.showFilters);
  }
}
