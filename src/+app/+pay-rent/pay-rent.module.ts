import { NgModule }       from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PayRentRoutingModule } from './pay-rent-routing.module';
import { PayRentAddress } from './address/component';
import { PayRentStep1 } from './step1/component';
import { PayRentStep1Form } from './step1/form/component';
import { PayRentStep2 } from './step2/component';
import { PropertyModule } from '../+property/property.module';

@NgModule({
  imports: [
    SharedModule,
    PayRentRoutingModule,
    PropertyModule,
  ],
  declarations: [
    PayRentStep1, PayRentStep2,
    PayRentAddress, PayRentStep1Form,
  ],
  providers: [
  ]
})
export class PayRentModule {}
