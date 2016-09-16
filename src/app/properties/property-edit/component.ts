import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Property, PropertyAmenities, PropertyEditImage } from '../index';
import { ImageUpload } from '../../components/image-upload/component';
import { UploadProgress } from '../../components/upload-progress/component';
import { NumberTicker } from '../../components/number-ticker/component';
import { ImageUploadService, PendingFile } from '../../services/image-upload.service';

@Component({
  selector: 'property-edit',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyEdit  {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input() property: Property;
  public pendingFiles$: Observable<PendingFile[]>;

  constructor(private imageUploadService: ImageUploadService) {}

  public onSubmit() {
    this.submit.emit(this.property);
  }

  ngAfterViewInit() {
    this.pendingFiles$ = this.imageUploadService.pendingFiles$;
    this.imageUploadService.uploaderInit('FileUpload', this.property);
  }
}
