import { NgModule }       from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PropertyModule } from '../+property/property.module';
import { PayRentRoutingModule } from './+pay-rent/pay-rent-routing.module';
import { PayRentModule } from './+pay-rent/pay-rent.module';

import { AccountAuthGuard } from './account.auth-guard'; 
import { AccountPage } from './component';
import { AccountRoutingModule } from './account-routing.module';
import { Dashboard } from './dashboard/component';
import { Settings } from './settings/component';
import { UserSplash } from './user-splash/component';
import { LandlordSettings } from './landlord-settings/component';
import { BecomeLandlord } from './become-landlord/component';

@NgModule({
  imports: [
    SharedModule,
    PropertyModule,
    AccountRoutingModule,
    PayRentRoutingModule,
    PayRentModule,
  ],
  declarations: [
    Dashboard,
    AccountPage,
    Settings,
    UserSplash,
    LandlordSettings,
    BecomeLandlord,
  ],
  providers: [
    AccountAuthGuard,
  ]
})
export class AccountModule {}
