import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountPage } from './component';
import { Dashboard } from './dashboard/component';
import { SuperUser } from './super/component';
import { Settings } from './settings/component';
import { UserSplash } from './user-splash/component';
import { LandlordSettings } from './landlord-settings/component';
import { BecomeLandlord } from './become-landlord/component';
import { AccountAuthGuard } from './account.auth-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'account',
        component: AccountPage,
        canActivate: [AccountAuthGuard],
        children: [
          { path: '', redirectTo: 'dashboard' },
          { path: 'dashboard', component: Dashboard },
          { path: 'super', component: SuperUser },
          { path: 'registration-success', component: UserSplash },
          { path: 'landlord-settings', component: LandlordSettings },
          { path: 'become-a-landlord', component: BecomeLandlord },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
