import { CookieOptions, BaseCookieOptions } from "./base-cookie-options";
import { CookieOptionsArgs } from "./cookie-options-args.model";
import { Optional, Injectable } from "@angular/core";
import { Cookie } from "./cookie";
import { isPresent, isBlank } from "@angular/core/src/facade/lang";

@Injectable()
export class CookieBrowser implements Cookie {
  constructor( @Optional() private _defaultOptions: CookieOptions) { }
  get(key: string): string { return (<any>this._cookieReader())[key]; }

  getAll(): Object { return <any>this._cookieReader(); }
  put(key: string, value: string, options?: CookieOptionsArgs) {
    this._cookieWriter()(key, value, options);
  }


  remove(key: string, options?: CookieOptionsArgs): void {
    this._cookieWriter()(key, undefined, options);
  }

  removeAll(): void {
    let cookies = this.getAll();
    Object.keys(cookies).forEach(key => { this.remove(key); });
  }

  private _cookieReader(): Object {
    let rawDocument = document;
    let lastCookies = {};
    let lastCookieString = '';
    let that = this;

    let cookieArray: string[], cookie: string, i: number, index: number, name: string;
    let currentCookieString = rawDocument.cookie || '';
    if (currentCookieString !== lastCookieString) {
      lastCookieString = currentCookieString;
      cookieArray = lastCookieString.split('; ');
      lastCookies = {};

      for (i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
        index = cookie.indexOf('=');
        if (index > 0) {  // ignore nameless cookies
          name = that._safeDecodeURIComponent(cookie.substring(0, index));
          if (isBlank((<any>lastCookies)[name])) {
            (<any>lastCookies)[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
          }
        }
      }
    }
    return lastCookies;
  }

  private _cookieWriter() {
    let that = this;
    var rawDocument = document;

    return function (name: string, value: string, options?: CookieOptionsArgs) {
      rawDocument.cookie = that._buildCookieString(name, value, options);
    };
  }

  private _safeDecodeURIComponent(str: string) {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }

  private _buildCookieString(name: string, value: string, options?: CookieOptionsArgs): string {
    var cookiePath = '/';
    var path: string, expires: any;
    var defaultOpts =
      this._defaultOptions || new CookieOptions(<CookieOptionsArgs>{ path: cookiePath });
    var opts: CookieOptions = this._mergeOptions(defaultOpts, options);
    expires = opts.expires;
    if (isBlank(value)) {
      expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
      value = '';
    }
    if (typeof expires === 'string') {
      expires = new Date(expires);
    }

    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    str += opts.path ? ';path=' + opts.path : '';
    str += opts.domain ? ';domain=' + opts.domain : '';
    str += expires ? ';expires=' + expires.toUTCString() : '';
    str += opts.secure ? ';secure' : '';
    var cookieLength = str.length + 1;
    if (cookieLength > 4096) {
      console.log(
        `Cookie \'${name}\' possibly not set or overflowed because it was too large (${cookieLength} > 4096 bytes)!`);
    }

    return str;
  }

  private _mergeOptions(defaultOpts: BaseCookieOptions,
    providedOpts?: CookieOptionsArgs): CookieOptions {
    let newOpts = defaultOpts;
    if (isPresent(providedOpts)) {
      return newOpts.merge(new CookieOptions(providedOpts));
    }
    return newOpts;
  }
}
