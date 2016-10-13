import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router } from '@angular/router';

import { Property } from '../../../properties/property';

@Component({
  selector: 'property-accordion',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyAccordion {
  @Input() properties: Property[];
  @Output() updateProperty: EventEmitter<any> = new EventEmitter();

  private lastUpdatedProperty: Property;

  public update(property: Property) {
    this.updateProperty.emit(property);
    this.lastUpdatedProperty = property;
  }

  ngOnChanges() {
    isBrowser && setTimeout(() => this.initAccordion());
  }

  public redirectToProperty(property: Property) {
    this.router.navigate(['properties', property.slug]);
  }

  private initAccordion() {
    const accord$ = $('.accordion');
    new Foundation.Accordion(accord$);
  }

  constructor(private router: Router) { }
}