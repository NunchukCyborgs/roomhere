import { Component, Input, Output, EventEmitter } from '@angular/core';

declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'property-actions-group',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyActionsGroup  {
  @Input() actionText: string;
  @Input() tweetText: string;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() shareFacebook: EventEmitter<any> = new EventEmitter();
}