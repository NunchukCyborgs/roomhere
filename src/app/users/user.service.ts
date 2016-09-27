import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response, ResponseOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from './user';
import { Contact } from './user';
import { HttpService } from '../services/http.service';
import { isBrowser } from 'angular2-universal';
import { BASE_API_URL } from '../config';
import { PersistenceService } from '../services/persistence.service';

@Injectable()
export class UserService {
  public contacts$: BehaviorSubject<Contact[]>;
  private _contacts: Contact[] = [];
  public licenseId$: BehaviorSubject<string>;
  private _licenseId: string = null;
  public hasAuth$: BehaviorSubject<boolean>;
  private _hasAuth: boolean = false;

  constructor(private http: HttpService, private route: ActivatedRoute, private persist: PersistenceService) {
    this.hasAuth$ = new BehaviorSubject(this._hasAuth);
    this.hasAuth$.subscribe();
    this.contacts$ = new BehaviorSubject(this._contacts);
    this.contacts$.subscribe();
    this.licenseId$ = new BehaviorSubject(this._licenseId);
    this.licenseId$.subscribe();

    this.checkForSessionAuth();
    this.checkForQueryAuth();
    this.loadLicenseId().subscribe();
    this.loadContacts().subscribe();
  }

  public login(user: User) {
    return this.http.post(`${BASE_API_URL}/auth/sign_in`, user)
      .do((i: Response) => this.handleLogin(i));
  }

  public logout() {
    this.hasAuth$.next(false);
    this.http.setAuthHeaders();
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
    user.email = this.persist.get('uid');
    return this.http.patch(`${BASE_API_URL}/auth/password`, user);
  }

  public setLicenseId(licenseId: string): Observable<Response> {
    return this.loadLicenseId()
      .flatMap(existingId => {
        if (existingId) {
          return Observable.of(new Response(new ResponseOptions({ body: licenseId, status: 200 })));
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
    return this.hasAuth$.filter(i => i)
      .flatMap(() => this.http.get(`${BASE_API_URL}/me`))
      .map(i => i.json().contacts)
      .do(i => this.contacts$.next(this._contacts = i));
  }

  public loadLicenseId(): Observable<string> {
    return this.hasAuth$.filter(i => i)
      .flatMap(() => this.http.get(`${BASE_API_URL}/me`))
      .map(i => i.json().license_id)
      .do(i => this.licenseId$.next(this._licenseId = i));
  }

  public createUpdateContact(email?: string, phone?: string): Observable<Contact> {
    return this.loadContacts()
      .flatMap(i => i.length ? this.updateContact(i[0].id, email, phone) : this.createContact(email, phone));
  }

  private checkForQueryAuth() {
    this.hasAuth$.filter(i => !i)
      .flatMap(() =>this.route.queryParams)
      .subscribe(params => {
        if (params['account_confirmation_success'] === 'true' || params['reset_password'] === 'true') {
          let headers = { token: params['token'], client: params['client_id'], uid: params['uid'] };
          this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
          this.hasAuth$.next(true);
        }
      });
  }

  private checkForSessionAuth() {
    const headers = { token: this.persist.get('access-token'), client: this.persist.get('client'), uid: this.persist.get('uid') };

    if (headers && headers.token && headers.client && headers.uid) {
      this.http.setAuthHeaders(headers.token, headers.client, headers.uid);
      this.hasAuth$.next(this._hasAuth = true);
    }
  }

  private handleLogin(res: Response) {
    if (res.ok) {
      this.http.setAuthHeaders(res.headers.get('access-token'), res.headers.get('client'), res.headers.get('uid'));
      this.hasAuth$.next(this._hasAuth = true);
    }
  }

  private getRedirectUrl(): string {
    return isBrowser && `${window.location.origin}/?open_settings=true`
  }

  public get hasAuth() {
    return this._hasAuth;
  }
}
