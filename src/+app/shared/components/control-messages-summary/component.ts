import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'control-messages-summary',
  styles: [`
  .wrapper {
    color: red;
  }
  `],
  template: '<div class="wrapper"><ng-content></ng-content><div *ngIf="formGroup"><span *ngFor="let error of errors">{{error}}. </span></div></div>',
})
export class ControlMessagesSummary {
  @Input() formGroup: FormGroup;

  public get errors(): string[] {
    let errors: string[] = [];

    for (let propertyName in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(propertyName)) {
        let control = <FormControl>this.formGroup.controls[propertyName];
        errors = errors.concat(this.getErrors(control));
      }
    }

    return errors;
  }

  private getErrors(control: FormControl): string[] {
    let errors = [];

    for (let propertyName in control.errors) {
      if (control.errors.hasOwnProperty(propertyName) && control.touched) {
        errors.push(ValidationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]));
      }
    }

    return errors;
  }
}