import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from './index';
import { HttpService } from '../services/http.service';
import { ServerUnsafeService } from '../services/server-unsafe.service';

import { BASE_URL } from '../config';

@Injectable()
export class UserService {
  public user$: BehaviorSubject<User>;
  private _user: User = new User();
  public hasAuth$: BehaviorSubject<boolean>;

  constructor(private http: HttpService, private router: Router, private unsafe: ServerUnsafeService) {
    this.user$ = new BehaviorSubject(this._user);
    this.user$.subscribe();
    this.hasAuth$ = new BehaviorSubject(false);
    this.hasAuth$.subscribe();

    this.checkForSessionAuth();
    this.checkForQueryAuth();
    this.checkForUser();
    this.storeUser();
  }

  get user(): User {
    return Object.assign({}, this._user);
  }

  public login(user: User) {
    return this.http.post(`${BASE_URL}/auth/sign_in`, user)
      .do((i: Response) => this.http.setAuthHeaders(i.headers.get('access-token'), i.headers.get('client'), i.headers.get('uid')))
      .do(i => this.user$.next(this._user = i.json().data))
      .do(() => this.hasAuth$.next(true))
  }

  public logout() {
    this.http.setAuthHeaders();
    this.hasAuth$.next(false);
  }

  public register(user: User): Observable<any> {
    user.confirm_success_url = this.unsafe.tryUnsafeCode(() => window.location.href, 'window is not defined');
    return this.http.post(`${BASE_URL}/auth`, user);
  }

  private checkForQueryAuth() {
    this.router
      .routerState
      .queryParams
      .subscribe(params => {
        if (params['account_confirmation_success'] === 'true') {
          this.http.setAuthHeaders(params['token'], params['client_id'], params['uid'])
          this.hasAuth$.next(true);
        }
      });
  }

  private checkForUser() {
    const user = this.unsafe.tryUnsafeCode(() => JSON.parse(sessionStorage.getItem('user')), 'sessionStorage undefined');
    if (user && user.id) {
      this.user$.next(user);
    }
  }

  private storeUser() {
    this.user$.subscribe(i => this.unsafe.tryUnsafeCode(() => sessionStorage.setItem('user', JSON.stringify(i)), 'sessionStorage undefined'));
  }

  private checkForSessionAuth() {
    const headers = this.unsafe.tryUnsafeCode(() => { 
      return {token: sessionStorage.getItem('access-token'), client: sessionStorage.getItem('client'), uid: sessionStorage.getItem('uid') };
    }, 'sessionStorage undefined');

    if (headers && headers.token && headers.client && headers.uid) {
      this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
      this.hasAuth$.next(true);
    }
  }
}