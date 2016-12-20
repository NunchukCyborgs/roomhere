import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuperAuthGuard } from './super.auth-guard';
import { SuperUserDashboard } from './super-dashboard/component';
import { SuperUserPaymentRequests } from './payment-requests/component';
import { SuperUserReviews } from './reviews/component';
import { SuperPropertyManagement } from './property-management/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SuperUserDashboard,
        canActivate: [SuperAuthGuard],
        children: [
          { path: '', redirectTo: 'property-management' },
          { path: 'property-management', component: SuperPropertyManagement },
          { path: 'reviews', component: SuperUserReviews },
          { path: 'payment-requests', component: SuperUserPaymentRequests },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SuperRoutingModule { }
