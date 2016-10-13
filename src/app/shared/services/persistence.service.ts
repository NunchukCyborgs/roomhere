import { Injectable } from "@angular/core";
import { isBrowser } from 'angular2-universal';
import { Cookie } from './cookies/cookie';

@Injectable()
export class PersistenceService {
  constructor(private cookie: Cookie) { }

  public set(key: string, value: string): void {
    isBrowser && localStorage.setItem(key, value);
    this.cookie.put(key, value);
  }

  public get(key: string): string {
    const localItem = isBrowser && localStorage.getItem(key);
    const cookieItem = this.cookie.get(key);

    if (isBrowser && localItem && cookieItem && localItem !== cookieItem) {
      this.set(key, localItem);
    }

    return cookieItem;
  }
}
