import { Component, Directive, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { PropertyService } from './properties/property.service';
import { GoogleApiService } from './services/google-api.service';
import { Login } from './users/login.component';

declare let $: any;

@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    Login
  ],
  providers: [PropertyService, GoogleApiService],
  styleUrls: [`app/app.component.css`],
  template: `
  <div>
    <div class="top-bar" id="top-menu">
      <div class="top-bar-title">
        <img src="/assets/images/logo_hor_dpPurp_205x58.png" alt="Roomhere"/>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li><a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Home</a></li>
          <li><a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Create an Account</a></li>
          <li><a data-open="LoginModal">
          Login
          <login class="reveal" id="LoginModal" data-reveal></login>
          </a></li>
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
  ngAfterViewInit() {
    $('.top-bar-right .menu').foundation();
  }
}
