import { Component } from '@angular/core';
import { User, UserService } from './index';

@Component({
  selector: 'login',
  directives: [],
  styles: [`
  
  `],
  template: `
  <div>
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" required [(ngModel)]="user.email" name="email" #email="ngModel">
        <div [hidden]="email.valid || email.pristine" class="alert alert-danger">
          Email is required
        </div>
      </div>
      <div class="form-group">
        <label for="password">password</label>
        <input type="password" class="form-control" id="password" required [(ngModel)]="user.password" name="password" #password="ngModel">
        <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
          Password is required
        </div>
      </div>
      <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Login</button>
    </form>  
  </div>
  `
})
export class Login {
  public user: User = new User();

  constructor(private userService: UserService) { }

  public onSubmit() {
    this.userService.login(this.user)
      .subscribe(i => console.log('logged in, now what?'));
  }
}
