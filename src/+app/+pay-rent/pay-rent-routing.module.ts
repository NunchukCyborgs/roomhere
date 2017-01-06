import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayRent } from './component';
import { PayRentStep1 } from './step1/component';
import { PayRentStep2 } from './step2/component';
import { PayRentSuccess } from './success/component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PayRent,
        children: [
          { path: 'success', component: PayRentSuccess },
          { path: 'step-2/:token', component: PayRentStep2 },
          { path: ':slug', component: PayRentStep1 },
          { path: ':slug/:subtotal', component: PayRentStep1 },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PayRentRoutingModule { }
