import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../dtos/user';
import { UserService } from '../../../services/user.service';
import { jQueryService } from '../../../services/jquery.service';
import { isBrowser } from 'angular2-universal';
import { ValidationService } from '../../../services/validation.service';
import { ControlMessages } from '../../control-messages/component';

@Component({
  selector: 'forgot-password',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class ForgotPassword {
  public success: boolean = false;
  public serverErrors: string[] = [];
  public forgotPasswordForm: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private jquery: jQueryService) { }

  ngOnInit() {
    this.init();
    this.jquery.loadFoundation()
      .subscribe(() => this.jquery.jquery(document).on('closed.zf.reveal', () => this.init()));
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

  public closeModal() {
    this.jquery.loadJQuery()
      .subscribe(jquery => jquery('.register-modal__close-button').click());
  }
}
