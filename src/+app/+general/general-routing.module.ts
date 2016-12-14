import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResetPassword } from '../shared/components/users/reset-password/component';
import { Faq } from './faq/component';
import { PrivacyPolicy } from './privacy-policy/component';
import { UserSplash } from './user-splash/component';
import { PaymentSuccess } from './payment-success/component';
import { LandlordLanding } from './landing-pages/landlord/component';
import { RenterLanding } from './landing-pages/renter/component';
import { PayRentLanding } from './landing-pages/pay-rent/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'faq', component: Faq },
      { path: 'cape-girardeau-landlords', component: LandlordLanding },
      { path: 'cape-girardeau-rentals', component: RenterLanding },
      { path: 'pay-rent-online', component: PayRentLanding },
      { path: 'privacy-policy', component: PrivacyPolicy },
      { path: 'reset-password', component: ResetPassword },
      { path: 'registration-success', component: UserSplash },
      { path: 'payment-success', component: PaymentSuccess },
    ])
  ]
})
export class GeneralRoutingModule { }
