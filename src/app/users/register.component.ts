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
  
  `],
  template: `
  <div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&times;</span>
    </button>

    <form [class.hide]="success" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="email">Email</label>
        <input formControlName="email" type="email" class="form-control" id="email">
        <control-messages [control]="registerForm.controls.email"></control-messages>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input formControlName="password" type="password" class="form-control" id="password">
        <control-messages [control]="registerForm.controls.password"></control-messages>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input formControlName="confirmPassword" type="password" class="form-control" id="confirmPassword">
        <control-messages [control]="registerForm.controls.confirmPassword">{{getConfirmPasswordMatchMessage()}}</control-messages>
      </div>
      <button type="submit" class="btn btn-default" [attr.disabled]="!registerForm.valid || getConfirmPasswordMatchMessage() ? true : null">Create an Account</button>
    </form>

    <div [class.hide]="!success">
      <h5>Success!</h5>

      <p>
        Alright, there's one last step to create an account. 
        Please check your email for a magic activation link and click to confirm you are as human as we think you are.
      </p>
    </div>

    <div [class.hide]="!serverErrors.length || success">
      <h6>Uh oh! We had a problem logging you in with those credentials.</h6>

      <span *ngFor="let error of serverErrors">{{error}}. </span>
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
