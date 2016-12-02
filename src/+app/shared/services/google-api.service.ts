import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs/Observable';
import { loadScript } from './util';
import { isBrowser } from 'angular2-universal';

declare let google: any;
declare let Promise: any;

const GOOGLE_MAP_CALLBACK = 'googleMapLoaded';
const RICHMARKER_CALLBACK = 'richmarkerLoaded'; // Also hardcoded in richmarker.min.js

const API_KEY = 'AIzaSyCM0eNnm9QfX3XyNmTSPS5hJFTfbsC5qMc';
const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${GOOGLE_MAP_CALLBACK}`;
const RICHMARKER_URL = '/javascript/richmarker.min.js';

@Injectable()
export class GoogleApiService {
  private loadMap;

  constructor(private http: HttpService) {
    if (isBrowser) {
      let resolve;
      this.loadMap = new Promise(i => resolve = i);

      window[GOOGLE_MAP_CALLBACK] = () => {
        window[GOOGLE_MAP_CALLBACK] = undefined;
        loadScript(RICHMARKER_URL);
      }
      window[RICHMARKER_CALLBACK] = () => {
        window[RICHMARKER_CALLBACK] = undefined;
        resolve();
      }

      if (window[GOOGLE_MAP_CALLBACK]) {
        loadScript(GOOGLE_MAP_URL);
      }
    }
  }

  public initMap() {
    return this.loadMap;
  }
}
