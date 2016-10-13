import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PropertyActionState } from '../../services/property-action-state.service';

@Component({
  selector: 'property-actions-group',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyActionsGroup  {
  @Input() actionState: PropertyActionState;
  @Input() tweetText: string;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() shareFacebook: EventEmitter<any> = new EventEmitter();
}