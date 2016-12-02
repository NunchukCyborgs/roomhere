import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PropertyViewRoutingModule } from './property-view-routing.module';
import { PropertyModule } from '../+property/property.module';

import { PropertyView } from './component';
import { NoPropertyInfo } from './no-property-info/component';
import { PropertyActionsGroup } from './property-actions-group/component';
import { PropertyImages } from './property-images/component';
import { RentNow } from './rent-now/component';
import { PropertyReviews } from './property-reviews/component';
import { PropertyReview } from './property-reviews/review/component';
import { EditableReview } from './property-reviews/editable-review/component';

@NgModule({
  imports: [
    SharedModule,
    PropertyModule,
    PropertyViewRoutingModule,
  ],
  declarations: [
    PropertyView,
    NoPropertyInfo,
    PropertyActionsGroup,
    PropertyImages,
    RentNow,
    PropertyReviews,
    PropertyReview,
    EditableReview,
  ]
})
export class PropertyViewModule { }
