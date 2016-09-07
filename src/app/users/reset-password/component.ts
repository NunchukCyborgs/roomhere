import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from '../index';
import { ValidationService } from '../../services/validation.service';
import { ControlMessages } from '../../components/control-messages/component';

declare let $: any;
declare let require: (string) => string;

@Component({
  selector: 'reset-password',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  styles:[require('../modal/modal.component.scss').toString(), require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class ResetPassword {
  public success: boolean = false;
  public serverErrors: string[] = [];
  public resetPasswordForm: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public getConfirmPasswordMatchMessage() {
    const password = this.resetPasswordForm.controls.password;
    const confirm = this.resetPasswordForm.controls.confirmPassword;
    return password.value !== confirm.value && password.touched && confirm.touched ? 'Passwords do not match. ' : '';
  }

  public onSubmit() {
    const user = new User({
      password: this.resetPasswordForm.controls.password.value,
      password_confirmation: this.resetPasswordForm.controls.confirmPassword.value,
    });

    this.userService.resetPassword(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.success = res.ok);
  }
}
