import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService, User } from '../index';
import { ServerUnsafeService } from '../../services/server-unsafe.service';
import { ValidationService } from '../../services/validation.service';
import { ControlMessages } from '../../components/control-messages/component';


;

@Component({
  selector: 'forgot-password',
  // directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
  // styles: [require('../modal/modal.component.scss').toString(), require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class ForgotPassword {
  public success: boolean = false;
  public serverErrors: string[] = [];
  public forgotPasswordForm: any;

  constructor(private userService: UserService, private unsafe: ServerUnsafeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.init();
    this.unsafe.tryUnsafeCode(() => $(document).on('closed.zf.reveal', () => this.init()), '$ undefined');
  }

  private init() {
     this.forgotPasswordForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
    });
  }

  public onSubmit() {
    const user = new User({
      email: this.forgotPasswordForm.controls.email.value,
    });

    this.userService.sendResetPasswordLink(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.success = true);
  }
}
