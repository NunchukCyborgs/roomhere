import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from './index'; 

declare let $: any;

@Component({
  selector: 'register',
  directives: [],
  styles: [`
  
  `],
  template: `
  <div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&times;</span>
    </button>

    <form [attr.hidden]="success" (ngSubmit)="onSubmit()" #registerForm="ngForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" required [(ngModel)]="user.email" name="email">
        <div [attr.hidden]="registerForm.controls.email?.valid || registerForm.controls.email?.pristine" class="alert alert-danger">
          Email is required
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" required [(ngModel)]="user.password" name="password">
        <div [attr.hidden]="registerForm.controls.password?.valid || registerForm.controls.password?.pristine" class="alert alert-danger">
          Password is required
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" required [(ngModel)]="user.password_confirmation" name="confirmPassword">
        <div [attr.hidden]="registerForm.controls.confirmPassword?.valid || registerForm.controls.confirmPassword?.pristine" class="alert alert-danger">
          Password is required
        </div>
      </div>
      <button type="submit" class="btn btn-default" [attr.disabled]="!registerForm.form.valid">Create Account</button>
    </form>

    <div [attr.hidden]="!success">
      <h5>Success!</h5>

      <p>
        Alright, there's one last step to create an account. 
        Please check your email for a magic activation link and click to confirm you are as human as we think you are.
      </p>
    </div>

    <div [attr.hidden]="!errors.length || success">
      <h6>Uh oh! We had a problem logging you in with those credentials.</h6>

      <span *ngFor="let error of errors">{{error}}. </span>
    </div>
  </div>
  `
})
export class Register {
  public user: User = new User();
  public success: boolean = false;
  public errors: string[] = [];

  constructor(private userService: UserService) { }

  public onSubmit() {
    this.userService.register(this.user)
      .catch((err: Response, caught: Observable<any>) => this.showErrors(err, caught))
      .subscribe((res: Response) => this.success = res.ok);
  }

  private showErrors(err: Response, caught: Observable<any>): Observable<Response> {
    this.errors = err.json().errors.full_messages;
    return Observable.of(err);
  }
}
