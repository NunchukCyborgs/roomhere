import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare let google: any;

const GOOGLE_MAP_CALLBACK = 'googleMapLoaded';
const RICHMARKER_CALLBACK = 'richmarkerLoaded'; // Also hardcoded in richmarker.min.js

const API_KEY = 'AIzaSyCM0eNnm9QfX3XyNmTSPS5hJFTfbsC5qMc';
const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${GOOGLE_MAP_CALLBACK}`;
const RICHMARKER_URL = '/assets/javascript/richmarker.min.js';

@Injectable()
export class GoogleApiService {
  private loadMap;

  constructor(private http: Http) {
    try {
      let resolve;
      this.loadMap = new Promise(i => resolve = i);

      window[GOOGLE_MAP_CALLBACK] = () => {
        window[GOOGLE_MAP_CALLBACK] = undefined;
        this.loadScript(RICHMARKER_URL);
      }
      window[RICHMARKER_CALLBACK] = () => {
        window[RICHMARKER_CALLBACK] = undefined;
        resolve();
      }

      if (window[GOOGLE_MAP_CALLBACK]) {
        this.loadScript(GOOGLE_MAP_URL);
      }

    } catch (e) {
      console.log('ReferenceError: window is not defined? ', e.toString().substr(0, 40));
    }
  }

  public initMap() {
    return this.loadMap;
  }

  private loadScript(url) {
    let scriptIndex = Array.prototype.slice
      .call(document.head.getElementsByTagName('script'))
      .map(i => i.src)
      .indexOf(url)

    if (scriptIndex === -1) {
      let script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
}