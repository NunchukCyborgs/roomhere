import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Property, PropertyAmenities, PropertyEditImage } from '../index';
import { ImageUpload } from '../../components/image-upload/component';
import { UploadProgress } from '../../components/upload-progress/component';
import { NumberTicker } from '../../components/number-ticker/component';

declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'property-edit',
  directives: [PropertyAmenities, ImageUpload, NumberTicker, UploadProgress, PropertyEditImage],
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyEdit  {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input() property: Property;
  @Output() propertyChange: EventEmitter<any> = new EventEmitter();

  public onSubmit() {
    this.propertyChange.emit(this.property);
    this.submit.emit(true);
  }
}