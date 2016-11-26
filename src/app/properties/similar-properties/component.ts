import { Component, Input } from '@angular/core';
import { Property } from '../../shared/dtos/property';

@Component({
  selector: 'similar-properties',
  styleUrls: [],
  templateUrl: 'template.html',
})
export class SimilarProperties {
  @Input() property: Property;
}
