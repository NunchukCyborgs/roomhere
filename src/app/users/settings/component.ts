import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from '../index';
import { ValidationService } from '../../services/validation.service';
import { isBrowser } from 'angular2-universal';
import { ControlMessages } from '../../components/control-messages/component';
import { Contact } from '../user';

@Component({
  selector: 'settings',
  styles:[require('../modal/modal.component.scss').toString(), require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class Settings {
  public success: boolean;
  public settingsForm: any;
  public contacts: Contact[];
  public licenseId: string;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();

    this.userService
      .loadContacts()
      .do(i => this.contacts = i)
      .flatMap(i => this.userService.loadLicenseId())
      .do(i => this.licenseId = i)
      .subscribe(i => this.initForm(this.contacts[0].email, this.contacts[0].phone, this.licenseId));
  }

  private initForm(email = '', phone = '', licenseId = '') {
    this.settingsForm = this.formBuilder.group({
      'email': [email, ValidationService.emailValidator],
      'phone': [phone, ValidationService.phoneNumberValidator],
      'licenseId': [licenseId, Validators.required],
    });
  }

  public onSubmit() {
    const controls = this.settingsForm.controls;
    this.userService
      .createUpdateContact(controls.email.value, controls.phone.value)
      .flatMap(() => this.userService.setLicenseId(controls.licenseId.value))
      .subscribe((res: Response) => this.success = res.ok);
  }

  public getEmailOrPhoneRequiredMessage() {
    const email = this.settingsForm.controls.email;
    const phone = this.settingsForm.controls.phone;
    return !email.value && !phone.value && email.touched && phone.touched ? 'Email or Phone is required. ' : '';
  }
}
