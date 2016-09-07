import { Component, Input, AfterViewInit } from '@angular/core';
import { BASE_API_URL } from '../../config';
import { Property, PropertyService } from '../index';

declare let $: any;
declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'property-edit-image',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyEditImage {
  @Input() imageUrl: string;
  @Input() imageId: number;
  @Input() property: Property;
  public BASE_API_URL: string = BASE_API_URL;

  constructor(private propertyService: PropertyService) { }

  public delete() {
    this.propertyService.deleteImage(this.property, this.imageId).subscribe();
  }
}
