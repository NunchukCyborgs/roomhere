import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResetPassword } from '../shared/components/users/reset-password/component';
import { Faq } from './faq/component';
import { PrivacyPolicy } from './privacy-policy/component';
import { LandlordLanding } from './landing-pages/landlord/component';
import { RenterLanding } from './landing-pages/renter/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'faq', component: Faq },
      { path: 'cape-girardeau-landlords', component: LandlordLanding },
      { path: 'cape-girardeau-rentals', component: RenterLanding },
      { path: 'privacy-policy', component: PrivacyPolicy },
      { path: 'reset-password', component: ResetPassword },
    ])
  ]
})
export class GeneralRoutingModule { }
