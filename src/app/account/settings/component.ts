import { Component, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../users/user';
import { UserService, Me, License } from '../../shared/services/user.service';
import { ValidationService } from '../../shared/services/validation.service';
import { isBrowser } from 'angular2-universal';
import { ControlMessages } from '../../shared/components/control-messages/component';
import { Contact } from '../../users/user';

@Component({
  selector: 'settings',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class Settings {
  @Output() success: EventEmitter<any> = new EventEmitter<any>();
  public licenseError: boolean = false;
  public saveSuccess: boolean;
  public settingsForm: any;
  public contacts: Contact[];
  public licenses: License[] = [];
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();

    this.userService.hasAuth$.filter(i => i)
      .flatMap(() => this.userService.loadMe())
      .do((me: Me) => {
        this.contacts = me.contacts;
        this.licenses = me.licenses;
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

  private initForm(email = '', phone = ''): void {
    this.settingsForm = this.formBuilder.group({
      'email': [email, ValidationService.emailValidator],
      'phone': [phone, ValidationService.phoneNumberValidator],
    });
  }

  public onSubmit(): void {
    const controls = this.settingsForm.controls;

    this.userService.createUpdateContact(controls.email.value, controls.phone.value)
      .filter((res: Response) => res.ok)
      .do(() => this.saveSuccess = true)
      .flatMap(() => this.userService.setLicenseIds(this.licenses.filter(i => i.editable && i.value).map(i => i.value)))
      .map((i: Response[]) => this.handleLicenseResponses(i))
      .filter((res: Response) => res.ok)
      .do((i) => this.success.emit(true))
      .subscribe();
  }

  public getEmailOrPhoneRequiredMessage(): string {
    const email = this.settingsForm.controls.email;
    const phone = this.settingsForm.controls.phone;
    return !email.value && !phone.value && email.touched && phone.touched ? 'Email or Phone is required. ' : '';
  }

  public addLicense(): void {
    this.licenses.push({ editable: true, value: '' });
  }

  public canAddLicense(): boolean {
    return this.licenses && this.licenses.filter(i => !i.value).length < 1;
  }

  public handleLicenseResponses(responses: Response[]): Response {
    for (let response of responses) {
      const license = this.licenses.find(i => i.value === response.json().license_id);
      if (response.ok) {
        license.editable = false;
      } else {
        this.licenseError = true;
      }
    }
    return responses.every(i => i.ok) ? responses.find(i => i.ok) : responses.find(i => !i.ok);
  }
}
