import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountPage } from './component';
import { Dashboard } from './dashboard/component';
import { SuperUser } from './super/component';
import { Settings } from './settings/component';
import { UserSplash } from './user-splash/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'account',
        component: AccountPage,
        children: [
          { path: '', redirectTo: 'dashboard' },
          { path: 'dashboard', component: Dashboard },
          { path: 'super', component: SuperUser },
          { path: 'settings', component: Settings },
          { path: 'registration-success', component: UserSplash },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
