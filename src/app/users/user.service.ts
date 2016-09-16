import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from './index';
import { HttpService } from '../services/http.service';
import { isBrowser } from 'angular2-universal';
import { BASE_API_URL } from '../config';

@Injectable()
export class UserService {
  public user$: BehaviorSubject<User>;
  private _user: User = new User();
  public hasAuth$: BehaviorSubject<boolean>;

  constructor(private http: HttpService, private route: ActivatedRoute) {
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
    return this.http.post(`${BASE_API_URL}/auth/sign_in`, user)
      .do((i: Response) => this.handleLogin(i));
  }

  public logout() {
    this.http.setAuthHeaders();
    isBrowser && sessionStorage.clear();
    this.hasAuth$.next(false);
  }

  public register(user: User): Observable<any> {
    user.confirm_success_url = this.getRedirectUrl();
    return this.http.post(`${BASE_API_URL}/auth`, user);
  }

  public sendResetPasswordLink(user: User): Observable<any> {
    user.redirect_url = this.getRedirectUrl();
    return this.http.post(`${BASE_API_URL}/auth/password`, user);
  }

  public resetPassword(user: User): Observable<any> {
    user.redirect_url = this.getRedirectUrl();
    user.email = this.http.headers.get('uid');
    return this.http.patch(`${BASE_API_URL}/auth/password`, user);
  }

  private checkForQueryAuth() {
    this.route
      .queryParams
      .subscribe(params => {
        if (params['account_confirmation_success'] === 'true' || params['reset_password'] === 'true') {
          let headers = { token: params['token'], client: params['client_id'], uid: params['uid'] };
          this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
          this.updateUser(headers.uid)
            .subscribe(() => this.hasAuth$.next(true));
        }
      });
  }

  private checkForUser() {
    const user = isBrowser && JSON.parse(sessionStorage.getItem('user'));
    if (user && user.id) {
      this.user$.next(user);
    }
  }

  private storeUser() {
    this.user$.subscribe(i => {
      if (i.uid) {
        isBrowser && sessionStorage.setItem('user', JSON.stringify(i));
      }
    });
  }

  private checkForSessionAuth() {
    const headers = isBrowser && { token: sessionStorage.getItem('access-token'), client: sessionStorage.getItem('client'), uid: sessionStorage.getItem('uid') };

    if (headers && headers.token && headers.client && headers.uid) {
      this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
      this.hasAuth$.next(true);
    }
  }

  private handleLogin(res: Response) {
    if (res.ok) {
      this.http.setAuthHeaders(res.headers.get('access-token'), res.headers.get('client'), res.headers.get('uid'));
      this.user$.next(this._user = res.json().data);
      this.hasAuth$.next(true);
    }
  }

  private getRedirectUrl(): string {
    return isBrowser && window.location.origin + window.location.pathname;
  }

  private updateUser(uid: string): Observable<User> {
    // Add this back in when the route exists
    // return this.http.get(`${BASE_API_URL}/users/${uid}`)
    //   .map(i => i.json())
    //   .do(i => console.log('user from server: ', i))
    //   .do(i => this.user$.next(this._user = i));

    return Observable.of(this.user);
  }
}
