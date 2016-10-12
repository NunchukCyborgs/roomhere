import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dashboard } from './dashboard/component';
import { SuperUser } from './super/component';
import { AccountPage } from './component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '**', component: AccountPage},
      {
        path: 'account',
        component: AccountPage,
        children: [
          { path: 'dashboard', component: Dashboard },
          { path: 'super', component: SuperUser },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
