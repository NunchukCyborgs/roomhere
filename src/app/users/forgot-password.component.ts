import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService, User } from './index';
import { ServerUnsafeService } from '../services/server-unsafe.service';
import { ValidationService } from '../services/validation.service';
import { ControlMessages } from '../control-messages.component';

declare let $: any;

@Component({
  selector: 'forgot-password',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  styles: [`
  .forgot-password-panel {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 30px;
}
.forgot-password-panel i {
  font-size: 30px;
  line-height: 50px;
  color: #999;
}
.forgot-password-panel form input, .forgot-password-panel form span {
  height: 50px;
}
.forgot-password-panel .welcome {
  font-size: 26px;
  text-align: center;
  margin-left: 0;
}
.forgot-password-panel p {
  font-size: 13px;
  font-weight: 200;
}
.forgot-password-panel .button {
    width: 50%;
}
.forgot-password-panel form input, .forgot-password-panel form span {
    height: 50px;
}
span.prefix, label.prefix {
    background: #f2f2f2;
    border-color: #d9d9d9;
    border-right: none;
    color: #333;
}
.prefix, .postfix {
    display: block;
    position: relative;
    z-index: 2;
    text-align: center;
    width: 100%;
    padding-top: 0;
    padding-bottom: 0;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    font-size: 0.875em;
    height: 2.3125em;
    line-height: 2.3125em;
}
@media screen and (max-width: 39.9375em) {
.forgot-password-panel .button {
    width: 90%;
}
}
  `],
  template: `
<div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
    <div class="row">
        <div class="medium-10 medium-push-1 columns">
            <div class="forgot-password-panel">
                <p class="welcome">Reset your password</p>
                <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
                    <div class="form-group row collapse">
                        <div class="small-2 columns">
                            <span class="prefix"><i class="icon-mail"></i></span>
                        </div>
                        <div class="small-10  columns">
                            <input formControlName="email" type="email" class="form-control" id="email" placeholder="email">
                        </div>
                        <control-messages [control]="forgotPasswordForm.controls.email"></control-messages>
                    </div>
                    <p class="text-center"><button type="submit" class="text-center button large" [attr.disabled]="!forgotPasswordForm.valid?true:null">Reset Password</button></p>
                </form>
                <div [class.hide]="!success" class="callout success">
                    <h5>Success!</h5>
                    <p>Check your email ({{forgotPasswordForm.controls.email.value}}) for the link to reset your password</p>
                </div>
                <div [class.hide]="!serverErrors.length" class="callout alert">
                  <h6>Uh oh! Something went wrong.</h6>
                  <span *ngFor="let error of serverErrors">{{error}} </span>
                </div>
            </div>
        </div>
    </div>
  `
})
export class ForgotPassword {
  public success: boolean = false;
  public serverErrors: string[] = [];
  public forgotPasswordForm: any;

  constructor(private userService: UserService, private unsafe: ServerUnsafeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
    });
  }

  public onSubmit() {
    const user = new User({
      email: this.forgotPasswordForm.controls.email.value,
    });
    
    this.userService.resetPassword(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.success = true);
  }
}
