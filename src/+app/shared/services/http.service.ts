import { Injectable } from "@angular/core";
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';
import { PersistenceService } from './persistence.service';
import { CacheService } from './cache.service';

const shouldLog = false;
const skipCache = false;

@Injectable()
export class HttpService {
  constructor(private http: Http, private persist: PersistenceService, private cache: CacheService) { }

  public get(url: string, {rawResponse}: { rawResponse?: boolean } = {}): Observable<any> {
    const key = url;
    const cache = this.getFromCache(key);

    return !skipCache && cache ? cache : this.http
      .get(url, { headers: this.headers })
      .do(i => shouldLog && console.log(`GET: `, url))
      .map(i => rawResponse ? i : i.json())
      .do(i => !rawResponse && this.cache.set(key, i))
      .catch((err, caught) => this.handleError(err, url, rawResponse));
  }

  public delete(url: string, {rawResponse}: { rawResponse?: boolean } = {}): Observable<any> {
    return this.http
      .delete(url, { headers: this.headers })
      .do(i => shouldLog && console.log(`DELETE: `, url))
      .map(i => rawResponse ? i : i.json())
      .catch((err, caught) => this.handleError(err, url, rawResponse));
  }

  public post(url: string, obj: any, {rawResponse}: { rawResponse?: boolean } = {}): Observable<any> {
    // Should probably only cache on the GETs

    const key = url + JSON.stringify(obj);
    const cache = url.indexOf('filtered_results') > -1 ? this.getFromCache(key) : null;
    // This is the only url I want to cache at this point

    return !skipCache && cache ? cache : this.http.post(url, JSON.stringify(obj), { headers: this.headers })
      .do(i => console.log(1, i))
      .do(i => shouldLog && console.log(`POST: `, url))
      .map(i => rawResponse ? i : i.json())
      .do(i => console.log(2, i))
      .do(i => !rawResponse && this.cache.set(key, i))
      .catch((err, caught) => this.handleError(err, url, rawResponse));
  }

  public patch(url: string, obj: any, {rawResponse}: { rawResponse?: boolean } = {}): Observable<any> {
    return this.http.patch(url, JSON.stringify(obj), { headers: this.headers })
      .do(i => shouldLog && console.log(`PATCH: `, url))
      .map(i => rawResponse ? i : i.json())
      .catch((err, caught) => this.handleError(err, url, rawResponse));
  }

  public setAuthHeaders(token?: string, client?: string, uid?: string): void {
    this.persist.set('access-token', token || '');
    this.persist.set('client', client || '');
    this.persist.set('uid', uid || '');
    this.persist.set('token-type', 'Bearer');
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

  private handleError(err, url, rawResponse): Observable<Response|any> {
    console.log(`caught http error of ${err.toString().substr(0, 50)} going to ${url}`);
    return rawResponse ? Observable.of(new Response(new ResponseOptions({ url: url, body: err.json(), status: err.status }))) : Observable.of(err.json());
  }

  private getFromCache(key: string): any {
    return this.cache.has(key) ? Observable.of(this.cache.get(key)) : undefined;
  }
}
