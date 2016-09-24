import { Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';

import { UserService } from './users/user.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('../assets/stylesheets/app.scss').toString()], // Styles here are global, be careful
  template: require('./template.html').toString()
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
        this.hasAuth$.flatMap(() => this.route.queryParams)
          .subscribe(params => {
            if (isBrowser && this.userService.hasAuth) {
              if (params['reset_password'] === 'true') {
                $('#ResetPasswordModal').foundation('open');
              } else if (params['open_settings'] === 'true') {
                $('#SettingsModal').foundation('open');
              }
            }
          });
      });
  }

  logout() {
    this.userService.logout();
  }
}
