import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayRentAddress } from './address/component';
import { PayRentPayment } from './payment/component';
import { PayRentSignUp } from './sign-up/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PayRentAddress },
      { path: 'sign-up/:token', component: PayRentSignUp },
      { path: 'payment/:slug', component: PayRentPayment },
      { path: 'payment/:slug/:subtotal', component: PayRentPayment },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PayRentRoutingModule { }
