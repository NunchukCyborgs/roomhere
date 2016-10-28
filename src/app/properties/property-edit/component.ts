import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Property, Type } from '../../shared/dtos/property';
import { ImageUpload } from '../../shared/components/image-upload/component';
import { UploadProgress } from '../../shared/components/upload-progress/component';
import { NumberTicker } from '../../shared/components/number-ticker/component';
import { ImageUploadService, PendingFile } from '../../shared/services/image-upload.service';

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

  public toggleAvailableAt(): void {
    this.property.available_at = this.property.available_at ? null : new Date().toISOString();
  }

  ngOnChanges() {
    this.FileUploadId = `FileUpload${this.property && this.property.id}`;
    this.pendingFiles$ = this.imageUploadService.pendingFiles$;
    setTimeout(() => this.imageUploadService.uploaderInit(this.FileUploadId, this.property));
  }
}
