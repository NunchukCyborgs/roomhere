import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property } from '../properties/index';
import { GoogleApiService } from '../services/google-api.service';

declare let google: any;
declare let RichMarker: any;

export interface MapOptions {
  zoomLevel: number;
  height: string;
  center: {latitude: number, longitude: number};
}

@Component({
  moduleId: __filename,
  selector: 'property-map',
  providers: [ GoogleApiService ],
  styles: [`
  `],
  template: `
    <div>
      <div class="map" id="map" [style.height]="mapOptions.height"></div>
      <button id="mapbtn" type="button" (click)="noop()" style="display: none;" ></button>
    </div>
  `
})
export class PropertyMap {
  @Input() properties: Property[];
  @Input() mapOptions: MapOptions;
  private map: any;

  constructor(private router: Router, private googleApi: GoogleApiService) {
  }

  ngOnInit() {
    this.googleApi.initMap().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(this.mapOptions.center.latitude, this.mapOptions.center.longitude),
        zoom: this.mapOptions.zoomLevel,
      });

      let markers = [];

      if (this.properties) {
        this.properties.map(property => {
          if (markers.map(marker => <number>marker.propertyid).indexOf(property.id) === -1) {
            let marker = new RichMarker({
              map: this.map,
              position:  new google.maps.LatLng(property.latitude, property.longitude),
              anchor: new google.maps.Size(-20, -30),
              content: `<span class="map-marker tooltip top" title="">$${property.price}</span>`,
              propertyid: property.id
            });
            
            marker.addListener('click', function() {
              let link = `/properties/${property.id}`;
              let win = window.open(link, '_blank');
              win.focus();
            });

            markers.push(marker);
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    try {
      window['mapbtn'].click(); // Trigger change detection and shit
    } catch(e) {
      console.log('ReferenceError: window is not defined? ', e.toString().substr(0, 40));
    }
  }

  private noop() {

  }
}