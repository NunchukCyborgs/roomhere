import { Component, Directive, OnInit, ViewEncapsulation, Renderer } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal'

import { UserService, Me } from './shared/services/user.service';
import { SeoService } from './shared/services/seo.service';
import { jQueryService } from './shared/services/jquery.service';
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
    private seoService: SeoService, private renderer: Renderer, private jquery: jQueryService) {
  }

  ngOnInit() {
    this.jquery.loadFoundation().subscribe();
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
      .filter(i => i instanceof NavigationEnd && isBrowser)
      .flatMap(() => this.jquery.initFoundation())
      .do(() => window.scroll(0, 0))
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
    if (IS_PROD) {
      getHoneybadger().configure({
        api_key: '5f8b6d96',
        environment: 'production'
      });
    }
  }
}
