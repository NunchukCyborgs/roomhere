import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../dtos/property';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'property-picker',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class PropertyPicker {
  @Output() propertyPicked: EventEmitter<any> = new EventEmitter();

   public source: Property[] = [
    ];

    public properties$: Observable<Array<{ address1: string, id: number }>>;
    public property: Property = new Property();

    constructor(private propertyService: PropertyService) {
        this.properties$ = Observable.of(this.source);
        this.properties$ = Observable.of([]);
    }

    handleFilter(value) {
      // Maybe add some loading looking thing?
      
      this.properties$ = this.propertyService.searchProperties({query: value});
    }
}
