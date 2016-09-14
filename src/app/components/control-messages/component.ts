import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

;

@Component({
  selector: 'control-messages',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class ControlMessages {
  @Input() control: FormControl;

  public get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}