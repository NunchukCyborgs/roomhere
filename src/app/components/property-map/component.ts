import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Property } from '../../properties/index';
import { GoogleApiService } from '../../services/google-api.service';
import { UtilService } from '../../services/util.service';
import { isBrowser } from 'angular2-universal';

export interface MapOptions {
  zoomLevel: number;
  height?: string;
  interactive: boolean;
  center: { latitude: number, longitude: number };
}

@Component({
  selector: 'property-map',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class PropertyMap {
  @Input() properties: Property[];
  @Input() mapOptions: MapOptions;
  public id: string;
  private map: any;
  private init: any;
  private markers: any[] = [];
  private computedCenter: any;

  constructor(private router: Router, private googleApi: GoogleApiService,
    private utilService: UtilService) { }

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

          if (this.mapOptions.interactive) {
            marker.addListener('click', () => {
              let link = `/properties/${property.slug}`;
              let win = isBrowser && window.open(link, '_blank');
              win.focus();
            });
          }

          this.markers.push(marker);
        }
      });
    }
  }

  private pokeMap() {
    isBrowser && window['mapbtn' + this.id].click(); /* Trigger change detection and shit */
  }

  private clearMap() {
    this.markers.map(i => i.setMap(null));
    this.markers = [];
  }

  private centerMapOnProperties() {
    if (this.properties && this.properties.length) {
      this.computedCenter = new google.maps.LatLng(
        this.properties.map(i => i.latitude).reduce((sum, x) => sum + x, 0) / (this.properties.length || 1),
        this.properties.map(i => i.longitude).reduce((sum, x) => sum + x, 0) / (this.properties.length || 1)
      )
      this.map.panTo(this.computedCenter);
    }
  }

  private setOptions() {
    const options: any = {
      disableDefaultUI: false,
      clickableIcons: true,
      draggable: true,
      scrollwheel: true,
      fullscreenControl: false,
      disableDoubleClickZoom: false,
    };

    const nonInteractiveOptions = {
      disableDefaultUI: true,
      clickableIcons: false,
      draggable: false,
      scrollwheel: false,
      fullscreenControl: true,
      disableDoubleClickZoom: true,
    };

    this.map.setOptions(Object.assign(options, this.mapOptions.interactive ? {} : nonInteractiveOptions));

    this.map.addListener('bounds_changed', () => !this.mapOptions.interactive && this.map.setCenter(this.computedCenter));
  }

  ngOnInit() {
    this.id = `map${this.utilService.generateGUID()}`;

    if (isBrowser) {
      this.init = this.googleApi.initMap().then(() => {
        this.computedCenter = new google.maps.LatLng(this.mapOptions.center.latitude, this.mapOptions.center.longitude);
        this.map = new google.maps.Map(document.getElementById(this.id), {
          center: this.computedCenter,
          zoom: this.mapOptions.zoomLevel,
        });

        this.ngOnChanges();
      });
    }
  }

  ngOnChanges() {
    if (this.init) {
      this.init.then(() => {
        this.setOptions();
        this.clearMap();
        this.updateMap();
        this.centerMapOnProperties();
        this.pokeMap();
      });
    }
  }
}
