import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'image-upload',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class ImageUpload {
  @Input() id: string;
}
