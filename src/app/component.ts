import { Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';

import { UserService } from './users/index';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('../assets/stylesheets/app.scss').toString()], // Styles here are global, be careful
  templateUrl: 'template.html' 
})
export class App {
  public hasAuth$: Observable<boolean>;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.hasAuth$ = this.userService.hasAuth$;
  }

  ngOnInit() {
    this.router.events.subscribe(() => isBrowser && $('body').foundation())
    this.route.queryParams
      .subscribe(params => { 
        if (params['reset_password'] === 'true') {
          isBrowser && $('#ResetPasswordModal').foundation('open');
        }
      });
  }

  logout() {
    this.userService.logout();
  }
}
