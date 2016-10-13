import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { UserService } from '../../shared/services/user.service';
import { isBrowser } from 'angular2-universal';
import { ValidationService } from '../../shared/services/validation.service';
import { ControlMessages } from '../../shared/components/control-messages/component';

@Component({
  selector: 'login',
  styles:[require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class Login {
  public serverErrors: string[] = [];
  public loginForm: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.init();
    isBrowser && $(document).on('closed.zf.reveal', () => this.init());
  }

  private init() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public onSubmit() {
    const user = new User({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    });
    
    this.userService.login(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .subscribe((res: Response) => this.closeModal(res));
  }

  private closeModal(res?: Response) {
    if (!res || res.ok) {
      isBrowser && $('login .close-button').click();
    }
  }
}
