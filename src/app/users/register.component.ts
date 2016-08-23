import { Component } from '@angular/core';
import { User, UserService } from './index'; 

@Component({
  selector: 'register',
  directives: [],
  styles: [`
  
  `],
  template: `
  <div>
    <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
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
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" required [(ngModel)]="user.password_confirmation" name="confirmPassword" #confirmPassword="ngModel">
        <div [hidden]="confirmPassword.valid || confirmPassword.pristine" class="alert alert-danger">
          Password is required
        </div>
      </div>
      <button type="submit" class="btn btn-default" [disabled]="!registerForm.form.valid">Create Account</button>
    </form>  
  </div>
  `
})
export class Register {
  public user: User = new User();

  constructor(private userService: UserService) {

  }

  public onSubmit() {
    this.userService.register(this.user)
      .subscribe(i => console.log('register, annnnd?'))
  }
}
