import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router } from '@angular/router';

import { Property } from '../../shared/dtos/property';
import { jQueryService } from '../../shared/services/jquery.service';

@Component({
  selector: 'property-accordion',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PropertyAccordion {
  @Input() properties: Property[];
  @Output() updateProperty: EventEmitter<any> = new EventEmitter();

  private lastUpdatedProperty: Property;

  public update(property: Property) {
    this.updateProperty.emit(property);
    this.lastUpdatedProperty = property;
  }

  ngOnChanges(changes: any) {
    isBrowser && setTimeout(() => this.initAccordion());
  }

  public redirectToProperty(property: Property) {
    this.router.navigate([DEFAULT_TENANT, property.slug]);
  }

  private initAccordion() {
    this.jquery.loadFoundation()
      .subscribe(foundation => new Foundation.Accordion(this.jquery.jquery('.accordion')));
  }

  constructor(private router: Router, private jquery: jQueryService) { }
}