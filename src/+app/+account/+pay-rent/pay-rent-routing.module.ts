import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayRentAddress } from './address/component';
import { PayRentPayment } from './payment/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PayRentAddress },
      { path: 'payment/:slug', component: PayRentPayment },
      { path: 'payment/:slug/:subtotal', component: PayRentPayment },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PayRentRoutingModule { }
