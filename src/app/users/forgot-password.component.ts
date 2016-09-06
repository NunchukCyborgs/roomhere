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
 styles:[require('./modal/modal.component.scss').toString()],
  template: `
<div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
    <div class="row">
        <div class="medium-10 medium-push-1 columns">
            <div class="forgot-password-panel">
                <form [class.hide]="success" [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
                    <p class="welcome">Reset your password</p>
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
                <div [class.hide]="!success || serverErrors.length" class="callout success">
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
    
    this.userService.sendResetPasswordLink(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.success = true);
  }
}
