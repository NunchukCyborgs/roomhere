import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from '../index';
import { ValidationService } from '../../services/validation.service';
import { isBrowser } from 'angular2-universal';
import { ControlMessages } from '../../components/control-messages/component';

@Component({
  selector: 'settings',
  styles:[require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class Settings {
  public success: boolean = false;
  public serverErrors: string[] = [];
  public settingsForm: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
       // might have async problem here
      'email': ['', ValidationService.emailValidator], 
      'phone': ['', ValidationService.phoneNumberValidator],
      'licenseId': ['', Validators.required],
    });
  }

  public onSubmit() {
    const controls = this.settingsForm.controls;
    console.log('on submit', controls.email.value, controls.phone.value, controls.licenseId.value);
    this.userService
      .createContact(controls.email.value, controls.phone.value)
      .flatMap(() => this.userService.setLicenseId(controls.licenseId.value)) // Only do if it's never been set?
      .subscribe((res: Response) => this.success = res.ok);
  }

  public getEmailOrPhoneRequiredMessage() {
    const email = this.settingsForm.controls.email;
    const phone = this.settingsForm.controls.phone;
    return !email.value && !phone.value && email.touched && phone.touched ? 'Email or Phone is required. ' : '';
  }
}
