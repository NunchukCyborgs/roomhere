import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from './index';
import { ServerUnsafeService } from '../services/server-unsafe.service';

declare let $: any;

@Component({
  selector: 'login',
  directives: [],
  styles: [`
  
  `],
  template: `
  <div>
    <button class="login-modal__close-button close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&times;</span>
    </button>

    <form (ngSubmit)="onSubmit(loginForm)" #loginForm="ngForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" required [(ngModel)]="user.email" name="email" >
        <div [class.hide]="loginForm.controls.email?.valid || loginForm.controls.email?.pristine" class="alert alert-danger">
          Email is required
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" required [(ngModel)]="user.password" name="password">
        <div [class.hide]="loginForm.controls.password?.valid || loginForm.controls.password?.pristine" class="alert alert-danger">
          Password is required
        </div>
      </div>
      <button type="submit" class="btn btn-default" [attr.disabled]="!loginForm.form.valid ? true : null">Login</button>
    </form>

    <div [class.hide]="!errors.length">
      <h6>Uh oh! We had a problem logging you in with those credentials.</h6>

      <span *ngFor="let error of errors">{{error}} </span>
    </div>
  </div>
  `
})
export class Login {
  public user: User = new User();
  public errors: string[] = [];

  constructor(private userService: UserService, private unsafe: ServerUnsafeService) { }

  public onSubmit(f) {
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
    this.errors = err.json().errors;
    return Observable.of(err);
  }
}
