import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PropertyActionState } from '../../shared/services/property-action-state.service';

@Component({
  selector: 'property-actions-group',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class PropertyActionsGroup  {
  @Input() actionState: PropertyActionState;
  @Input() tweetText: string;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() shareFacebook: EventEmitter<any> = new EventEmitter();
}