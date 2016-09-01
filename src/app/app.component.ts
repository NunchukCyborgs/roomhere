import { Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { PropertyService } from './properties/index';
import { GoogleApiService } from './services/google-api.service';
import { HttpService } from './services/http.service';
import { ServerUnsafeService } from './services/server-unsafe.service';
import { FacetsService } from './services/facets.service';
import { SeoService } from './services/seo.service';
import { SocialService } from './services/social.service'
import { UtilService } from './services/util.service';
import { Login, Register, ForgotPassword, ResetPassword, UserService } from './users/index';

declare let $: any;
declare let require: (string) => string;

@Component({
  selector: 'app',
  directives: [...ROUTER_DIRECTIVES, Login, Register, ForgotPassword, ResetPassword],
  providers: [FormBuilder, PropertyService, GoogleApiService, UserService, HttpService, 
  ServerUnsafeService, FacetsService, SeoService, SocialService, UtilService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('../assets/stylesheets/app.scss').toString()],
  // Styles here are global, be careful
  template: `
  <div>
    <div class="top-bar" id="top-menu">
      <div class="top-bar-title">
        <img src="/assets/images/logo_hor_dpPurp_205x58.png" alt="Roomhere"/>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li><a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Home</a></li>
          <li *ngIf="!(hasAuth$ | async)"><a data-open="RegisterModal">
            Create an Account</a>
          </li>
          <li *ngIf="!(hasAuth$ | async)"><a data-open="LoginModal">Login</a></li>
          <li *ngIf="hasAuth$ | async"><a (click)="logout()">Log Out</a></li>
        </ul>
      </div>
    </div>

    <div class="row left-margin-fix full-width">
        <main>
          <router-outlet></router-outlet>
        </main>
        <div hidden>
          <register class="reveal small" id="RegisterModal" data-reveal></register>
          <login class="reveal small" id="LoginModal" data-reveal></login>
          <forgot-password class="reveal small" id="ForgotPasswordModal" data-reveal></forgot-password>
          <reset-password class="reveal small" id="ResetPasswordModal" data-reveal></reset-password>
        </div>
    </div>
  `
})
export class App implements OnInit {
  public hasAuth$: Observable<boolean>;
  constructor(private userService: UserService, private unsafe: ServerUnsafeService, private router: Router) {
    this.hasAuth$ = this.userService.hasAuth$;
  }
  
  ngOnInit() {
    this.router.events.subscribe(() => this.unsafe.tryUnsafeCode(() => $('body').foundation(), '$ not defined'))
    this.router.routerState.queryParams
      .subscribe(params => { 
        if (params['reset_password'] === 'true') {
          this.unsafe.tryUnsafeCode(() => $('#ResetPasswordModal').foundation('open'), '$ is undefined');
        }
      });
  }

  logout() {
    this.userService.logout();
  }
}
