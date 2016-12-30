import { Component, Output, EventEmitter, ViewEncapsulation, ElementRef } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Property } from '../../dtos/property';
import { PropertyService } from '../../services/property.service';
import { jQueryService } from '../../services/jquery.service';

@Component({
  selector: 'property-picker',
  styleUrls: ['styles.css'],
  templateUrl: 'template.html'
})
export class PropertyPicker {
  @Output() propertyPicked: EventEmitter<any> = new EventEmitter();

  public isBrowser = isBrowser;
  public properties: Property[] = [];
  public property: Property = new Property();
  private loadProperties$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private propertyService: PropertyService, private element: ElementRef, private jquery: jQueryService) { }

  ngOnInit() {
    this.loadProperties$
      .filter(i => Boolean(i && i.length))
      .debounceTime(250)
      .flatMap(i => this.propertyService.searchProperties({ query: i }))
      .filter(i => Boolean(i && i.length))
      .subscribe(i => this.properties = i)
  }

  ngAfterViewInit() {
    this.jquery.loadJQuery()
      .subscribe(jquery => (this.element.nativeElement).find('input.k-input').attr('placeholder', 'Search Properties ...'));
  }

  public handleFilter(value) {
    this.loadProperties$.next(value);
  }
}
