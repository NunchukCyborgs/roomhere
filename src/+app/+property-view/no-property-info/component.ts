import { Component, Input } from '@angular/core';
import { Property } from '../../shared/dtos/property';

@Component({
  selector: 'no-property-info',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class NoPropertyInfo {
  @Input() property: Property;
  @Input() hasAuth: boolean;
}
