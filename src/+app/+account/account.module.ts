import { NgModule }       from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PropertyModule } from '../+property/property.module';

import { AccountAuthGuard } from './account.auth-guard'; 
import { AccountPage } from './component';
import { AccountRoutingModule } from './account-routing.module';
import { Dashboard } from './dashboard/component';
import { LandlordDashboard } from './landlord-dashboard/component';
import { UserDashboard } from './user-dashboard/component';
import { Settings } from './settings/component';
import { LandlordSettings } from './landlord-settings/component';
import { BecomeLandlord } from './become-landlord/component';

@NgModule({
  imports: [
    SharedModule,
    PropertyModule,
    AccountRoutingModule,
  ],
  declarations: [
    Dashboard,
    AccountPage,
    Settings,
    LandlordSettings,
    BecomeLandlord,
    LandlordDashboard,
    UserDashboard,
  ],
  providers: [
    AccountAuthGuard,
  ]
})
export class AccountModule {}
