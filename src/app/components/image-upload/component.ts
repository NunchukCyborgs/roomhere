import { Component, Input, Output, EventEmitter } from '@angular/core';

declare let require: (string) => string;

@Component({
  selector: 'image-upload',
  // styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class ImageUpload {
  @Input() id: string;
}
