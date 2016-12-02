import { Component, Directive, OnInit, ViewEncapsulation, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal'

import { UserService, Me } from './shared/services/user.service';
import { SeoService } from './shared/services/seo.service';
import { getHoneybadger } from './shared/services/honeybadger';

@Component({
  selector: 'app',
  templateUrl: 'template.html'
})
export class AppComponent {
  public hasAuth$: Observable<boolean>;
  public me$: Observable<Me>;
  public noFooter$: Observable<boolean>;

  constructor(private userService: UserService, private router: Router,
    private seoService: SeoService, private renderer: Renderer) {
  }

  ngOnInit() {
    this.hideConsoleMessages();
    this.initHoneybadger();
    this.hasAuth$ = this.userService.hasAuth$;
    this.me$ = this.userService.me$
    this.seoService.addBaseTags(this.renderer);

    this.noFooter$ = this.router.events.map(i => i.url).map(i => i === '/' || i.startsWith('/search'));
  }

  ngAfterViewInit() {
    this.router.events
      .do(i => this.seoService.updateCanonTag(i.url, this.renderer))
      .filter(() => isBrowser)
      .do(() => $('body').foundation())
      .subscribe();
  }

  logout() {
    this.userService.logout();
  }

  private hideConsoleMessages() {
    if (IS_PROD) {
      console.log = console.warn = console.error = () => { }
    }
  }

  private initHoneybadger() {
    getHoneybadger().configure({
      api_key: '5f8b6d96',
      environment: 'production' // This is set based on hostname === localhost
    });
  }
}
