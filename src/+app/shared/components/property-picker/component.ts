import { Component, Output, EventEmitter, ViewEncapsulation, ElementRef } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../dtos/property';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'property-picker',
  styleUrls: ['styles.css'],
  templateUrl: 'template.html'
})
export class PropertyPicker {
  @Output() propertyPicked: EventEmitter<any> = new EventEmitter();

  public properties: Property[] = [];
  public property: Property = new Property();

  constructor(private propertyService: PropertyService, private element: ElementRef) { }

  ngAfterViewInit() {
    isBrowser && $(this.element.nativeElement).find('input.k-input').attr('placeholder', 'Search Properties ...');
  }

  public handleFilter(value) {
    this.propertyService.searchProperties({ query: value })
      .filter(i => i && i.length)
      .subscribe(i => this.properties = i)
  }
}
