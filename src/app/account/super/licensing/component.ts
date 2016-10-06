import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../../properties/property';
import { PropertyService } from '../../../properties/property.service';
import { UserService } from '../../../users/user.service';
import { Contact } from '../../../users/user';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'super-licensing',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class SuperLicensing {
  public success: boolean;
  public settingsForm: any;
  public contacts: Contact[];
  public licenseId: string = '';
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  public loadContacts() {
    this.userService.loadContactsByLicenseId(this.licenseId)
      .do(i => this.contacts = i)
      .filter(() => Boolean(this.contacts.length))
      .subscribe(() => this.initForm(this.contacts[0].email, this.contacts[0].phone));
  }

  private initForm(email = '', phone = '') {
    this.settingsForm = this.formBuilder.group({
      'email': [email, ValidationService.emailValidator],
      'phone': [phone, ValidationService.phoneNumberValidator],
    });
  }

  public onSubmit() {
    const controls = this.settingsForm.controls;
    const email = controls.email.value;
    const phone = controls.phone.value;

    const seq = this.contacts.length ? this.userService.createContact(email, phone) : this.userService.updateContact(this.contacts[0].id, email, phone);
    seq.subscribe(i => this.success = i.ok);
  }

  public getEmailOrPhoneRequiredMessage() {
    const email = this.settingsForm.controls.email;
    const phone = this.settingsForm.controls.phone;
    return !email.value && !phone.value && email.touched && phone.touched ? 'Email or Phone is required. ' : '';
  }
}
