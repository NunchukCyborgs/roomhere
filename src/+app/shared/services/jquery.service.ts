import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';
import { loadScript } from './util';

declare let jQuery: (string) => any;
const jQueryUrl = '//code.jquery.com/jquery-2.2.4.min.js';
const foundationUrl = '//cdn.jsdelivr.net/foundation/6.2.3/foundation.min.js';

// jquery libs
/*
``
<script src="/javascript/featherlight.min.js"></script>
  <script src="/javascript/featherlight.gallery.min.js"></script>

<script src="/javascript/jquery.ui.widget.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.5.2/jquery.fileupload.min.js"></script>
  */


@Injectable()
export class jQueryService {
  // todo: typings

  public jquery$: Observable<any>;
  public jquery: any;
  public foundation$: Observable<any>;
  public foundation: any;

  constructor() {
    if (isBrowser) {
      this.loadJQuery().subscribe();
      this.loadFoundation().subscribe();
    }
  }

  public loadJQuery(): Observable<any> {
    if (this.jquery$) {
      return this.jquery$;
    }

    return this.jquery$ = new BehaviorSubject(null)
      .filter(() => isBrowser)
      .flatMap(i => this.jquery ? Observable.of(this.jquery) : Observable.create(observer => loadScript(jQueryUrl, () => observer.next(this.jquery = window['jQuery']))))
      .filter(jquery => Boolean(jquery))
      .do(i => console.log('after jquery stream', i))


    // return this.jquery$ = isBrowser ? Observable.create(observer => loadScript(jQueryUrl, () => observer.next(this.jquery = window['jQuery']))) : Observable.create(observer => undefined);
  }

  public loadFoundation(): Observable<any> {
    if (this.foundation$) {
      return this.foundation$;
    }

    return this.foundation$ = new BehaviorSubject(null)
      .filter(() => isBrowser)
      .flatMap(() => this.loadJQuery())
      .flatMap(() => this.foundation ? Observable.of(this.foundation) : Observable.create(observer => loadScript(foundationUrl, () => observer.next(this.foundation = window['Foundation']))))
      .filter(foundation => Boolean(foundation))
      .do(i => console.log('after foundation stream', i))
  }

  public initFoundation(): Observable<any> {
    return Observable.of(null)
      .do(() => console.log('before init!', window['Foundation']))
      .flatMap(() => this.loadFoundation())
      .do(() => this.jquery('body').foundation())
      .do(() => console.log('I inited foundation!', window['Foundation']))
  }
}
