import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { EditablePaymentRequest } from './components/editable-payment-request/component';
import { PaymentRequestsList } from './components/payment-requests-list/component';

const MODULES = [
  SharedModule,
];

const PIPES = [
];

const COMPONENTS = [
  EditablePaymentRequest, PaymentRequestsList,
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class AccountSharedModule {
  static forRoot() {
    return {
      ngModule: AccountSharedModule
    };
  }
}
