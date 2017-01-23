import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { PropertyFacet } from '../../shared/dtos/facets';
import { Amenity } from '../../shared/dtos/property';
import { FacetsService } from '../../shared/services/facets.service';

@Component({
  selector: 'property-filters',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PropertyFilters {
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();
  @Input() showFilters: boolean;
  @Output() showFiltersChange: EventEmitter<any> = new EventEmitter();

  public locations$: Observable<string[]>;
  public amenities: Amenity[];
  public types$: Observable<string[]>;

  constructor(private facetsService: FacetsService) { }

  ngOnInit() {
    this.locations$ = this.facetsService.locations$;
    this.facetsService.amenities$.subscribe(i => this.amenities = i);
    this.types$ = this.facetsService.types$;
  }

  public toggleType(type: string) {
    this.toggleString('types', type);
  }

  public toggleLocation(location: string) {
    this.toggleString('locations', location);
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
    const activeAmenities = this.amenities.filter(i => i.active);
    const facet = Object.assign({}, this.facet, { amenities: activeAmenities });
    this.applyFacet.emit(facet);
    this.toggleShowFilters();
  }

  public toggleShowFilters() {
    this.showFilters = !this.showFilters;
    this.showFiltersChange.emit(this.showFilters);
  }
}
