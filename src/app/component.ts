import { Component, Directive, OnInit, ViewEncapsulation, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';

import { UserService } from './users/user.service';
import { SeoService } from './services/seo.service';

// This generates the file, and we link to it in index.html
require('../assets/stylesheets/app.scss');
require('../assets/stylesheets/deferred.scss');

@Component({
  selector: 'app',
  template: require('./template.html').toString()
})
export class App {
  public hasAuth$: Observable<boolean>;
  public noFooter$: Observable<boolean>;

  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute, private seoService: SeoService, private renderer: Renderer) {
  }

  ngOnInit() {
    this.hasAuth$ = this.userService.hasAuth$;
    this.seoService.addBaseTags(this.renderer);

    this.noFooter$ = Observable.combineLatest(this.userService.hasAuth$, this.router.events)
      .map(i => [i[0], i[1].url])
      .map(i => !i[0] && i[1] === '/');
  }

  ngAfterViewInit() {
    this.router.events.subscribe(() => isBrowser && $('body').foundation());

    this.route.queryParams
      .flatMap(params => this.hasAuth$.filter(i => i).map(() => params))
      .filter(i => isBrowser)
      .subscribe(params => {
        if (params['reset_password'] === 'true') {
          $('#ResetPasswordModal').foundation('open');
        } else if (params['open_settings'] === 'true') {
          window.history.pushState(null, 'Roomhere', window.location.pathname)
          this.tryOpenSettingsModal();
        }
      });
  }

  logout() {
    this.userService.logout();
  }

  private tryOpenSettingsModal() {
    // Warning: dangerous recursion here!
    setTimeout(() => {
      const openLink = $('#SettingsModalOpen');
      const modal = $('#SettingsModal');
      openLink && modal ? openLink.click() : this.tryOpenSettingsModal();
    }, 250)
  }
}
