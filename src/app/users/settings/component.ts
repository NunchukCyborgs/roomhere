import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { UserService, Me } from '../user.service';
import { ValidationService } from '../../services/validation.service';
import { isBrowser } from 'angular2-universal';
import { ControlMessages } from '../../components/control-messages/component';
import { Contact } from '../user';

@Component({
  selector: 'settings',
  styles:[require('../modal/modal.styles.scss').toString(), require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class Settings {
  public success: boolean;
  public settingsForm: any;
  public contacts: Contact[];
  public licenses: Array<{editable: boolean, value: string}> = [];
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();

    this.userService.hasAuth$.filter(i => i)
      .flatMap(() => this.userService.loadMe())
      .do((me: Me) => {
        this.contacts = me.contacts;
        this.licenses = me.license_ids.map(i => ({editable: false, value: i}));
      })
      .subscribe(i => {
        if (this.contacts && this.contacts.length) {
          this.initForm(this.contacts[0].email, this.contacts[0].phone);
        }

        if (this.licenses.length === 0) {
          this.addLicense();
        }
      });
  }

  private initForm(email = '', phone = '') {
    this.settingsForm = this.formBuilder.group({
      'email': [email, ValidationService.emailValidator],
      'phone': [phone, ValidationService.phoneNumberValidator],
    });
  }

  public onSubmit() {
    const controls = this.settingsForm.controls;
    
    this.userService
      .createUpdateContact(controls.email.value, controls.phone.value)
      .flatMap(() => this.userService.setLicenseId(controls.licenseId.value))
      .do(i => console.log(i))
      .subscribe((res: Response) => this.success = res.ok);
  }

  public getEmailOrPhoneRequiredMessage() {
    const email = this.settingsForm.controls.email;
    const phone = this.settingsForm.controls.phone;
    return !email.value && !phone.value && email.touched && phone.touched ? 'Email or Phone is required. ' : '';
  }

  public addLicense() {
    this.licenses.push({editable: true, value: ''});
  }
}
