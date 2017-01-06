import { NgModule }       from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SuperRoutingModule } from './super-routing.module';
import { PropertyModule } from '../../+property/property.module';

import { SuperAuthGuard } from './super.auth-guard';
import { AccountSharedModule } from '../+account-shared/account-shared.module';
import { SuperPropertyManagement } from './property-management/component';
import { SuperUserDashboard } from './super-dashboard/component';
import { SuperUserPaymentRequests } from './payment-requests/component';
import { SuperUserReviews } from './reviews/component';
import { SuperLicensing } from './property-management/licensing/component';

@NgModule({
  imports: [
    SharedModule,
    SuperRoutingModule,
    PropertyModule,
    AccountSharedModule,
  ],
  declarations: [
    SuperPropertyManagement,
    SuperLicensing,
    SuperUserDashboard,
    SuperUserReviews,
    SuperUserPaymentRequests,
  ],
  providers: [
    SuperAuthGuard,
  ]
})
export class SuperModule {}
