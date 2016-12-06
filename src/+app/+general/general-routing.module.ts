import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Faq } from './faq/component';
import { LandlordLanding } from './landlord-landing/component';
import { PrivacyPolicy } from './privacy-policy/component';
import { RenterLanding } from './renter-landing/component';
import { ResetPassword } from '../shared/components/users/reset-password/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'faq', component: Faq },
      // { path: 'cape-girardeau-landlords', component: LandlordLanding },
      { path: 'cape-girardeau-rentals', component: RenterLanding },
      { path: 'privacy-policy', component: PrivacyPolicy },
      { path: 'reset-password', component: ResetPassword },
    ])
  ]
})
export class GeneralRoutingModule { }
