import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { PropertyService } from './properties/property.service';

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  providers: [PropertyService],
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
          <li><a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Login</a></li>
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
export class App {
  data = {};
  server: string;

  constructor(public http: Http) { }

  ngOnInit() {
    // limit the use of setTimeouts
    setTimeout(() => {
      this.server = 'This was rendered from the server!';
    }, 10);

    // use services for http calls
    this.http.get('/data.json')
      .subscribe(res => {
        this.data = res.json();
      });
  }

}
