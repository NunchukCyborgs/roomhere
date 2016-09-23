import { isPresent } from '@angular/common/src/facade/lang';
import { CookieOptionsArgs } from './cookie-options-args.model';
import { Injectable } from '@angular/core';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

export class CookieOptions {
  path: string;
  domain: string;
  expires: string | Date;
  secure: boolean;

  constructor({path, domain, expires, secure}: CookieOptionsArgs) {
    this.path = isPresent(path) ? path : null;
    this.domain = isPresent(domain) ? domain : null;
    this.expires = isPresent(expires) ? expires : null;
    this.secure = isPresent(secure) ? secure : false;
  }

  merge(options?: CookieOptionsArgs): CookieOptions {
    return new CookieOptions(<CookieOptionsArgs>{
      path: isPresent(options) && isPresent(options.path) ? options.path : this.path,
      domain: isPresent(options) && isPresent(options.domain) ? options.domain : this.domain,
      expires: isPresent(options) && isPresent(options.expires) ? options.expires : this.expires,
      secure: isPresent(options) && isPresent(options.secure) ? options.secure : this.secure,
    });
  }
}

@Injectable()
export class BaseCookieOptions extends CookieOptions {
  constructor() { super(<CookieOptionsArgs>{ path: getDOM().getBaseHref() }); }
}
