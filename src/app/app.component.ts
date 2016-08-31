import { Component, Directive, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { PropertyService } from './properties/index';
import { GoogleApiService } from './services/google-api.service';
import { HttpService } from './services/http.service';
import { ServerUnsafeService } from './services/server-unsafe.service';
import { FacetsService } from './services/facets.service';
import { SeoService } from './services/seo.service';
import { SocialService } from './services/social.service'
import { Login, Register, UserService } from './users/index';

declare let $: any;
declare let require: (string) => string;

@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    Login,
    Register
  ],
  providers: [FormBuilder, PropertyService, GoogleApiService, UserService, HttpService, 
  ServerUnsafeService, FacetsService, SeoService, SocialService],
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
          <li *ngIf="!(hasAuth$ | async)"><a data-open="RegisterModal">Create an Account<register class="reveal small" id="RegisterModal" data-reveal></register></a></li>
          <li *ngIf="!(hasAuth$ | async)"><a data-open="LoginModal">Login<login class="reveal small" id="LoginModal" data-reveal></login></a></li>
          <li *ngIf="hasAuth$ | async"><a (click)="logout()">Log Out</a></li>
        </ul>
      </div>
    </div>

    <div class="row left-margin-fix full-width">
        <main>
          <router-outlet></router-outlet>
        </main>
    </div>
  `
})
export class App implements AfterViewInit {
  public hasAuth$: Observable<boolean>;
  constructor(private userService: UserService, private unsafe: ServerUnsafeService) {
    this.hasAuth$ = this.userService.hasAuth$;
  }
  
  ngAfterViewInit() {
    this.unsafe.tryUnsafeCode(() => $('.top-bar-right .menu').foundation(), '$ not defined');
  }

  logout() {
    this.userService.logout();
  }
}
