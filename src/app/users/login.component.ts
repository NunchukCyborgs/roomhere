import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from './index';

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

    <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" required [(ngModel)]="user.email" name="email" #email="ngModel">
        <div [hidden]="email.valid || email.pristine" class="alert alert-danger">
          Email is required
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" required [(ngModel)]="user.password" name="password" #password="ngModel">
        <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
          Password is required
        </div>
      </div>
      <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Login</button>
    </form>

    <div [hidden]="!errors.length">
      <h6>Uh oh! We had a problem logging you in with those credentials.</h6>

      <span *ngFor="let error of errors">{{error}} </span>
    </div>
  </div>
  `
})
export class Login {
  public user: User = new User();
  public errors: string[] = [];
  
  constructor(private userService: UserService) { }

  public onSubmit() {
    this.userService.login(this.user)
      .catch((err: Response, caught: Observable<any>) => this.showErrors(err, caught))
      .subscribe((res: Response) => this.closeModal(res));
  }

  private closeModal(res: Response) {
    if (res.ok) {
      console.log('closed modal');
      $('.login-modal__close-button').click();
    }
  }

  private showErrors(err: Response, caught: Observable<any>): Observable<Response> {
    console.log(err);
    this.errors = err.json().errors;
    return Observable.of(err);
  }
}
