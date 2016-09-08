import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User, UserService } from '../index';
import { ServerUnsafeService } from '../../services/server-unsafe.service';
import { ValidationService } from '../../services/validation.service';
import { ControlMessages } from '../../components/control-messages/component';

declare let require: (string) => string;
declare let $: any;

@Component({
  selector: 'login',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, ControlMessages],
   styles:[require('../modal/modal.component.scss').toString(), require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class Login {
  public serverErrors: string[] = [];
  public loginForm: any;

  constructor(private userService: UserService, private unsafe: ServerUnsafeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.init();
    this.unsafe.tryUnsafeCode(() => $(document).on('closed.zf.reveal', () => this.init()), '$ undefined');
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
      this.unsafe.tryUnsafeCode(() => $('login .close-button').click(), '$ is undefined');
    }
  }
}
