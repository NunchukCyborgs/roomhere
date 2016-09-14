import { Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ServerUnsafeService } from './services/server-unsafe.service';
import { UserService } from './users/index';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('../assets/stylesheets/app.scss').toString()],
  // Styles here are global, be careful
  template: `
  <div>
    <div class="top-bar" id="top-menu">
      <div class="top-bar-title">
        <a [routerLink]="['']"><img src="/assets/images/logo_hor_dpPurp_205x58.png" alt="Roomhere"/></a>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li><a [routerLinkActive]="['active', 'router-link-active']" [routerLink]="['']">Home</a></li>
          <li *ngIf="!(hasAuth$ | async)"><a data-open="RegisterModal">
            Create an Account</a>
          </li>
          <li *ngIf="!(hasAuth$ | async)"><a data-open="LoginModal">Login</a></li>
          <li *ngIf="hasAuth$ | async"><a (click)="logout()">Log Out</a></li>
        </ul>
      </div>
    </div>

    <main>
      <router-outlet></router-outlet>
    </main>
    <div hidden>
      <register class="reveal small" id="RegisterModal" data-reveal></register>
      <login class="reveal small" id="LoginModal" data-reveal></login>
      <forgot-password class="reveal small" id="ForgotPasswordModal" data-reveal></forgot-password>
      <reset-password class="reveal small" id="ResetPasswordModal" data-reveal></reset-password>
    </div>
    <sticky-footer></sticky-footer>
  `
})
export class App {
  public hasAuth$: Observable<boolean>;
  constructor(private userService: UserService, private unsafe: ServerUnsafeService, private router: Router) {
    this.hasAuth$ = this.userService.hasAuth$;
  }

  ngOnInit() {
    this.router.events.subscribe(() => this.unsafe.tryUnsafeCode(() => $('body').foundation(), '$ not defined'))
    // this.router.routerState.queryParams
    //   .subscribe(params => { 
    //     if (params['reset_password'] === 'true') {
    //       this.unsafe.tryUnsafeCode(() => $('#ResetPasswordModal').foundation('open'), '$ is undefined');
    //     }
    //   });
  }

  logout() {
    this.userService.logout();
  }
}
