import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountPage } from './component';
import { Dashboard } from './dashboard/component';
import { Settings } from './settings/component';
import { LandlordSettings } from './landlord-settings/component';
import { BecomeLandlord } from './become-landlord/component';

export function getSuperModule() {
  return System.import('./+super/super.module' + (process.env.AOT ? '.ngfactory' : ''))
    .then(mod => mod[(process.env.AOT ? 'SuperModuleNgFactory' : 'SuperModule')]);
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountPage,
        children: [
          { path: '', redirectTo: 'dashboard' },
          { path: 'dashboard', component: Dashboard },
          { path: 'landlord-settings', component: LandlordSettings },
          { path: 'become-a-landlord', component: BecomeLandlord },
          { path: 'super', loadChildren: getSuperModule },
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
  ]
})
export class AccountRoutingModule { }
