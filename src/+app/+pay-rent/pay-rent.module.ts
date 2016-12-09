import { NgModule }       from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PayRentRoutingModule } from './pay-rent-routing.module';
import { PayRentAddress } from './address/component';
import { PayRentPayment } from './payment/component';
import { PayRentSignUp } from './sign-up/component';
import { PropertyModule } from '../+property/property.module';

@NgModule({
  imports: [
    SharedModule,
    PayRentRoutingModule,
    PropertyModule,
  ],
  declarations: [
    PayRentAddress, PayRentPayment, PayRentSignUp,
  ],
  providers: [
    
  ]
})
export class PayRentModule {}
