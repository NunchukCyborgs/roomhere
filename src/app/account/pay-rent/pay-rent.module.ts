import { NgModule }       from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PayRentRoutingModule } from './pay-rent-routing.module';
import { PayRent } from './component';
import { PayRentAddress } from './address/component';

@NgModule({
  imports: [
    SharedModule,
    PayRentRoutingModule,
  ],
  declarations: [
    PayRent, PayRentAddress
  ],
  providers: [
    
  ]
})
export class PayRentModule {}
