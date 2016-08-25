import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL } from '../config';
import 'rxjs';

@Injectable()
export class HttpService {
  public headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, { headers: this.headers })
      .do(i => this.updateHeaders(i.headers));
  }

  public post(url: string, obj: any): Observable<any> {
    return this.http.post(url, obj, { headers: this.headers })
      .do(i => this.updateHeaders(i.headers));
  }

  public patch(url: string, obj: any): Observable<any> {
    return this.http.patch(url, obj, { headers: this.headers })
      .do(i => this.updateHeaders(i.headers));
  }

  private updateHeaders(headers: Headers) {
    headers.forEach((values: string[], name: string) => {
      if (this.headers.keys().indexOf(name) !== -1) {
        this.headers.set(name, values);
      }
    });
  }
}