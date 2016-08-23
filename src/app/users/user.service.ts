import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from './index';
import { HttpService } from '../services/http.service';

import { BASE_URL } from '../config';

@Injectable()
export class UserService {
  public user$: BehaviorSubject<User>;
  private _user: User = new User();
  public hasAuth$: BehaviorSubject<boolean>;

  constructor(private http: HttpService, private router: Router) {
    this.user$ = new BehaviorSubject(this._user);
    this.user$.subscribe();
    this.hasAuth$ = new BehaviorSubject(false);
    this.hasAuth$.subscribe();

    this.checkForQueryAuth()
  }

  get user(): User {
    return Object.assign({}, this._user);
  }

  public login(user: User) {
    return this.http.post(`${BASE_URL}/auth/sign_in`, user)
      .do((i: Response) => this.setAuthHeaders(i.headers.get('access-token'), i.headers.get('client'), i.headers.get('uid')))
      .map(i => i.json())
      .do((i: User) => this.user$.next(this._user = user))
      .do(() => this.hasAuth$.next(true))
  }

  public logout() {
    this.setAuthHeaders();
    this.hasAuth$.next(false);
  }

  public register(user: User): Observable<any> {
    user.confirm_success_url = window.location.href;
    return this.http.post(`${BASE_URL}/auth`, user);
  }

  private checkForQueryAuth() {
    this.router
      .routerState
      .queryParams
      .subscribe(params => {
        if (params['account_confirmation_success'] === 'true') {
          this.setAuthHeaders(params['token'], params['client_id'], params['uid'])
          this.hasAuth$.next(true);
        }
      });
  }

  private setAuthHeaders(token?: string, client?: string, uid?: string): void {
    this.http.headers.set('access-token', token);
    this.http.headers.set('client', client);
    this.http.headers.set('uid', uid);
    this.http.headers.set('token-type', 'Bearer');
  }
}