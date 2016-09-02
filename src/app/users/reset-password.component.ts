import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from './index';
import { ValidationService } from '../services/validation.service';
import { ControlMessages } from '../control-messages.component';

declare let $: any;

@Component({
  selector: 'reset-password',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  styles: [],
  template: `
  <div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
    <div class="row">
        <div class="medium-10 medium-push-1 columns">
            <div class="signup-panel">
                <form [class.hide]="success" [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()">
                    <p class="welcome">Pick a New Password</p>
                    <div class="form-group row collapse">
                        <div class="small-2 columns ">
                            <span class="prefix"><i class="icon-lock"></i></span>
                        </div>
                        <div class="small-10 columns ">
                            <input placeholder="password" formControlName="password" type="password" class="form-control" id="password">
                        </div>
                        <control-messages [control]="resetPasswordForm.controls.password"></control-messages>
                    </div>
                    <div class="form-group row collapse">
                        <div class="small-2 columns ">
                            <span class="prefix"><i class="icon-lock"></i></span>
                        </div>
                        <div class="small-10 columns ">
                            <input placeholder="confirm password" formControlName="confirmPassword" type="password" class="form-control" id="confirmPassword">
                        </div>
                        <control-messages [control]="resetPasswordForm.controls.confirmPassword">{{getConfirmPasswordMatchMessage()}}</control-messages>
                    </div>
                    <p class="text-center"><button type="submit" class="button large" [attr.disabled]="!resetPasswordForm.valid||getConfirmPasswordMatchMessage()?true:null">Reset Password</button></p>
                </form>
                <div [class.hide]="!success" class="callout success">
                    <h5>All done here!</h5>
                    <p>Your new password is set, good work!</p>
                </div>
                <div [class.hide]="!serverErrors.length || success" class="callout alert">
                    <h6>Uh oh! Something went wrong.</h6>
                    <span *ngFor="let error of serverErrors">{{error}}. </span>
                </div>
            </div>
        </div>
    </div>
  `
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
