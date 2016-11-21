import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'image-upload',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class ImageUpload {
  @Input() id: string;
}
