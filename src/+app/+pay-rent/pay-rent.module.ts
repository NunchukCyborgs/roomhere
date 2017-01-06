import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PayRentRoutingModule } from './pay-rent-routing.module';
import { PayRent } from './component';
import { PayRentStep1 } from './step1/component';
import { PayRentStep2 } from './step2/component';
import { PayRentSuccess } from './success/component';
import { PropertyModule } from '../+property/property.module';

@NgModule({
  imports: [
    SharedModule,
    PayRentRoutingModule,
    PropertyModule,
  ],
  declarations: [
    PayRent,
    PayRentStep1,
    PayRentStep2,
    PayRentSuccess,
  ],
  providers: [
  ]
})
export class PayRentModule { }
