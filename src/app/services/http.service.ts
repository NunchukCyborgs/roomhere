import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { BASE_URL } from '../config';
import { ServerUnsafeService } from './server-unsafe.service';

@Injectable()
export class HttpService {
  public headers: Headers;

  constructor(private http: Http, private unsafe: ServerUnsafeService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, { headers: this.headers })
      .do(i => this.updateHeaders(i.headers))
      .catch((err, caught) => Observable.of(console.log(`>> ERROR IN GET TO ${url}`)));
  }

  public post(url: string, obj: any): Observable<any> {
    return this.http.post(url, obj, { headers: this.headers })
      .do(i => this.updateHeaders(i.headers))
      .catch((err, caught) => Observable.of(console.log(`>> ERROR IN POST TO ${url} with ${JSON.stringify(obj)}`)));
  }

  public patch(url: string, obj: any): Observable<any> {
    return this.http.patch(url, obj, { headers: this.headers })
      .do(i => this.updateHeaders(i.headers))
      .catch((err, caught) => Observable.of(console.log(`>> ERROR IN PATCH TO ${url} with ${JSON.stringify(obj)}`)));
  }

  public setAuthHeaders(token?: string, client?: string, uid?: string): void {
    this.headers.set('access-token', token);
    this.headers.set('client', client);
    this.headers.set('uid', uid);
    this.headers.set('token-type', 'Bearer');

    this.unsafe.tryUnsafeCode(() => {
      sessionStorage.setItem('access-token', token || '');
      sessionStorage.setItem('client', client || '');
      sessionStorage.setItem('uid', uid || '');
      sessionStorage.setItem('token-type', 'Bearer');
    }, 'sessionStorage undefined');
  }

  private updateHeaders(headers: Headers) {
    headers.forEach((values: string[], name: string) => {
      if (this.headers.keys().indexOf(name) !== -1) {
        this.headers.set(name, values[0]);
        this.unsafe.tryUnsafeCode(() => sessionStorage.setItem(name, values[0]), 'sessionStore undefined');
        ;
      }
    });
  }
}