import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property, PropertyFacet, PropertyPreview, PropertyMap, MapOptions } from '../properties/index';
import { PropertyFilters } from './property-filters.component';
import { PropertySlider } from './property-slider.component';
import { CAPE_GIRARDEU_CENTER } from '../config';

declare let $: any;
const MAP_HEIGHT = '100vh';
const MAP_ZOOM_LEVEL = 13;

@Component({
  moduleId: __filename,
  selector: 'welcome',
  directives: [PropertyPreview, PropertyMap, PropertyFilters, PropertySlider],
  styles: [`
   #scrolldiv{
          overflow: scroll;
          overflow-x: hidden;
          height: 100vh;
          max-width: none !important;
        }
    .left-margin-fix{
        margin-left:auto !important;
    }
    #one{
        overflow: hidden;
        position: relative;
    }
    #map{
        height: 100vh;
    }
    body{
        margin: 0px;
        height: 100%;
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

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.applyFacet(this.facet);
    this.lastPage$ = this.propertyService.lastPage$;
    this.updateMapOptions();
  }

  public applyFacet(facet: PropertyFacet) {
    this.properties$ = this.propertyService
      .getFilteredProperties$(this.facet, this.pageNumber)
  }

  private updateMapOptions() {
    this.mapOptions = {
      height: MAP_HEIGHT,
      center: CAPE_GIRARDEU_CENTER,
      zoomLevel: MAP_ZOOM_LEVEL
    }
  }
}
