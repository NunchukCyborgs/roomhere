import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';
import { PropertyService } from './properties/property.service';

// templateUrl example
import { Home } from './home';
//
/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly

@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // ** IMPORTANT **
    // we must interact with the dom through -Renderer-
    // for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    // ^^
  }
}

/////////////////////////
// ** Example Components
@Component({
  selector: 'about',
  template: `
    <div>This is the "About" page</div>
  `
})
export class About { }

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  providers: [PropertyService],
  styleUrls: [`app/app.component.css`],
  template: `
  <div>
    <div class="top-bar" id="top-menu">
      <div class="top-bar-title">
        <img src="/assets/images/logo_text_only.png" alt="Roomhere"/>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li><a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Home</a></li>
          <li><a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Create an Account</a></li>
          <li><a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Login</a></li>
        </ul>
      </div>
    </div>

    <div class="row collapse full-height">
      <div class="small-12 columns full-height">
        <main>
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  <div>
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
