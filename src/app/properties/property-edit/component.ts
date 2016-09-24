import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Property, Type } from '../property';
import { ImageUpload } from '../../components/image-upload/component';
import { UploadProgress } from '../../components/upload-progress/component';
import { NumberTicker } from '../../components/number-ticker/component';
import { ImageUploadService, PendingFile } from '../../services/image-upload.service';

@Component({
  selector: 'property-edit',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyEdit {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input() property: Property;
  public pendingFiles$: Observable<PendingFile[]>;
  public FileUploadId: string;

  constructor(private imageUploadService: ImageUploadService) { }

  public onSubmit(): void {
    this.submit.emit(this.property);
  }

  public toggleType(typeName: string): void {
    const type = this.property.types[this.property.types.map(i => i.name).indexOf(typeName)];
    type.active = !type.active;
  }

  ngOnChanges() {
    this.FileUploadId = `FileUpload${this.property && this.property.id}`;
    this.pendingFiles$ = this.imageUploadService.pendingFiles$;
    setTimeout(() => this.imageUploadService.uploaderInit(this.FileUploadId, this.property));
  }
}
