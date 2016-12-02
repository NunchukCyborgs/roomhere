import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class SuperAuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  public canActivate() {
    this.userService.me$.map(i => i.superuser)
      .subscribe(i => !i && this.redirectUser());

      return true; // We should be able to just return an Observable. But it doesn't work. Meh. 
  }

  public redirectUser() {
    this.router.navigate(['/']);
  }
}
