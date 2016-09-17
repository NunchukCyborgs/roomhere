import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isBrowser } from 'angular2-universal';

import { Property } from '../../properties/index';

@Component({
  selector: 'property-accordion',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyAccordion  {
  @Input() properties: Property[];
  @Output() updateProperty: EventEmitter<any> = new EventEmitter();

  private readyForChanges: boolean = false;

  public update(property: Property) {
    this.updateProperty.emit(property);
    this.readyForChanges = true;
  }

  ngOnChanges() {
    this.readyForChanges && isBrowser && $('.accordion').foundation('down', $());
  }
}