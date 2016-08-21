import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property } from '../properties/index';
import { GoogleApiService } from '../services/google-api.service';

declare let google: any;
declare let RichMarker: any;

@Component({
  moduleId: __filename,
  selector: 'property-map',
  providers: [ GoogleApiService ],
  styles: [`
    .map {
      height: 100vh;
    }
  `],
  template: `
    <div>
      <div class="map" id="map"></div>
      <button id="mapbtn" type="button" (click)="noop()" style="display: none;" ></button>
    </div>
  `
})
export class PropertyMap {
  @Input() properties: Property[];
  private map: any;

  constructor(private router: Router, private googleApi: GoogleApiService) {
  }

  ngOnInit() {
    this.googleApi.initMap().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(37.3067429,-89.5286194),
        zoom: 12,
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
    window['mapbtn'].click(); // Trigger change detection and shit
  }

  private noop() {

  }
}