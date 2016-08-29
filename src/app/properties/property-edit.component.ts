import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PropertyService, Property } from './index';

@Component({
  moduleId: __filename,
  selector: 'property-edit',
  styles: [`

  `],
  templateUrl: './property-edit.component.html'
})
export class PropertyEdit {
  @Input() property: Property;
  @Output() save: EventEmitter<any> = new EventEmitter();

  public onSubmit() {
    console.log('saving new property: ', this.property);
    this.save.emit(this.property);

    // router.navigate?
  }
}
