import { Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';

import { UserService } from './users/user.service';

// This generates the file, and we link to it in index.html
require('../assets/stylesheets/app.scss');
require('../assets/stylesheets/deferred.scss');

@Component({
  selector: 'app',
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
