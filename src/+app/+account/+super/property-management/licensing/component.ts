import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../../../shared/dtos/property';
import { PropertyService } from '../../../../shared/services/property.service';
import { UserService } from '../../../../shared/services/user.service';
import { Contact } from '../../../../shared/dtos/user';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'super-licensing',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class SuperLicensing {
  public loadedContacts: boolean;
  public success: boolean;
  public settingsForm: any;
  public contacts: Contact[] = null;
  public licenseId: string = '';
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  public loadContacts() {
    this.userService.loadContactsByLicenseId(this.licenseId)
      .do(i => this.loadedContacts = Boolean(i !== undefined))
      .do(i => this.contacts = i)
      .filter(() => Boolean(this.contacts && this.contacts.length))
      .subscribe(() => this.initForm(this.contacts[0].email || '', this.contacts[0].phone || ''));
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

    const seq = this.contacts.length ? this.userService.updateContact(this.contacts[0].id, email, phone) : this.userService.createContact(email, phone, this.licenseId);
    seq.subscribe(i => this.success = i.ok);
  }

  public getEmailOrPhoneRequiredMessage() {
    const email = this.settingsForm.controls.email;
    const phone = this.settingsForm.controls.phone;
    return !email.value && !phone.value && email.touched && phone.touched ? 'Email or Phone is required. ' : '';
  }
}
