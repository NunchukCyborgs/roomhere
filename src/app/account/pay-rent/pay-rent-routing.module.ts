import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayRent } from './component';
import { PayRentAddress } from './address/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pay-rent',
        component: PayRent,
        children: [
          { path: '', redirectTo: 'address' },
          { path: 'address', component: PayRentAddress },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PayRentRoutingModule { }
