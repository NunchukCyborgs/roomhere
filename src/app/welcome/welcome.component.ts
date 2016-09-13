import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property, PropertyFacet, PropertyPreview } from '../properties/index';
import { MapOptions, PropertyMap } from '../components/property-map/component';
import { PropertyFilters } from './property-filters/component';
import { PropertySlider } from './property-slider.component';
import { UserService, User } from '../users/index';
import { CAPE_GIRARDEU_CENTER } from '../config';

declare let $: any;
const MAP_HEIGHT = '100%';
const MAP_ZOOM_LEVEL = 13;

@Component({
  // moduleId: __filename,
  selector: 'welcome',
  // directives: [PropertyPreview, PropertyMap, PropertyFilters, PropertySlider],
  styles: [`
    .left-margin-fix{
        margin-left:auto !important;
    }
    #one{
        overflow: hidden;
        position: relative;
    }
    .rental{
        margin-bottom: 50px;
    }
    .fieldmargbtm{
        margin-bottom: 10px;
    }
    .marg40top{
        margin-top: 40px;
    }

    .pag{
        margin-bottom: 100px;
    }

    p {
      color: #888;
      font-size: 13px;
      margin-bottom: 0;
    }

    @media screen and (max-width: 39.9375em) {
        .left-margin-fix{
            margin-left:auto !important;
            margin-right:auto !important;
        }
    }
  `],
  templateUrl: 'welcome.component.html'
})
export class Welcome implements OnInit {
  public properties$: Observable<Property[]>;
  public facet: PropertyFacet = new PropertyFacet();
  public pageNumber: number = 1;
  public lastPage$: Observable<number>;
  public mapOptions: MapOptions;
  public showFilters: boolean = false;
  public user$: Observable<User>;

  constructor(private propertyService: PropertyService, private userService: UserService) { }

  ngOnInit() {
    this.applyFacet();
    this.lastPage$ = this.propertyService.lastPage$;
    this.user$ = this.userService.user$;
    this.updateMapOptions();
    this.updateOnUser();
  }

  public applyFacet() {
    this.properties$ = this.propertyService
      .getFilteredProperties$(this.facet, this.pageNumber)
  }

  private updateOnUser() {
    this.user$
      .do(i => this.facet.license_id = i.license_id)
      .subscribe(() => this.applyFacet());
  }

  private updateMapOptions() {
    this.mapOptions = {
      interactive: true,
      height: MAP_HEIGHT,
      center: CAPE_GIRARDEU_CENTER,
      zoomLevel: MAP_ZOOM_LEVEL
    }
  }
}
