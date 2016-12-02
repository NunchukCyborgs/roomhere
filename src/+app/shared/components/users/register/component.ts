import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../dtos/user';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { isBrowser } from 'angular2-universal';
import { ControlMessages } from '../../control-messages/component';

@Component({
  selector: 'register',
  styleUrls: [],
  templateUrl: 'template.html',
})
export class Register {
  public success: boolean = false;
  public serverErrors: string[] = [];
  public registerForm: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.init();
    isBrowser && $(document).on('closed.zf.reveal', () => this.init());
  }

  private init() {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public getConfirmPasswordMatchMessage() {
    const password = this.registerForm.controls.password;
    const confirm = this.registerForm.controls.confirmPassword;
    return password.value !== confirm.value && password.touched && confirm.touched ? 'Passwords do not match. ' : '';
  }

  public onSubmit() {
    const user = new User({
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      password_confirmation: this.registerForm.controls.confirmPassword.value,
    });

    this.userService.register(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.success = res.ok);
  }

  public closeModal() {
    $('.register-modal__close-button').click();
  }
}
