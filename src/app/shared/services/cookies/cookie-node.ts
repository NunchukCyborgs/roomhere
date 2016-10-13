import { Cookie } from "./cookie";
import { CookieOptionsArgs } from "./cookie-options-args.model";

declare let Zone: any;

export class CookieNode implements Cookie {
  private _cache = {};
  constructor() {
    this._cache = Zone.current.get('req').cookies;
  }
  getAll(): Object {
    return Zone.current.get('req').cookies;
  }
  get(key: string): string {
    if (this._cache[key]) {
      return this._cache[key];
    }
    const zone = Zone.current.get('req');
    return zone && zone.cookies[key];
  }
  put(key: string, value: string, options?: CookieOptionsArgs) {
    this._cache[key] = value;
    const zone = Zone.current.get('req');
    zone && typeof zone.cookies === 'function' && zone.cookies(key, value, options);
  }
  remove(key: string, options?: CookieOptionsArgs): void {
    Zone.current.get('res').cookies(key, undefined);
  }
}
