import { NgModule }       from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PayRentRoutingModule } from './pay-rent-routing.module';
import { PayRentAddress } from './address/component';
import { PayRentPayment } from './payment/component';
import { PropertyModule } from '../+property/property.module';

@NgModule({
  imports: [
    SharedModule,
    PayRentRoutingModule,
    PropertyModule,
  ],
  declarations: [
    PayRentAddress, PayRentPayment,
  ],
  providers: [
    
  ]
})
export class PayRentModule {}
