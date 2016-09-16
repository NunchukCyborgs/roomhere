import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PropertyActionState } from '../index';
;

@Component({
  
  selector: 'property-actions-group',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyActionsGroup  {
  @Input() actionState: PropertyActionState;
  @Input() tweetText: string;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() shareFacebook: EventEmitter<any> = new EventEmitter();
}