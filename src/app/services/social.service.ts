import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServerUnsafeService } from './server-unsafe.service';

declare let FB: any;

@Injectable()
export class SocialService {
  constructor(private unsafe: ServerUnsafeService) { }

  public isFacebookinit$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isFacebookInit: boolean = false;

  public facebookInit() {
    this.unsafe.tryUnsafeCode(() => {
      window['fbAsyncInit'] = () => {
        if (!this.isFacebookInit) {
          FB.init({
            appId: '1184964188190261',
            xfbml: true,
            version: 'v2.7'
          });

          this.isFacebookinit$.next(this.isFacebookInit = true);
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

  public facebookShare(url?: string): void {
    this.unsafe.tryUnsafeCode(() => {
      FB.ui({
        method: 'share',
        display: 'popup',
        href: url || 'https://roomhere.io/',
      }, (response) => { });
    }, 'FB not defined');
  }
}
