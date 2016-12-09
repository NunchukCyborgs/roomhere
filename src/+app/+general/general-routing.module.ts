import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Faq } from './faq/component';
import { LandlordLanding } from './landlord-landing/component';
import { PrivacyPolicy } from './privacy-policy/component';
import { RenterLanding } from './renter-landing/component';
import { ResetPassword } from '../shared/components/users/reset-password/component';
import { UserSplash } from './user-splash/component';
import { PaymentSuccess } from './payment-success/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'faq', component: Faq },
      // { path: 'cape-girardeau-landlords', component: LandlordLanding },
      { path: 'cape-girardeau-rentals', component: RenterLanding },
      { path: 'privacy-policy', component: PrivacyPolicy },
      { path: 'reset-password', component: ResetPassword },
      { path: 'registration-success', component: UserSplash },
      { path: 'payment-success', component: PaymentSuccess },
    ])
  ]
})
export class GeneralRoutingModule { }
