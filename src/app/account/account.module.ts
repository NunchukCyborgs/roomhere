import { NgModule }       from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AccountPage } from './component';

import { AccountRoutingModule } from './account-routing.module';
import { Dashboard } from './dashboard/component';
import { SuperUser } from './super/component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule,
  ],
  declarations: [
    Dashboard, SuperUser, AccountPage
  ],
  providers: [
  ]
})
export class AccountModule {}
