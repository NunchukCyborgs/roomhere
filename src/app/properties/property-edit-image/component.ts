import { Component, Input, AfterViewInit } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';

@Component({
  selector: 'property-edit-image',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyEditImage {
  @Input() imageUrl: string;
  @Input() imageId: number;
  @Input() property: Property;

  constructor(private propertyService: PropertyService) { }

  public delete() {
    this.propertyService.deleteImage(this.property, this.imageId).subscribe();
  }
}
