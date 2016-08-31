import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServerUnsafeService } from './server-unsafe.service';
import { UtilService } from './util.service';
import { BASE_URL } from '../config';
import { Property } from '../properties/index';
import { SeoService } from './seo.service';

declare let FB: any;

@Injectable()
export class SocialService {
  public hasInit$: BehaviorSubject<{ facebook: boolean }>;
  private hasInit: { facebook: boolean } = { facebook: false };

  constructor(private unsafe: ServerUnsafeService, private utilService: UtilService, private seoService: SeoService) {
    this.hasInit$ = new BehaviorSubject(this.hasInit);
  }

  public makeTwitterUrl(property: Property) {
    return `https://twitter.com/intent/tweet?text=${this.seoService.getDescription(property)}&via=roomhere`;
  }

  public facebookInit() {
    this.unsafe.tryUnsafeCode(() => {
      window['fbAsyncInit'] = () => {
        if (!this.hasInit.facebook) {
          FB.init({
            appId: '1184964188190261',
            xfbml: true,
            version: 'v2.7'
          });

          this.hasInit$.next(Object.assign(this.hasInit, { facebook: true }));
        }
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      } (document, 'script', 'facebook-jssdk'));
    }, 'window not defined');
  }

  public facebookShare(url: string = ''): void {
    this.unsafe.tryUnsafeCode(() => {
      FB.ui({
        method: 'share',
        display: 'popup',
        href: BASE_URL + url,
      }, (response) => { });
    }, 'FB not defined');
  }
}
