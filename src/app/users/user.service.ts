import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response, ResponseOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/Rx';
import { User } from './index';
import { Contact } from './user';
import { HttpService } from '../services/http.service';
import { isBrowser } from 'angular2-universal';
import { BASE_API_URL } from '../config';

@Injectable()
export class UserService {
  public user$: BehaviorSubject<User>;
  private _user: User = new User();
  public contacts$: BehaviorSubject<Contact[]>;
  private _contacts: Contact[] = [];
  public licenseId$: BehaviorSubject<string>;
  private _licenseId: string = null;
  public hasAuth$: BehaviorSubject<boolean>;

  constructor(private http: HttpService, private route: ActivatedRoute, private cookieService: CookieService) {
    this.user$ = new BehaviorSubject(this._user);
    this.user$.subscribe();
    this.hasAuth$ = new BehaviorSubject(false);
    this.hasAuth$.subscribe();
    this.contacts$ = new BehaviorSubject(this._contacts);
    this.contacts$.subscribe();
    this.licenseId$ = new BehaviorSubject(this._licenseId);
    this.licenseId$.subscribe();

    this.checkForSessionAuth();
    this.checkForQueryAuth();
    this.checkForUser();
    this.storeUser();
    this.loadLicenseId().subscribe();
    this.loadContacts().subscribe();
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
    isBrowser && this.cookieService.removeAll();
    this.hasAuth$.next(false);
  }

  public register(user: User): Observable<Response> {
    user.confirm_success_url = this.getRedirectUrl();
    return this.http.post(`${BASE_API_URL}/auth`, user);
  }

  public sendResetPasswordLink(user: User): Observable<Response> {
    user.redirect_url = this.getRedirectUrl();
    return this.http.post(`${BASE_API_URL}/auth/password`, user);
  }

  public resetPassword(user: User): Observable<Response> {
    user.redirect_url = this.getRedirectUrl();
    user.email = this.http.headers.get('uid');
    return this.http.patch(`${BASE_API_URL}/auth/password`, user);
  }

  public setLicenseId(licenseId: string): Observable<Response> {
    return this.loadLicenseId()
      .flatMap(existingId => {
        if (existingId) {
          return Observable.of(new Response(new ResponseOptions({ body: licenseId })));
        } else {
          return this.http
            .post(`${BASE_API_URL}/users/licensing`, { license_id: licenseId });
        }
      });
  }

  private createContact(email?: string, phone?: string): Observable<Response> {
    const contact = Object.assign({}, email ? { email: email } : {}, phone ? { phone: phone } : {});
    return this.http.post(`${BASE_API_URL}/contacts`, { contact: contact });
  }

  private updateContact(id: number, email?: string, phone?: string): Observable<Response> {
    const contact = Object.assign({}, email ? { email: email } : {}, phone ? { phone: phone } : {});
    return this.http.patch(`${BASE_API_URL}/contacts/${id}`, { contact: contact });
  }

  public loadContacts(): Observable<Contact[]> {
    return this.http
      .get(`${BASE_API_URL}/me`)
      .map(i => i.json().contacts)
      .do(i => this.contacts$.next(this._contacts = i));
  }

  public loadLicenseId(): Observable<string> {
    return this.http
      .get(`${BASE_API_URL}/me`)
      .map(i => i.json().license_id)
      .do(i => this.licenseId$.next(this._licenseId = i));
  }

  public createUpdateContact(email?: string, phone?: string): Observable<Contact> {
    return this.loadContacts()
      .flatMap(i => i.length ? this.updateContact(i[0].id, email, phone) : this.createContact(email, phone));
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
    const user = isBrowser && JSON.parse(this.cookieService.get('user'));
    if (user && user.id) {
      this.user$.next(user);
    }
  }

  private storeUser() {
    this.user$.subscribe(i => {
      if (i.uid) {
        isBrowser && this.cookieService.put('user', JSON.stringify(i));
      }
    });
  }

  private checkForSessionAuth() {
    const headers = isBrowser && { token: this.cookieService.get('access-token'), client: this.cookieService.get('client'), uid: this.cookieService.get('uid') };

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
