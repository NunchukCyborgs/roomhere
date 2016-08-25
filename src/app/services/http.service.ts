import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL } from '../config';

@Injectable()
export class HttpService {
  public headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, { headers: this.headers });
  }

  public post(url: string, obj: any): Observable<any> {
    return this.http.post(url, obj, { headers: this.headers });
  }

  public patch(url: string, obj: any): Observable<any> {
    return this.http.patch(url, obj, { headers: this.headers });
  }
}