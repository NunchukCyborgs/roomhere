import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PropertyService, Property } from './property.service';
import { PropertyImages } from './property-images.component';
import { PropertyReviews } from './property-reviews.component';
import { SimilarProperties } from './similar-properties.component';
import { PropertyMap } from '../welcome/property-map.component';

@Component({
  moduleId: __filename,
  selector: 'property-view',
  directives: [PropertyReviews, SimilarProperties, PropertyImages],
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
  private sub: Subscription;
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private propertyService: PropertyService
    ) {

  }

  ngOnInit() {
    this.sub = this.route.params
      .flatMap(params => this.propertyService.getPropertyBySlug$(params['slug']))
      .subscribe((property: Property) => this.property = property)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
