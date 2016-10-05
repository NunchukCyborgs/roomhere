import { Component, Input } from '@angular/core';
import { Property } from '../property';

@Component({
  selector: 'no-property-info',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class NoPropertyInfo {
  @Input() property: Property;
}
