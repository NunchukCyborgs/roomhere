import { Injectable } from "@angular/core";
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { isBrowser } from 'angular2-universal';
import { PersistenceService } from './persistence.service'

@Injectable()
export class HttpService {
  constructor(private http: Http, private persist: PersistenceService) { }

  public get(url: string): Observable<any> {
    return this.http.get(url, { headers: this.headers })
      .catch((err, caught) => this.handleError(err, url));
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url, { headers: this.headers })
      .catch((err, caught) => this.handleError(err, url));
  }

  public post(url: string, obj: any): Observable<any> {
    return this.http.post(url, JSON.stringify(obj), { headers: this.headers })
      .catch((err, caught) => this.handleError(err, url));
  }

  public patch(url: string, obj: any): Observable<any> {
    return this.http.patch(url, JSON.stringify(obj), { headers: this.headers })
      .catch((err, caught) => this.handleError(err, url));
  }

  public setAuthHeaders(token?: string, client?: string, uid?: string): void {
    this.persist.set('access-token', token || '');
    this.persist.set('client', client || '');
    this.persist.set('uid', uid || '');
    this.persist.set('token-type', 'Bearer');
  }

  private handleError(err, url): Observable<Response> {
    console.log(`caught http error of ${err.toString().substr(0, 50)} going to ${url}`);
    return Observable.of(new Response(new ResponseOptions({ url: url, body: err.json(), status: err.status })));
  }

  public get headers(): Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json; charset=UTF-8');
    headers.set('Accept', 'application/json');
    headers.set('token-type', 'Bearer');
    headers.set('access-token', this.persist.get('access-token'));
    headers.set('client', this.persist.get('client'));
    headers.set('uid', this.persist.get('uid'));
    return headers;
  }
}
