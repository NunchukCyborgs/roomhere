import { NgModule }       from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SuperRoutingModule } from './super-routing.module';
import { PropertyModule } from '../../+property/property.module';

import { SuperAuthGuard } from './super.auth-guard'; 
import { SuperUser } from './component';
import { SuperUserDashboard } from './super-dashboard/component';
import { SuperLicensing } from './licensing/component';

@NgModule({
  imports: [
    SharedModule,
    SuperRoutingModule,
    PropertyModule,
  ],
  declarations: [
    SuperUser,
    SuperLicensing,
    SuperUserDashboard,
  ],
  providers: [
    SuperAuthGuard,
  ]
})
export class SuperModule {}
