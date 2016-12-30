import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';
import { loadScript } from './util';

const jQueryUrl = '//code.jquery.com/jquery-2.2.4.min.js';
const foundationUrl = '//cdn.jsdelivr.net/foundation/6.2.3/foundation.min.js';
const featherlightUrl = '/javascript/featherlight.min.js';
const featherlightGalleryUrl = '/javascript/featherlight.gallery.min.js';
const jqueryUIUrl = '/javascript/jquery.ui.widget.min.js';
const fileUploadUrl = '//cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.5.2/jquery.fileupload.min.js';

@Injectable()
export class jQueryService {
  public jquery$: Observable<any>;
  public jquery: any;

  public foundation$: Observable<any>;
  public foundation: any;

  public featherlight$: Observable<boolean>;
  private featherlightLoaded: boolean;
  private featherlightGalleryLoaded: boolean;

  public fileUpload$: Observable<boolean>;
  private jqueryUILoaded: boolean;
  private fileUploadLoaded: boolean

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
      .filter(jquery => Boolean(jquery));
  }

  public loadFoundation(): Observable<any> {
    if (this.foundation$) {
      return this.foundation$;
    }

    return this.foundation$ = new BehaviorSubject(null)
      .filter(() => isBrowser)
      .flatMap(() => this.loadJQuery())
      .flatMap(() => this.foundation ? Observable.of(this.foundation) : Observable.create(observer => loadScript(foundationUrl, () => observer.next(this.foundation = window['Foundation']))))
      .filter(foundation => Boolean(foundation));
  }

  public initFoundation(): Observable<any> {
    return this.loadFoundation()
      .do(() => this.jquery('body').foundation())
  }

  public loadFeatherlight(): Observable<any> {
    if (this.featherlight$) {
      return this.featherlight$;
    }

    return this.featherlight$ = new BehaviorSubject(null)
      .filter(() => isBrowser)
      .flatMap(() => this.loadJQuery())
      .flatMap(() => this.featherlightLoaded ? Observable.of(this.featherlightLoaded) : Observable.create(observer => loadScript(featherlightUrl, () => observer.next(this.featherlightLoaded = true))))
      .flatMap(() => this.featherlightGalleryLoaded ? Observable.of(this.featherlightGalleryLoaded) : Observable.create(observer => loadScript(featherlightGalleryUrl, () => observer.next(this.featherlightGalleryLoaded = true))))
      .filter(loaded => Boolean(loaded));
  }

  public loadImageUpload(): Observable<any> {
    if (this.fileUpload$) {
      return this.fileUpload$;
    }

    return this.fileUpload$ = new BehaviorSubject(null)
      .filter(() => isBrowser)
      .flatMap(() => this.loadJQuery())
      .flatMap(() => this.jqueryUILoaded ? Observable.of(this.jqueryUILoaded) : Observable.create(observer => loadScript(jqueryUIUrl, () => observer.next(this.jqueryUILoaded = true))))
      .flatMap(() => this.fileUploadLoaded ? Observable.of(this.fileUploadLoaded) : Observable.create(observer => loadScript(fileUploadUrl, () => observer.next(this.fileUploadLoaded = true))))
      .filter(loaded => Boolean(loaded));
  }
}
