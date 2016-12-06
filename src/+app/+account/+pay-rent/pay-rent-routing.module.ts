import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayRent } from './component';
import { PayRentAddress } from './address/component';
import { PayRentPayment } from './payment/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PayRentAddress },
      { path: 'payment', component: PayRentPayment },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PayRentRoutingModule { }
