import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PropertyService, Property, PropertyImages, PropertyReviews, SimilarProperties, PropertyMap, MapOptions } from './index';

const ZOOM_LEVEL: number = 16;
const HEIGHT: string = '100px';

@Component({
  moduleId: __filename,
  selector: 'property-view',
  directives: [PropertyReviews, SimilarProperties, PropertyMap, PropertyImages],
  styles: [`
    .property-view-container {
      position: relative;
    }

    .call-to-actions--top {
      position: absolute;
      top: 10px;
      right: 10px;
      border-radius: 5%;
      z-index: 10;
      box-shadow: inset 1px 1px 3px #999;
    }

    .call-to-actions--top .rent-now {
      margin-bottom: 10px;
    }
  `],
  templateUrl: './property-view.component.html'
})
export class PropertyView implements OnDestroy {
  public property: Property;
  public mapOptions: MapOptions;
  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService
    ) {

  }

  private updateMapOptions(property: Property) {
    this.mapOptions = {
      height: HEIGHT,
      zoomLevel: ZOOM_LEVEL,
      center: {
        latitude: property.latitude,
        longitude: property.longitude
      },
    }
  }

  ngOnInit() {
    this.sub = this.route.params
      .flatMap(params =>this.propertyService.getPropertyBySlug$(params['slug']))
      .do((property: Property) => this.updateMapOptions(property))
      .subscribe((property: Property) => this.property = property);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
