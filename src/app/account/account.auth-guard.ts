import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/services/user.service';

@Injectable()
export class AccountAuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  public canActivate() {
    !this.userService.hasAuth && this.redirectUser();
    return this.userService.hasAuth;
  }

  public redirectUser() {
    this.router.navigate(['/']);
  }
}
