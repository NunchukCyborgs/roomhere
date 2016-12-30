import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../dtos/user';
import { UserService } from '../../../services/user.service';
import { jQueryService } from '../../../services/jquery.service';
import { ValidationService } from '../../../services/validation.service';
import { isBrowser } from 'angular2-universal';
import { ControlMessages } from '../../control-messages/component';

@Component({
  selector: 'reset-password',
  styleUrls: [],
  templateUrl: 'template.html',
})
export class ResetPassword {
  public success: boolean = false;
  public serverErrors: string[] = [];
  public resetPasswordForm: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private jquery: jQueryService) { }

  ngOnInit() {
    this.init();
    this.jquery.loadFoundation()
      .subscribe(() => this.jquery.jquery(document).on('closed.zf.reveal', () => this.init()));
  }

  private init() {
      this.resetPasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public getConfirmPasswordMatchMessage() {
    const password = this.resetPasswordForm.controls.password;
    const confirm = this.resetPasswordForm.controls.confirmPassword;
    return password.value !== confirm.value && password.touched && confirm.touched ? 'Passwords do not match. ' : '';
  }

  public onSubmit() {
    const user = new User({
      password: this.resetPasswordForm.controls.password.value,
      password_confirmation: this.resetPasswordForm.controls.confirmPassword.value,
    });

    this.userService.resetPassword(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.success = res.ok);
  }

  public closeModal() {
    this.jquery.loadJQuery()
      .subscribe(jquery => jquery('.register-modal__close-button').click());
  }
}
