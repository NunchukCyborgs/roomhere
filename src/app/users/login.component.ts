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
  
  `],
  template: `
  <div>
    <button class="login-modal__close-button close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&times;</span>
    </button>

    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="email">Email</label>
        <input formControlName="email" type="email" class="form-control" id="email">
        <control-messages [control]="loginForm.controls.email"></control-messages>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input formControlName="password" type="password" class="form-control" id="password">
        <control-messages [control]="loginForm.controls.password"></control-messages>
      </div>
      <button type="submit" class="btn btn-default" [attr.disabled]="!loginForm.valid ? true : null">Login</button>
    </form>

    <div [class.hide]="!serverErrors.length">
      <h6>Uh oh! We had a problem logging you in with those credentials.</h6>

      <span *ngFor="let error of serverErrors">{{error}} </span>
    </div>
  </div>
  `
})
export class Login {
  public user: User = new User();
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
    this.userService.login(this.user)
      .catch((err: Response, caught: Observable<any>) => this.showErrors(err, caught))
      .subscribe((res: Response) => this.closeModal(res));
  }

  private closeModal(res: Response) {
    if (res.ok) {
      this.unsafe.tryUnsafeCode(() => $('.login-modal__close-button').click(), '$ is undefined');
    }
  }

  private showErrors(err: Response, caught: Observable<any>): Observable<Response> {
    this.serverErrors = err.json().errors;
    return Observable.of(err);
  }
}
