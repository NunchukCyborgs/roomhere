import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Property } from '../properties/index';
import { GoogleApiService } from '../services/google-api.service';
import { generateGUID } from '../config';
import { ServerUnsafeService } from '../services/server-unsafe.service';

declare let google: any;
declare let RichMarker: any;

export interface MapOptions {
  zoomLevel: number;
  height?: string;
  center: { latitude: number, longitude: number };
}

@Component({
  moduleId: __filename,
  selector: 'property-map',
  providers: [],
  styles: [`
  `],
  template: `
    <div>
      <div class="map" [id]="id" [style.height]="mapOptions.height ? mapOptions.height : null"></div>
      <button id="mapbtn{{id}}" type="button" (click)="noop()" style="display: none;" ></button>
    </div>
  `
})
export class PropertyMap {
  @Input() properties: Property[];
  @Input() mapOptions: MapOptions;
  public id: string = `map${generateGUID()}`;
  private map: any;
  private init: any;
  private markers: any[] = [];

  constructor(private router: Router, private googleApi: GoogleApiService, private unsafe: ServerUnsafeService) { }

  public noop() { }

  private updateMap() {

    if (this.properties) {
      this.properties.map(property => {
        if (this.markers.map(marker => <number>marker.propertyid).indexOf(property.id) === -1) {
          let marker = new RichMarker({
            map: this.map,
            position: new google.maps.LatLng(property.latitude, property.longitude),
            anchor: new google.maps.Size(-20, -30),
            content: `<span class="map-marker tooltip top" title="">$${property.price}</span>`,
            propertyid: property.id
          });

          marker.addListener('click', () => {
            let link = `/properties/${property.slug}`;
            let win = this.unsafe.tryUnsafeCode(() => window.open(link, '_blank'), 'window is not defined');
            win.focus();
          });

          this.markers.push(marker);
        }
      });
    }
  }

  private pokeMap() {
    this.unsafe.tryUnsafeCode(() => window['mapbtn' + this.id].click() /* Trigger change detection and shit */, 'window is not defined');
  }

  private clearMap() {
    this.markers.map(i => i.setMap(null));
    this.markers = [];
  }

  private centerMapOnProperties() {
    if (this.properties && this.properties.length) {
      const averageCoords = new google.maps.LatLng(
        this.properties.map(i => i.latitude).reduce((sum, x) => sum + x, 0) / (this.properties.length || 1),
        this.properties.map(i => i.longitude).reduce((sum, x) => sum + x, 0) / (this.properties.length || 1)
      )
      this.map.panTo(averageCoords);
    }
  }

  ngOnInit() {
    this.init = this.googleApi.initMap().then(() => {
      this.map = new google.maps.Map(document.getElementById(this.id), {
        center: new google.maps.LatLng(this.mapOptions.center.latitude, this.mapOptions.center.longitude),
        zoom: this.mapOptions.zoomLevel,
      });

      this.ngOnChanges();
    });
  }

  ngOnChanges() {
    if (this.init) {
      this.init.then(() => {
        this.clearMap();
        this.updateMap();
        this.centerMapOnProperties();
        this.pokeMap();
      });
    }
  }
}
