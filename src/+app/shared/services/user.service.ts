import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response, ResponseOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User, Contact } from '../../shared/dtos/user';
import { HttpService } from './http.service';
import { isBrowser } from 'angular2-universal';
import { PersistenceService } from './persistence.service';
import { Property } from '../../shared/dtos/property';

declare let analytics: any;

export interface License {
  id?: number;
  value?: string;
  editable?: boolean;
}

export interface Me {
  contacts?: Contact[];
  licenses?: License[];
  properties?: Property[];
  superuser?: boolean;
  is_verified?: boolean;
}

@Injectable()
export class UserService {
  public me$: BehaviorSubject<Me>;
  private _me: Me = {};
  public hasAuth$: BehaviorSubject<boolean>;
  private _hasAuth: boolean = false;

  constructor(private http: HttpService, private route: ActivatedRoute, private persist: PersistenceService,
    private router: Router) {
    this.hasAuth$ = new BehaviorSubject(this._hasAuth);
    this.me$ = new BehaviorSubject(this._me);

    this.checkForSessionAuth();
    this.checkForQueryAuth();
    this.loadMe().subscribe();
  }

  public login(user: User) {
    return this.http.post(`${BASE_API_URL}/auth/sign_in`, user, {rawResponse: true})
      .do((i: Response) => this.handleLogin(i))
      .do(() => this.me$.subscribe(i => this.redirectLandlord(i)));
  }

  public logout() {
    this.hasAuth$.next(false);
    this.http.setAuthHeaders();
    this.router.navigate(['/']);
  }

  public register(user: User, data: Object, redirectUrl: string = 'p/registration-success'): Observable<Response> {
    user.confirm_success_url = `${BASE_URL}/${redirectUrl}`;
    return this.http.post(`${BASE_API_URL}/auth`, Object.assign(user, data), {rawResponse: true});
  }

  public sendResetPasswordLink(user: User): Observable<Response> {
    user.redirect_url = `${BASE_URL}/p/reset-password`;
    return this.http.post(`${BASE_API_URL}/auth/password`, user, {rawResponse: true});
  }

  public resetPassword(user: User): Observable<Response> {
    user.redirect_url = this.getRedirectUrl();
    user.email = this.persist.get('uid');
    return this.http.patch(`${BASE_API_URL}/auth/password`, user, {rawResponse: true});
  }

  public loadContactsByLicenseId(licenseId: string): Observable<Contact[]> {
    // Super only API
    return this.http.get(`${BASE_API_URL}/licenses/${licenseId}`)
      .map(i => i.contacts);
  }

  public setLicenseId(licenseId: string): Observable<Response> {
    return this.http.post(`${BASE_API_URL}/users/licensing`, { license_id: licenseId }, {rawResponse: true});
  }

  public setLicenseIds(licenseIds: string[]): Observable<Response[]> {
    return Observable.combineLatest(licenseIds.map(i => this.setLicenseId(i)))
      .filter(all => (<Response[]>all).every(i => Boolean(i)))
      .do(() => this.loadMe()); // Update necessary things
  }

  public createContact(email?: string, phone?: string, licenseId?: string): Observable<Response> {
    const contact = Object.assign({}, email ? { email: email } : {}, phone ? { phone: phone } : {});
    return this.http.post(`${BASE_API_URL}/${licenseId ? `licenses/${licenseId}/` : ''}contacts`, { contact: contact });
  }

  public updateContact(id: number, email?: string, phone?: string): Observable<Response> {
    const contact = Object.assign({}, email ? { email: email } : {}, phone ? { phone: phone } : {});
    return this.http.patch(`${BASE_API_URL}/contacts/${id}`, { contact: contact });
  }

  public loadMe(): Observable<Me> {
    if (this._me.properties && this._me.contacts && this._me.licenses && this._me.licenses.length) {
      return this.me$;
      // Just return if we already gots our things
    }

    return this.hasAuth$.filter(i => i)
      .flatMap(() => this.http.get(`${BASE_API_URL}/me`))
      .map(i => <Me>i)
      .do(i => this.me$.next(this._me = i))
      .flatMap(i => this.me$);
  }

  public createUpdateContact(email?: string, phone?: string): Observable<Response> {
    return this.loadMe()
      .map(i => i.contacts)
      .flatMap(i => i.length ? this.updateContact(i[0].id, email, phone) : this.createContact(email, phone));
  }

  private checkForQueryAuth() {
    this.hasAuth$.filter(i => !i)
      .flatMap(() => this.route.queryParams)
      .subscribe(params => {
        if (params['account_confirmation_success'] === 'true' || params['reset_password'] === 'true') {
          let headers = { token: params['token'], client: params['client_id'], uid: params['uid'] };
          this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
          this.hasAuth$.next(true);
          this.identifyUser(headers.uid);
        }
      });
  }

  private checkForSessionAuth() {
    const headers = { token: this.persist.get('access-token'), client: this.persist.get('client'), uid: this.persist.get('uid') };

    if (headers && headers.token && headers.client && headers.uid) {
      this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
      this.hasAuth$.next(this._hasAuth = true);
      this.identifyUser(headers.uid);
    }
  }

  private handleLogin(res: Response) {
    if (res.ok) {
      const headers = { token: res.headers.get('access-token'), client: res.headers.get('client'), uid: res.headers.get('uid') };
      this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
      this.hasAuth$.next(this._hasAuth = true);
      this.identifyUser(headers.uid);
    }
  }

  private redirectLandlord(me: Me) {
    if (me.licenses && me.licenses.length) {
      this.router.navigate(['/account/dashboard']);
    }
  }

  private identifyUser(uid: string) {
    IS_PROD && isBrowser && analytics.identify(uid);
  }

  private getRedirectUrl(): string {
    return isBrowser && `${BASE_URL}/p/registration-success`
  }

  public get hasAuth() {
    return this._hasAuth;
  }
}
