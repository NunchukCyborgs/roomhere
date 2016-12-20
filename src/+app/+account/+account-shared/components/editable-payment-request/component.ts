import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../../../shared/services/payment.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { PaymentRequest, PaymentRequestBlob } from '../../../../shared/dtos/payment-request';

@Component({
  selector: 'editable-payment-request',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class EditablePaymentRequest {
  @Input() paymentRequest: PaymentRequest;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  public errors: string[] = [];
  public paymentForm: FormGroup;

  constructor(private paymentService: PaymentService) { }

  public cancelChanges() {
    this.cancel.emit(true);
  }

  public submit() {
    this.paymentService.updateRequest(this.getUpdatedPaymentRequest())
      .do((i: PaymentRequestBlob) => this.errors = i.errors)
      .do((i: PaymentRequestBlob) => this.paymentRequest = i.payment_request)
      .filter((i: PaymentRequestBlob) => !i.errors.length)
      .do((i: PaymentRequestBlob) => this.save.emit(i.payment_request))
      .subscribe();
  }

  ngOnInit() {
    this.paymentRequest.phone = this.paymentRequest.phone || '1231231234';
    console.log(this.paymentRequest);

    let controls: any = {
      name: new FormControl(this.paymentRequest.name, [Validators.required, ValidationService.nameValidator]),
      subtotal: new FormControl(this.paymentRequest.subtotal, [Validators.required, ValidationService.minValidator.bind(this, 25), ValidationService.maxValidator.bind(this, 999999.99)]), // minimum price? 25?
      phone: new FormControl(this.paymentRequest.phone, [Validators.required, ValidationService.phoneNumberValidator]),
      unit: new FormControl(this.paymentRequest.unit),
    }

    this.paymentForm = new FormGroup(controls);
  }

  private getUpdatedPaymentRequest(): PaymentRequest {
    return Object.assign({}, this.paymentRequest, {
      name: this.paymentForm.controls['name'].value,
      subtotal: this.paymentForm.controls['subtotal'].value,
      unit: this.paymentForm.controls['unit'].value,
      phone: this.paymentForm.controls['phone'].value,
    });
  }
}
