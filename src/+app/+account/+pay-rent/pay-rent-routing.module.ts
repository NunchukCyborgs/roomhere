import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayRent } from './component';
import { PayRentAddress } from './address/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PayRentAddress },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PayRentRoutingModule { }
