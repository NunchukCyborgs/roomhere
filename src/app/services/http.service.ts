import { Injectable } from "@angular/core";
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { BASE_API_URL } from '../config';
import { isBrowser } from 'angular2-universal';

@Injectable()
export class HttpService {
  public headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, { headers: this.headers })
      .do(i => this.updateHeaders(i.headers))
      .catch((err, caught) => this.handleError(err, url));
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url, { headers: this.headers })
      .do(i => this.updateHeaders(i.headers))
      .catch((err, caught) => this.handleError(err, url));
  }

  public post(url: string, obj: any): Observable<any> {
    return this.http.post(url, JSON.stringify(obj), { headers: this.headers })
      .do(i => this.updateHeaders(i.headers))
      .catch((err, caught) => this.handleError(err, url));
  }

  public patch(url: string, obj: any): Observable<any> {
    return this.http.patch(url, JSON.stringify(obj), { headers: this.headers })
      .do(i => this.updateHeaders(i.headers))
      .catch((err, caught) => this.handleError(err, url));
  }

  public setAuthHeaders(token?: string, client?: string, uid?: string): void {
    this.headers.set('access-token', token);
    this.headers.set('client', client);
    this.headers.set('uid', decodeURIComponent(uid));
    this.headers.set('token-type', 'Bearer');

    if (isBrowser) {
      // sessionStorage.setItem('access-token', token || '');
      // sessionStorage.setItem('client', client || '');
      // sessionStorage.setItem('uid', uid || '');
      // sessionStorage.setItem('token-type', 'Bearer');
    }
  }

  private updateHeaders(headers: Headers) {
    headers.forEach((values: string[], name: string) => {
      if (this.headers.keys().indexOf(name) !== -1) {
        this.headers.set(name, values[0]);
        isBrowser && sessionStorage.setItem(name, values[0]);
      }
    });
  }

  private handleError(err, url): Observable<Response> {
    console.log(`caught http error of ${err.toString().substr(0, 50)} going to ${url}`);
    return Observable.of(new Response(new ResponseOptions({url: url, body: err.json()})));
  }
}
