import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Injectable()
export class AccountAuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  public canActivate() {
    return this.userService
      .hasAuth$
      .do(i => !i && this.redirectUser());
  }

  public redirectUser() {
    this.router.navigate(['/']);
  }
}
