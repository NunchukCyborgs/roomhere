import { Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';

import { UserService } from './users/index';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('../assets/stylesheets/app.scss').toString()],
  // Styles here are global, be careful
  template: `
  <div>
    


        <div class="row fullwidth">

        <div class="title-bar" data-responsive-toggle="main-menu" data-hide-for="large" style="display: block;">

          <button class="menu-icon" type="button" data-toggle=""></button>

          <div class="title-bar-title">Menu</div>

        </div>

        <div class="top-bar" id="main-menu" style="display: none;">
            

          <div class="top-bar-left">
              <ul class="menu nohover vertical large-horizontal dropdown" data-responsive-menu="drilldown medium-dropdown" role="menubar" data-dropdown-menu="mfvu74-dropdown-menu">
              <li role="menuitem">
                <a class="aPadTop" [routerLink]="['']"><img src="/assets/images/logo_hor_dpPurp_205x58.png" alt="Roomhere"/></a>
              </li>
              </ul>
            </div>

          <div class="top-bar-right margRight">

            <ul class="menu vertical large-horizontal dropdown" data-responsive-menu="medium-dropdown" role="menubar" data-dropdown-menu="pqvvce-dropdown-menu">
                
             <li role="menuitem">
                <a class="aPadTop" [routerLinkActive]="['active', 'router-link-active']" [routerLink]="['dashboard']">Dashboard</a>
             </li>

            <li role="menuitem">
                <a class="aPadTop" [routerLinkActive]="['active', 'router-link-active']" [routerLink]="['']">Home</a>
            </li>
            <li role="menuitem" *ngIf="!(hasAuth$ | async)">
                <a class="aPadTop" data-open="RegisterModal">
            Create an Account</a>
            </li>

            <li role="menuitem" *ngIf="!(hasAuth$ | async)">
                <a class="aPadTop" data-open="LoginModal">Login</a>
            </li>
            <li role="meduitem" *ngIf="hasAuth$ | async">
                <a class="aPadTop" (click)="logout()">Log Out</a>
            </li>
            <li role="menuitem">
                <a class="aPadTop" [routerLinkActive]="['active', 'router-link-active']" [routerLink]="['settings']">Settings</a>
            </li>
            </ul>
          </div>
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
