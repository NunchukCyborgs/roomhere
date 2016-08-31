import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from './index';
import { ValidationService } from '../services/validation.service';
import { ControlMessages } from '../control-messages.component';

declare let $: any;

@Component({
  selector: 'register',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  styles: [`
.signup-panel {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 30px;
}
.signup-panel i {
  font-size: 30px;
  line-height: 50px;
  color: #999;
}
.signup-panel form input, .signup-panel form span {
  height: 50px;
}
.signup-panel .welcome {
  font-size: 26px;
  text-align: center;
  margin-left: 0;
}
.signup-panel p {
  font-size: 13px;
  font-weight: 200;
}
.signup-panel .button {
  width: 50%;
}
.signup-panel form input, .signup-panel form span {
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
.signup-panel .button {
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
            <div class="signup-panel">
                <p class="welcome"> Welcome to Roomhere!</p>
                <form [class.hide]="success" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                    <div class="form-group row collapse">
                        <div class="small-2 columns">
                            <span class="prefix"><i class="icon-mail"></i></span>
                        </div>
                        <div class="small-10  columns">
                            <input type="email" placeholder="email" formControlName="email" class="form-control" id="email">
                        </div>
                        <control-messages [control]="registerForm.controls.email" class="alert"></control-messages>
                    </div>
                    <div class="form-group row collapse">
                        <div class="small-2 columns ">
                            <span class="prefix"><i class="icon-lock"></i></span>
                        </div>
                        <div class="small-10 columns ">
                            <input placeholder="password" formControlName="password" type="password" class="form-control" id="password">
                        </div>
                        <control-messages [control]="registerForm.controls.password"></control-messages>
                    </div>
                    <div class="form-group row collapse">
                        <div class="small-2 columns ">
                            <span class="prefix"><i class="icon-lock"></i></span>
                        </div>
                        <div class="small-10 columns ">
                            <input placeholder="confirm password" formControlName="confirmPassword" type="password" class="form-control" id="confirmPassword">
                        </div>
                        <control-messages [control]="registerForm.controls.confirmPassword">{{getConfirmPasswordMatchMessage()}}</control-messages>
                    </div>
                    <p class="text-center"><button type="submit" class="button large" [attr.disabled]="!registerForm.valid||getConfirmPasswordMatchMessage()?true:null">Create an Account!</button></p>
                </form>
                <p class="text-center" [class.hide]="success">Already have an account? <a data-open="LoginModal">Login here</a>
                </p>
                <div [class.hide]="!success" class="callout success">
                    <h5>Success!</h5>
                    <p>Alright, there's one last step to create an account. Please check your email for a magic activation link and click to confirm you are as human as we think you are.
                    </p>
                </div>
                <div [class.hide]="!serverErrors.length || success" class="callout alert">
                    <h6>Uh oh! We had a problem logging you in with those credentials.</h6>
                    <span *ngFor="let error of serverErrors">{{error}}. </span>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Register {
  public success: boolean = false;
  public serverErrors: string[] = [];
  public registerForm: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public getConfirmPasswordMatchMessage() {
    const password = this.registerForm.controls.password;
    const confirm = this.registerForm.controls.confirmPassword;
    return password.value !== confirm.value && password.touched && confirm.touched ? 'Passwords do not match. ' : '';
  }

  public onSubmit() {
    const user = new User({
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      password_confirmation: this.registerForm.controls.confirmPassword.value,
    });

    this.userService.register(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.success = res.ok);
  }
}
