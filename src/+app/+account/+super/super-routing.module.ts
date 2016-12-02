import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuperUser } from './component';
import { SuperAuthGuard } from './super.auth-guard';
import { SuperUserDashboard } from './super-dashboard/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SuperUser,
        canActivate: [SuperAuthGuard],
        children: [
          { path: '', component: SuperUserDashboard },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SuperRoutingModule { }
