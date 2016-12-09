import { NgModule }       from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PayRentRoutingModule } from './pay-rent-routing.module';
import { PayRentAddress } from './address/component';
import { PayRentStep1 } from './step1/component';
import { PayRentStep2 } from './step2/component';
import { PayRentSignUp } from './sign-up/component';
import { PropertyModule } from '../+property/property.module';

@NgModule({
  imports: [
    SharedModule,
    PayRentRoutingModule,
    PropertyModule,
  ],
  declarations: [
    PayRentStep1, PayRentStep2,
    PayRentAddress, PayRentSignUp,
  ],
  providers: [
  ]
})
export class PayRentModule {}
