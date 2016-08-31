import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from './index';
import { ServerUnsafeService } from '../services/server-unsafe.service';
import { ValidationService } from '../services/validation.service';
import { ControlMessages } from '../control-messages.component';

declare let $: any;

@Component({
  selector: 'login',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  styles: [`
  .login-panel {
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 30px;
}
.login-panel i {
  font-size: 30px;
  line-height: 50px;
  color: #999;
}
.login-panel form input, .login-panel form span {
  height: 50px;
}
.login-panel .welcome {
  font-size: 26px;
  text-align: center;
  margin-left: 0;
}
.login-panel p {
  font-size: 13px;
  font-weight: 200;
}
.login-panel .button {
    width: 50%;
}
.login-panel form input, .login-panel form span {
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
.login-panel .button {
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
            <div class="login-panel">
                <p class="welcome">Login With Your Email Account!</p>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                    <div class="form-group row collapse">
                        <div class="small-2 columns">
                            <span class="prefix"><i class="icon-mail"></i></span>
                        </div>
                        <div class="small-10  columns">
                            <input formControlName="email" type="email" class="form-control" id="email" placeholder="email">
                        </div>
                        <control-messages [control]="loginForm.controls.email"></control-messages>
                    </div>
                    <div class="form-group row collapse">
                        <div class="small-2 columns ">
                            <span class="prefix"><i class="icon-lock"></i></span>
                        </div>
                        <div class="small-10 columns ">
                            <input placeholder="password" formControlName="confirmPassword" type="password" class="form-control" id="confirmPassword">
                        </div>
                        <control-messages [control]="loginForm.controls.password"></control-messages>
                    </div>
                    <p class="text-center"><a type="submit" class="text-center button large" [attr.disabled]="!loginForm.valid?true:null">Log In</a></p>
                </form>
                <p class="text-center"><a href="#">Forgot your password?</a>
                </p>
            </div>
            <div [class.hide]="!serverErrors.length">
                <h6>Uh oh! We had a problem logging you in with those credentials.</h6>
                <span *ngFor="let error of serverErrors">{{error}} </span>
            </div>
        </div>
    </div>
  `
})
export class Login {
  public serverErrors: string[] = [];
  public loginForm: any;

  constructor(private userService: UserService, private unsafe: ServerUnsafeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public onSubmit() {
    const user = new User({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    });
    
    this.userService.login(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.closeModal(res));
  }

  private closeModal(res: Response) {
    if (res.ok) {
      this.unsafe.tryUnsafeCode(() => $('.login-modal__close-button').click(), '$ is undefined');
    }
  }
}
