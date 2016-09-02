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
   styles:[require('./modal/modal.component.scss').toString()],
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
                            <input placeholder="password" formControlName="password" type="password" class="form-control" id="password">
                        </div>
                        <control-messages [control]="loginForm.controls.password"></control-messages>
                    </div>
                    <p class="text-center"><button type="submit" class="text-center button large" [attr.disabled]="!loginForm.valid?true:null">Log In</button></p>
                </form>
                <p class="text-center"><a (click)="closeModal()" data-open="ForgotPasswordModal">Forgot your password?</a>
                </p>
                <div [class.hide]="!serverErrors.length" class="callout alert">
                <h6>Uh oh! We had a problem logging you in with those credentials.</h6>
                <span *ngFor="let error of serverErrors">{{error}} </span>
            </div>
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

  private closeModal(res?: Response) {
    if (!res || res.ok) {
      this.unsafe.tryUnsafeCode(() => $('login .close-button').click(), '$ is undefined');
    }
  }
}
