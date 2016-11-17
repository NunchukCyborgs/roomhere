import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router } from '@angular/router';

import { DEFAULT_TENANT } from '../../../config';
import { Property } from '../../../shared/dtos/property';

@Component({
  selector: 'property-accordion',
  styles: [require('./styles.scss').toString()],
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
    const accord$ = $('.accordion');
    new Foundation.Accordion(accord$);
  }

  constructor(private router: Router) { }
}