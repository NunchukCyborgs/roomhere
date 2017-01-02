import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'control-messages-summary',
  styleUrls: ['styles.css'],
  templateUrl: 'template.html',
})
export class ControlMessagesSummary {
  @Input() formGroup: FormGroup;

  public get errors(): string[] {
    let errors: string[] = [];

    for (let propertyName in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(propertyName)) {
        let control = <FormControl>this.formGroup.controls[propertyName];
        let error = this.getError(control);
        if (error) {
          errors.push(this.formatErrors(propertyName, error));
        }
      }
    }

    return errors;
  }

  private getError(control: FormControl): string {
    for (let propertyName in control.errors) {
      if (control.errors.hasOwnProperty(propertyName) && control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
      }
    }
  }

  private formatErrors(controlName: string, error: string): string {
    let formattedControlName = controlName.substr(0, 1).toUpperCase() + controlName.substr(1);
    let formattedError = error.substr(0, 1).toLowerCase() + error.substr(1);

    return `${formattedControlName} ${formattedError}`;
  }
}