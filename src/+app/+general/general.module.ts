import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';

import { Faq } from './faq/component';
import { LandlordLanding } from './landlord-landing/component';
import { PrivacyPolicy } from './privacy-policy/component';
import { RenterLanding } from './renter-landing/component';

@NgModule({
  imports: [
    SharedModule,
    GeneralRoutingModule,
  ],
  declarations: [
    Faq,
    LandlordLanding,
    PrivacyPolicy,
    RenterLanding,
  ]
})
export class GeneralModule { }
