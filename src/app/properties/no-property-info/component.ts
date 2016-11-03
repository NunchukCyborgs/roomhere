import { Component, Input } from '@angular/core';
import { Property } from '../../shared/dtos/property';

@Component({
  selector: 'no-property-info',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class NoPropertyInfo {
  @Input() property: Property;
  @Input() hasAuth: boolean;
}
