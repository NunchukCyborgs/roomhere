import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

declare let google: any;

const GOOGLE_MAP_CALLBACK = 'googleMapLoaded';
const RICHMARKER_CALLBACK = 'richmarkerLoaded'; // Also hardcoded in richmarker.min.js

const API_KEY = 'AIzaSyCM0eNnm9QfX3XyNmTSPS5hJFTfbsC5qMc';
const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${GOOGLE_MAP_CALLBACK}`;
const RICHMARKER_URL = '/assets/javascript/richmarker.min.js';

@Injectable()
export class GoogleApiService {
  private loadMap: Promise<any>;

  constructor(private http:Http) {
    this.loadMap = new Promise((resolve) => {
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
      } else {
        resolve();
      }
    });
  }

  public initMap():Promise<any> {
    return this.loadMap;
  }

  private loadScript(url) {
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';

    if (!document.body.contains(script)) {
        document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
}