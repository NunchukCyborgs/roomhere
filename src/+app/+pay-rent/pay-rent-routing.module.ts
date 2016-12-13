import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayRentAddress } from './address/component';
import { PayRentStep1 } from './step1/component';
import { PayRentStep2 } from './step2/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PayRentAddress }, // Remove?
      { path: 'step-2/:token', component: PayRentStep2 },
      { path: ':slug', component: PayRentStep1 },
      { path: ':slug/:subtotal', component: PayRentStep1 },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PayRentRoutingModule { }
