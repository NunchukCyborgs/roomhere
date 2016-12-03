import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'property-picker',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class PropertyPicker {
  @Output() propertyPicked: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
