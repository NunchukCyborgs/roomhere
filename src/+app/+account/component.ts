import { Component, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/services/user.service';
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'account-page',
  template: '<router-outlet></router-outlet>' 
})
export class AccountPage {
  constructor(private router: Router, private userService: UserService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.setTitle('Dashboard');

    this.userService.hasAuth$
      .do(hasAuth => !hasAuth && this.router.navigate(['/']))
      .subscribe();

    this.userService.loadMe()
      .map(i => i.superuser)
      .do(isSuper => isSuper && this.router.navigate(['/account/super']))
      .subscribe();
  }
}
