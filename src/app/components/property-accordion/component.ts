import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router } from '@angular/router';

import { Property } from '../../properties/property';

@Component({
  selector: 'property-accordion',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyAccordion {
  @Input() properties: Property[];
  @Output() updateProperty: EventEmitter<any> = new EventEmitter();

  private readyForChanges: boolean = false;

  public update(property: Property) {
    this.updateProperty.emit(property);
    this.readyForChanges = true;
  }

  ngOnChanges() {
    if (isBrowser) {
      setTimeout(() => {
        const accord$ = $('.accordion');
        new Foundation.Accordion(accord$);
        if (this.readyForChanges) {
          accord$.foundation('down', $(''));
          this.readyForChanges = false;
        }
      });
    }
  }

  redirectToProperty(property: Property) {
    this.router.navigate(['properties', property.slug]);
  }

  constructor(private router: Router) {}
}