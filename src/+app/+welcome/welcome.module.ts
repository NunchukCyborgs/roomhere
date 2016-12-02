import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PropertyModule } from '../+property/property.module';

import { Welcome } from './component';
import { WelcomeFilters } from './filters/component';
import { PropertySlider } from './property-slider/component';
import { PropertyFilters } from './property-filters/component';
import { PropertyPreview } from './property-preview/component';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  imports: [
    SharedModule,
    WelcomeRoutingModule,
    PropertyModule,
  ],
  declarations: [
    Welcome,
    WelcomeFilters,
    PropertySlider, 
    PropertyFilters,
    PropertyPreview,
  ]
})
export class WelcomeModule { }
