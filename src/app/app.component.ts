import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';

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
          <!-- <% if current_user %>
            <li><%= link_to "Edit Profile", edit_user_path(current_user.id) %></li>
            <li><%= link_to "Logout", :logout %></li>
          <% else %>
            <li><%= link_to "Register", new_user_path %></li>
            <li><%= link_to "Login", :login %></li>
          <% end %>
          -->
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
