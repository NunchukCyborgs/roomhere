import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PropertyService, Property } from './property.service';
import { PropertyImages } from './property-images.component';
import { PropertyReviews } from './property-reviews.component';
import { SimilarProperties } from './similar-properties.component';

@Component({
  moduleId: __filename,
  selector: 'property-view',
  directives: [PropertyReviews, SimilarProperties],
  styles: [`

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
