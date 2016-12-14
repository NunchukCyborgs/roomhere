import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';

import { Faq } from './faq/component';
import { PrivacyPolicy } from './privacy-policy/component';
import { UserSplash } from './user-splash/component';
import { PaymentSuccess } from './payment-success/component';
import { LandlordLanding } from './landing-pages/landlord/component';
import { RenterLanding } from './landing-pages/renter/component';

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
    UserSplash,
    PaymentSuccess,
  ]
})
export class GeneralModule { }
