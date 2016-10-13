import { NgModule }       from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AccountPage } from './component';
import { AccountRoutingModule } from './account-routing.module';
import { Dashboard } from './dashboard/component';
import { SuperUser } from './super/component';
import { Settings } from './settings/component';
import { UserSplash } from './user-splash/component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule,
  ],
  declarations: [
    Dashboard, SuperUser, AccountPage, SuperUser, Settings, UserSplash,
  ],
  providers: [
  ]
})
export class AccountModule {}
