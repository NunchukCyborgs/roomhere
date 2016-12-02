import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class SuperAuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  public canActivate() {
    return this.userService.me$.map(i => i.superuser)
      .do(i => !i && this.redirectUser())
  }

  public redirectUser() {
    this.router.navigate(['/']);
  }
}
